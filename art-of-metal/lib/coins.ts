import rawCoins from "@/data/coins.json";

export interface Coin {
  id: string;
  name: string;
  year: string | number | null;
  denom: string | null;
  material: string | null;
  mint: string | null;
  designer: string | null;
  obverseImg: string | null;
  reverseImg: string | null;
}

export const ALL_COINS = rawCoins as Coin[];

export const DENOM_GROUPS: { code: string; label: string; keys: string[] }[] = [
  { code: "1C", label: "Cents", keys: ["cent", "1 cent", "1/2 cent"] },
  { code: "2C", label: "Two Cents", keys: ["2 cent"] },
  { code: "3C", label: "Three Cents", keys: ["3 cent"] },
  { code: "5C", label: "Nickels & Half Dimes", keys: ["5 cent", "1/2 dime"] },
  { code: "10C", label: "Dimes", keys: ["dime", "10 cent"] },
  { code: "20C", label: "Twenty Cents", keys: ["20 cent"] },
  { code: "25C", label: "Quarters", keys: ["1/4 dollar", "25 cent"] },
  { code: "50C", label: "Half Dollars", keys: ["1/2 dollar", "50 cent"] },
  { code: "$1", label: "Dollars", keys: ["dollar"] },
  { code: "$2.50", label: "Quarter Eagles", keys: ["2 1/2 dollar", "2.5 dollar"] },
  { code: "$3", label: "Three Dollars", keys: ["3 dollar"] },
  { code: "$5", label: "Half Eagles", keys: ["5 dollar"] },
  { code: "$10", label: "Eagles", keys: ["10 dollar"] },
  { code: "$20", label: "Double Eagles", keys: ["20 dollar"] },
  { code: "$50", label: "Fifty Dollars", keys: ["50 dollar"] },
];

export function denomKeyOf(denom: string | null): string {
  const d = (denom || "").trim().toLowerCase();
  const group = DENOM_GROUPS.find((g) => g.keys.includes(d));
  return group ? group.code : "OTHER";
}

export function denomLabelOf(code: string): string {
  return DENOM_GROUPS.find((g) => g.code === code)?.label ?? "Other";
}

// Derives a rough "series" name from a coin's full name, e.g.
// "Liberty Head Half Eagle ($5), 1857-C" -> "Liberty Head Half Eagle ($5)"
export function seriesNameOf(coin: Coin): string {
  const name = coin.name || "Unclassified";
  const commaIdx = name.indexOf(",");
  if (commaIdx > 0) return name.slice(0, commaIdx).trim();
  return name.replace(/\b(1[6-9]\d{2}|20\d{2})\b.*/, "").trim() || name;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface SeriesGroup {
  slug: string;
  name: string;
  denomCode: string;
  count: number;
  sampleImg: string | null;
  coins: Coin[];
}

export function getSeriesGroups(): SeriesGroup[] {
  const map = new Map<string, SeriesGroup>();
  for (const coin of ALL_COINS) {
    const denomCode = denomKeyOf(coin.denom);
    const series = seriesNameOf(coin);
    const slug = `${denomCode.replace(/[^a-z0-9]/gi, "")}-${slugify(series)}`.toLowerCase();
    let g = map.get(slug);
    if (!g) {
      g = { slug, name: series, denomCode, count: 0, sampleImg: null, coins: [] };
      map.set(slug, g);
    }
    g.count++;
    g.coins.push(coin);
    if (!g.sampleImg && coin.obverseImg) g.sampleImg = coin.obverseImg;
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getSeriesBySlug(slug: string): SeriesGroup | undefined {
  return getSeriesGroups().find((g) => g.slug === slug);
}

export function getDenomOrder(): string[] {
  return DENOM_GROUPS.map((g) => g.code).concat(["OTHER"]);
}

export function getCoinById(id: string): Coin | undefined {
  return ALL_COINS.find((c) => c.id === id);
}
