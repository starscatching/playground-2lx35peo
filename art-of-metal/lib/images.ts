// Maps Drive filenames to local public/coins/ paths
export const COIN_IMGS: Record<string, string> = {
  // coin1-8: original set
  "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg":  "/coins/coin1.jpg",
  "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg": "/coins/coin2.jpg",
  "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg":  "/coins/coin3.jpg",
  "1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg": "/coins/coin4.jpg",
  "1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg": "/coins/coin5.jpg",
  "1932_51_29_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg": "/coins/coin6.jpg",
  "1932_51_25_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg": "/coins/coin7.jpg",
  "1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg": "/coins/coin8.jpg",
  // coin9-18: diverse set added for homepage
  "1913_61_4_Gold_20_Dollar,_United_States,_1913._1913.61.4_obv.jpg":    "/coins/coin9.jpg",
  "1914_80_2_Gold_10_dollar,_United_States,_1906._1914.80.2_obv.jpg":    "/coins/coin10.jpg",
  "1915_13_3_Gold_5_dollar,_United_States,_1911._1915.13.3_obv.jpg":     "/coins/coin11.jpg",
  "1913_62_1_Silver_1_2_dollar,_United_States,_1913._1913.62.1_obv.jpg": "/coins/coin12.jpg",
  "1913_143_9_Silver_1_4_Dollar,_United_States,_1911._1913.143.9_rev.jpg": "/coins/coin13.jpg",
  "1913_152_1_Silver_Dime_of_The_United_States,_United_States,_1_obv.jpg": "/coins/coin14.jpg",
  "1913_999_11_Silver_1_2_dollar,_United_States,_1913._1913.999.1_obv.jpg": "/coins/coin15.jpg",
  "1914_80_3_Gold_20_Dollar,_United_States,_1906._1914.80.3_obv.jpg":    "/coins/coin16.jpg",
  "1915_226_3_Gold_10_dollar,_United_States,_1915._1915.226.3_rev.jpg":  "/coins/coin17.jpg",
  "1915_16_1_Gold_2_1_2_Dollar,_United_States,_1912._1915.16.1_rev.jpg": "/coins/coin18.jpg",
};

// When GCS is live, swap this to:
// export const GCS = "https://storage.googleapis.com/art-of-metal-coins/coins/ans/";
// export function coinImg(file: string) { return GCS + encodeURIComponent(file); }
export function coinImg(file: string): string {
  return COIN_IMGS[file] ?? "/coins/coin1.jpg";
}
