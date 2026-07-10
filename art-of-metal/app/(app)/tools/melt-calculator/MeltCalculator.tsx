"use client";
import { useMemo, useState } from "react";
import { MELT_PRODUCTS } from "@/lib/melt";
import { SPOT_PRICES } from "@/lib/market";

export default function MeltCalculator() {
  const [productIdx, setProductIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [customMode, setCustomMode] = useState(false);
  const [customWeight, setCustomWeight] = useState("1");
  const [customPurity, setCustomPurity] = useState("999");
  const [customMetal, setCustomMetal] = useState("Gold");

  const product = MELT_PRODUCTS[productIdx];
  const spot = useMemo(
    () => SPOT_PRICES.find((s) => s.metal === (customMode ? customMetal : product.metal)) ?? SPOT_PRICES[0],
    [customMode, customMetal, product]
  );

  const weightOz = customMode ? parseFloat(customWeight) || 0 : product.weightOz;
  const purity = customMode ? (parseFloat(customPurity) || 0) / 1000 : product.purity;
  const meltValue = weightOz * purity * spot.price * qty;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
      {/* Selector */}
      <div className="pm-card" style={{ borderRadius: 0 }}>
        <div className="pm-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A7220", marginBottom: 14, display: "flex", gap: 10, alignItems: "center" }}>
          SELECT PRODUCT
          <span style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(212,175,55,0.15), transparent)" }} />
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          <button
            onClick={() => setCustomMode(false)}
            style={{ flex: 1, padding: "8px", fontSize: "0.72rem", borderRadius: 2, cursor: "pointer", background: !customMode ? "rgba(212,175,55,0.1)" : "transparent", border: `1px solid ${!customMode ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.08)"}`, color: !customMode ? "#D4AF37" : "#888" }}
          >Known Product</button>
          <button
            onClick={() => setCustomMode(true)}
            style={{ flex: 1, padding: "8px", fontSize: "0.72rem", borderRadius: 2, cursor: "pointer", background: customMode ? "rgba(212,175,55,0.1)" : "transparent", border: `1px solid ${customMode ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.08)"}`, color: customMode ? "#D4AF37" : "#888" }}
          >Custom Weight</button>
        </div>

        {!customMode ? (
          <div style={{ maxHeight: 380, overflowY: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
            {MELT_PRODUCTS.map((p, i) => (
              <button
                key={p.name + i}
                onClick={() => setProductIdx(i)}
                style={{
                  padding: "10px 12px", textAlign: "left", borderRadius: 2, cursor: "pointer",
                  background: i === productIdx ? "rgba(212,175,55,0.06)" : "#141414",
                  border: `1px solid ${i === productIdx ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <p style={{ fontSize: "0.78rem", color: i === productIdx ? "#D4AF37" : "#F0EAD6", marginBottom: 2, lineHeight: 1.25 }}>{p.name}</p>
                <p className="pm-mono" style={{ fontSize: "0.6rem", color: i === productIdx ? "#8A7220" : "#666" }}>{p.weightLabel} · {p.purityLabel}</p>
                <span className="pm-mono" style={{ display: "inline-block", marginTop: 4, padding: "1px 6px", fontSize: "0.55rem", borderRadius: 1, background: p.metal === "Gold" ? "rgba(212,175,55,0.1)" : "rgba(192,192,192,0.08)", color: p.metal === "Gold" ? "#D4AF37" : "#C0C0C0" }}>{p.metal.toUpperCase()}</span>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <p className="pm-mono" style={{ fontSize: "0.62rem", color: "#666", marginBottom: 5 }}>METAL</p>
              <select value={customMetal} onChange={(e) => setCustomMetal(e.target.value)} className="input-dark">
                {SPOT_PRICES.map((s) => <option key={s.metal}>{s.metal}</option>)}
              </select>
            </div>
            <div>
              <p className="pm-mono" style={{ fontSize: "0.62rem", color: "#666", marginBottom: 5 }}>WEIGHT (TROY OZ)</p>
              <input className="input-dark pm-mono" value={customWeight} onChange={(e) => setCustomWeight(e.target.value)} />
            </div>
            <div>
              <p className="pm-mono" style={{ fontSize: "0.62rem", color: "#666", marginBottom: 5 }}>PURITY (PER MILLE, e.g. 999)</p>
              <input className="input-dark pm-mono" value={customPurity} onChange={(e) => setCustomPurity(e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Quantity + Result */}
      <div className="pm-card" style={{ borderRadius: 0, display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <div className="pm-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A7220", marginBottom: 12, display: "flex", gap: 10, alignItems: "center" }}>
            QUANTITY
            <span style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(212,175,55,0.15), transparent)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 40, background: "#141414", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 2, color: "#fff", fontSize: 18, cursor: "pointer" }}>−</button>
            <span className="pm-cinzel" style={{ fontSize: "1.7rem", fontWeight: 700, minWidth: 40, textAlign: "center" }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={{ width: 40, height: 40, background: "#141414", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 2, color: "#fff", fontSize: 18, cursor: "pointer" }}>+</button>
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.05), rgba(34,197,94,0.02))", border: "1px solid rgba(34,197,94,0.2)", borderLeft: "3px solid #22C55E", padding: "20px 22px" }}>
          <p className="pm-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(34,197,94,0.6)", marginBottom: 6 }}>MELT VALUE</p>
          <p className="pm-cinzel" style={{ fontSize: "2.4rem", fontWeight: 700, color: "#22C55E", lineHeight: 1 }}>
            ${meltValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="pm-mono" style={{ fontSize: "0.62rem", color: "rgba(34,197,94,0.45)", marginTop: 6 }}>
            {weightOz.toFixed(4)} oz × {(purity * 100).toFixed(2)}% pure × ${spot.price.toLocaleString()}/oz × {qty}
          </p>
        </div>

        <div style={{ padding: "12px 14px", background: "#141414", border: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "center" }}>
            <p className="pm-mono" style={{ fontSize: "0.58rem", color: "#666" }}>SPOT ({spot.symbol})</p>
            <p className="pm-cinzel" style={{ fontSize: "0.9rem", color: "#D4AF37", fontWeight: 600 }}>${spot.price.toLocaleString()}</p>
          </div>
          <span style={{ color: "rgba(212,175,55,0.2)", fontSize: 18 }}>|</span>
          <div style={{ textAlign: "center" }}>
            <p className="pm-mono" style={{ fontSize: "0.58rem", color: "#666" }}>FINE {customMode ? customMetal.toUpperCase() : product.metal.toUpperCase()}</p>
            <p className="pm-cinzel" style={{ fontSize: "0.9rem", color: "#D4AF37", fontWeight: 600 }}>{(weightOz * purity * qty).toFixed(4)} oz</p>
          </div>
          <span style={{ color: "rgba(212,175,55,0.2)", fontSize: 18 }}>|</span>
          <div style={{ textAlign: "center" }}>
            <p className="pm-mono" style={{ fontSize: "0.58rem", color: "#666" }}>GROSS WEIGHT</p>
            <p className="pm-cinzel" style={{ fontSize: "0.9rem", color: "#D4AF37", fontWeight: 600 }}>{(weightOz * qty).toFixed(4)} oz</p>
          </div>
        </div>
      </div>
    </div>
  );
}
