"use client";
import { useMemo, useState } from "react";
import type { BullionProduct } from "@/lib/market";

const METALS = ["All", "Gold", "Silver", "Platinum", "Palladium"];

export default function BullionTable({ products }: { products: BullionProduct[] }) {
  const [metal, setMetal] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchMetal = metal === "All" || p.metal === metal;
      const matchQ = !q || p.bullion_product.toLowerCase().includes(q) || p.mint_refiner.toLowerCase().includes(q);
      return matchMetal && matchQ;
    });
  }, [products, metal, search]);

  return (
    <div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
        <input
          className="input-dark"
          style={{ maxWidth: 280 }}
          placeholder="Search product or mint/refiner..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={{ display: "flex", gap: 6 }}>
          {METALS.map((m) => (
            <button
              key={m}
              onClick={() => setMetal(m)}
              style={{
                background: metal === m ? "rgba(201,168,76,0.15)" : "transparent",
                border: `1px solid ${metal === m ? "#2A2010" : "#1A1A1A"}`,
                color: metal === m ? "#C9A84C" : "#666",
                borderRadius: 100, padding: "6px 14px", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
              }}
            >{m}</button>
          ))}
        </div>
      </div>
      <div className="pm-card" style={{ overflowX: "auto" }}>
        <table className="pm-table">
          <thead>
            <tr>
              <th>#</th><th>Product</th><th>Mint / Refiner</th><th>Weight</th><th>Purity</th>
              <th>Liquidity</th><th>Premium</th><th>IRA Eligible</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.rank}>
                <td>{p.rank}</td>
                <td style={{ color: "#F0EAD6", fontWeight: 600 }}>{p.bullion_product}</td>
                <td>{p.mint_refiner}</td>
                <td>{p.common_weight}</td>
                <td>{p.purity}</td>
                <td><span style={{ color: "#C9A84C", fontWeight: 700 }}>{p.liquidity_tier}</span></td>
                <td style={{ color: "#888" }}>{p.premium_profile}</td>
                <td>{p.ira_common}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p style={{ color: "#555", padding: "24px", textAlign: "center" }}>No products match.</p>}
      </div>
    </div>
  );
}
