import { BULLION_TOP_100 } from "@/lib/market";

export function parseWeightOz(weight: string): number {
  const w = weight.toLowerCase().replace(/,/g, "").trim();
  const fracMatch = w.match(/(\d+)\s*\/\s*(\d+)\s*oz/);
  if (fracMatch) return parseInt(fracMatch[1]) / parseInt(fracMatch[2]);
  const ozMatch = w.match(/([\d.]+)\s*oz/);
  if (ozMatch) return parseFloat(ozMatch[1]);
  const gramMatch = w.match(/([\d.]+)\s*g\b/);
  if (gramMatch) return parseFloat(gramMatch[1]) / 31.1035;
  return 1;
}

export function parsePurity(purity: string): number {
  const p = purity.toLowerCase();
  const decMatch = p.match(/\.(\d{3,4})/);
  if (decMatch) return parseFloat(`0.${decMatch[1]}`);
  const karatMatch = p.match(/(\d{1,2})\s*k/);
  if (karatMatch) return parseInt(karatMatch[1]) / 24;
  const pctMatch = p.match(/(\d{1,3})\s*%/);
  if (pctMatch) return parseInt(pctMatch[1]) / 100;
  return 1;
}

export const MELT_PRODUCTS = BULLION_TOP_100.map((p) => ({
  name: p.bullion_product,
  metal: p.metal,
  weightOz: parseWeightOz(p.common_weight),
  purity: parsePurity(p.purity),
  purityLabel: p.purity,
  weightLabel: p.common_weight,
})).filter((p) => p.weightOz > 0);
