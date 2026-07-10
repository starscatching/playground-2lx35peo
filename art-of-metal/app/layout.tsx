import type { Metadata } from "next";
import { Inter, Cinzel, Cormorant_Garamond, JetBrains_Mono, Playfair_Display, EB_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700", "900"], variable: "--font-cinzel" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["normal", "italic"], variable: "--font-cormorant" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jetbrains" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-playfair" });
const ebGaramond = EB_Garamond({ subsets: ["latin"], variable: "--font-ebgaramond" });

export const metadata: Metadata = {
  title: "Art of Metal — Honoring Craft. Preserving History.",
  description: "The ultimate platform for serious coin and precious metal collectors. Research, vault, portfolio, and live market data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} ${cormorant.variable} ${jetbrains.variable} ${playfair.variable} ${ebGaramond.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
