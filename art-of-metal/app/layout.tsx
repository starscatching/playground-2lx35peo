import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Art of Metal — Precious History. Real Value.",
  description: "The ultimate platform for serious coin collectors. Research, vault, portfolio, and live market data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ background: "#080808", color: "#F0EDE8", fontFamily: "'Cormorant Garamond', serif", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
