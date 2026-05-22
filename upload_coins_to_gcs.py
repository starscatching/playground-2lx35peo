#!/usr/bin/env python3
"""
Upload coin images from Google Drive → Google Cloud Storage.

Drive folder : 1GQt7NoAGdn9dBYMvVHsto0fPymvNqEcw
GCS bucket   : art-of-metal-coins
GCS prefix   : coins/ans/
Public URL   : https://storage.googleapis.com/art-of-metal-coins/coins/ans/<filename>

Prerequisites
-------------
  pip install google-cloud-storage google-api-python-client google-auth google-auth-httplib2

Authentication
--------------
  Run once to create Application Default Credentials:
    gcloud auth application-default login
  Then run this script normally — it will pick up those credentials automatically.

Usage
-----
  python upload_coins_to_gcs.py                  # full run
  python upload_coins_to_gcs.py --dry-run        # list files only, no upload
  python upload_coins_to_gcs.py --skip-existing  # skip objects already in GCS (default)
"""

import argparse
import csv
import io
import os
import sys
import time
from pathlib import Path

import google.auth
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload
from google.cloud import storage as gcs

DRIVE_FOLDER_ID = "1GQt7NoAGdn9dBYMvVHsto0fPymvNqEcw"
GCS_BUCKET = "art-of-metal-coins"
GCS_PREFIX = "coins/ans/"
SCOPES = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/devstorage.full_control",
]
DESKTOP = Path.home() / "Desktop"
CSV_PATH = DESKTOP / "coin_image_gcs_map.csv"


def get_credentials():
    creds, project = google.auth.default(scopes=SCOPES)
    return creds


def list_drive_jpegs(drive_service, folder_id):
    """Return list of {id, title} for every JPEG in the folder (all pages)."""
    files = []
    page_token = None
    query = f"parentId = '{folder_id}' and mimeType = 'image/jpeg'"
    while True:
        kwargs = dict(
            q=query,
            fields="nextPageToken, items(id, title)",
            maxResults=1000,
        )
        if page_token:
            kwargs["pageToken"] = page_token
        resp = drive_service.files().list(**kwargs).execute()
        files.extend(resp.get("items", []))
        page_token = resp.get("nextPageToken")
        print(f"  Enumerated {len(files)} files so far...", end="\r", flush=True)
        if not page_token:
            break
    print()
    return files


def already_exists(bucket, blob_name):
    return bucket.blob(blob_name).exists()


def download_from_drive(drive_service, file_id):
    req = drive_service.files().get_media(fileId=file_id)
    buf = io.BytesIO()
    downloader = MediaIoBaseDownload(buf, req, chunksize=4 * 1024 * 1024)
    done = False
    while not done:
        _, done = downloader.next_chunk()
    buf.seek(0)
    return buf


def upload_to_gcs(bucket, blob_name, data_buf, content_type="image/jpeg"):
    blob = bucket.blob(blob_name)
    blob.upload_from_file(data_buf, content_type=content_type, rewind=True)
    blob.make_public()
    return blob.public_url


def main():
    parser = argparse.ArgumentParser(description="Upload Drive coin images to GCS")
    parser.add_argument("--dry-run", action="store_true", help="List files only")
    parser.add_argument(
        "--no-skip-existing",
        action="store_true",
        help="Re-upload even if object already exists in GCS",
    )
    args = parser.parse_args()
    skip_existing = not args.no_skip_existing

    print("Authenticating with Google (Application Default Credentials)...")
    creds = get_credentials()

    drive_service = build("drive", "v2", credentials=creds, cache_discovery=False)
    gcs_client = gcs.Client(credentials=creds)
    bucket = gcs_client.bucket(GCS_BUCKET)

    print(f"\nListing JPEGs in Drive folder {DRIVE_FOLDER_ID}...")
    files = list_drive_jpegs(drive_service, DRIVE_FOLDER_ID)
    print(f"Found {len(files)} JPEG files.\n")

    if args.dry_run:
        for f in files[:20]:
            print(f"  {f['title']}  (id={f['id']})")
        if len(files) > 20:
            print(f"  ... and {len(files) - 20} more")
        return

    results = []
    uploaded = skipped = failed = 0

    for i, f in enumerate(files, 1):
        filename = f["title"]
        file_id = f["id"]
        blob_name = GCS_PREFIX + filename
        gcs_url = f"https://storage.googleapis.com/{GCS_BUCKET}/{blob_name}"

        print(f"[{i}/{len(files)}] {filename[:70]}", end=" ")

        if skip_existing and already_exists(bucket, blob_name):
            print("→ already exists, skipped")
            skipped += 1
            results.append({"filename": filename, "gcs_url": gcs_url, "status": "skipped"})
            continue

        for attempt in range(3):
            try:
                data = download_from_drive(drive_service, file_id)
                public_url = upload_to_gcs(bucket, blob_name, data)
                print(f"→ uploaded ✓")
                uploaded += 1
                results.append({"filename": filename, "gcs_url": public_url, "status": "uploaded"})
                break
            except HttpError as e:
                if attempt < 2:
                    wait = 2 ** (attempt + 1)
                    print(f"→ HTTP {e.resp.status}, retry in {wait}s...", end=" ")
                    time.sleep(wait)
                else:
                    print(f"→ FAILED ({e})")
                    failed += 1
                    results.append({"filename": filename, "gcs_url": gcs_url, "status": f"failed: {e}"})
            except Exception as e:
                print(f"→ FAILED ({e})")
                failed += 1
                results.append({"filename": filename, "gcs_url": gcs_url, "status": f"failed: {e}"})
                break

    # Write CSV
    DESKTOP.mkdir(parents=True, exist_ok=True)
    with open(CSV_PATH, "w", newline="", encoding="utf-8") as fp:
        writer = csv.DictWriter(fp, fieldnames=["filename", "gcs_url", "status"])
        writer.writeheader()
        writer.writerows(results)

    print(f"\n{'='*60}")
    print(f"Done.  Uploaded: {uploaded}  Skipped: {skipped}  Failed: {failed}")
    print(f"CSV saved to: {CSV_PATH}")


if __name__ == "__main__":
    main()
