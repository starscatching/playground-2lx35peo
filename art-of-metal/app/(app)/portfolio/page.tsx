"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { coinImg } from "@/lib/images";

interface CollectionCoin {
  id: string;
  name: string;
  country: string;
  year: string;
  material: string;
  condition: string;
  notes: string;
  imageUrl: string;
  addedDate: string;
}

const DEMO_COLLECTION: CollectionCoin[] = [
  { id: "1", name: "Morgan Silver Dollar", country: "United States", year: "1921", material: "Silver", condition: "MS-65", notes: "Exceptional luster", imageUrl: coinImg("1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg"), addedDate: "2026-04-15" },
  { id: "2", name: "Saint-Gaudens Double Eagle", country: "United States", year: "1907", material: "Gold", condition: "AU-58", notes: "High relief variety", imageUrl: coinImg("1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg"), addedDate: "2026-03-22" },
  { id: "3", name: "Walking Liberty Half Dollar", country: "United States", year: "1918", material: "Silver", condition: "VF-35", notes: "Strong strike", imageUrl: coinImg("1932_51_29_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg"), addedDate: "2026-02-08" },
];

interface VaultEntry {
  name: string; year: string; material: string; grade: string; gradeLabel: string; imgSrc?: string; addedAt: string;
}

const conditionColors: Record<string, string> = {
  "MS-65": "#4ade80", "MS-64": "#86efac", "AU-58": "#C9A84C",
  "VF-35": "#888", "F-12": "#555",
};

export default function PortfolioPage() {
  const [coins, setCoins] = useState<CollectionCoin[]>(DEMO_COLLECTION);
  const [activeTab, setActiveTab] = useState<"overview" | "coins" | "insights">("overview");

  useEffect(() => {
    const raw = localStorage.getItem("aom_vault_entries");
    if (!raw) return;
    const entries: VaultEntry[] = JSON.parse(raw);
    if (entries.length === 0) return;
    setCoins(entries.map((e, i) => ({
      id: `vault-${i}`,
      name: e.name,
      country: "United States",
      year: e.year || "—",
      material: e.material,
      condition: e.grade,
      notes: e.gradeLabel,
      imageUrl: e.imgSrc || "",
      addedDate: e.addedAt.slice(0, 10),
    })));
  }, []);

  const statCards = [
    { label: "Total Coins", value: coins.length.toString(), icon: "⬡", sub: "in your vault" },
    { label: "Countries", value: [...new Set(coins.map(c => c.country))].length.toString(), icon: "◎", sub: "represented" },
    { label: "Gold Coins", value: coins.filter(c => c.material === "Gold").length.toString(), icon: "◆", sub: "precious metal" },
    { label: "Est. Value", value: "—", icon: "◈", sub: "coming soon" },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20, marginBottom: 48 }}>
          <div>
            <p style={{ color: "#C9A84C", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", marginBottom: 12 }}>MY VAULT</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#F5F5F5" }}>Portfolio</h1>
            <p style={{ color: "#555", fontSize: "0.9rem", marginTop: 8 }}>Track and manage your coin collection</p>
          </div>
          <Link
            href="/upload"
            className="btn-gold"
            style={{ padding: "12px 28px", borderRadius: 8, fontSize: "0.82rem", letterSpacing: "0.08em", textDecoration: "none", alignSelf: "flex-start" }}
          >
            + ADD COIN
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
          {statCards.map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{ color: "#C9A84C", fontSize: 20 }}>{s.icon}</span>
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: "#F5F5F5", lineHeight: 1 }}>{s.value}</p>
              <p style={{ color: "#C9A84C", fontSize: "0.78rem", fontWeight: 600, marginTop: 4 }}>{s.label}</p>
              <p style={{ color: "#444", fontSize: "0.72rem", marginTop: 2 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32, borderBottom: "1px solid #1A1A1A" }}>
          {(["overview", "coins", "insights"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "12px 24px",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: activeTab === tab ? "#C9A84C" : "#444",
                borderBottom: activeTab === tab ? "2px solid #C9A84C" : "2px solid transparent",
                transition: "all 0.2s",
                marginBottom: -1,
              }}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <h2 style={{ color: "#888", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 20 }}>
              RECENT ADDITIONS
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {coins.map(coin => (
                <div key={coin.id} className="card" style={{
                  display: "flex", alignItems: "center", gap: 20,
                  padding: "20px 24px", borderRadius: 12,
                }}>
                  {/* Coin circle */}
                  <div style={{
                    width: 56, height: 56,
                    borderRadius: "50%",
                    background: coin.imageUrl ? `url(${coin.imageUrl}) center/cover` : "linear-gradient(135deg, #1A1A0A, #2A2010)",
                    border: "2px solid #2A2010",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 20, color: "#C9A84C",
                  }}>
                    {!coin.imageUrl && "⬡"}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#F0F0F0", fontWeight: 600, fontSize: "0.95rem" }}>{coin.name}</p>
                    <p style={{ color: "#555", fontSize: "0.78rem", marginTop: 2 }}>
                      {coin.country} · {coin.material} · {coin.year}
                    </p>
                    {coin.notes && (
                      <p style={{ color: "#444", fontSize: "0.75rem", marginTop: 4, fontStyle: "italic" }}>"{coin.notes}"</p>
                    )}
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span style={{
                      color: conditionColors[coin.condition] || "#888",
                      fontSize: "0.8rem", fontWeight: 700,
                      background: "rgba(201,168,76,0.06)",
                      border: "1px solid #2A2010",
                      padding: "3px 10px", borderRadius: 100,
                    }}>
                      {coin.condition}
                    </span>
                    <p style={{ color: "#333", fontSize: "0.7rem", marginTop: 6 }}>{coin.addedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coins tab */}
        {activeTab === "coins" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {coins.map(coin => (
              <div key={coin.id} className="card" style={{ borderRadius: 14, overflow: "hidden" }}>
                {/* Image area */}
                <div style={{
                  height: 180, background: "linear-gradient(135deg, #0E0A02, #1A1208)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  {coin.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={coin.imageUrl} alt={coin.name} style={{ width: "70%", height: "70%", objectFit: "contain" }} />
                  ) : (
                    <span style={{ fontSize: 64, opacity: 0.15, color: "#C9A84C" }}>⬡</span>
                  )}
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    background: "rgba(0,0,0,0.8)", border: "1px solid #2A2010",
                    borderRadius: 4, padding: "2px 8px",
                    fontSize: "0.65rem", color: "#C9A84C", fontWeight: 700,
                  }}>
                    {coin.material.toUpperCase()}
                  </div>
                </div>
                <div style={{ padding: "20px 20px 24px" }}>
                  <p style={{ color: "#888", fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: 6 }}>{coin.country.toUpperCase()}</p>
                  <p style={{ color: "#F0F0F0", fontWeight: 700, fontSize: "0.95rem", marginBottom: 12 }}>{coin.name}</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#C9A84C", fontWeight: 700 }}>{coin.year}</span>
                    <span style={{ color: conditionColors[coin.condition] || "#888", fontSize: "0.8rem", fontWeight: 600 }}>
                      {coin.condition}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add new */}
            <Link href="/upload" style={{ textDecoration: "none" }}>
              <div style={{
                borderRadius: 14, border: "2px dashed #1A1A1A",
                height: "100%", minHeight: 280,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 12, cursor: "pointer", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#2A2010")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
              >
                <span style={{ fontSize: 32, color: "#2A2A2A" }}>+</span>
                <p style={{ color: "#333", fontSize: "0.8rem", letterSpacing: "0.08em" }}>ADD COIN</p>
              </div>
            </Link>
          </div>
        )}

        {/* Insights tab */}
        {activeTab === "insights" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {/* By Material */}
            <div className="card" style={{ padding: 28, borderRadius: 14 }}>
              <p style={{ color: "#C9A84C", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: 20 }}>BY MATERIAL</p>
              {(["Gold", "Silver", "Bronze", "Cupronickel"] as const).map(mat => {
                const count = coins.filter(c => c.material === mat).length;
                const pct = coins.length ? Math.round((count / coins.length) * 100) : 0;
                return (
                  <div key={mat} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "#888", fontSize: "0.8rem" }}>{mat}</span>
                      <span style={{ color: "#C9A84C", fontSize: "0.8rem", fontWeight: 600 }}>{count}</span>
                    </div>
                    <div style={{ height: 4, background: "#1A1A1A", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #8B6914, #C9A84C)", borderRadius: 2, transition: "width 0.6s" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* By Country */}
            <div className="card" style={{ padding: 28, borderRadius: 14 }}>
              <p style={{ color: "#C9A84C", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: 20 }}>BY COUNTRY</p>
              {[...new Set(coins.map(c => c.country))].map(ctry => {
                const count = coins.filter(c => c.country === ctry).length;
                return (
                  <div key={ctry} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #141414" }}>
                    <span style={{ color: "#888", fontSize: "0.85rem" }}>{ctry}</span>
                    <span style={{ color: "#F0F0F0", fontWeight: 700, fontSize: "0.85rem" }}>{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Condition breakdown */}
            <div className="card" style={{ padding: 28, borderRadius: 14 }}>
              <p style={{ color: "#C9A84C", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: 20 }}>BY CONDITION</p>
              {[...new Set(coins.map(c => c.condition))].map(cond => {
                const count = coins.filter(c => c.condition === cond).length;
                return (
                  <div key={cond} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #141414" }}>
                    <span style={{ color: conditionColors[cond] || "#888", fontSize: "0.85rem", fontWeight: 600 }}>{cond}</span>
                    <span style={{ color: "#F0F0F0", fontWeight: 700, fontSize: "0.85rem" }}>{count} coin{count !== 1 ? "s" : ""}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
