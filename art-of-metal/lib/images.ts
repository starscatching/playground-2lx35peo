// Maps Drive filenames to local public/coins/ paths
// These are the 8 images downloaded directly from Google Drive
export const COIN_IMGS: Record<string, string> = {
  "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg":  "/coins/coin1.jpg",
  "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg": "/coins/coin2.jpg",
  "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg":  "/coins/coin3.jpg",
  "1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg": "/coins/coin4.jpg",
  "1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg": "/coins/coin5.jpg",
  "1932_51_29_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg": "/coins/coin6.jpg",
  "1932_51_25_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg": "/coins/coin7.jpg",
  "1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg": "/coins/coin8.jpg",
};

// Coins from the master database already carry full GCS URLs; the 8 legacy
// sample filenames map to local /public/coins copies for offline preview.
export function coinImg(file: string): string {
  if (COIN_IMGS[file]) return COIN_IMGS[file];
  if (/^https?:\/\//.test(file)) return file;
  return "/coins/coin1.jpg";
}
