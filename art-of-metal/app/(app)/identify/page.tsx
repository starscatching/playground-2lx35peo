import AIIdentifier from "./AIIdentifier";

export default function IdentifyPage() {
  return (
    <div className="pm-root" style={{ minHeight: "100vh", padding: "48px 40px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p className="pm-sec-eyebrow">Snap &amp; Identify</p>
        <h1 className="pm-cinzel" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700, color: "#F5F5F5", marginBottom: 8 }}>
          AI Coin <span style={{ color: "#D4AF37" }}>Identifier</span>
        </h1>
        <p style={{ color: "#888", fontSize: "1rem", fontStyle: "italic" }}>
          One shot. If it&rsquo;s wrong, you take over — your correction is final.
        </p>
      </div>
      <AIIdentifier />
    </div>
  );
}
