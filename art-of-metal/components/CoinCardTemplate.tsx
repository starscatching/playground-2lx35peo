"use client";

const STYLE_COLORS: Record<string, { border: string; glow: string; text: string; bg: string }> = {
  copper: { border: "#b87333", glow: "rgba(184,115,51,0.35)", text: "#e0a874", bg: "linear-gradient(160deg, #2a1608, #120a04)" },
  platinum: { border: "#c8ccd6", glow: "rgba(200,204,214,0.3)", text: "#dfe2e8", bg: "linear-gradient(160deg, #1c1e22, #0a0b0c)" },
  gold: { border: "#d4af37", glow: "rgba(212,175,55,0.4)", text: "#f2cc50", bg: "linear-gradient(160deg, #2a2008, #120e02)" },
  antique: { border: "#a68a4a", glow: "rgba(216,196,138,0.3)", text: "#d8c48a", bg: "linear-gradient(160deg, #24200f, #100e07)" },
  vibrant: { border: "#a855f7", glow: "rgba(168,85,247,0.35)", text: "#c99bfa", bg: "linear-gradient(160deg, #1e1029, #0b0713)" },
};

export function CoinCardFront({
  style, name, mint, year, composition, weight, diameter, edge, designer, serial, imgSrc,
}: {
  style: string; name: string; mint: string; year: string; composition: string;
  weight: string; diameter: string; edge: string; designer: string; serial: string; imgSrc?: string;
}) {
  const c = STYLE_COLORS[style] ?? STYLE_COLORS.gold;
  return (
    <div style={{
      width: 260, height: 380, borderRadius: 10, position: "relative", background: c.bg,
      border: `2px solid ${c.border}`, boxShadow: `0 0 30px ${c.glow}, inset 0 0 40px rgba(0,0,0,0.5)`,
      padding: 16, display: "flex", flexDirection: "column", alignItems: "center", color: c.text, fontFamily: "var(--font-cinzel), serif",
    }}>
      <div style={{ position: "absolute", inset: 6, border: `1px solid ${c.glow}`, borderRadius: 6, pointerEvents: "none" }} />
      <p style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em", textAlign: "center", marginTop: 6 }}>{name}</p>
      <p className="pm-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.1em", color: c.border, marginBottom: 14 }}>{mint} · {year}</p>
      <div style={{
        width: 130, height: 130, borderRadius: "50%", border: `2px solid ${c.border}`, background: "#0a0a0a",
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 14,
        boxShadow: `0 0 20px ${c.glow}`,
      }}>
        {imgSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgSrc} alt={name} style={{ width: "88%", height: "88%", objectFit: "contain" }} />
        ) : (
          <span style={{ fontSize: 40, opacity: 0.3 }}>⬡</span>
        )}
      </div>
      <div style={{ flex: 1 }} />
      <p className="pm-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.05em", textAlign: "center", opacity: 0.85, marginBottom: 4 }}>METAL COMPOSITION</p>
      <p className="pm-mono" style={{ fontSize: "0.6rem", marginBottom: 8 }}>{composition}</p>
      <p className="pm-mono" style={{ fontSize: "0.52rem", opacity: 0.7, marginBottom: 8, textAlign: "center" }}>{weight} · {diameter} · {edge}</p>
      <p style={{ fontSize: "0.62rem", fontStyle: "italic", marginBottom: 6 }}>{designer}</p>
      <p className="pm-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.08em" }}>No. {serial}</p>
    </div>
  );
}

export function CoinCardBack({
  style, composition, historicalNotes, pcgsGrade, serial,
}: {
  style: string; composition: string; historicalNotes: string[]; pcgsGrade: string; serial: string;
}) {
  const c = STYLE_COLORS[style] ?? STYLE_COLORS.gold;
  return (
    <div style={{
      width: 260, height: 380, borderRadius: 10, position: "relative", background: c.bg,
      border: `2px solid ${c.border}`, boxShadow: `0 0 30px ${c.glow}, inset 0 0 40px rgba(0,0,0,0.5)`,
      padding: 18, color: c.text, fontFamily: "var(--font-cinzel), serif",
    }}>
      <div style={{ position: "absolute", inset: 6, border: `1px solid ${c.glow}`, borderRadius: 6, pointerEvents: "none" }} />
      <p className="pm-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.1em", marginBottom: 4, color: c.border }}>METAL COMPOSITION</p>
      <p className="pm-mono" style={{ fontSize: "0.6rem", marginBottom: 14 }}>{composition}</p>
      <p className="pm-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.1em", marginBottom: 6, color: c.border }}>HISTORICAL NOTES</p>
      <ul style={{ fontSize: "0.58rem", lineHeight: 1.7, paddingLeft: 14, marginBottom: 16 }}>
        {historicalNotes.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
      <p className="pm-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.1em", marginBottom: 6, color: c.border }}>SELF-ASSESSED GRADE</p>
      <p style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 20 }}>{pcgsGrade}</p>
      <div style={{ position: "absolute", bottom: 16, left: 18, right: 18, textAlign: "center" }}>
        <p className="pm-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.1em" }}>{serial}</p>
      </div>
    </div>
  );
}
