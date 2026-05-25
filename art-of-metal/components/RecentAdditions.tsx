"use client";
import { coinImg } from "@/lib/images";
import Link from "next/link";


const recent = [
  { name: "1921 Peace Dollar", grade: "PCGS MS64", price: "$1,250", file: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg" },
  { name: "1916-D Mercury Dime", grade: "PCGS MS67 FB", price: "$1,850", file: "1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg" },
  { name: "1893-S Morgan Dollar", grade: "PCGS MS65", price: "$2,950", file: "1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg" },
];

export default function RecentAdditions() {
  return (
    <div style={{ padding: "16px", flex: 1, overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p style={{ color: "#888", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em" }}>RECENT ADDITIONS</p>
        <Link href="/catalog" style={{ color: "#C9A84C", fontSize: "0.62rem", textDecoration: "none" }}>View All</Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {recent.map((r, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, alignItems: "center",
            padding: "10px", background: "#0A0A0A",
            border: "1px solid #141414", borderRadius: 10,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 8, flexShrink: 0,
              background: "#060606", border: "1px solid #1A1A1A", overflow: "hidden",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coinImg(r.file)} alt={r.name}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: "#E0E0E0", fontSize: "0.72rem", fontWeight: 600, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {r.name}
              </p>
              <p style={{ color: "#555", fontSize: "0.62rem" }}>{r.grade}</p>
              <p className="gold-text" style={{ fontSize: "0.78rem", fontWeight: 800 }}>{r.price}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-gold" style={{
        width: "100%", marginTop: 16, padding: "9px",
        borderRadius: 7, fontSize: "0.65rem", letterSpacing: "0.1em",
        border: "none", cursor: "pointer",
      }}>
        VIEW ALL ADDITIONS
      </button>
    </div>
  );
}
