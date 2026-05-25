import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Art of Metal — Precious History. Real Value.",
  description: "The ultimate platform for serious coin collectors. Research, vault, portfolio, and live market data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ background: "#080808", color: "#F5F5F5", display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: 160, minHeight: "100vh", overflowX: "hidden" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
