"use client";
import Link from "next/link";
import { coinImg } from "@/lib/images";
import { premiumCoins } from "@/lib/premiumCoinsData";

const G = "#C9A84C", GD = "#8B6914", GL = "#E8C76A";
const BG = "#080808", BG2 = "#0E0E0E", BD = "#1A1A1A";
const MONO = "'JetBrains Mono', monospace";
const SERIF = "'Cinzel', serif";
const BODY = "'Cormorant Garamond', serif";

const TICKER = [
  { sym: "XAU/USD", price: "$3,312.40", chg: "+12.47", pct: "+0.38%", up: true },
  { sym: "XAG/USD", price: "$28.56", chg: "+0.18", pct: "+0.63%", up: true },
  { sym: "XPT/USD", price: "$987.32", chg: "+5.12", pct: "+0.52%", up: true },
  { sym: "HG1", price: "$4.29/lb", chg: "-0.03", pct: "-0.69%", up: false },
  { sym: "PCGS-3000", price: "3,841", chg: "+18", pct: "+0.47%", up: true },
  { sym: "NGC-NCS", price: "2,214", chg: "+9", pct: "+0.41%", up: true },
];

const HERO_COINS = [
  { file: "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg", label: "1932 Gold Double Eagle", grade: "PCGS MS65", val: "$2,450" },
  { file: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg", label: "1932 Washington Quarter", grade: "PCGS MS64", val: "$1,250" },
  { file: "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg", label: "1915 Liberty Head $20", grade: "NGC AU58", val: "$1,850" },
];

const METALS = [
  { label: "Gold Price", price: "$3,312.40", chg: "+12.47 (+0.38%)", up: true, icon: "◆", bg: "rgba(201,168,76,.08)", color: G },
  { label: "Silver Price", price: "$28.56", chg: "+0.18 (+0.63%)", up: true, icon: "○", bg: "rgba(160,160,160,.06)", color: "#A0A0B0" },
  { label: "Platinum Price", price: "$987.32", chg: "+5.12 (+0.52%)", up: true, icon: "●", bg: "rgba(176,192,216,.05)", color: "#98B0C8" },
  { label: "Copper Price", price: "$4.29/lb", chg: "-0.03 (-0.69%)", up: false, icon: "•", bg: "rgba(184,115,51,.06)", color: "#B87333" },
];

const COLLECTIONS = [
  { name: "U.S. Gold Coins", count: "613 Items", files: ["1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg", "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg"] },
  { name: "U.S. Silver Coins", count: "1,246 Items", files: ["1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg", "1913_62_1_Silver_1_2_dollar,_United_States,_1913._1913.62.1_obv.jpg"] },
  { name: "Early Copper", count: "312 Items", files: ["1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg", "1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg"] },
  { name: "Gold Bullion", count: "278 Items", files: ["1913_61_4_Gold_20_Dollar,_United_States,_1913._1913.61.4_obv.jpg", "1914_80_3_Gold_20_Dollar,_United_States,_1906._1914.80.3_obv.jpg"] },
  { name: "Silver Bullion", count: "389 Items", files: ["1913_62_1_Silver_1_2_dollar,_United_States,_1913._1913.62.1_obv.jpg", "1913_143_9_Silver_1_4_Dollar,_United_States,_1911._1913.143.9_rev.jpg"] },
  { name: "Silver Dollars", count: "525 Items", files: ["1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg", "1913_62_1_Silver_1_2_dollar,_United_States,_1913._1913.62.1_obv.jpg"] },
  { name: "Nickels & Small", count: "283 Items", files: ["1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg", "1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg"] },
  { name: "Rare Gold Coins", count: "144 Items", files: ["1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg", "1914_80_2_Gold_10_dollar,_United_States,_1906._1914.80.2_obv.jpg"] },
];

const VAULT_COINS = [
  { file: "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg", year: "1885-O", name: "Morgan Dollar", grade: "MS-63", svc: "NGC", val: "$2,450", mv: "$2,377" },
  { file: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg", year: "1921", name: "Peace Dollar", grade: "MS-64", svc: "PCGS", val: "$1,850", mv: "$28" },
  { file: "1913_61_4_Gold_20_Dollar,_United_States,_1913._1913.61.4_obv.jpg", year: "1907", name: "Saint-Gaudens $20", grade: "MS-65", svc: "PCGS", val: "$2,980", mv: "$2,385" },
  { file: "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg", year: "1932-S", name: "Washington Quarter", grade: "AU-58", svc: "PCGS", val: "$1,240", mv: "$7" },
];

export default function HomePage() {
  return (
    <div style={{ background: BG, color: "#F0EDE8", fontFamily: BODY, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── TICKER ── */}
      <div style={{ background: "#050505", borderBottom: `1px solid #111`, height: 26, overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", animation: "ticker 40s linear infinite" }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 20px", height: 26, fontFamily: MONO, fontSize: 9, borderRight: "1px solid #111" }}>
              <span style={{ color: GD, fontWeight: 600 }}>{t.sym}</span>
              <span style={{ color: "#F0EDE8" }}>{t.price}</span>
              <span style={{ color: t.up ? "#4ade80" : "#f87171" }}>{t.chg} ({t.pct})</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── NAV ── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", height: 60,
        background: "rgba(8,8,8,.95)", borderBottom: `1px solid ${BD}`,
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1.5px solid rgba(201,168,76,.5)",
            background: "radial-gradient(circle at 38% 32%,#1E1608,#080604)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: SERIF, fontSize: 14, fontWeight: 900, background: `linear-gradient(160deg,${GL},${G} 50%,${GD})`, WebkitBackgroundClip: "text", color: "transparent" }}>A</span>
          </div>
          <div>
            <span style={{ fontFamily: SERIF, fontSize: 14, fontWeight: 900, letterSpacing: ".14em", textTransform: "uppercase", background: `linear-gradient(160deg,${GL},${G} 50%,${GD})`, WebkitBackgroundClip: "text", color: "transparent", display: "block" }}>
              Art <span style={{ fontSize: ".72em", letterSpacing: ".18em" }}>of</span> Metal
            </span>
            <span style={{ fontSize: "7.5px", letterSpacing: ".22em", color: "#3A2A08", textTransform: "uppercase", fontStyle: "italic", fontFamily: BODY, display: "block" }}>Precious History. Real Value.</span>
          </div>
        </Link>

        <div style={{ display: "flex", gap: 0 }}>
          {[
            { label: "Home", href: "/" },
            { label: "Research", href: "/research" },
            { label: "Catalog", href: "/catalog" },
            { label: "Vault", href: "/vault" },
            { label: "Market", href: "/market" },
          ].map(n => (
            <Link key={n.label} href={n.href} style={{ fontFamily: SERIF, fontSize: 9, letterSpacing: ".14em", color: "#555", textDecoration: "none", textTransform: "uppercase", padding: "0 16px", height: 60, display: "flex", alignItems: "center", borderBottom: "2px solid transparent", transition: "all .18s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#F0EDE8"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#555"; }}
            >{n.label}</Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/auth" style={{ fontFamily: SERIF, fontSize: 8, letterSpacing: ".14em", color: G, textTransform: "uppercase", border: "1px solid rgba(201,168,76,.3)", padding: "8px 18px", borderRadius: 2, textDecoration: "none", transition: "all .2s", display: "flex", alignItems: "center", gap: 6 }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,.07)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,.6)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,.3)"; }}
          >👤 Sign In</Link>
        </div>
      </nav>

      {/* ── HERO LAYOUT ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", minHeight: "calc(100vh - 86px)" }}>

        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column" }}>

          {/* Hero Splash */}
          <div style={{
            flex: 1, position: "relative", overflow: "hidden",
            padding: "52px 36px 40px",
            background: "radial-gradient(ellipse 70% 60% at 30% 40%,#12100A,#080808 65%)",
          }}>
            {/* Floating coin cards */}
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "55%", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: 24 }}>
              {HERO_COINS.map((c, i) => (
                <div key={i} style={{
                  background: "rgba(14,14,14,.9)", border: `1px solid #1E1E1E`,
                  borderRadius: 10, padding: 10,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  backdropFilter: "blur(8px)", flexShrink: 0,
                  transition: "transform .3s, box-shadow .3s",
                }}
                  onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-6px)"; d.style.boxShadow = "0 20px 50px rgba(0,0,0,.8),0 0 0 1px rgba(201,168,76,.15)"; }}
                  onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "none"; d.style.boxShadow = "none"; }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coinImg(c.file)} alt={c.label} style={{ width: 90, height: 90, objectFit: "contain", borderRadius: "50%", background: "#0A0A0A", padding: 6 }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.2"; }} />
                  <div style={{ fontFamily: MONO, fontSize: "7.5px", color: "#555", background: "#0A0A0A", border: `1px solid ${BD}`, padding: "3px 8px", borderRadius: 2, textAlign: "center", lineHeight: 1.5 }}>
                    {c.label}<br />{c.grade}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, color: G }}>{c.val}</div>
                </div>
              ))}
            </div>

            {/* Hero text */}
            <div style={{ position: "relative", zIndex: 2, maxWidth: 380 }}>
              <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: ".28em", color: "#3A2A08", textTransform: "uppercase", marginBottom: 14 }}>The New Generation of</div>
              <h1 style={{ fontFamily: SERIF, fontWeight: 900, lineHeight: .95, letterSpacing: ".02em", marginBottom: 16 }}>
                <span style={{ fontSize: "clamp(13px,2vw,20px)", letterSpacing: ".1em", color: "#5A4A2A", display: "block", marginBottom: 6 }}>Metal &amp; Coin</span>
                <span style={{ fontSize: "clamp(36px,7vw,72px)", display: "block", background: `linear-gradient(160deg,${GL},${G} 40%,${GD})`, WebkitBackgroundClip: "text", color: "transparent", lineHeight: 1 }}>Collecting</span>
              </h1>
              <p style={{ fontFamily: BODY, fontSize: "clamp(14px,2vw,17px)", fontStyle: "italic", color: "#5A4A2A", lineHeight: 1.7, marginBottom: 28 }}>
                Research coins. Build your private vault.<br />Track your collection visually.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <Link href="/vault" style={{ background: `linear-gradient(135deg,${GD},${G},${GL})`, color: "#0A0804", fontFamily: SERIF, fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", padding: "13px 28px", borderRadius: 3, textDecoration: "none", boxShadow: "0 4px 20px rgba(201,168,76,.25)", transition: "all .22s", display: "inline-flex", alignItems: "center", gap: 8 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 30px rgba(201,168,76,.45)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(201,168,76,.25)"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
                >🔒 Start Your Vault</Link>
                <Link href="/catalog" style={{ background: "transparent", color: "#5A4A2A", fontFamily: SERIF, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", padding: "13px 22px", border: "1px solid #2A2010", borderRadius: 3, textDecoration: "none", transition: "all .22s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#4A3818"; (e.currentTarget as HTMLAnchorElement).style.color = G; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2A2010"; (e.currentTarget as HTMLAnchorElement).style.color = "#5A4A2A"; }}
                >Explore Database</Link>
              </div>
            </div>
          </div>

          {/* Price Strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}`, background: "#060606" }}>
            {METALS.map((m, i) => (
              <div key={i} style={{ padding: "14px 20px", borderRight: i < 3 ? `1px solid ${BD}` : "none", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "background .18s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,.03)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, border: `1px solid #1E1E1E`, background: m.bg, color: m.color }}>
                  {m.icon}
                </div>
                <div>
                  <span style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".14em", color: "#3A3030", textTransform: "uppercase", display: "block", marginBottom: 3 }}>{m.label}</span>
                  <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: "#F0EDE8", display: "block", lineHeight: 1 }}>{m.price}</span>
                  <span style={{ fontFamily: MONO, fontSize: 9, color: m.up ? "#4ade80" : "#f87171", display: "block", marginTop: 2 }}>{m.chg}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Collections Grid */}
          <div style={{ padding: "20px 24px", flex: 1 }}>
            <div style={{ fontFamily: SERIF, fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: GD, textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              Browse By Collection
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(201,168,76,.15),transparent)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              {COLLECTIONS.map((c, i) => (
                <Link key={i} href="/catalog" style={{
                  background: BG2, border: `1px solid ${BD}`, borderRadius: 8,
                  padding: "12px 10px", cursor: "pointer", transition: "all .22s", textDecoration: "none",
                  display: "flex", flexDirection: "column", gap: 6, position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "#2A2010"; a.style.transform = "translateY(-2px)"; a.style.boxShadow = "0 8px 24px rgba(0,0,0,.6)"; }}
                  onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = BD; a.style.transform = "none"; a.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", gap: 4, height: 52, marginBottom: 4 }}>
                    {c.files.map((f, fi) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={fi} src={coinImg(f)} alt="" style={{ flex: 1, borderRadius: 4, objectFit: "cover", background: "#0A0A0A", minWidth: 0 }}
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                    ))}
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: 9, fontWeight: 700, letterSpacing: ".05em", color: "#F0EDE8", lineHeight: 1.35 }}>{c.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 8, color: "#3A3030", letterSpacing: ".06em" }}>{c.count} ›</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tagline Bar */}
          <div style={{ background: "#050505", borderTop: `1px solid ${BD}`, padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: SERIF, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: "#2A2010", textTransform: "uppercase" }}>Art of Metal</span>
              <div style={{ width: 1, height: 16, background: BD }} />
              <span style={{ fontFamily: BODY, fontSize: 12, fontStyle: "italic", color: "#2A2010", letterSpacing: ".06em" }}>Build Your Legacy. One Coin At A Time.</span>
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              {["📊 Live Market Data", "🔍 Deep Research", "🔒 Secure Vault", "📈 Visual Tracking"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: MONO, fontSize: 7, letterSpacing: ".1em", color: "#2A2010", textTransform: "uppercase" }}>{f}</div>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT VAULT PANEL ── */}
        <div style={{ background: "#0A0A0A", borderLeft: `1px solid ${BD}`, display: "flex", flexDirection: "column", overflowY: "auto", position: "sticky", top: 86, height: "calc(100vh - 86px)" }}>

          {/* Header */}
          <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${BD}` }}>
            <div style={{ fontFamily: SERIF, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "#F0EDE8", textTransform: "uppercase", textAlign: "center", marginBottom: 12 }}>Private Vault</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 5 }}>
              {[
                { n: "$127,842", l: "Portfolio Value" },
                { n: "47", l: "Total Coins" },
                { n: "+$4,218", l: "Total Gain" },
                { n: "64%", l: "Gold Holdings" },
              ].map((s, i) => (
                <div key={i} style={{ background: BG, border: `1px solid ${BD}`, borderRadius: 5, padding: "9px 10px" }}>
                  <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: G, display: "block", lineHeight: 1 }}>{s.n}</span>
                  <span style={{ fontFamily: MONO, fontSize: "6.5px", letterSpacing: ".1em", color: "#3A3030", textTransform: "uppercase", display: "block", marginTop: 2 }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: `1px solid ${BD}`, overflowX: "auto" }}>
            {["Vault", "Recent", "Top Coins"].map((t, i) => (
              <button key={t} style={{ fontFamily: SERIF, fontSize: 8, letterSpacing: ".1em", color: i === 0 ? G : "#444", textTransform: "uppercase", padding: "9px 12px", cursor: "pointer", whiteSpace: "nowrap", transition: "all .16s", background: "none", border: "none", borderBottom: `2px solid ${i === 0 ? G : "transparent"}` }}>{t}</button>
            ))}
          </div>

          {/* Coin Grid */}
          <div style={{ padding: 8, flex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 6, marginBottom: 10 }}>
              {VAULT_COINS.map((c, i) => (
                <div key={i} style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 7, padding: "10px 8px", cursor: "pointer", transition: "all .2s", position: "relative" }}
                  onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "#2A2010"; d.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = BD; d.style.transform = "none"; }}
                >
                  <div style={{ position: "absolute", top: 7, right: 7, width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 5px rgba(74,222,128,.4)" }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coinImg(c.file)} alt={c.name} style={{ width: 56, height: 56, objectFit: "contain", display: "block", margin: "0 auto 6px", borderRadius: "50%", background: "#070707", padding: 4 }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.2"; }} />
                  <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 700, color: G, display: "block", textAlign: "center", marginBottom: 2 }}>{c.year}</span>
                  <span style={{ fontFamily: SERIF, fontSize: 8, letterSpacing: ".03em", color: "#F0EDE8", textAlign: "center", display: "block", marginBottom: 5, lineHeight: 1.35 }}>{c.name}</span>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontFamily: MONO, fontSize: 7, color: GD, background: "rgba(201,168,76,.06)", padding: "1px 5px", borderRadius: 2 }}>{c.grade}</span>
                    <span style={{ fontFamily: MONO, fontSize: "6.5px", color: "#3A3030" }}>{c.svc}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 5, borderTop: `1px solid ${BD}` }}>
                    <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, color: "#F0EDE8" }}>{c.val}</span>
                    <span style={{ fontFamily: MONO, fontSize: 7, color: "#3A3030" }}>metal {c.mv}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/vault" style={{ display: "block", margin: "0 0 10px", border: `1px solid ${BD}`, borderRadius: 5, padding: 9, fontFamily: SERIF, fontSize: 8, letterSpacing: ".12em", color: "#444", textTransform: "uppercase", textAlign: "center", textDecoration: "none", transition: "all .18s" }}
              onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "#2A2010"; a.style.color = G; }}
              onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = BD; a.style.color = "#444"; }}
            >View All Coins →</Link>
          </div>

          {/* Feature pills */}
          <div style={{ padding: "12px 14px", borderTop: `1px solid ${BD}`, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
            {[
              { ic: "🔍", t: "AI Identification", s: "GPT-4o Vision" },
              { ic: "📊", t: "Live Pricing", s: "Real-time spot" },
              { ic: "🔒", t: "Secure Vault", s: "Your coins, private" },
              { ic: "📷", t: "Photo Upload", s: "Obverse & reverse" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2, opacity: .4 }}>{f.ic}</span>
                <div>
                  <span style={{ fontFamily: SERIF, fontSize: "7.5px", letterSpacing: ".06em", color: "#888", textTransform: "uppercase", display: "block", marginBottom: 2 }}>{f.t}</span>
                  <span style={{ fontFamily: BODY, fontSize: 11, fontStyle: "italic", color: "#3A3030" }}>{f.s}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── PREMIUM FEATURED COINS ── */}
      <div style={{ borderTop: `1px solid ${BD}`, padding: "40px 28px", background: "#060606" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: ".2em", color: GD, textTransform: "uppercase", marginBottom: 6 }}>Featured Pieces</div>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(20px,3vw,32px)", fontWeight: 700, color: GL }}>Premium Coins</h2>
            </div>
            <Link href="/catalog" style={{ fontFamily: SERIF, fontSize: 8, letterSpacing: ".14em", color: GD, textTransform: "uppercase", textDecoration: "none", border: `1px solid rgba(201,168,76,.15)`, padding: "7px 16px", borderRadius: 3, transition: "all .18s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = G; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = GD; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,.15)"; }}
            >View All Coins →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
            {premiumCoins.map((c) => {
              const isGold = c.metal.includes("Gold");
              const isSilver = c.metal.includes("Silver");
              const borderHover = isGold ? "#2A2010" : isSilver ? "#2A2A3A" : "#2A1A08";
              return (
                <div key={c.id} style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, overflow: "hidden", cursor: "pointer", transition: "all .22s", position: "relative", display: "flex", flexDirection: "column" }}
                  onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-3px)"; d.style.boxShadow = "0 12px 30px rgba(0,0,0,.7)"; d.style.borderColor = borderHover; }}
                  onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "none"; d.style.boxShadow = "none"; d.style.borderColor = BD; }}
                >
                  <div style={{ background: "#070707", height: 160, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${BD}`, overflow: "hidden", position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.imageUrl} alt={c.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .3s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "none"; }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  <div style={{ padding: "10px 11px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 3,
                      fontFamily: MONO, fontSize: 7, padding: "2px 6px", borderRadius: 3, textTransform: "uppercase",
                      letterSpacing: ".05em", marginBottom: 5, fontWeight: 600,
                      ...(isGold ? { background: "rgba(201,168,76,.09)", color: G, border: "1px solid rgba(201,168,76,.18)" }
                        : isSilver ? { background: "rgba(160,160,192,.06)", color: "#9090A8", border: "1px solid rgba(160,160,192,.14)" }
                        : { background: "rgba(184,115,51,.07)", color: "#B87333", border: "1px solid rgba(184,115,51,.15)" }),
                    }}>{c.metal.split(" ")[0]}</span>
                    <div style={{ fontFamily: SERIF, fontSize: 10, fontWeight: 700, letterSpacing: ".04em", lineHeight: 1.35, color: "#F0EDE8", marginBottom: 1 }}>{c.title}</div>
                    <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: isGold ? G : isSilver ? "#9090A8" : "#B87333", marginBottom: 8 }}>{c.year}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", paddingTop: 7, borderTop: `1px solid ${BD}`, marginTop: "auto" }}>
                      {[{ v: c.mintage, l: "Mintage" }, { v: c.rarity, l: "Rarity" }, { v: c.grade.split(" ")[0], l: "Grade" }].map((d, di) => (
                        <div key={di} style={{ display: "flex", flexDirection: "column", gap: 1, padding: "0 3px", ...(di === 0 ? { paddingLeft: 0 } : {}) }}>
                          <span style={{ fontFamily: MONO, fontSize: "9.5px", fontWeight: 600, color: "#F0EDE8" }}>{d.v}</span>
                          <span style={{ fontFamily: MONO, fontSize: "6.5px", letterSpacing: ".08em", color: "#2A2A2A", textTransform: "uppercase" }}>{d.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

    </div>
  );
}
