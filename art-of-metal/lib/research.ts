import auctionPricesRaw from "@/data/pcgs_auction_prices.json";
import populationIndexRaw from "@/data/pcgs_population_index.json";
import coinFactsRaw from "@/data/pcgs_coinfacts.json";
import quarterEaglesRaw from "@/data/quarter_eagles.json";

export interface AuctionRecord {
  series: string;
  coin_title: string;
  lots: number;
  record_price: string;
  record_price_num: number;
  source_date: string;
}
export const AUCTION_PRICES = auctionPricesRaw as AuctionRecord[];

export interface PopIndexRow {
  source_file: string;
  series: string;
  report_type: string;
  source_date: string;
  page_count: number;
  coin_rows_extracted: number;
}
export const POPULATION_INDEX = populationIndexRaw as PopIndexRow[];

export interface CoinFactsRow {
  series: string;
  page: number;
  raw_text: string;
}
export const COINFACTS = coinFactsRaw as CoinFactsRow[];

export interface QuarterEagleRow {
  coin_id: string;
  coin_name: string;
  year: string;
  mint: string;
  mintage: string;
  estimated_survivors_all: string;
  estimated_survivors_ms60: string;
  estimated_survivors_ms65: string;
  auction_record_price: string;
  auction_record_grade: string;
  auction_record_date: string;
  auction_record_company: string;
  numismatic_rarity_all: string;
  composition: string;
  weight_grams: string;
  diameter_mm: string;
  edge: string;
  designer: string;
  pcgs_number: string;
  source_url: string;
}
export const QUARTER_EAGLES = quarterEaglesRaw as QuarterEagleRow[];

export function topAuctionRecords(series?: string, limit = 10): AuctionRecord[] {
  const list = series ? AUCTION_PRICES.filter((a) => a.series === series) : AUCTION_PRICES;
  return [...list].sort((a, b) => (b.record_price_num || 0) - (a.record_price_num || 0)).slice(0, limit);
}

export function seriesNames(): string[] {
  return Array.from(new Set(AUCTION_PRICES.map((a) => a.series)));
}

export function coinFactsFor(series: string): string {
  return COINFACTS.filter((c) => c.series === series).map((c) => c.raw_text).join(" ");
}

// The rarest-mintage Quarter Eagle, used as the Survival Funnel case study.
export function rarestQuarterEagle(): QuarterEagleRow {
  return [...QUARTER_EAGLES].sort(
    (a, b) => parseInt(a.estimated_survivors_all || "0") - parseInt(b.estimated_survivors_all || "0")
  )[0];
}
