import MetalsTicker from "@/components/MetalsTicker";
import MeltCalculator from "./MeltCalculator";

export default function MeltCalculatorPage() {
  return (
    <div className="pm-root" style={{ minHeight: "100vh" }}>
      <MetalsTicker />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 40px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="pm-sec-eyebrow">Metal Value Tools</p>
          <h1 className="pm-cinzel" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700, color: "#F5F5F5", marginBottom: 8 }}>
            Melt <span style={{ color: "#D4AF37" }}>Calculator</span>
          </h1>
          <p style={{ color: "#888", fontSize: "1rem", fontStyle: "italic" }}>
            Real gram/troy-oz math against live spot prices — pick a known bullion product or enter your own weight and purity.
          </p>
        </div>
        <MeltCalculator />
      </div>
    </div>
  );
}
