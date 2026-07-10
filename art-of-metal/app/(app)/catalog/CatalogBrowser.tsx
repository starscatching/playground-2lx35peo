"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { coinImg } from "@/lib/images";
import type { SeriesGroup } from "@/lib/coins";

const MATERIALS = ["All", "Gold", "Silver", "Cupronickel", "Copper", "Bronze", "Nickel"];

export default function CatalogBrowser({
  groups,
  denomOrder,
  denomLabels,
}: {
  groups: SeriesGroup[];
  denomOrder: string[];
  denomLabels: Record<string, string>;
}) {
  const [search, setSearch] = useState("");
  const [material, setMaterial] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return groups.filter((g) => {
      const matchQ = !q || g.name.toLowerCase().includes(q);
      const matchMat = material === "All" || g.coins.some((c) => (c.material || "").toLowerCase() === material.toLowerCase());
      return matchQ && matchMat;
    });
  }, [groups, search, material]);

  const byDenom = useMemo(() => {
    const m = new Map<string, SeriesGroup[]>();
    for (const g of filtered) {
      const arr = m.get(g.denomCode) || [];
      arr.push(g);
      m.set(g.denomCode, arr);
    }
    return m;
  }, [filtered]);

  return (
    <div>
      <div style={{
        display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36,
        padding: "20px 24px", background: "#0E0E0E", border: "1px solid #1A1A1A",
        borderRadius: 12, alignItems: "center",
      }}>
        <div style={{ flex: "1 1 260px", position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#444", fontSize: 14 }}>⌕</span>
          <input
            className="input-dark"
            style={{ paddingLeft: 32 }}
            placeholder="Search series, e.g. Morgan Dollar, Quarter Eagle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          style={{ background: "#161616", border: "1px solid #1A1A1A", color: "#888", borderRadius: 6, padding: "10px 14px", fontSize: "0.85rem", flex: "0 1 160px" }}
        >
          {MATERIALS.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>

      {denomOrder.map((code) => {
        const list = byDenom.get(code);
        if (!list || list.length === 0) return null;
        return (
          <div key={code} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
              <span style={{
                background: "rgba(201,168,76,0.12)", border: "1px solid #2A2010", color: "#C9A84C",
                borderRadius: 4, padding: "2px 8px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em",
              }}>{code}</span>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F0F0F0" }}>{denomLabels[code] || code}</h2>
              <span style={{ color: "#444", fontSize: "0.75rem" }}>{list.length} series</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {list.map((g) => (
                <Link key={g.slug} href={`/catalog/series/${g.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
                    <div style={{ aspectRatio: "1/1", background: "#0C0C0C", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {g.sampleImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={coinImg(g.sampleImg)}
                          alt={g.name}
                          style={{ width: "100%", height: "100%", objectFit: "contain", padding: 14 }}
                          onError={(e) => {
                            const el = e.currentTarget;
                            el.style.display = "none";
                            const span = document.createElement("span");
                            span.textContent = "⬡";
                            Object.assign(span.style, { fontSize: "32px", opacity: "0.15", color: "#C9A84C" });
                            el.parentElement?.appendChild(span);
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: 32, opacity: 0.15, color: "#C9A84C" }}>⬡</span>
                      )}
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <p style={{
                        color: "#F0F0F0", fontSize: "0.82rem", fontWeight: 600, lineHeight: 1.35, marginBottom: 6,
                        overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                      }}>{g.name}</p>
                      <p style={{ color: "#C9A84C", fontSize: "0.7rem", fontWeight: 600 }}>{g.count} specimen{g.count !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ fontSize: 48, marginBottom: 16, opacity: 0.15 }}>⬡</p>
          <p style={{ color: "#444", fontSize: "0.9rem" }}>No series match your search.</p>
        </div>
      )}
    </div>
  );
}
