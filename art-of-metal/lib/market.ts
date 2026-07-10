import bullionTop100Raw from "@/data/bullion_top100.json";

export interface BullionProduct {
  rank: string;
  bullion_product: string;
  category: string;
  metal: string;
  common_weight: string;
  purity: string;
  mint_refiner: string;
  country: string;
  face_value: string;
  year_started: string;
  common_forms: string;
  liquidity_tier: string;
  premium_profile: string;
  ira_common: string;
  notes: string;
  primary_source_url: string;
}

export const BULLION_TOP_100 = bullionTop100Raw as BullionProduct[];

export const SPOT_PRICES = [
  { metal: "Gold", symbol: "XAU", price: 2377.4, change: 1.28, unit: "oz" },
  { metal: "Silver", symbol: "XAG", price: 28.96, change: 0.85, unit: "oz" },
  { metal: "Platinum", symbol: "XPT", price: 983.5, change: -0.35, unit: "oz" },
  { metal: "Palladium", symbol: "XPD", price: 1032.9, change: 0.12, unit: "oz" },
];
