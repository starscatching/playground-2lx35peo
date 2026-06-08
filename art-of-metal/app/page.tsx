"use client";
import Link from "next/link";
import { coinImg } from "@/lib/images";

const COINS = [
  "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg",
  "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg",
  "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg",
  "1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg",
  "1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg",
  "1932_51_29_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg",
  "1932_51_25_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg",
  "1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg",
];

const SCENES = [
  {
    file: COINS[0],
    title: "Gold Double\nEagle",
    sub: "United States · 1932",
    tags: ["NGC MS-65", "Gold", "$20"],
    tall: true,
  },
  {
    file: COINS[2],
    title: "Saint-Gaudens\nDouble Eagle",
    sub: "United States · 1915",
    tags: ["PCGS AU-58", "Gold"],
  },
  {
    file: COINS[1],
    title: "Silver\nQuarter",
    sub: "United States · 1932",
    tags: ["PCGS MS-64", "Silver"],
  },
  {
    file: COINS[3],
    title: "Liberty\nNickel",
    sub: "United States · 1916",
    tags: ["NGC MS-64"],
  },
  {
    file: COINS[4],
    title: "Jefferson\nNickel",
    sub: "United States · 1934",
    tags: ["NGC MS-65"],
  },
];

const CARDS = [
  { file: COINS[5], name: "Morgan Dollar", year: "1885-O", grade: "MS-63 NGC" },
  { file: COINS[6], name: "Trade Dollar", year: "1877-CC", grade: "VF-20 PCGS" },
  { file: COINS[7], name: "Buffalo Nickel", year: "1936", grade: "MS-65 NGC" },
];

const ARCHIVE = [
  { file: COINS[0], title: "Gold Double Eagle", count: "613 items" },
  { file: COINS[1], title: "Silver Quarter", count: "1,246 items" },
  { file: COINS[2], title: "Saint-Gaudens $20", count: "278 items" },
  { file: COINS[3], title: "Liberty Nickel", count: "312 items" },
  { file: COINS[4], title: "Jefferson Nickel", count: "389 items" },
  { file: COINS[5], title: "Morgan Dollar", count: "184 items" },
];

export default function HomePage() {
  return (
    <div style={{ background: "#030303", color: "#f8edd2", fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh" }}>

      {/* Global radial glow background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(circle at 20% 0%, rgba(242,198,109,.15), transparent 30rem),
          radial-gradient(circle at 85% 18%, rgba(230,230,230,.08), transparent 26rem),
          linear-gradient(180deg,#030303,#080604 45%,#020202)
        `,
      }} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,.6))",
      }} />

      {/* ── TOP SHIMMER BAR ── */}
      <div style={{
        position: "relative", zIndex: 10,
        height: 7,
        background: "linear-gradient(90deg,transparent,#7d4a16,#fff0b5,#b77924,transparent)",
        boxShadow: "0 0 28px rgba(242,198,109,.8)",
      }} />

      {/* ── HEADER ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 20,
        background: "rgba(2,2,2,.82)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(242,198,109,.22)",
      }}>
        <div style={{ maxWidth: 1320, margin: "auto", padding: "16px 28px", display: "flex", alignItems: "center", gap: 22 }}>
          <div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(1.2rem,3vw,1.8rem)", fontWeight: 900, letterSpacing: ".09em", textShadow: "0 0 25px rgba(242,198,109,.35)", color: "#f8edd2" }}>
              ART OF METAL
            </div>
            <div style={{ color: "#f2c66d", fontSize: ".6rem", letterSpacing: ".25em", textTransform: "uppercase", marginTop: 2 }}>
              Coin Collectors Platform
            </div>
          </div>
          <nav style={{ marginLeft: "auto", display: "flex", gap: 22, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: "#c7b89b", fontWeight: 900 }}>
            {[
              { label: "Collections", href: "/catalog" },
              { label: "Research", href: "/research" },
              { label: "Market", href: "/market" },
              { label: "Vault", href: "/vault" },
            ].map(n => (
              <Link key={n.label} href={n.href} style={{ transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f2c66d")}
                onMouseLeave={e => (e.currentTarget.style.color = "#c7b89b")}
              >{n.label}</Link>
            ))}
          </nav>
          <Link href="/portfolio" className="btn-gold" style={{ marginLeft: 12, padding: "10px 20px", fontSize: ".7rem" }}>
            Enter Vault
          </Link>
        </div>
      </header>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <section style={{ maxWidth: 1320, margin: "auto", padding: "54px 28px 80px", display: "grid", gridTemplateColumns: ".82fr 1.18fr", gap: 34, alignItems: "center", minHeight: "90vh" }}>

          {/* Left: copy */}
          <div>
            <p style={{ color: "#f2c66d", letterSpacing: ".25em", textTransform: "uppercase", fontWeight: 900, fontSize: ".78rem", marginBottom: 16 }}>
              The collector&apos;s standard
            </p>
            <h1 style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "clamp(3.5rem,9vw,8rem)",
              lineHeight: .84, letterSpacing: ".01em",
              background: "linear-gradient(#fff5cf,#d99b3b 52%,#fff2b8)",
              WebkitBackgroundClip: "text", color: "transparent",
              textShadow: "0 0 42px rgba(242,198,109,.22)",
              marginBottom: 24,
            }}>
              ART<br />OF<br />METAL
            </h1>
            <p style={{ color: "rgba(248,237,210,.78)", fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.55, maxWidth: 560, fontWeight: 700, marginBottom: 28 }}>
              Research, vault, and track the rarest coins in history. Built for collectors who understand that precious metals are precious history.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/vault" className="btn-gold">Start Your Vault</Link>
              <Link href="/catalog" className="btn-outline">Explore Database</Link>
            </div>
          </div>

          {/* Right: spinning-framed hero coin */}
          <div style={{ position: "relative", padding: 10, borderRadius: 32, overflow: "hidden",
            background: "linear-gradient(135deg,#fff0b4,#4b2a0c 18%,rgba(255,255,255,.13) 44%,#d99b3b 65%,#1b1006)",
            boxShadow: "0 32px 90px rgba(0,0,0,.82), 0 0 48px rgba(242,198,109,.22)",
          }}>
            {/* Spinning shimmer overlay */}
            <div style={{
              position: "absolute", inset: "-55%",
              background: "conic-gradient(transparent,rgba(255,255,255,.3),transparent,rgba(242,198,109,.3),transparent)",
              animation: "spin 18s linear infinite",
              filter: "blur(14px)",
            }} />
            <div style={{ position: "relative", zIndex: 1, borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,.14)", background: "#050505" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coinImg(COINS[0])}
                alt="Featured coin"
                style={{ width: "100%", height: "min(68vh,720px)", objectFit: "cover", objectPosition: "center", filter: "contrast(1.08) saturate(1.1) brightness(.95)" }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          </div>
        </section>

        {/* ── SCENE GRID — Collections ── */}
        <section style={{ maxWidth: 1320, margin: "auto", padding: "0 28px 82px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 28, marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(2rem,5vw,4.5rem)", lineHeight: .93, color: "#fff0c4" }}>
              Featured<br />Collections
            </h2>
            <p style={{ maxWidth: 480, color: "#c7b89b", fontSize: "1rem", fontWeight: 700, lineHeight: 1.55 }}>
              From ancient Greek tetradrachms to modern American Eagles — every era of coinage, curated.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.25fr .875fr .875fr", gap: 18 }}>
            {SCENES.slice(0, 5).map((scene, i) => {
              const isTall = i === 0;
              return (
                <Link key={i} href="/catalog"
                  style={{
                    gridRow: isTall ? "span 2" : undefined,
                    position: "relative",
                    minHeight: isTall ? 780 : 370,
                    borderRadius: 30,
                    overflow: "hidden",
                    border: "1px solid rgba(242,198,109,.28)",
                    boxShadow: "0 28px 80px rgba(0,0,0,.75), inset 0 0 50px rgba(242,198,109,.06)",
                    background: "#050505",
                    display: "block",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(242,198,109,.55)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(242,198,109,.28)"; }}
                >
                  {/* Gradient overlay */}
                  <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.78) 72%)" }} />
                  <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06), inset 0 0 90px rgba(242,198,109,.12)", borderRadius: "inherit" }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coinImg(scene.file)}
                    alt={scene.title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.08) brightness(.72) saturate(1.05)", transform: "scale(1.04)", transition: "transform .6s ease" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  />
                  {/* Copy */}
                  <div style={{ position: "absolute", zIndex: 3, left: 24, right: 24, bottom: 24 }}>
                    <h3 style={{
                      fontFamily: "'Cinzel', Georgia, serif",
                      color: "#fff0c4", fontSize: "clamp(1.4rem,2.5vw,2.5rem)", lineHeight: .98,
                      textShadow: "0 0 18px rgba(242,198,109,.3), 0 4px 12px #000",
                      whiteSpace: "pre-line",
                    }}>{scene.title}</h3>
                    <p style={{ color: "rgba(248,237,210,.82)", marginTop: 8, fontWeight: 900, fontSize: "1rem" }}>{scene.sub}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
                      {scene.tags.map((t, ti) => (
                        <span key={ti} style={{ border: "1px solid rgba(242,198,109,.38)", background: "rgba(0,0,0,.45)", color: "#ffe2a2", borderRadius: 999, padding: "6px 11px", fontSize: ".7rem", fontWeight: 900, letterSpacing: ".08em" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── PORTRAIT CARDS ── */}
        <section style={{ maxWidth: 1320, margin: "auto", padding: "0 28px 82px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 28, marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(2rem,5vw,4.5rem)", lineHeight: .93, color: "#fff0c4" }}>
              Rare<br />Coins
            </h2>
            <p style={{ maxWidth: 480, color: "#c7b89b", fontSize: "1rem", fontWeight: 700, lineHeight: 1.55 }}>
              High-grade certified coins from the finest collections. Each piece verified, graded, and tracked.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {CARDS.map((c, i) => (
              <Link key={i} href="/catalog" style={{ display: "block" }}>
                <div style={{
                  borderRadius: 30, padding: 9,
                  background: "linear-gradient(135deg,#fff0b4,#33200b 25%,#e2aa4b 70%,#130b04)",
                  boxShadow: "0 28px 85px rgba(0,0,0,.78), 0 0 42px rgba(242,198,109,.2)",
                  transition: "transform .3s ease, box-shadow .3s ease",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 40px 100px rgba(0,0,0,.85), 0 0 60px rgba(242,198,109,.35)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 28px 85px rgba(0,0,0,.78), 0 0 42px rgba(242,198,109,.2)"; }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coinImg(c.file)}
                    alt={c.name}
                    style={{ borderRadius: 22, width: "100%", aspectRatio: "2/3", objectFit: "cover", border: "1px solid rgba(255,255,255,.12)" }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.background = "#111"; }}
                  />
                </div>
                <div style={{ padding: "14px 4px 0" }}>
                  <p style={{ fontFamily: "'Cinzel', Georgia, serif", color: "#fff0c4", fontWeight: 700, fontSize: "1rem" }}>{c.name}</p>
                  <p style={{ color: "#c7b89b", fontSize: ".82rem", marginTop: 4, fontWeight: 700 }}>{c.year} · {c.grade}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── VAULT CTA ── */}
        <section style={{ maxWidth: 1320, margin: "auto", padding: "0 28px 82px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>

            {/* Panel */}
            <div style={{
              border: "1px solid rgba(242,198,109,.26)", borderRadius: 34,
              padding: "clamp(26px,4vw,50px)",
              background: "linear-gradient(145deg,rgba(255,255,255,.06),rgba(255,255,255,.015))",
              boxShadow: "0 28px 85px rgba(0,0,0,.72), 0 0 35px rgba(242,198,109,.1)",
            }}>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "#fff0c4", fontSize: "clamp(2rem,4vw,4rem)", lineHeight: .96 }}>
                Your Private<br />Vault
              </h2>
              <p style={{ color: "#c7b89b", fontWeight: 700, fontSize: "1rem", marginTop: 16, lineHeight: 1.6 }}>
                Upload your coins. Track their value in real time. Build a portfolio worth sharing.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
                {[
                  { label: "Upload photos", desc: "Obverse & reverse, any quality" },
                  { label: "Get grading insights", desc: "AI-powered condition analysis" },
                  { label: "Track market value", desc: "Live spot prices × metal weight" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: 14, border: "1px solid rgba(242,198,109,.14)", borderRadius: 16, background: "rgba(0,0,0,.35)", color: "#c7b89b", fontWeight: 700, fontSize: ".9rem", alignItems: "center" }}>
                    <span style={{ color: "#f2c66d", fontSize: "1.2rem", minWidth: 28 }}>{i + 1}.</span>
                    <div>
                      <b style={{ color: "#f2c66d" }}>{s.label}</b>
                      <span style={{ color: "#c7b89b", marginLeft: 8 }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, display: "flex", gap: 14 }}>
                <Link href="/upload" className="btn-gold">Upload a Coin</Link>
                <Link href="/portfolio" className="btn-outline">View Portfolio</Link>
              </div>
            </div>

            {/* Coin display */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {COINS.slice(0, 4).map((file, i) => (
                <div key={i} style={{
                  borderRadius: 24, overflow: "hidden",
                  border: "1px solid rgba(242,198,109,.2)",
                  background: "#050505",
                  boxShadow: "0 20px 60px rgba(0,0,0,.7)",
                  aspectRatio: "1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 16,
                  position: "relative",
                  transition: "border-color .3s, box-shadow .3s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(242,198,109,.5)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 28px 80px rgba(0,0,0,.8), 0 0 30px rgba(242,198,109,.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(242,198,109,.2)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(0,0,0,.7)"; }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coinImg(file)}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARCHIVE GRID ── */}
        <section style={{ maxWidth: 1320, margin: "auto", padding: "0 28px 82px" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(2rem,5vw,4.5rem)", lineHeight: .93, color: "#fff0c4", marginBottom: 28 }}>
            The Archive
          </h2>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
            gap: 1, border: "1px solid rgba(242,198,109,.22)", borderRadius: 28,
            overflow: "hidden", background: "rgba(242,198,109,.18)",
            boxShadow: "0 28px 85px rgba(0,0,0,.72)",
          }}>
            {ARCHIVE.map((a, i) => (
              <Link key={i} href="/catalog" style={{
                background: "#070707", minHeight: 200, padding: 13,
                display: "block", transition: "background .2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#0e0a02"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#070707"; }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coinImg(a.file)}
                  alt={a.title}
                  style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 14, filter: "brightness(.78) contrast(1.08)" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "#fff0c4", fontSize: ".85rem", marginTop: 10, lineHeight: 1.3 }}>{a.title}</h3>
                <p style={{ color: "#c7b89b", fontWeight: 700, fontSize: ".72rem", marginTop: 4 }}>{a.count}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ padding: "50px 28px 75px", borderTop: "1px solid rgba(242,198,109,.15)", textAlign: "center", color: "#555" }}>
          <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.1rem", color: "#f2c66d", letterSpacing: ".15em", marginBottom: 10 }}>ART OF METAL</p>
          <p style={{ fontSize: ".8rem", color: "#555", marginBottom: 24 }}>Precious History. Real Value.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 28, fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#666", marginBottom: 32 }}>
            {["Catalog", "Portfolio", "Research", "Market", "Vault", "Upload"].map((l, i) => (
              <Link key={i} href="/catalog" style={{ transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f2c66d")}
                onMouseLeave={e => (e.currentTarget.style.color = "#666")}
              >{l}</Link>
            ))}
          </div>
          <p style={{ fontSize: ".7rem", color: "#2a2a2a" }}>© 2026 Art of Metal. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}
