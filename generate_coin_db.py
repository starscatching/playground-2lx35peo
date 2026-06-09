#!/usr/bin/env python3
"""
Generate coinDatabase.ts from the two CSV files.
"""

import csv
import re
import os
from collections import defaultdict

COINS_CSV = "/root/.claude/uploads/053e24e4-325f-5287-8a84-2c1a42a10d59/ddc626fc-art_of_metal_offline_master_coins.csv"
IMAGES_CSV = "/root/.claude/uploads/053e24e4-325f-5287-8a84-2c1a42a10d59/d1f6a5e0-art_of_metal_image_master_rows.csv"
OUTPUT_TS  = "/home/user/playground-2lx35peo/art-of-metal/lib/coinDatabase.ts"

# ── denomination normalisation ─────────────────────────────────────────────
DENOM_RE = [
    (r'\b2_1_2\b', '2 1/2'),
    (r'\b1_4\b',   '1/4'),
    (r'\b1_2\b',   '1/2'),
    (r'\b3_4\b',   '3/4'),
]

def normalize_denom(raw: str) -> str:
    s = raw
    for pattern, replacement in DENOM_RE:
        s = re.sub(pattern, replacement, s)
    return s

# ── string escaping for TS double-quoted string ────────────────────────────
def ts_escape(s: str) -> str:
    s = s.replace('\\', '\\\\')   # backslash first
    s = s.replace('"', '\\"')     # double-quote
    s = s.replace('`', '\\`')     # backtick
    s = s.replace('\n', '\\n')
    s = s.replace('\r', '')
    return s

# ── year parsing ───────────────────────────────────────────────────────────
def parse_year(raw: str) -> int:
    try:
        v = int(raw.strip())
        return 0 if v == 0 else v
    except (ValueError, AttributeError):
        return 0

# ─────────────────────────────────────────────────────────────────────────
# 1.  Read image rows and build lookup: coin_group_key → (drive_id, side)
#     For each group key, prefer the FIRST obverse; fall back to reverse.
# ─────────────────────────────────────────────────────────────────────────
print("Reading image CSV …")
# We store best candidate per group key
# Structure: { group_key: { 'obverse': (drive_id, side), 'reverse': (drive_id, side) } }
image_lookup: dict[str, dict] = {}

with open(IMAGES_CSV, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        gk = row['coin_group_key'].strip()
        side = row['image_side'].strip().lower()
        drive_id = row['drive_id'].strip()
        if not drive_id:
            continue
        if gk not in image_lookup:
            image_lookup[gk] = {}
        # Keep only the FIRST match per side per group key
        if side not in image_lookup[gk]:
            image_lookup[gk][side] = (drive_id, side)

print(f"  Loaded image data for {len(image_lookup)} unique group keys")

# ─────────────────────────────────────────────────────────────────────────
# 2.  Read coins CSV and build records
# ─────────────────────────────────────────────────────────────────────────
print("Reading coins CSV …")
records = []
errors = []
metal_counts: dict[str, int] = defaultdict(int)
no_image_count = 0

with open(COINS_CSV, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for i, row in enumerate(reader, start=1):
        uid      = row['coin_uid'].strip()
        gk       = row['coin_group_key'].strip()
        title    = row['title_clean'].strip()
        year_raw = row['year'].strip()
        metal    = row['metal'].strip()
        denom    = normalize_denom(row['denomination'].strip())

        year = parse_year(year_raw)

        # Resolve drive_id
        candidates = image_lookup.get(gk, {})
        if 'obverse' in candidates:
            drive_id, image_side = candidates['obverse']
        elif 'reverse' in candidates:
            drive_id, image_side = candidates['reverse']
        else:
            # No image found — record with empty string, note the error
            drive_id = ""
            image_side = ""
            no_image_count += 1
            errors.append(f"  No image for uid={uid} gk={gk!r}")

        metal_counts[metal or "(unknown)"] += 1

        records.append({
            'uid':        uid,
            'groupKey':   gk,
            'title':      title,
            'year':       year,
            'metal':      metal,
            'denomination': denom,
            'driveId':    drive_id,
            'imageSide':  image_side,
        })

total = len(records)
print(f"  Read {total} coin records")
if errors:
    print(f"  WARNING: {no_image_count} coins have no matching image row")

# ─────────────────────────────────────────────────────────────────────────
# 3.  Render TypeScript
# ─────────────────────────────────────────────────────────────────────────
print(f"Writing {OUTPUT_TS} …")

lines = []
lines.append('export interface CoinRecord {')
lines.append('  uid: string;           // e.g. "AOM-COIN-000001"')
lines.append('  groupKey: string;      // coin_group_key')
lines.append('  title: string;         // title_clean')
lines.append('  year: number;          // parsed as int, 0 if unknown')
lines.append('  metal: string;         // e.g. "Gold", "Silver", "Cupronickel"')
lines.append('  denomination: string;  // e.g. "20 Dollar", "5 cent"')
lines.append('  driveId: string;       // Drive file ID for the image')
lines.append('  imageSide: string;     // "obverse" or "reverse"')
lines.append('}')
lines.append('')
lines.append('export const coinDatabase: CoinRecord[] = [')

for idx, r in enumerate(records):
    is_last = (idx == total - 1)
    comma = '' if is_last else ','

    uid_e   = ts_escape(r['uid'])
    gk_e    = ts_escape(r['groupKey'])
    title_e = ts_escape(r['title'])
    metal_e = ts_escape(r['metal'])
    denom_e = ts_escape(r['denomination'])
    drive_e = ts_escape(r['driveId'])
    side_e  = ts_escape(r['imageSide'])

    line = (
        f'  {{ uid: "{uid_e}", groupKey: "{gk_e}", title: "{title_e}", '
        f'year: {r["year"]}, metal: "{metal_e}", denomination: "{denom_e}", '
        f'driveId: "{drive_e}", imageSide: "{side_e}" }}{comma}'
    )
    lines.append(line)

lines.append('];')
lines.append('')
lines.append(f'export const totalCoins = {total};')
lines.append('')
lines.append('// Lookup by uid')
lines.append('export function getCoinByUid(uid: string): CoinRecord | undefined {')
lines.append('  return coinDatabase.find(c => c.uid === uid);')
lines.append('}')
lines.append('')
lines.append('// Filter helpers')
lines.append('export function getCoinsByMetal(metal: string): CoinRecord[] {')
lines.append('  return coinDatabase.filter(c => c.metal.toLowerCase().includes(metal.toLowerCase()));')
lines.append('}')
lines.append('')
lines.append('export function getCoinsByYear(year: number): CoinRecord[] {')
lines.append('  return coinDatabase.filter(c => c.year === year);')
lines.append('}')
lines.append('')

output = '\n'.join(lines)

os.makedirs(os.path.dirname(OUTPUT_TS), exist_ok=True)
with open(OUTPUT_TS, 'w', encoding='utf-8') as f:
    f.write(output)

print(f"\nDone. {total} coins written to {OUTPUT_TS}")
print(f"\nMetal breakdown:")
for metal, count in sorted(metal_counts.items(), key=lambda x: -x[1]):
    print(f"  {metal:30s}: {count}")

if errors:
    print(f"\nErrors / warnings ({len(errors)}):")
    for e in errors[:20]:
        print(e)
    if len(errors) > 20:
        print(f"  … and {len(errors)-20} more")
