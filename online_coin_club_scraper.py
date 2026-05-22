#!/usr/bin/env python3
"""
Production scraper for https://onlinecoin.club
Crawls the full coin catalog, enriches each record from detail pages,
downloads obverse/reverse images, and writes a master CSV.

Usage
-----
  python online_coin_club_scraper.py                    # full run
  python online_coin_club_scraper.py --max-pages 5      # first 5 list pages only
  python online_coin_club_scraper.py --skip-images      # skip image downloads
  python online_coin_club_scraper.py --resume           # resume from state file (default)
  python online_coin_club_scraper.py --no-resume        # restart from scratch

Output
------
  art_of_metal/data/coins_master.csv
  art_of_metal/data/scrape_state.json
  art_of_metal/logs/scraper_YYYYMMDD_HHMMSS.log
  art_of_metal/images/originals/<country>/<series>/<year>_<coin-name>/obverse.jpg
  art_of_metal/images/originals/<country>/<series>/<year>_<coin-name>/reverse.jpg

Selector assumptions (adjust if site changes)
----------------------------------------------
  List table  : <table id="table-coins"> or class "table-coins"
  Country/type: Column 1 text, split on " Type: "
  Coin name   : Column 2 <a> text
  Detail URL  : Column 2 <a href>
  Year        : Column 3
  Currency    : Detail page label "Currency:"
  Material    : Detail page label "Material:"
  Mint        : Detail page label "Mint:"
  Mintage     : Detail page label "Mintage:"
  Weight      : Detail page label "Weight:"
  Diameter    : Detail page label "Diameter:"
  Edge        : Detail page label "Edge:"
  Ruler       : Detail page label "Ruler:"
  Images      : <img> tags with class "coin-image" or inside .coin-obverse / .coin-reverse
  Pagination  : <a> whose text matches page numbers or "Next"
"""

import argparse
import csv
import json
import logging
import os
import re
import sys
import time
import unicodedata
from dataclasses import asdict, dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Optional
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

BASE_URL = "https://onlinecoin.club"
LIST_START = "https://onlinecoin.club/Coins/List/"
OUTPUT_ROOT = Path("art_of_metal")
DATA_DIR = OUTPUT_ROOT / "data"
IMAGES_DIR = OUTPUT_ROOT / "images" / "originals"
LOGS_DIR = OUTPUT_ROOT / "logs"
STATE_FILE = DATA_DIR / "scrape_state.json"
CSV_FILE = DATA_DIR / "coins_master.csv"

REQUEST_DELAY = 1.5      # seconds between requests (polite crawling)
DETAIL_DELAY = 0.8       # seconds between detail page requests
IMAGE_DELAY = 0.5        # seconds between image downloads
MAX_RETRIES = 3          # per-request retry attempts
RETRY_BACKOFF = (2, 4, 8)  # seconds per retry attempt

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; ArtOfMetalBot/1.0; "
        "+https://artofmetal.com/bot)"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

CSV_FIELDS = [
    "country",
    "series_or_type",
    "coin_name",
    "year",
    "currency",
    "material",
    "weight",
    "diameter",
    "edge",
    "mint",
    "mintage_raw",
    "mintage_numeric",
    "ruler",
    "references",
    "obverse_description",
    "reverse_description",
    "detail_url",
    "obverse_image_url",
    "reverse_image_url",
    "obverse_local_path",
    "reverse_local_path",
    "source_site",
    "source_list_url",
]


# ---------------------------------------------------------------------------
# Data model
# ---------------------------------------------------------------------------

@dataclass
class CoinRecord:
    country: str = ""
    series_or_type: str = ""
    coin_name: str = ""
    year: str = ""
    currency: str = ""
    material: str = ""
    weight: str = ""
    diameter: str = ""
    edge: str = ""
    mint: str = ""
    mintage_raw: str = ""
    mintage_numeric: str = ""
    ruler: str = ""
    references: str = ""
    obverse_description: str = ""
    reverse_description: str = ""
    detail_url: str = ""
    obverse_image_url: str = ""
    reverse_image_url: str = ""
    obverse_local_path: str = ""
    reverse_local_path: str = ""
    source_site: str = "Online Coin Club"
    source_list_url: str = ""


# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

def setup_logging() -> logging.Logger:
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_path = LOGS_DIR / f"scraper_{timestamp}.log"

    logger = logging.getLogger("coin_scraper")
    logger.setLevel(logging.DEBUG)

    fh = logging.FileHandler(log_path, encoding="utf-8")
    fh.setLevel(logging.DEBUG)
    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(logging.INFO)

    fmt = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s")
    fh.setFormatter(fmt)
    ch.setFormatter(fmt)

    logger.addHandler(fh)
    logger.addHandler(ch)
    logger.info(f"Log file: {log_path}")
    return logger


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

def fetch(session: requests.Session, url: str, logger: logging.Logger,
          stream: bool = False, timeout: int = 30) -> Optional[requests.Response]:
    for attempt, backoff in enumerate([0] + list(RETRY_BACKOFF), start=0):
        if backoff:
            logger.debug(f"  Retry {attempt}/{MAX_RETRIES} after {backoff}s: {url}")
            time.sleep(backoff)
        try:
            resp = session.get(url, headers=HEADERS, timeout=timeout, stream=stream)
            if resp.status_code == 200:
                return resp
            if resp.status_code in (429, 503):
                wait = int(resp.headers.get("Retry-After", backoff or 10))
                logger.warning(f"  Rate limited ({resp.status_code}), sleeping {wait}s")
                time.sleep(wait)
                continue
            logger.warning(f"  HTTP {resp.status_code} for {url}")
            if attempt >= MAX_RETRIES:
                return None
        except requests.RequestException as exc:
            logger.warning(f"  Request error ({exc}) for {url}")
            if attempt >= MAX_RETRIES:
                return None
    return None


def get_soup(session: requests.Session, url: str,
             logger: logging.Logger) -> Optional[BeautifulSoup]:
    resp = fetch(session, url, logger)
    if resp is None:
        return None
    return BeautifulSoup(resp.text, "lxml")


# ---------------------------------------------------------------------------
# Text / slug helpers
# ---------------------------------------------------------------------------

def slugify(text: str) -> str:
    """Convert text to a safe directory/filename segment."""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    text = re.sub(r"[\s_-]+", "-", text)
    return text[:80]  # cap length


def clean(text: Optional[str]) -> str:
    if not text:
        return ""
    return " ".join(text.split())


def extract_numeric_mintage(raw: str) -> str:
    """Strip commas/spaces and return only the digits from a mintage string."""
    digits = re.sub(r"[^\d]", "", raw)
    return digits if digits else ""


# ---------------------------------------------------------------------------
# List-page parsing
# ---------------------------------------------------------------------------

def split_country_type(cell_text: str):
    """Split 'Country Type: Series' into (country, series_or_type)."""
    if " Type: " in cell_text:
        parts = cell_text.split(" Type: ", 1)
        return clean(parts[0]), clean(parts[1])
    return clean(cell_text), ""


def row_from_tr(tr, list_url: str) -> Optional[CoinRecord]:
    """Parse a <tr> from the list table into a CoinRecord skeleton."""
    cells = tr.find_all("td")
    if len(cells) < 3:
        return None

    country_text = clean(cells[0].get_text())
    country, series_or_type = split_country_type(country_text)

    name_cell = cells[1]
    link = name_cell.find("a")
    if not link:
        return None
    coin_name = clean(link.get_text())
    href = link.get("href", "")
    detail_url = urljoin(BASE_URL, href) if href else ""

    year = clean(cells[2].get_text()) if len(cells) > 2 else ""

    rec = CoinRecord(
        country=country,
        series_or_type=series_or_type,
        coin_name=coin_name,
        year=year,
        detail_url=detail_url,
        source_list_url=list_url,
    )
    return rec


def find_list_table(soup: BeautifulSoup) -> Optional[object]:
    """Locate the coins table by id or class."""
    table = soup.find("table", id="table-coins")
    if not table:
        table = soup.find("table", class_="table-coins")
    if not table:
        # fallback: first sizeable table
        for t in soup.find_all("table"):
            if len(t.find_all("tr")) > 3:
                table = t
                break
    return table


def find_next_page_url(soup: BeautifulSoup, current_url: str) -> Optional[str]:
    """Return the URL of the next list page, or None if on the last page."""
    # Look for a pagination element
    pagination = soup.find(class_=re.compile(r"paginat|pager", re.I))
    if not pagination:
        pagination = soup  # fall back to full page

    # Try: <a> whose text is "Next", "»", or a right-arrow
    for a in pagination.find_all("a"):
        txt = clean(a.get_text())
        if txt.lower() in ("next", "»", ">", "›", "next page"):
            href = a.get("href", "")
            if href:
                return urljoin(BASE_URL, href)

    # Try: find the currently active page number and grab the next sibling
    active = pagination.find(class_=re.compile(r"active|current", re.I))
    if active:
        nxt = active.find_next_sibling("a")
        if nxt and nxt.get("href"):
            return urljoin(BASE_URL, nxt["href"])

    return None


# ---------------------------------------------------------------------------
# Detail-page enrichment
# ---------------------------------------------------------------------------

DETAIL_LABEL_MAP = {
    "currency": "currency",
    "material": "material",
    "weight": "weight",
    "diameter": "diameter",
    "edge": "edge",
    "mint": "mint",
    "mintage": "mintage_raw",
    "ruler": "ruler",
    "references": "references",
}


def _label_value_pairs(soup: BeautifulSoup):
    """
    Yield (label, value) pairs from the coin detail info block.
    Handles both <dt>/<dd> and <th>/<td> table layouts.
    """
    # --- definition list layout ---
    for dl in soup.find_all("dl"):
        dts = dl.find_all("dt")
        dds = dl.find_all("dd")
        for dt, dd in zip(dts, dds):
            yield clean(dt.get_text()).lower().rstrip(":"), clean(dd.get_text())

    # --- table row layout ---
    for table in soup.find_all("table"):
        for tr in table.find_all("tr"):
            cells = tr.find_all(["th", "td"])
            if len(cells) == 2:
                yield clean(cells[0].get_text()).lower().rstrip(":"), clean(cells[1].get_text())

    # --- label: value inline divs / spans ---
    for tag in soup.find_all(class_=re.compile(r"coin-info|detail|spec", re.I)):
        text = tag.get_text(" | ")
        for chunk in text.split("|"):
            if ":" in chunk:
                k, _, v = chunk.partition(":")
                yield k.strip().lower(), v.strip()


def enrich_from_detail(record: CoinRecord, soup: BeautifulSoup) -> None:
    """Fill in detail-page fields on record in-place."""
    for label, value in _label_value_pairs(soup):
        attr = DETAIL_LABEL_MAP.get(label)
        if attr and not getattr(record, attr):
            setattr(record, attr, value)

    # Derive numeric mintage
    if record.mintage_raw and not record.mintage_numeric:
        record.mintage_numeric = extract_numeric_mintage(record.mintage_raw)

    # Obverse / reverse descriptions (look for dedicated blocks)
    for tag in soup.find_all(class_=re.compile(r"obverse", re.I)):
        txt = clean(tag.get_text())
        if txt and not record.obverse_description:
            record.obverse_description = txt

    for tag in soup.find_all(class_=re.compile(r"reverse", re.I)):
        txt = clean(tag.get_text())
        if txt and not record.reverse_description:
            record.reverse_description = txt


def extract_image_urls(soup: BeautifulSoup, base_url: str):
    """Return (obverse_url, reverse_url) from a detail page soup."""
    obverse_url = ""
    reverse_url = ""

    # Strategy 1: dedicated obverse/reverse containers
    for cls in ("coin-obverse", "obverse"):
        tag = soup.find(class_=re.compile(cls, re.I))
        if tag:
            img = tag.find("img")
            if img and img.get("src"):
                obverse_url = urljoin(base_url, img["src"])
                break

    for cls in ("coin-reverse", "reverse"):
        tag = soup.find(class_=re.compile(cls, re.I))
        if tag:
            img = tag.find("img")
            if img and img.get("src"):
                reverse_url = urljoin(base_url, img["src"])
                break

    # Strategy 2: images tagged with class "coin-image"
    if not obverse_url or not reverse_url:
        imgs = soup.find_all("img", class_=re.compile(r"coin-image|coin_image", re.I))
        if imgs and not obverse_url:
            obverse_url = urljoin(base_url, imgs[0]["src"])
        if len(imgs) > 1 and not reverse_url:
            reverse_url = urljoin(base_url, imgs[1]["src"])

    # Strategy 3: data-* attributes (lazy-loaded images)
    if not obverse_url or not reverse_url:
        all_imgs = soup.find_all("img")
        candidates = []
        for img in all_imgs:
            src = img.get("data-src") or img.get("data-lazy") or img.get("src", "")
            if src and re.search(r"\.(jpg|jpeg|png|webp)", src, re.I):
                # exclude icons, logos, flags
                if not re.search(r"(logo|icon|flag|banner|thumb(?:nail)?s?/flag)",
                                  src, re.I):
                    candidates.append(urljoin(base_url, src))
        if candidates and not obverse_url:
            obverse_url = candidates[0]
        if len(candidates) > 1 and not reverse_url:
            reverse_url = candidates[1]

    return obverse_url, reverse_url


# ---------------------------------------------------------------------------
# Image downloading
# ---------------------------------------------------------------------------

def safe_image_dir(record: CoinRecord) -> Path:
    """Build collector-friendly image directory path."""
    country = slugify(record.country) or "unknown-country"
    series = slugify(record.series_or_type) or "general"
    year = slugify(record.year) or "undated"
    name = slugify(record.coin_name) or "unknown-coin"
    folder_name = f"{year}_{name}"
    return IMAGES_DIR / country / series / folder_name


def download_image(session: requests.Session, url: str, dest: Path,
                   logger: logging.Logger) -> bool:
    """Download an image to dest. Return True on success."""
    if not url:
        return False
    if dest.exists() and dest.stat().st_size > 0:
        logger.debug(f"  Image already exists: {dest}")
        return True

    dest.parent.mkdir(parents=True, exist_ok=True)
    resp = fetch(session, url, logger, stream=True, timeout=60)
    if resp is None:
        logger.warning(f"  Failed to download image: {url}")
        return False

    try:
        with open(dest, "wb") as fp:
            for chunk in resp.iter_content(chunk_size=65536):
                fp.write(chunk)
        if dest.stat().st_size == 0:
            dest.unlink()
            logger.warning(f"  Empty image file, removed: {dest}")
            return False
        logger.debug(f"  Saved image: {dest}")
        return True
    except OSError as exc:
        logger.warning(f"  Could not write {dest}: {exc}")
        return False


# ---------------------------------------------------------------------------
# State / CSV persistence
# ---------------------------------------------------------------------------

def load_state() -> dict:
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, encoding="utf-8") as fp:
                return json.load(fp)
        except (json.JSONDecodeError, OSError):
            pass
    return {"scraped_detail_urls": [], "list_pages_done": []}


def save_state(state: dict) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(STATE_FILE, "w", encoding="utf-8") as fp:
        json.dump(state, fp, indent=2)


def load_existing_csv() -> dict:
    """Return a dict keyed by detail_url for already-saved rows."""
    existing = {}
    if not CSV_FILE.exists():
        return existing
    with open(CSV_FILE, encoding="utf-8", newline="") as fp:
        reader = csv.DictReader(fp)
        for row in reader:
            if row.get("detail_url"):
                existing[row["detail_url"]] = row
    return existing


def append_csv(records: list[CoinRecord], write_header: bool) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    mode = "w" if write_header else "a"
    with open(CSV_FILE, mode, newline="", encoding="utf-8") as fp:
        writer = csv.DictWriter(fp, fieldnames=CSV_FIELDS, extrasaction="ignore")
        if write_header:
            writer.writeheader()
        for rec in records:
            writer.writerow(asdict(rec))


# ---------------------------------------------------------------------------
# Core scraping loop
# ---------------------------------------------------------------------------

def scrape(
    max_pages: int = 0,
    skip_images: bool = False,
    resume: bool = True,
    delay: float = REQUEST_DELAY,
    logger: Optional[logging.Logger] = None,
) -> None:
    if logger is None:
        logger = setup_logging()

    session = requests.Session()
    session.headers.update(HEADERS)

    # Load or initialise state
    state = load_state() if resume else {"scraped_detail_urls": [], "list_pages_done": []}
    scraped_urls: set = set(state.get("scraped_detail_urls", []))
    pages_done: set = set(state.get("list_pages_done", []))

    existing_csv = load_existing_csv() if resume else {}
    write_header = not CSV_FILE.exists() or not resume

    total_uploaded = 0
    total_skipped = 0
    total_failed = 0

    url = LIST_START
    page_num = 0

    logger.info(f"Starting crawl from {url}")
    logger.info(f"Resume={resume}, max_pages={max_pages or 'unlimited'}, "
                f"skip_images={skip_images}")

    while url:
        if max_pages and page_num >= max_pages:
            logger.info(f"Reached max_pages={max_pages}, stopping list crawl.")
            break

        page_num += 1
        logger.info(f"\n--- List page {page_num}: {url} ---")

        if url in pages_done:
            logger.info("  Already processed this list page URL, fetching for next-page link only.")

        soup = get_soup(session, url, logger)
        if soup is None:
            logger.error(f"  Could not fetch list page, aborting: {url}")
            break

        table = find_list_table(soup)
        if not table:
            logger.warning("  No coin table found on this page.")
        else:
            rows = table.find_all("tr")[1:]  # skip header row
            logger.info(f"  Found {len(rows)} coin rows")

            batch: list[CoinRecord] = []

            for tr in rows:
                record = row_from_tr(tr, url)
                if record is None:
                    continue

                if record.detail_url in scraped_urls:
                    total_skipped += 1
                    continue

                # ── Detail page ──────────────────────────────────────────
                if record.detail_url:
                    time.sleep(DETAIL_DELAY)
                    logger.debug(f"  Detail: {record.detail_url}")
                    detail_soup = get_soup(session, record.detail_url, logger)
                    if detail_soup:
                        enrich_from_detail(record, detail_soup)
                        obv_url, rev_url = extract_image_urls(
                            detail_soup, record.detail_url)
                        record.obverse_image_url = obv_url
                        record.reverse_image_url = rev_url
                    else:
                        logger.warning(f"  Could not fetch detail page: {record.detail_url}")
                        total_failed += 1

                # ── Images ───────────────────────────────────────────────
                if not skip_images:
                    img_dir = safe_image_dir(record)
                    if record.obverse_image_url:
                        ext = Path(urlparse(record.obverse_image_url).path).suffix or ".jpg"
                        obv_path = img_dir / f"obverse{ext}"
                        time.sleep(IMAGE_DELAY)
                        if download_image(session, record.obverse_image_url, obv_path, logger):
                            record.obverse_local_path = str(obv_path)
                    if record.reverse_image_url:
                        ext = Path(urlparse(record.reverse_image_url).path).suffix or ".jpg"
                        rev_path = img_dir / f"reverse{ext}"
                        time.sleep(IMAGE_DELAY)
                        if download_image(session, record.reverse_image_url, rev_path, logger):
                            record.reverse_local_path = str(rev_path)

                scraped_urls.add(record.detail_url)
                batch.append(record)
                total_uploaded += 1
                logger.info(
                    f"  [{total_uploaded}] {record.country} | "
                    f"{record.coin_name} ({record.year})"
                )

            if batch:
                append_csv(batch, write_header=write_header)
                write_header = False
                logger.info(f"  Wrote {len(batch)} records to CSV")

        pages_done.add(url)
        state["scraped_detail_urls"] = list(scraped_urls)
        state["list_pages_done"] = list(pages_done)
        save_state(state)

        next_url = find_next_page_url(soup, url)
        if next_url == url:
            logger.warning("  Next-page URL equals current URL — stopping.")
            break
        url = next_url
        if url:
            logger.debug(f"  Next list page: {url}")
            time.sleep(delay)

    logger.info(f"\n{'='*60}")
    logger.info(f"Crawl complete.")
    logger.info(f"  Processed : {total_uploaded}")
    logger.info(f"  Skipped   : {total_skipped}")
    logger.info(f"  Failed    : {total_failed}")
    logger.info(f"  CSV       : {CSV_FILE}")
    logger.info(f"  State     : {STATE_FILE}")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Production scraper for onlinecoin.club"
    )
    parser.add_argument(
        "--max-pages", type=int, default=0,
        help="Stop after N list pages (0 = unlimited)",
    )
    parser.add_argument(
        "--skip-images", action="store_true",
        help="Do not download coin images",
    )
    parser.add_argument(
        "--no-resume", action="store_true",
        help="Ignore existing state, start from scratch",
    )
    parser.add_argument(
        "--delay", type=float, default=REQUEST_DELAY,
        help=f"Seconds between list-page requests (default {REQUEST_DELAY})",
    )
    args = parser.parse_args()

    logger = setup_logging()
    scrape(
        max_pages=args.max_pages,
        skip_images=args.skip_images,
        resume=not args.no_resume,
        delay=args.delay,
        logger=logger,
    )


if __name__ == "__main__":
    main()
