import MetalsTicker from "@/components/MetalsTicker";
import BullionTable from "./BullionTable";
import { SPOT_PRICES, BULLION_TOP_100 } from "@/lib/market";

export default function MarketPage() {
  return (
    <div className="pm-root" style={{ minHeight: "100vh" }}>
      <MetalsTicker />
      <div style={{ padding: "40px 40px 0" }}>
        <p className="pm-mono" style={{ color: "#C9A84C", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", marginBottom: 10 }}>LIVE PRICES &amp; TRENDS</p>
        <h1 className="pm-cinzel" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: "#F5F5F5", marginBottom: 10 }}>Market Watch</h1>
        <p style={{ color: "#888", fontSize: "0.95rem", maxWidth: 640, fontStyle: "italic", marginBottom: 32 }}>
          Spot prices update continuously; the Bullion Top 100 below is a curated reference of the most liquid, most recognized products in the market.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 44 }}>
          {SPOT_PRICES.map((m) => (
            <div key={m.symbol} className="pm-card">
              <p className="pm-mono" style={{ color: "#666", fontSize: "0.62rem", letterSpacing: "0.1em", marginBottom: 6 }}>{m.symbol} · {m.metal.toUpperCase()}</p>
              <p className="pm-cinzel" style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "1.4rem" }}>${m.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <p style={{ color: m.change >= 0 ? "#22C55E" : "#EF4444", fontSize: "0.75rem", fontWeight: 600, marginTop: 4 }}>
                {m.change >= 0 ? "▲" : "▼"} {Math.abs(m.change)}% · per troy {m.unit}
              </p>
            </div>
          ))}
        </div>

        <div className="pm-sec-eyebrow" style={{ textAlign: "left" }}>Curated Reference</div>
        <h2 className="pm-cinzel" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F5F5F5", marginBottom: 16 }}>The Bullion Top 100</h2>
        <BullionTable products={BULLION_TOP_100} />

        <div style={{ height: 60 }} />
      </div>
    </div>
  );
}
