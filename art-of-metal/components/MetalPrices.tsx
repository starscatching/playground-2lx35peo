"use client";

const prices = [
  { metal: "GOLD PRICE", price: "$2,377.40", change: "+12.47 (+0.53%)", up: true, icon: "◆" },
  { metal: "SILVER PRICE", price: "$28.96", change: "+0.18 (+0.63%)", up: true, icon: "◈" },
  { metal: "PLATINUM PRICE", price: "$983.50", change: "+5.12 (+0.52%)", up: true, icon: "◎" },
  { metal: "COPPER PRICE", price: "$4.29", change: "-0.03 (-0.69%)", up: false, icon: "⬡" },
];

export default function MetalPrices() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      borderBottom: "1px solid #141414",
    }}>
      {prices.map((p, i) => (
        <div key={i} style={{
          padding: "16px 20px",
          borderRight: i < 3 ? "1px solid #141414" : "none",
          background: "#070707",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "rgba(201,168,76,0.08)",
            border: "1px solid #2A2010",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#C9A84C", fontSize: 14, flexShrink: 0,
          }}>
            {p.icon}
          </div>
          <div>
            <p style={{ color: "#444", fontSize: "0.6rem", letterSpacing: "0.1em", marginBottom: 2 }}>{p.metal}</p>
            <p style={{ color: "#F0F0F0", fontWeight: 800, fontSize: "1.05rem", lineHeight: 1 }}>{p.price}</p>
            <p style={{
              fontSize: "0.65rem", fontWeight: 600, marginTop: 2,
              color: p.up ? "#4ade80" : "#f87171",
            }}>{p.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
