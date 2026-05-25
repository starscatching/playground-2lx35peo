"use client";
import Link from "next/link";
import PortfolioWidget from "@/components/PortfolioWidget";

const GCS = "https://storage.googleapis.com/art-of-metal-coins/coins/ans/";

const HERO_COINS = [
  { file: "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg", label: "1932 Gold Double Eagle", grade: "PCGS MS65", value: "$2,450" },
  { file: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg", label: "1932 Silver Quarter", grade: "PCGS MS64", value: "$1,250" },
  { file: "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg", label: "1915 Gold Double Eagle", grade: "NGC AU58", value: "$1,850" },
];

const COLLECTIONS = [
  { label: "U.S. Gold Coins", count: "613 Items", files: ["1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg", "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg"] },
  { label: "U.S. Silver Coins", count: "1,246 Items", files: ["1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg", "1932_51_25_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg"] },
  { label: "Early Copper", count: "312 Items", files: ["1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg", "1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg"] },
  { label: "Gold Bullion", count: "278 Items", files: ["1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg", "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg"] },
  { label: "Silver Bullion", count: "389 Items", files: ["1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg", "1932_51_29_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg"] },
  { label: "Ancient Coins", count: "184 Items", files: ["1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg", "1932_51_25_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg"] },
];

const VAULT_COINS = [
  { file: "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg", year: "1885-O", name: "MORGAN DOLLAR", grade: "MS-63", grader: "NGC", value: "$2,450", metal: "$2,377.40" },
  { file: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg", year: "1921", name: "PEACE DOLLAR", grade: "MS-64", grader: "PCGS", value: "$1,850", metal: "$28.56" },
  { file: "1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg", year: "1944", name: "WHEAT PENNY", grade: "MS-66 RD", grader: "NGC", value: "$620", metal: "$0.02" },
  { file: "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg", year: "1932-S", name: "WASHINGTON QUARTER", grade: "AU-58", grader: "PCGS", value: "$1,240", metal: "$7.12" },
  { file: "1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg", year: "1907", name: "SAINT GAUDENS $20", grade: "MS-65", grader: "PCGS", value: "$2,980", metal: "$2,385.74" },
  { file: "1932_51_29_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg", year: "1936", name: "BUFFALO NICKEL", grade: "MS-65", grader: "NGC", value: "$410", metal: "$0.09" },
  { file: "1932_51_25_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg", year: "1877-CC", name: "TRADE DOLLAR", grade: "VF-20", grader: "PCGS", value: "$1,125", metal: "$28.56" },
  { file: "1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg", year: "2006", name: "AMERICAN EAGLE $19", grade: "MS-69", grader: "NGC", value: "$68.50", metal: "$28.56" },
];

const METALS = [
  { name: "GOLD PRICE", price: "$2,385.74", change: "+12.47 (+0.53%)", up: true },
  { name: "SILVER PRICE", price: "$28.56", change: "+0.18 (+0.63%)", up: true },
  { name: "PLATINUM PRICE", price: "$987.32", change: "+5.12 (+0.52%)", up: true },
  { name: "COPPER PRICE", price: "$4.29", change: "-0.03 (-0.69%)", up: false },
];

const RECENT = [
  { file: "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg", name: "1921 Peace Dollar", grade: "PCGS MS64", price: "$1,250" },
  { file: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg", name: "1916-D Mercury Dime", grade: "PCGS MS67 FB", price: "$1,850" },
  { file: "1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg", name: "1893-S Morgan Dollar", grade: "PCGS MS65", price: "$2,950" },
];

function CoinImg({ file, size = 100, circle = true }: { file: string; size?: number; circle?: boolean }) {
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      borderRadius: circle ? "50%" : 10,
      background: "radial-gradient(circle, #1A1A0A, #0A0A05)",
      border: circle ? "2px solid #2A2010" : "1px solid #1A1A1A",
      overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: circle ? "0 0 20px rgba(201,168,76,0.12), inset 0 0 20px rgba(0,0,0,0.5)" : "none",
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={GCS + encodeURIComponent(file)}
        alt=""
        style={{ width: "90%", height: "90%", objectFit: "contain" }}
        onError={e => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
          const p = el.parentElement;
          if (p) p.innerHTML = `<span style="font-size:${size * 0.35}px;opacity:0.12;color:#C9A84C">⬡</span>`;
        }}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* ── MAIN COLUMN ── */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Top bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 24px", borderBottom: "1px solid #141414",
          background: "#060606", position: "sticky", top: 0, zIndex: 10,
        }}>
          <div>
            <p style={{ color: "#C9A84C", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em" }}>DASHBOARD</p>
            <p style={{ color: "#444", fontSize: "0.7rem" }}>Home</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input placeholder="Search coins, metals, categories..."
              style={{ background: "#0E0E0E", border: "1px solid #1A1A1A", color: "#666", borderRadius: 6, padding: "7px 14px", fontSize: "0.75rem", width: 240, outline: "none" }} />
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#8B6914,#E8C76A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#000", fontWeight: 900 }}>R</div>
          </div>
        </div>

        {/* ── HERO: image-led split ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 360, background: "#060606", borderBottom: "1px solid #141414" }}>

          {/* Left: text + stats */}
          <div style={{ padding: "44px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ color: "#C9A84C", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", marginBottom: 14 }}>THE NEW GENERATION OF</p>
            <h1 style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: 16 }}>
              <span style={{ color: "#F5F5F5" }}>METAL</span><br />
              <span style={{ color: "#F5F5F5" }}>and Coin</span><br />
              <span className="gold-text">Collecting</span>
            </h1>
            <p style={{ color: "#555", fontSize: "0.83rem", lineHeight: 1.7, marginBottom: 28, maxWidth: 340 }}>
              Research coins. Build your private vault.<br />Track your collection visually.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 36 }}>
              <Link href="/vault" className="btn-gold" style={{ padding: "11px 24px", borderRadius: 7, fontSize: "0.75rem", letterSpacing: "0.08em", textDecoration: "none" }}>
                START YOUR VAULT
              </Link>
              <Link href="/catalog" style={{ padding: "11px 24px", borderRadius: 7, fontSize: "0.75rem", letterSpacing: "0.08em", textDecoration: "none", border: "1px solid #2A2A2A", color: "#666" }}>
                EXPLORE DATABASE
              </Link>
            </div>
            {/* Metal spot prices */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {METALS.map((m, i) => (
                <div key={i} style={{ background: "#0C0C0C", border: "1px solid #1A1A1A", borderRadius: 8, padding: "10px 14px" }}>
                  <p style={{ color: "#444", fontSize: "0.58rem", letterSpacing: "0.1em" }}>{m.name}</p>
                  <p style={{ color: "#F0F0F0", fontWeight: 800, fontSize: "1rem" }}>{m.price}</p>
                  <p style={{ color: m.up ? "#4ade80" : "#f87171", fontSize: "0.62rem", fontWeight: 600 }}>{m.change}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3 large coin showcases */}
          <div style={{ display: "flex", gap: 0, background: "#060606", borderLeft: "1px solid #141414" }}>
            {HERO_COINS.map((c, i) => (
              <div key={i} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                padding: "28px 12px", gap: 14,
                borderRight: i < 2 ? "1px solid #141414" : "none",
                background: i === 1 ? "#080808" : "#060606",
              }}>
                {/* Big circular coin */}
                <div style={{
                  width: 130, height: 130,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #2A2010, #0A0805)",
                  border: "3px solid #2A2010",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 40px rgba(201,168,76,0.18), 0 8px 32px rgba(0,0,0,0.6)",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  {/* Gold ring */}
                  <div style={{ position: "absolute", inset: 4, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.2)" }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={GCS + encodeURIComponent(c.file)} alt={c.label}
                    style={{ width: "88%", height: "88%", objectFit: "contain", position: "relative", zIndex: 1 }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "#F0F0F0", fontWeight: 700, fontSize: "0.72rem", marginBottom: 3 }}>{c.label}</p>
                  <p style={{ color: "#C9A84C", fontSize: "0.65rem", fontWeight: 600 }}>{c.grade}</p>
                  <p style={{ color: "#888", fontSize: "0.68rem", marginTop: 2 }}>{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURED COLLECTIONS: large image cards ── */}
        <div style={{ padding: "24px 24px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ color: "#E0E0E0", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em" }}>FEATURED COLLECTIONS</p>
            <Link href="/catalog" style={{ color: "#C9A84C", fontSize: "0.68rem", textDecoration: "none" }}>Browse All →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
            {COLLECTIONS.map((col, i) => (
              <Link key={i} href="/catalog" style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 12, overflow: "hidden",
                  transition: "border-color 0.2s, transform 0.2s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "#3A2A10"; d.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "#1A1A1A"; d.style.transform = "translateY(0)"; }}
                >
                  {/* Two overlapping coin images */}
                  <div style={{ position: "relative", height: 120, background: "#060606", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* Back coin (offset) */}
                    <div style={{
                      position: "absolute", left: "18%",
                      width: 72, height: 72, borderRadius: "50%",
                      background: "radial-gradient(circle, #1A1A0A, #080805)",
                      border: "2px solid #1A1A0A", overflow: "hidden",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.6)",
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={GCS + encodeURIComponent(col.files[1])} alt=""
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
                    </div>
                    {/* Front coin */}
                    <div style={{
                      position: "absolute", right: "18%",
                      width: 84, height: 84, borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 35%, #2A2010, #0A0805)",
                      border: "2px solid #2A2010", overflow: "hidden",
                      boxShadow: "0 0 24px rgba(201,168,76,0.2), 0 6px 20px rgba(0,0,0,0.7)",
                      zIndex: 1,
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={GCS + encodeURIComponent(col.files[0])} alt=""
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
                    </div>
                  </div>

                  <div style={{ padding: "12px", textAlign: "center" }}>
                    <p style={{ color: "#C9A84C", fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.06em" }}>{col.label.toUpperCase()}</p>
                    <p style={{ color: "#444", fontSize: "0.6rem", marginTop: 3 }}>{col.count}</p>
                    <div style={{ marginTop: 8, display: "flex", justifyContent: "center" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#111", border: "1px solid #2A2010", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#C9A84C", fontSize: 10 }}>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── VAULT GRID: your private collection ── */}
        <div style={{ padding: "28px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ color: "#E0E0E0", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em" }}>YOUR PRIVATE VAULT</p>
            <div style={{ display: "flex", gap: 8 }}>
              {["ALL COINS", "SILVER", "GOLD", "COPPER", "PLATINUM"].map((t, i) => (
                <button key={i} style={{
                  background: i === 0 ? "rgba(201,168,76,0.15)" : "transparent",
                  border: `1px solid ${i === 0 ? "#2A2010" : "#1A1A1A"}`,
                  color: i === 0 ? "#C9A84C" : "#444",
                  borderRadius: 100, padding: "4px 12px", fontSize: "0.6rem",
                  fontWeight: 600, letterSpacing: "0.08em", cursor: "pointer",
                }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Coin grid — image first */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {VAULT_COINS.map((c, i) => (
              <div key={i} style={{
                background: "#090909", border: "1px solid #181818", borderRadius: 14, overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s", cursor: "pointer",
              }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "#2A2010"; d.style.boxShadow = "0 0 20px rgba(201,168,76,0.08)"; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "#181818"; d.style.boxShadow = "none"; }}
              >
                {/* LARGE coin image — takes up most of card */}
                <div style={{
                  background: "radial-gradient(ellipse at center, #141008 0%, #070705 100%)",
                  padding: "24px 0 16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  {/* Subtle glow ring */}
                  <div style={{
                    position: "absolute", width: 110, height: 110,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
                  }} />
                  {/* Coin circle */}
                  <div style={{
                    width: 100, height: 100, borderRadius: "50%",
                    background: "radial-gradient(circle at 38% 32%, #2A2010, #0C0A05)",
                    border: "2.5px solid #2A2010",
                    overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.7), 0 0 16px rgba(201,168,76,0.1)",
                    position: "relative", zIndex: 1,
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={GCS + encodeURIComponent(c.file)} alt={c.name}
                      style={{ width: "90%", height: "90%", objectFit: "contain" }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
                  </div>
                  {/* Grade badge */}
                  <div style={{
                    position: "absolute", top: 10, right: 10,
                    background: "rgba(0,0,0,0.85)", border: "1px solid #2A2010",
                    borderRadius: 5, padding: "2px 7px",
                    fontSize: "0.58rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.06em",
                  }}>{c.grade}</div>
                  {/* Grader badge */}
                  <div style={{
                    position: "absolute", top: 10, left: 10,
                    background: "rgba(0,0,0,0.85)", border: "1px solid #1A1A1A",
                    borderRadius: 5, padding: "2px 7px",
                    fontSize: "0.55rem", fontWeight: 700, color: "#666",
                  }}>{c.grader}</div>
                </div>

                {/* Card info */}
                <div style={{ padding: "14px 14px 16px" }}>
                  <p style={{ color: "#888", fontSize: "0.65rem", letterSpacing: "0.06em", marginBottom: 3 }}>{c.year}</p>
                  <p style={{ color: "#F0F0F0", fontWeight: 700, fontSize: "0.8rem", marginBottom: 10 }}>{c.name}</p>
                  <div style={{ height: "1px", background: "#141414", marginBottom: 10 }} />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: "#444", fontSize: "0.58rem" }}>VALUE</p>
                      <p style={{ color: "#C9A84C", fontWeight: 800, fontSize: "0.92rem" }}>{c.value}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: "#444", fontSize: "0.58rem" }}>METAL VALUE</p>
                      <p style={{ color: "#666", fontWeight: 600, fontSize: "0.72rem" }}>{c.metal}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <Link href="/portfolio" style={{
              display: "inline-block", border: "1px solid #1A1A1A", color: "#666",
              fontSize: "0.72rem", letterSpacing: "0.1em", padding: "10px 32px",
              borderRadius: 8, textDecoration: "none",
            }}>
              VIEW FULL COLLECTION →
            </Link>
          </div>
        </div>

        {/* ── BOTTOM FEATURES ── */}
        <div style={{ borderTop: "1px solid #141414", padding: "24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[
            { icon: "◎", label: "Live Market Data", sub: "Real-time metal and coin pricing" },
            { icon: "◆", label: "Detailed Research", sub: "Historical data, mintage, and more" },
            { icon: "⬡", label: "Secure Vault", sub: "Your collection is always protected" },
            { icon: "◈", label: "Visual Tracking", sub: "Track, organize, and view beautifully" },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(201,168,76,0.06)", border: "1px solid #1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C", fontSize: 14, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <p style={{ color: "#888", fontWeight: 600, fontSize: "0.72rem", marginBottom: 3 }}>{f.label}</p>
                <p style={{ color: "#333", fontSize: "0.65rem", lineHeight: 1.5 }}>{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ width: 220, flexShrink: 0, borderLeft: "1px solid #141414", background: "#060606", display: "flex", flexDirection: "column" }}>

        {/* Vault stats */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #141414" }}>
          <p style={{ color: "#444", fontSize: "0.6rem", letterSpacing: "0.1em", marginBottom: 6 }}>TOTAL PORTFOLIO VALUE</p>
          <p className="gold-text" style={{ fontSize: "1.5rem", fontWeight: 900, lineHeight: 1 }}>$142,598.32</p>
          <p style={{ color: "#4ade80", fontSize: "0.68rem", fontWeight: 600, marginTop: 4 }}>+3.27% (24h)</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
            {[
              { label: "Total Coins", val: "128" },
              { label: "Metal Value", val: "$32,865" },
              { label: "Avg Grade", val: "MS-63" },
              { label: "Countries", val: "12" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#0A0A0A", border: "1px solid #141414", borderRadius: 8, padding: "8px 10px" }}>
                <p style={{ color: "#333", fontSize: "0.55rem", marginBottom: 2 }}>{s.label}</p>
                <p style={{ color: "#C9A84C", fontWeight: 800, fontSize: "0.88rem" }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio donut */}
        <div style={{ padding: "16px", borderBottom: "1px solid #141414" }}>
          <PortfolioWidget compact />
        </div>

        {/* Recent additions */}
        <div style={{ padding: "16px", flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <p style={{ color: "#555", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em" }}>RECENT ADDITIONS</p>
            <Link href="/catalog" style={{ color: "#C9A84C", fontSize: "0.58rem", textDecoration: "none" }}>View All</Link>
          </div>
          {RECENT.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
              <CoinImg file={r.file} size={44} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "#DDD", fontSize: "0.68rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</p>
                <p style={{ color: "#555", fontSize: "0.58rem" }}>{r.grade}</p>
                <p className="gold-text" style={{ fontSize: "0.75rem", fontWeight: 800 }}>{r.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
