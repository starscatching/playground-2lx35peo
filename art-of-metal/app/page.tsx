"use client";
import Link from "next/link";
import { coinImg } from "@/lib/images";
import { premiumCoins } from "@/lib/premiumCoinsData";

const G = "#C9A84C", GD = "#8B6914", GL = "#E8C76A";
const BG = "#070604", BG2 = "#0C0A07", BD = "#1A1810";
const MONO = "'JetBrains Mono', monospace";
const SERIF = "'Cinzel', serif";
const BODY = "'Cormorant Garamond', serif";

const TICKER = [
  { sym: "XAU/USD", price: "$2,377.40", chg: "+12.47", pct: "+0.38%", up: true },
  { sym: "XAG/USD", price: "$28.96", chg: "+0.18", pct: "+0.85%", up: true },
  { sym: "XPT/USD", price: "$983.50", chg: "-3.72", pct: "-0.39%", up: false },
  { sym: "PALL", price: "$1,032.90", chg: "+1.20", pct: "+0.12%", up: true },
  { sym: "PCGS-3000", price: "3,841", chg: "+18", pct: "+0.47%", up: true },
  { sym: "NGC-NCS", price: "2,214", chg: "+9", pct: "+0.41%", up: true },
];

const MARKET_SNAP = [
  { label: "GOLD", price: "$2,377.40", chg: "+1.28%", up: true },
  { label: "SILVER", price: "$28.96", chg: "+0.85%", up: true },
  { label: "PLATINUM", price: "$983.50", chg: "-0.39%", up: false },
  { label: "PALLADIUM", price: "$1,032.90", chg: "+0.12%", up: true },
];

const POPULAR = ["Morgan Dollar", "Peace Dollar", "Saint-Gaudens", "Indian Head", "Mercury Dime", "Gold Bullion"];

const CATEGORIES = [
  { icon: "📖", title: "RESEARCH", sub: "In-depth guides and\nhistorical insights.", href: "/research", cta: "EXPLORE" },
  { icon: "📊", title: "BULLION RESEARCH", sub: "Gold, silver, platinum\nand palladium data.", href: "/market", cta: "EXPLORE" },
  { icon: "🏛️", title: "AUCTION DATA", sub: "Real auction records\nand price history.", href: "/catalog", cta: "EXPLORE" },
  { icon: "🔐", title: "VAULT", sub: "Secure your collection\nand track your assets.", href: "/vault", cta: "ACCESS" },
  { icon: "💼", title: "PORTFOLIO", sub: "Track performance and\nmanage your holdings.", href: "/vault", cta: "VIEW" },
  { icon: "👥", title: "FORUM", sub: "Connect with collectors\nworldwide.", href: "/catalog", cta: "JOIN" },
];

const FEATURED_COINS = [
  { file: "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg", name: "1893-S Morgan Dollar", year: "1893", metal: "Silver", rarity: 96 },
  { file: "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg", name: "1907 Saint-Gaudens\nHigh Relief", year: "1907", metal: "Gold", rarity: 95 },
  { file: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg", name: "1922 Peace Dollar", year: "1922", metal: "Silver", rarity: 91 },
  { file: "1913_61_4_Gold_20_Dollar,_United_States,_1913._1913.61.4_obv.jpg", name: "1913 Indian Head\nEagle", year: "1913", metal: "Gold", rarity: 98 },
  { file: "1913_62_1_Silver_1_2_dollar,_United_States,_1913._1913.62.1_obv.jpg", name: "1942 Walking Liberty\nHalf Dollar", year: "1942", metal: "Silver", rarity: 90 },
  { file: "1914_80_2_Gold_10_dollar,_United_States,_1906._1914.80.2_obv.jpg", name: "1857 Liberty Head\nDouble Eagle", year: "1857", metal: "Gold", rarity: 94 },
];

const FEAT_COLLECTIONS = [
  { name: "U.S. Gold Coins", count: "613 Items", files: ["1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg", "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg"] },
  { name: "U.S. Silver Coins", count: "1,246 Items", files: ["1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg", "1913_62_1_Silver_1_2_dollar,_United_States,_1913._1913.62.1_obv.jpg"] },
  { name: "Early Copper", count: "312 Items", files: ["1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg", "1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg"] },
  { name: "Gold Bullion", count: "278 Items", files: ["1913_61_4_Gold_20_Dollar,_United_States,_1913._1913.61.4_obv.jpg", "1914_80_3_Gold_20_Dollar,_United_States,_1906._1914.80.3_obv.jpg"] },
  { name: "Silver Bullion", count: "389 Items", files: ["1913_62_1_Silver_1_2_dollar,_United_States,_1913._1913.62.1_obv.jpg", "1913_143_9_Silver_1_4_Dollar,_United_States,_1911._1913.143.9_rev.jpg"] },
  { name: "Ancient Coins", count: "184 Items", files: ["1915_16_1_Gold_2_1_2_Dollar,_United_States,_1915._1915.16.1_obv.jpg", "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg"] },
];

export default function HomePage() {
  return (
    <div style={{ background: BG, color: "#F0EDE8", fontFamily: BODY, minHeight: "100vh", overflowX: "hidden" }}>

      {/* TICKER */}
      <div style={{ background: "#030201", borderBottom: `1px solid ${BD}`, height: 26, overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", animation: "ticker 50s linear infinite" }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 20px", height: 26, fontFamily: MONO, fontSize: 9, borderRight: `1px solid ${BD}` }}>
              <span style={{ color: GD, fontWeight: 600 }}>{t.sym}</span>
              <span style={{ color: "#D0CCC0" }}>{t.price}</span>
              <span style={{ color: t.up ? "#4ade80" : "#f87171" }}>{t.up ? "▲" : "▼"} {t.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 58,
        background: "rgba(7,6,4,.97)", borderBottom: `1px solid ${BD}`,
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", border: `1.5px solid rgba(201,168,76,.5)`, background: "radial-gradient(circle at 38% 32%,#1E1608,#080604)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 900, background: `linear-gradient(160deg,${GL},${G} 50%,${GD})`, WebkitBackgroundClip: "text", color: "transparent" }}>A</span>
          </div>
          <div>
            <span style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 900, letterSpacing: ".14em", textTransform: "uppercase", background: `linear-gradient(160deg,${GL},${G} 50%,${GD})`, WebkitBackgroundClip: "text", color: "transparent", display: "block" }}>Art <span style={{ fontSize: ".72em", letterSpacing: ".18em" }}>of</span> Metal</span>
            <span style={{ fontSize: "7px", letterSpacing: ".22em", color: "#3A2A08", textTransform: "uppercase", fontStyle: "italic", fontFamily: BODY, display: "block" }}>Preserving History</span>
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
            <Link key={n.label} href={n.href} style={{ fontFamily: SERIF, fontSize: 8.5, letterSpacing: ".14em", color: "#666", textDecoration: "none", textTransform: "uppercase", padding: "0 16px", height: 58, display: "flex", alignItems: "center", transition: "color .18s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#666"; }}
            >{n.label}</Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/auth" style={{ fontFamily: SERIF, fontSize: 8, letterSpacing: ".14em", color: G, textTransform: "uppercase", border: `1px solid rgba(201,168,76,.3)`, padding: "8px 18px", borderRadius: 2, textDecoration: "none", transition: "all .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,.07)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,.6)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,.3)"; }}
          >Sign In</Link>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Background coin tiled overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/coins/coin1.jpg" alt="" style={{ position: "absolute", right: -60, top: -60, width: 520, height: 520, objectFit: "cover", opacity: .06, filter: "blur(2px)" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/coins/coin2.jpg" alt="" style={{ position: "absolute", left: -40, bottom: -40, width: 380, height: 380, objectFit: "cover", opacity: .04, filter: "blur(3px)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,.06) 0%, transparent 60%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "52px 24px 40px" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1, maxWidth: 120, height: 1, background: `linear-gradient(to right, transparent, rgba(201,168,76,.3))` }} />
            <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: ".3em", color: "#4A3A18", textTransform: "uppercase" }}>Art of Metal</span>
            <div style={{ flex: 1, maxWidth: 120, height: 1, background: `linear-gradient(to left, transparent, rgba(201,168,76,.3))` }} />
          </div>

          {/* Main title */}
          <h1 style={{ fontFamily: SERIF, fontWeight: 900, letterSpacing: ".08em", lineHeight: .9, marginBottom: 10 }}>
            <span style={{ fontSize: "clamp(40px,8vw,96px)", display: "block", background: `linear-gradient(160deg,${GL} 10%,${G} 50%,${GD})`, WebkitBackgroundClip: "text", color: "transparent" }}>ART OF METAL</span>
          </h1>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: ".22em", color: "#4A3A18", textTransform: "uppercase", marginBottom: 30 }}>A Visual Archive of World Coins</p>

          {/* Search bar */}
          <div style={{ maxWidth: 620, margin: "0 auto 16px", display: "flex", gap: 0 }}>
            <input
              type="text"
              placeholder="Search by date, mint, type, grade, variety, or keyword…"
              style={{
                flex: 1, background: "rgba(14,12,8,.95)", border: `1px solid rgba(201,168,76,.2)`,
                borderRight: "none", borderRadius: "3px 0 0 3px", padding: "13px 18px",
                fontFamily: BODY, fontSize: 14, color: "#D0CCC0", outline: "none",
                letterSpacing: ".02em",
              }}
            />
            <button style={{
              background: `linear-gradient(135deg,${GD},${G})`, border: "none",
              borderRadius: "0 3px 3px 0", padding: "13px 20px", cursor: "pointer",
              color: "#0A0804", fontFamily: MONO, fontSize: 12, fontWeight: 700,
            }}>⌕</button>
          </div>

          {/* Popular searches */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: MONO, fontSize: 7.5, color: "#3A3028", letterSpacing: ".1em" }}>Popular Searches:</span>
            {POPULAR.map((p, i) => (
              <Link key={i} href={`/catalog?q=${encodeURIComponent(p)}`} style={{ fontFamily: MONO, fontSize: 7.5, color: "#6A5A38", letterSpacing: ".06em", textDecoration: "none", borderBottom: "1px solid rgba(201,168,76,.15)", paddingBottom: 1, transition: "color .15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#6A5A38"; }}
              >{p}</Link>
            ))}
          </div>
        </div>

        {/* Market Snapshot */}
        <div style={{ position: "absolute", top: 18, right: 24, background: "rgba(12,10,7,.92)", border: `1px solid rgba(201,168,76,.12)`, borderRadius: 6, padding: "12px 14px", backdropFilter: "blur(12px)", minWidth: 160 }}>
          <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".2em", color: "#3A3028", textTransform: "uppercase", marginBottom: 10 }}>Market Snapshot</div>
          {MARKET_SNAP.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i < 3 ? 8 : 0, paddingBottom: i < 3 ? 8 : 0, borderBottom: i < 3 ? `1px solid ${BD}` : "none" }}>
              <span style={{ fontFamily: MONO, fontSize: 7, color: "#5A4A28", letterSpacing: ".08em" }}>{m.label}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: "#E0D8C8", lineHeight: 1 }}>{m.price}</div>
                <div style={{ fontFamily: MONO, fontSize: 7.5, color: m.up ? "#4ade80" : "#f87171" }}>{m.chg}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ CATEGORY CARDS ══ */}
      <div style={{ borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}`, background: BG2 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6,1fr)" }}>
          {CATEGORIES.map((c, i) => (
            <Link key={i} href={c.href} style={{
              display: "flex", flexDirection: "column", gap: 6, padding: "20px 16px",
              borderRight: i < 5 ? `1px solid ${BD}` : "none",
              textDecoration: "none", transition: "background .18s", cursor: "pointer",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,.03)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              <div style={{ fontSize: 20, marginBottom: 2 }}>{c.icon}</div>
              <div style={{ fontFamily: SERIF, fontSize: 8, fontWeight: 700, letterSpacing: ".16em", color: G, textTransform: "uppercase", lineHeight: 1.4 }}>{c.title}</div>
              <div style={{ fontFamily: BODY, fontSize: 12, fontStyle: "italic", color: "#5A4A38", lineHeight: 1.55, whiteSpace: "pre-line" }}>{c.sub}</div>
              <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".14em", color: GD, textTransform: "uppercase", marginTop: "auto" }}>{c.cta} →</div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══ FEATURED COINS ══ */}
      <div style={{ padding: "40px 32px", background: BG }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: ".22em", color: "#3A3028", textTransform: "uppercase", marginBottom: 6 }}>Featured Coins</div>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 700, color: GL, letterSpacing: ".06em" }}>FEATURED COINS</h2>
            </div>
            <Link href="/catalog" style={{ fontFamily: SERIF, fontSize: 8, letterSpacing: ".14em", color: GD, textTransform: "uppercase", textDecoration: "none", border: `1px solid rgba(201,168,76,.15)`, padding: "7px 16px", borderRadius: 3, transition: "all .18s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = G; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = GD; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,.15)"; }}
            >View All →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 14 }}>
            {FEATURED_COINS.map((c, i) => {
              const isGold = c.metal === "Gold";
              const borderCol = isGold ? "rgba(201,168,76,.18)" : "rgba(140,140,170,.14)";
              const metalCol = isGold ? G : "#9090A8";
              return (
                <Link key={i} href="/catalog" style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, padding: "18px 12px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer", transition: "all .22s", textDecoration: "none", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-3px)"; a.style.boxShadow = `0 12px 30px rgba(0,0,0,.7), 0 0 0 1px ${borderCol}`; }}
                  onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "none"; a.style.boxShadow = "none"; }}
                >
                  {/* Rarity score badge */}
                  <div style={{ position: "absolute", top: 10, right: 10, width: 28, height: 28, borderRadius: "50%", background: isGold ? "rgba(201,168,76,.12)" : "rgba(140,140,170,.1)", border: `1px solid ${borderCol}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 700, color: metalCol }}>{c.rarity}</span>
                  </div>
                  {/* Coin image */}
                  <div style={{ width: 88, height: 88, borderRadius: "50%", overflow: "hidden", background: "#050402", border: `1px solid ${borderCol}`, flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={coinImg(c.file)} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.15"; }} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: SERIF, fontSize: 9.5, fontWeight: 700, color: "#E8E0D0", lineHeight: 1.4, marginBottom: 3, whiteSpace: "pre-line" }}>{c.name}</div>
                    <div style={{ fontFamily: MONO, fontSize: 8, color: metalCol }}>{c.year}</div>
                    <div style={{ fontFamily: MONO, fontSize: 7, color: "#3A3028", marginBottom: 1 }}>{c.metal}</div>
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".08em", color: "#3A3028", textTransform: "uppercase", marginTop: 2 }}>
                    <span style={{ color: GD }}>Rarity Score</span>
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".1em", color: "#4A3818", textTransform: "uppercase" }}>View Details →</div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ FEATURED COLLECTIONS ══ */}
      <div style={{ padding: "32px 32px 40px", background: "#080604", borderTop: `1px solid ${BD}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: ".22em", color: "#3A3028", textTransform: "uppercase", marginBottom: 6 }}>Browse by Type</div>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 700, color: GL, letterSpacing: ".06em" }}>FEATURED COLLECTIONS</h2>
            </div>
            <Link href="/catalog" style={{ fontFamily: SERIF, fontSize: 8, letterSpacing: ".14em", color: GD, textTransform: "uppercase", textDecoration: "none", border: `1px solid rgba(201,168,76,.15)`, padding: "7px 16px", borderRadius: 3, transition: "all .18s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = G; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = GD; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,.15)"; }}
            >View All Collections →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12 }}>
            {FEAT_COLLECTIONS.map((c, i) => (
              <Link key={i} href="/catalog" style={{
                background: BG2, border: `1px solid ${BD}`, borderRadius: 8,
                overflow: "hidden", cursor: "pointer", transition: "all .22s", textDecoration: "none",
                display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-2px)"; a.style.borderColor = "rgba(201,168,76,.18)"; a.style.boxShadow = "0 8px 24px rgba(0,0,0,.6)"; }}
                onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "none"; a.style.borderColor = BD; a.style.boxShadow = "none"; }}
              >
                <div style={{ height: 72, display: "flex", overflow: "hidden", background: "#050402" }}>
                  {c.files.map((f, fi) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={fi} src={coinImg(f)} alt="" style={{ flex: 1, objectFit: "cover", minWidth: 0 }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.15"; }} />
                  ))}
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontFamily: SERIF, fontSize: 9, fontWeight: 700, color: "#E8E0D0", letterSpacing: ".04em", marginBottom: 3 }}>{c.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 7.5, color: "#4A3818", letterSpacing: ".06em" }}>{c.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══ RESEARCH + FUNNEL + PRICE HISTORY ══ */}
      <div style={{ padding: "40px 32px", borderTop: `1px solid ${BD}`, background: BG }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

          {/* Research Spotlight */}
          <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BD}` }}>
              <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".2em", color: GD, textTransform: "uppercase", marginBottom: 4 }}>Research Spotlight</div>
              <div style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 700, color: GL }}>1893-S Morgan Dollar</div>
              <div style={{ fontFamily: MONO, fontSize: 8, color: "#4A3818" }}>The Key Date</div>
            </div>
            <div style={{ display: "flex", gap: 14, padding: "14px 18px" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", background: "#050402", border: `1px solid rgba(201,168,76,.1)`, flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coinImg("1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg")} alt="Spotlight coin" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.1"; }} />
              </div>
              <div>
                <p style={{ fontFamily: BODY, fontSize: 12, fontStyle: "italic", color: "#7A6A50", lineHeight: 1.7, margin: 0 }}>One of the most famous and sought-after coins in American numismatics. Low mintage, high demand, and timeless appeal.</p>
              </div>
            </div>
            <div style={{ padding: "0 18px 14px" }}>
              <Link href="/catalog" style={{ fontFamily: SERIF, fontSize: 7.5, letterSpacing: ".14em", color: G, textTransform: "uppercase", textDecoration: "none", border: `1px solid rgba(201,168,76,.2)`, padding: "7px 14px", borderRadius: 3, display: "inline-block", transition: "all .18s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >View Full Research →</Link>
            </div>
          </div>

          {/* Survival Funnel */}
          <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BD}` }}>
              <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".2em", color: GD, textTransform: "uppercase", marginBottom: 4 }}>Survival Funnel Spotlight</div>
              <div style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 700, color: GL }}>1893-S Morgan Dollar</div>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Estimated Minted", val: "2,000,000" },
                { label: "Estimated Surviving", val: "750,000" },
                { label: "Estimated Collectible", val: "150,000" },
                { label: "Estimated High Grade", val: "12,000" },
                { label: "Estimated Gem", val: "800" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: BODY, fontSize: 12, fontStyle: "italic", color: "#7A6A50" }}>{row.label}</span>
                  <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: i === 0 ? "#A09070" : i === 4 ? G : "#D0C8B8" }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price History */}
          <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BD}` }}>
              <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".2em", color: GD, textTransform: "uppercase", marginBottom: 4 }}>Price History Snapshot</div>
              <div style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 700, color: GL }}>1893-S Morgan Dollar</div>
              <div style={{ fontFamily: MONO, fontSize: 8, color: "#4A3818" }}>5 Year Auction Trend</div>
            </div>
            <div style={{ padding: "14px 18px" }}>
              {/* Simple SVG chart */}
              <svg width="100%" height="90" viewBox="0 0 260 90" style={{ display: "block" }}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={G} stopOpacity=".25" />
                    <stop offset="100%" stopColor={G} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,70 L40,60 L80,55 L120,45 L160,40 L200,28 L240,18 L260,12" fill="none" stroke={G} strokeWidth="1.5" />
                <path d="M0,70 L40,60 L80,55 L120,45 L160,40 L200,28 L240,18 L260,12 L260,90 L0,90 Z" fill="url(#chartGrad)" />
                {[0,40,80,120,160,200,240].map((x, i) => (
                  <text key={i} x={x} y={88} style={{ fontSize: 7, fill: "#4A3818", fontFamily: "monospace" }}>{2019 + i}</text>
                ))}
              </svg>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                {[
                  { l: "Highest Recorded", v: "$132,000", sub: "PCGS MS66+ Aug 2023" },
                  { l: "Average (MS65)", v: "$24,750" },
                  { l: "Total Auctions", v: "1,248" },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: i === 1 ? "center" : i === 2 ? "right" : "left" }}>
                    <div style={{ fontFamily: MONO, fontSize: 7, color: "#4A3818", letterSpacing: ".05em", marginBottom: 2 }}>{s.l}</div>
                    <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: i === 0 ? G : "#D0C8B8" }}>{s.v}</div>
                    {s.sub && <div style={{ fontFamily: MONO, fontSize: 6.5, color: "#3A3028" }}>{s.sub}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MARKET TRENDS + AUCTION + PORTFOLIO + VAULT ══ */}
      <div style={{ padding: "0 32px 40px", background: BG }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr 1fr", gap: 16 }}>

          {/* Market Trends */}
          <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BD}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".2em", color: GD, textTransform: "uppercase", marginBottom: 2 }}>Market Trends</div>
                <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: "#F0EDE8" }}>Gold (XAU)</div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: "#F0EDE8" }}>$2,377.40 <span style={{ color: "#4ade80", fontSize: 9 }}>▲ +1.28%</span></div>
              </div>
              <Link href="/market" style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".12em", color: GD, textTransform: "uppercase", textDecoration: "none", border: `1px solid ${BD}`, padding: "5px 10px", borderRadius: 2 }}>Full Market →</Link>
            </div>
            <div style={{ padding: "12px 16px" }}>
              <svg width="100%" height="80" viewBox="0 0 320 80" style={{ display: "block" }}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={G} stopOpacity=".3" />
                    <stop offset="100%" stopColor={G} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,55 L30,50 L60,52 L90,44 L120,40 L150,42 L180,34 L210,30 L240,26 L270,20 L300,15 L320,12" fill="none" stroke={G} strokeWidth="1.5" />
                <path d="M0,55 L30,50 L60,52 L90,44 L120,40 L150,42 L180,34 L210,30 L240,26 L270,20 L300,15 L320,12 L320,80 L0,80 Z" fill="url(#goldGrad)" />
                {["2019","2020","2021","2022","2023","2024","2025"].map((yr, i) => (
                  <text key={i} x={i * 46 + 2} y={78} style={{ fontSize: 7, fill: "#3A3028", fontFamily: "monospace" }}>{yr}</text>
                ))}
              </svg>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                {["1D","1W","1M","3M","1Y","5Y"].map((p, i) => (
                  <button key={i} style={{ fontFamily: MONO, fontSize: 7, padding: "3px 7px", borderRadius: 2, cursor: "pointer", background: i === 4 ? "rgba(201,168,76,.15)" : "transparent", border: `1px solid ${i === 4 ? "rgba(201,168,76,.3)" : BD}`, color: i === 4 ? G : "#4A3818" }}>{p}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Auction Activity */}
          <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BD}` }}>
              <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".2em", color: GD, textTransform: "uppercase", marginBottom: 2 }}>Auction Activity</div>
              <Link href="/catalog" style={{ fontFamily: MONO, fontSize: 7, color: "#3A3028", textDecoration: "none", letterSpacing: ".08em" }}>View All →</Link>
            </div>
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { l: "Total Auctions (30 Days)", v: "12,842", chg: "+18.3%" },
                { l: "Total Sales Volume", v: "$48.7M", chg: "+22.1%" },
                { l: "Average Sale Price", v: "$3,789", chg: "+15.3%" },
                { l: "Unsold Rate", v: "12.4%", chg: "-2.1%" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: MONO, fontSize: 7, color: "#4A3818", letterSpacing: ".06em", marginBottom: 3 }}>{s.l}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: "#E8E0D0" }}>{s.v}</span>
                    <span style={{ fontFamily: MONO, fontSize: 8, color: s.chg.startsWith("-") ? "#f87171" : "#4ade80" }}>{s.chg}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Overview */}
          <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BD}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".2em", color: GD, textTransform: "uppercase" }}>Portfolio Overview</div>
              <Link href="/vault" style={{ fontFamily: MONO, fontSize: 7, color: "#3A3028", textDecoration: "none" }}>View Portfolio →</Link>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ fontFamily: MONO, fontSize: 7.5, color: "#4A3818", marginBottom: 4 }}>Total Portfolio Value</div>
              <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color: G, marginBottom: 2 }}>$127,842.36</div>
              <div style={{ fontFamily: MONO, fontSize: 8, color: "#4ade80", marginBottom: 14 }}>▲ +$3,214 (+3.27% 24h)</div>
              {/* Simple pie chart */}
              <svg width="80" height="80" viewBox="0 0 36 36" style={{ display: "block", margin: "0 auto 14px" }}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1A1810" strokeWidth="3.2" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={G} strokeWidth="3.2" strokeDasharray="45.2 54.8" strokeDashoffset="25" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#9090A8" strokeWidth="3.2" strokeDasharray="28.7 71.3" strokeDashoffset="-20.2" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#B87333" strokeWidth="3.2" strokeDasharray="16.4 83.6" strokeDashoffset="-48.9" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6A7A4A" strokeWidth="3.2" strokeDasharray="6.4 93.6" strokeDashoffset="-65.3" />
              </svg>
              {[
                { c: G, l: "Gold Coins", pct: "45.2%" },
                { c: "#9090A8", l: "Silver Coins", pct: "28.7%" },
                { c: "#B87333", l: "Copper", pct: "16.4%" },
                { c: "#6A7A4A", l: "Other", pct: "6.4%" },
              ].map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: d.c, flexShrink: 0 }} />
                  <span style={{ fontFamily: MONO, fontSize: 7.5, color: "#7A6A50", flex: 1 }}>{d.l}</span>
                  <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 600, color: "#C0B898" }}>{d.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vault Preview */}
          <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BD}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".2em", color: GD, textTransform: "uppercase" }}>Vault Preview</div>
              <Link href="/vault" style={{ fontFamily: MONO, fontSize: 7, color: "#3A3028", textDecoration: "none" }}>Enter Vault →</Link>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ width: 52, height: 52, borderRadius: 8, border: `1px solid rgba(201,168,76,.15)`, background: "rgba(201,168,76,.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 14px" }}>🔐</div>
              {[
                { ic: "✓", t: "Bank-level security" },
                { ic: "✓", t: "Encrypted Data" },
                { ic: "✓", t: "Private & Confidential" },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "#4ade80", fontFamily: MONO, fontSize: 9 }}>{f.ic}</span>
                  <span style={{ fontFamily: BODY, fontSize: 12, fontStyle: "italic", color: "#7A6A50" }}>{f.t}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: "8px 0", borderTop: `1px solid ${BD}` }}>
                <div style={{ fontFamily: MONO, fontSize: 7, color: "#4A3818", marginBottom: 3 }}>Your collection is</div>
                <div style={{ fontFamily: MONO, fontSize: 8, color: "#9A8A60" }}>safe and secure.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ THE VAULT CTA ══ */}
      <div style={{ padding: "40px 32px", background: "#060402", borderTop: `1px solid ${BD}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: ".3em", color: "#3A3028", textTransform: "uppercase", marginBottom: 8 }}>Premium Feature</div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, color: GL, letterSpacing: ".04em", marginBottom: 8 }}>THE VAULT</h2>
            <p style={{ fontFamily: BODY, fontSize: 16, fontStyle: "italic", color: "#5A4A38", marginBottom: 0 }}>Preserve. Protect. Pass Down.</p>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { ic: "🛡️", t: "Secure Storage", s: "Bank-level security\nfor your collection." },
              { ic: "📊", t: "Portfolio Tracking", s: "Track performance and\nhistorical value." },
              { ic: "📋", t: "Insurance Ready", s: "Document and insure\nyour assets." },
              { ic: "⚖️", t: "Legacy Protection", s: "Preserve your legacy\nfor generations." },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 18, opacity: .6 }}>{f.ic}</span>
                <div>
                  <div style={{ fontFamily: SERIF, fontSize: 8, letterSpacing: ".12em", color: G, textTransform: "uppercase", marginBottom: 3 }}>{f.t}</div>
                  <div style={{ fontFamily: BODY, fontSize: 11, fontStyle: "italic", color: "#4A3A28", lineHeight: 1.5, whiteSpace: "pre-line" }}>{f.s}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/vault" style={{ background: `linear-gradient(135deg,${GD},${G},${GL})`, color: "#0A0804", fontFamily: SERIF, fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", padding: "14px 30px", borderRadius: 3, textDecoration: "none", boxShadow: "0 4px 20px rgba(201,168,76,.25)", transition: "all .22s", whiteSpace: "nowrap" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 30px rgba(201,168,76,.45)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(201,168,76,.25)"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
          >Enter Your Vault →</Link>
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <div style={{ padding: "18px 32px", borderTop: `1px solid ${BD}`, background: "#030201", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: BODY, fontSize: 11, fontStyle: "italic", color: "#2A2018" }}>© 2024 Art of Metal. All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Terms of Service", "Contact"].map((l, i) => (
            <Link key={i} href="/" style={{ fontFamily: MONO, fontSize: 7.5, color: "#3A3028", textDecoration: "none", letterSpacing: ".06em", transition: "color .15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = G; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#3A3028"; }}
            >{l}</Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        input::placeholder { color: #3A3028; }
        input:focus { outline: none; border-color: rgba(201,168,76,.4) !important; }
      `}</style>
    </div>
  );
}
