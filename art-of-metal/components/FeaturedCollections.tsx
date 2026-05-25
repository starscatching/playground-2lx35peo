"use client";
import { coinImg } from "@/lib/images";
import Link from "next/link";


const collections = [
  {
    label: "U.S. GOLD COINS",
    count: "613 Items",
    file: "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg",
    href: "/catalog?material=Gold&country=United+States",
  },
  {
    label: "U.S. SILVER COINS",
    count: "1,246 Items",
    file: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg",
    href: "/catalog?material=Silver",
  },
  {
    label: "EARLY COPPER",
    count: "312 Items",
    file: "1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg",
    href: "/catalog?material=Copper",
  },
  {
    label: "GOLD BULLION",
    count: "278 Items",
    file: "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg",
    href: "/catalog?material=Gold",
  },
  {
    label: "SILVER BULLION",
    count: "389 Items",
    file: "1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg",
    href: "/catalog?material=Silver",
  },
  {
    label: "ANCIENT COINS",
    count: "184 Items",
    file: "1932_51_29_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg",
    href: "/catalog",
  },
];

export default function FeaturedCollections() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
      {collections.map((c, i) => (
        <Link key={i} href={c.href} style={{ textDecoration: "none" }}>
          <div style={{
            background: "#0A0A0A",
            border: "1px solid #1A1A1A",
            borderRadius: 12,
            overflow: "hidden",
            transition: "border-color 0.2s, transform 0.2s",
            cursor: "pointer",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "#2A2010";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "#1A1A1A";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
          >
            {/* Coin image */}
            <div style={{
              aspectRatio: "1", background: "#060606",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", padding: 8,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coinImg(c.file)}
                alt={c.label}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onError={e => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  const p = el.parentElement;
                  if (p) p.innerHTML = '<span style="font-size:32px;opacity:0.08;color:#C9A84C">⬡</span>';
                }}
              />
            </div>

            {/* Label */}
            <div style={{
              padding: "10px 10px 12px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <p style={{ color: "#C9A84C", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em" }}>{c.label}</p>
                <p style={{ color: "#444", fontSize: "0.58rem", marginTop: 2 }}>{c.count}</p>
              </div>
              <span style={{ color: "#2A2A2A", fontSize: "0.8rem" }}>→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
