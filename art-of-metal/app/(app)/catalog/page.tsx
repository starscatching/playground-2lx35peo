"use client";
import { useState, useMemo } from "react";
import CoinCard from "@/components/CoinCard";

const GCS_BASE = "https://storage.googleapis.com/art-of-metal-coins/coins/ans/";

const SAMPLE_COINS = [
  { id: "1", name: "Morgan Silver Dollar", country: "United States", year: "1921", material: "Silver", file: "1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg" },
  { id: "2", name: "Gold Double Eagle", country: "United States", year: "1932", material: "Gold", file: "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg" },
  { id: "3", name: "Silver Quarter Dollar", country: "United States", year: "1932", material: "Silver", file: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg" },
  { id: "4", name: "Buffalo Nickel", country: "United States", year: "1916", material: "Cupronickel", file: "1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg" },
  { id: "5", name: "Panama-Pacific Exposition Dollar", country: "United States", year: "1915", material: "Gold", file: "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg" },
  { id: "6", name: "Walking Liberty Half Dollar", country: "United States", year: "1918", material: "Silver", file: "1932_51_29_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg" },
  { id: "7", name: "Standing Liberty Quarter", country: "United States", year: "1920", material: "Silver", file: "1932_51_25_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg" },
  { id: "8", name: "Lincoln Wheat Cent", country: "United States", year: "1932", material: "Bronze", file: "1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg" },
];

const MATERIALS = ["All", "Gold", "Silver", "Bronze", "Cupronickel", "Copper"];
const COUNTRIES = ["All", "United States", "United Kingdom", "Germany", "France", "Rome", "Greece"];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [material, setMaterial] = useState("All");
  const [country, setCountry] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return SAMPLE_COINS.filter(c => {
      const q = search.toLowerCase();
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q) || c.year.includes(q);
      const matchMat = material === "All" || c.material === material;
      const matchCountry = country === "All" || c.country === country;
      return matchSearch && matchMat && matchCountry;
    });
  }, [search, material, country]);

  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ color: "#C9A84C", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", marginBottom: 12 }}>
            EXPLORE
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#F5F5F5", marginBottom: 8 }}>
            Coin Catalog
          </h1>
          <p style={{ color: "#555", fontSize: "0.95rem" }}>
            Browse the Art of Metal collection — {SAMPLE_COINS.length.toLocaleString()} coins and growing.
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36,
          padding: "20px 24px",
          background: "#0E0E0E",
          border: "1px solid #1A1A1A",
          borderRadius: 12,
          alignItems: "center",
        }}>
          {/* Search */}
          <div style={{ flex: "1 1 220px", position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#444", fontSize: 14 }}>
              ⌕
            </span>
            <input
              className="input-dark"
              style={{ paddingLeft: 32 }}
              placeholder="Search coins, country, year..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Material */}
          <select
            value={material}
            onChange={e => setMaterial(e.target.value)}
            style={{
              background: "#161616", border: "1px solid #1A1A1A",
              color: "#888", borderRadius: 6, padding: "10px 14px",
              fontSize: "0.85rem", flex: "0 1 140px",
            }}
          >
            {MATERIALS.map(m => <option key={m}>{m}</option>)}
          </select>

          {/* Country */}
          <select
            value={country}
            onChange={e => setCountry(e.target.value)}
            style={{
              background: "#161616", border: "1px solid #1A1A1A",
              color: "#888", borderRadius: 6, padding: "10px 14px",
              fontSize: "0.85rem", flex: "0 1 160px",
            }}
          >
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* View toggle */}
          <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
            {(["grid", "list"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  background: view === v ? "rgba(201,168,76,0.1)" : "transparent",
                  border: `1px solid ${view === v ? "#2A2010" : "#1A1A1A"}`,
                  color: view === v ? "#C9A84C" : "#444",
                  borderRadius: 6, padding: "8px 12px",
                  cursor: "pointer", fontSize: "0.75rem",
                }}
              >
                {v === "grid" ? "⊞" : "≡"}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p style={{ color: "#444", fontSize: "0.8rem", marginBottom: 24, letterSpacing: "0.05em" }}>
          {filtered.length} RESULT{filtered.length !== 1 ? "S" : ""}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: 48, marginBottom: 16, opacity: 0.15 }}>⬡</p>
            <p style={{ color: "#444", fontSize: "0.9rem" }}>No coins match your search.</p>
          </div>
        ) : view === "grid" ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 20,
          }}>
            {filtered.map(coin => (
              <CoinCard
                key={coin.id}
                id={coin.id}
                name={coin.name}
                country={coin.country}
                year={coin.year}
                material={coin.material}
                gcsUrl={GCS_BASE + encodeURIComponent(coin.file)}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {filtered.map(coin => (
              <div key={coin.id} className="card" style={{
                display: "flex", alignItems: "center", gap: 20,
                padding: "16px 20px", borderRadius: 8,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 8,
                  background: "#0C0C0C", flexShrink: 0, overflow: "hidden",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={GCS_BASE + encodeURIComponent(coin.file)} alt={coin.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#F0F0F0", fontWeight: 600, fontSize: "0.9rem" }}>{coin.name}</p>
                  <p style={{ color: "#555", fontSize: "0.78rem" }}>{coin.country} · {coin.material}</p>
                </div>
                <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: "0.9rem" }}>{coin.year}</span>
              </div>
            ))}
          </div>
        )}

        {/* Load more note */}
        <div style={{ textAlign: "center", marginTop: 60, padding: "40px", border: "1px dashed #1A1A1A", borderRadius: 12 }}>
          <p style={{ color: "#333", fontSize: "0.82rem", marginBottom: 12 }}>
            6,000+ coins are in the database. Connect your GCS bucket to load the full catalog.
          </p>
          <p style={{ color: "#C9A84C", fontSize: "0.72rem", letterSpacing: "0.1em" }}>
            FULL CATALOG COMING SOON
          </p>
        </div>
      </div>
    </div>
  );
}
