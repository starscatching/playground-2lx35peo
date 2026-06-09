/**
 * Premium Coin Data with Complete Information
 * Includes human-readable titles, complete specifications, and beautiful AI-generated images
 */

export interface PremiumCoin {
  id: string;
  title: string; // Human-readable title (e.g., "1924 Peace Silver Dollar")
  year: number;
  denomination: string;
  metal: string;
  mintage: string; // e.g., "1,120,000"
  rarity: "common" | "uncommon" | "scarce" | "rare" | "very rare" | "ultra rare";
  grade: string; // Layman's terms (e.g., "Mint State", "About Uncirculated", "Circulated")
  description: string;
  historicalNote: string;
  imageUrl: string;
  imageAlt: string;
  specifications: {
    diameter: string;
    weight: string;
    composition: string;
    obverse: string;
    reverse: string;
  };
}

export const premiumCoins: PremiumCoin[] = [
  {
    id: "1924-peace-dollar",
    title: "1924 Peace Silver Dollar",
    year: 1924,
    denomination: "One Dollar",
    metal: "Silver (90%)",
    mintage: "1,120,000",
    rarity: "uncommon",
    grade: "Mint State (Uncirculated)",
    description:
      "A stunning example of the Peace Dollar series, celebrating the end of World War I. This coin features Lady Liberty on the obverse and an eagle at rest on the reverse, symbolizing peace and strength.",
    historicalNote:
      "The Peace Dollar was minted from 1921-1925 and again from 1928-1935. The 1924 issue represents a moderate mintage year, making it a desirable addition to any collection.",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663538689194/Ux8GgEsKb8VErWjqob62xF/1924-peace-dollar-WjTaE8rwPXaQrZsTcAphUD.webp",
    imageAlt: "1924 Peace Silver Dollar with Liberty profile and golden highlights",
    specifications: {
      diameter: "38.1 mm",
      weight: "26.73 grams",
      composition: "90% Silver, 10% Copper",
      obverse: "Lady Liberty with flowing hair",
      reverse: "American Eagle at rest",
    },
  },
  {
    id: "1921-morgan-dollar",
    title: "1921 Morgan Silver Dollar",
    year: 1921,
    denomination: "One Dollar",
    metal: "Silver (90%)",
    mintage: "24,093,000",
    rarity: "common",
    grade: "About Uncirculated",
    description:
      "The iconic Morgan Dollar, named after designer George T. Morgan. This 1921 issue is notable as it marks the final year of the original Morgan Dollar series before production ceased until 1921.",
    historicalNote:
      "The Morgan Dollar was one of the most widely circulated coins of its era. The 1921 issue is particularly significant as it represents the tail end of this beloved series, making it a cornerstone coin for collectors.",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663538689194/Ux8GgEsKb8VErWjqob62xF/1921-morgan-dollar-J98R2A2nE9FtkXwy67TNyK.webp",
    imageAlt: "1921 Morgan Silver Dollar with Lady Liberty and water splash effects",
    specifications: {
      diameter: "38.1 mm",
      weight: "26.73 grams",
      composition: "90% Silver, 10% Copper",
      obverse: "Lady Liberty with coronet",
      reverse: "American Eagle with shield",
    },
  },
  {
    id: "1880-cc-morgan-dollar",
    title: "1880-CC Morgan Silver Dollar (Carson City)",
    year: 1880,
    denomination: "One Dollar",
    metal: "Silver (90%)",
    mintage: "591,000",
    rarity: "scarce",
    grade: "Mint State (Uncirculated)",
    description:
      "A rare Carson City mint Morgan Dollar from 1880. The 'CC' mint mark indicates production at the Carson City Mint in Nevada, making this coin historically significant and highly sought after by collectors.",
    historicalNote:
      "The Carson City Mint operated from 1870-1893 and produced some of the most desirable Morgan Dollars. The 1880-CC is particularly scarce, with only 591,000 coins minted. These coins are prized for their historical significance and relative rarity.",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663538689194/Ux8GgEsKb8VErWjqob62xF/1880-cc-morgan-dollar-nzzmwLtv7hozrDpbphqoh9.webp",
    imageAlt: "1880-CC Morgan Silver Dollar with dramatic water splash effects",
    specifications: {
      diameter: "38.1 mm",
      weight: "26.73 grams",
      composition: "90% Silver, 10% Copper",
      obverse: "Lady Liberty with coronet",
      reverse: "American Eagle with CC mint mark",
    },
  },
  {
    id: "1793-flowing-hair-cent",
    title: "1793 Flowing Hair Cent",
    year: 1793,
    denomination: "One Cent",
    metal: "Copper (100%)",
    mintage: "36,103",
    rarity: "very rare",
    grade: "Circulated",
    description:
      "One of the earliest U.S. cents, featuring Lady Liberty with flowing hair. This coin is a cornerstone piece for early American numismatics and represents the beginning of U.S. coinage.",
    historicalNote:
      "The 1793 Flowing Hair Cent was the first cent issued by the United States Mint. With only 36,103 coins minted, it is extremely scarce. This coin is a must-have for serious collectors of early American coins.",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663538689194/Ux8GgEsKb8VErWjqob62xF/1793-flowing-hair-cent-JeCntgpcaUCKb3Y8i98gff.webp",
    imageAlt: "1793 Flowing Hair Cent with Liberty profile and golden highlights",
    specifications: {
      diameter: "26-27 mm",
      weight: "13.48 grams",
      composition: "100% Copper",
      obverse: "Lady Liberty with flowing hair",
      reverse: "Wreath design",
    },
  },
  {
    id: "1796-draped-bust-quarter",
    title: "1796 Draped Bust Quarter Dollar",
    year: 1796,
    denomination: "Quarter Dollar",
    metal: "Silver (89.24%)",
    mintage: "6,146",
    rarity: "ultra rare",
    grade: "Circulated",
    description:
      "An exceptionally rare early American quarter featuring Lady Liberty in draped bust style. With only 6,146 coins minted, this is one of the scarcest quarters in existence.",
    historicalNote:
      "The 1796 Draped Bust Quarter is one of the most sought-after coins in American numismatics. It represents the early years of U.S. coinage and is a cornerstone piece for any serious collector. The extremely limited mintage makes this coin highly valuable.",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663538689194/Ux8GgEsKb8VErWjqob62xF/1796-draped-bust-quarter-3tmxPy89crYei7Uht5Hked.webp",
    imageAlt: "1796 Draped Bust Quarter with Liberty and water splash effects",
    specifications: {
      diameter: "27.5 mm",
      weight: "6.74 grams",
      composition: "89.24% Silver, 10.76% Copper",
      obverse: "Lady Liberty in draped bust style",
      reverse: "American Eagle with shield",
    },
  },
];

/**
 * Featured Collections - Groupings by type
 */
export interface CoinCollection {
  id: string;
  name: string;
  description: string;
  coinCount: number;
  icon: string;
  featured: boolean;
}

export const coinCollections: CoinCollection[] = [
  {
    id: "peace-dollars",
    name: "Peace Dollars",
    description: "Celebrating the end of World War I with iconic Liberty designs",
    coinCount: 2,
    icon: "🕊️",
    featured: true,
  },
  {
    id: "morgan-dollars",
    name: "Morgan Dollars",
    description: "The legendary silver dollars of the American West",
    coinCount: 2,
    icon: "🦅",
    featured: true,
  },
  {
    id: "early-cents",
    name: "Early American Cents",
    description: "Rare coins from the beginning of U.S. coinage",
    coinCount: 1,
    icon: "🪙",
    featured: true,
  },
  {
    id: "draped-bust",
    name: "Draped Bust Coins",
    description: "Ultra-rare coins from the early U.S. Mint",
    coinCount: 1,
    icon: "👑",
    featured: true,
  },
  {
    id: "silver-bullion",
    name: "Silver Bullion",
    description: "Modern investment-grade silver coins",
    coinCount: 0,
    icon: "🏆",
    featured: false,
  },
  {
    id: "gold-coins",
    name: "Gold Coins",
    description: "Precious gold coins for collectors and investors",
    coinCount: 0,
    icon: "✨",
    featured: false,
  },
];
