"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Link from "next/link";

const data = [
  { name: "Gold Coins", value: 45.2, color: "#C9A84C" },
  { name: "Silver Coins", value: 28.7, color: "#A0A0A0" },
  { name: "Bullion", value: 16.1, color: "#8B6914" },
  { name: "Copper", value: 6.4, color: "#B87333" },
  { name: "Other", value: 3.6, color: "#333" },
];

export default function PortfolioWidget() {
  return (
    <div style={{ background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 14, padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ color: "#888", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em" }}>PORTFOLIO OVERVIEW</p>
        <Link href="/portfolio" style={{ color: "#C9A84C", fontSize: "0.62rem", textDecoration: "none" }}>View Portfolio</Link>
      </div>

      <p style={{ color: "#444", fontSize: "0.65rem", marginBottom: 2 }}>TOTAL PORTFOLIO VALUE</p>
      <p className="gold-text" style={{ fontSize: "1.8rem", fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>
        $127,842.36
      </p>
      <p style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 600, marginBottom: 16 }}>+3.27% (24h)</p>

      {/* Donut chart */}
      <div style={{ height: 140, marginBottom: 14 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={62}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "#111", border: "1px solid #222", borderRadius: 6, fontSize: "0.72rem" }}
              formatter={(v) => [`${v}%`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <span style={{ color: "#666", fontSize: "0.7rem" }}>{d.name}</span>
            </div>
            <span style={{ color: "#888", fontSize: "0.7rem", fontWeight: 600 }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
