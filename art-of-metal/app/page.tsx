"use client";
import Link from "next/link";
import MetalPrices from "@/components/MetalPrices";
import FeaturedCollections from "@/components/FeaturedCollections";
import PortfolioWidget from "@/components/PortfolioWidget";
import RecentAdditions from "@/components/RecentAdditions";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Main content */}
      <div style={{ flex: 1, padding: "0 0 40px" }}>

        {/* Top bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 28px",
          borderBottom: "1px solid #141414",
          background: "#060606",
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div>
            <p style={{ color: "#C9A84C", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em" }}>DASHBOARD</p>
            <p style={{ color: "#888", fontSize: "0.75rem" }}>Home</p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input
              placeholder="Search coins, metals, categories..."
              style={{
                background: "#0E0E0E", border: "1px solid #1A1A1A",
                color: "#888", borderRadius: 6, padding: "8px 14px",
                fontSize: "0.78rem", width: 260,
              }}
            />
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg, #8B6914, #E8C76A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: "#000", fontWeight: 800, cursor: "pointer",
            }}>R</div>
          </div>
        </div>

        {/* Hero */}
        <div style={{
          position: "relative", height: 340, overflow: "hidden",
          background: "#060606",
          borderBottom: "1px solid #141414",
        }}>
          {/* Background images grid */}
          <div style={{
            position: "absolute", inset: 0,
            display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
            opacity: 0.25, gap: 2,
          }}>
            {[
              "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg",
              "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg",
              "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg",
              "1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg",
              "1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg",
            ].map((f, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={`https://storage.googleapis.com/art-of-metal-coins/coins/ans/${encodeURIComponent(f)}`}
                alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
            ))}
          </div>

          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, #060606 35%, rgba(6,6,6,0.7) 60%, rgba(6,6,6,0.3) 100%)",
          }} />

          {/* Hero text */}
          <div style={{ position: "relative", padding: "48px 32px", maxWidth: 520 }}>
            <h1 style={{
              fontSize: "3.5rem", fontWeight: 900, lineHeight: 1,
              letterSpacing: "-0.02em", marginBottom: 16,
            }}>
              <span className="gold-text">ART</span>
              <span style={{ color: "#F5F5F5" }}> of METAL</span>
            </h1>
            <p style={{ color: "#C9A84C", fontSize: "0.9rem", fontWeight: 500, marginBottom: 10, letterSpacing: "0.05em" }}>
              The Ultimate Platform for Serious Collectors
            </p>
            <p style={{ color: "#555", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 28, maxWidth: 380 }}>
              In-depth research. Real-time data. Secure vault.<br />
              Everything you need to collect with confidence.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/research" className="btn-gold"
                style={{ padding: "10px 22px", borderRadius: 6, fontSize: "0.75rem", letterSpacing: "0.1em", textDecoration: "none" }}>
                EXPLORE RESEARCH
              </Link>
              <Link href="/portfolio"
                style={{
                  padding: "10px 22px", borderRadius: 6, fontSize: "0.75rem", letterSpacing: "0.1em",
                  textDecoration: "none", border: "1px solid #2A2A2A", color: "#888",
                }}>
                VIEW PORTFOLIO
              </Link>
            </div>
          </div>
        </div>

        {/* Metal prices ticker */}
        <MetalPrices />

        {/* Featured Collections */}
        <div style={{ padding: "28px 28px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <p style={{ color: "#F0F0F0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em" }}>
              FEATURED COLLECTIONS
            </p>
            <Link href="/catalog" style={{ color: "#C9A84C", fontSize: "0.72rem", textDecoration: "none", letterSpacing: "0.08em" }}>
              Browse All →
            </Link>
          </div>
          <FeaturedCollections />
        </div>

        {/* Bottom widgets row */}
        <div style={{ padding: "28px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

          {/* Research Spotlight */}
          <div style={{
            background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 14, padding: 20,
          }}>
            <p style={{ color: "#888", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: 16 }}>
              RESEARCH SPOTLIGHT
            </p>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
              <div style={{
                width: 80, height: 80, borderRadius: 8, flexShrink: 0,
                background: "#0C0C0C", border: "1px solid #1A1A1A", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://storage.googleapis.com/art-of-metal-coins/coins/ans/${encodeURIComponent("1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg")}`}
                  alt="Featured coin" style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
              </div>
              <div>
                <p style={{ color: "#F0F0F0", fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>
                  Morgan Silver Dollar
                </p>
                <p style={{ color: "#C9A84C", fontSize: "0.7rem", fontWeight: 600 }}>The Key Date</p>
              </div>
            </div>
            <p style={{ color: "#555", fontSize: "0.78rem", lineHeight: 1.65, marginBottom: 16 }}>
              One of the most famous and sought-after coins in American numismatics. Low mintage, high demand, timeless appeal.
            </p>
            <Link href="/coin/1"
              style={{
                display: "inline-block", border: "1px solid #2A2010",
                color: "#C9A84C", fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.08em", padding: "7px 14px", borderRadius: 6,
                textDecoration: "none",
              }}>
              VIEW FULL RESEARCH →
            </Link>
          </div>

          {/* Portfolio Overview */}
          <PortfolioWidget />

          {/* Auction Highlight */}
          <div style={{
            background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 14, padding: 20,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <p style={{ color: "#888", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em" }}>
                AUCTION HIGHLIGHT
              </p>
              <Link href="/catalog" style={{ color: "#C9A84C", fontSize: "0.65rem", textDecoration: "none" }}>View All</Link>
            </div>

            <div style={{
              background: "#060606", border: "1px solid #1A1A1A", borderRadius: 10,
              padding: 16, marginBottom: 14,
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 8, flexShrink: 0,
                  background: "#0C0C0C", border: "1px solid #1A1A1A", overflow: "hidden",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://storage.googleapis.com/art-of-metal-coins/coins/ans/${encodeURIComponent("1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg")}`}
                    alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
                </div>
                <div>
                  <p style={{ color: "#F0F0F0", fontWeight: 700, fontSize: "0.85rem" }}>1932 Gold Double Eagle</p>
                  <p style={{ color: "#888", fontSize: "0.7rem" }}>PCGS AU58</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ color: "#444", fontSize: "0.65rem" }}>Current Bid</p>
                  <p className="gold-text" style={{ fontSize: "1.3rem", fontWeight: 800 }}>$2,450</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "#444", fontSize: "0.65rem" }}>Ends in</p>
                  <p style={{ color: "#F0F0F0", fontSize: "0.78rem", fontWeight: 600 }}>2d 14h 32m</p>
                </div>
              </div>
            </div>

            <button className="btn-gold" style={{
              width: "100%", padding: "10px", borderRadius: 8,
              fontSize: "0.72rem", letterSpacing: "0.1em",
              border: "none", cursor: "pointer",
            }}>
              VIEW AUCTION
            </button>
          </div>
        </div>

        {/* Bottom features bar */}
        <div style={{ padding: "0 28px" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
            borderTop: "1px solid #141414", paddingTop: 24,
          }}>
            {[
              { icon: "◎", label: "Deep Research", sub: "Historical data, mintage, and more" },
              { icon: "◈", label: "Real-Time Data", sub: "Live metal prices & trends" },
              { icon: "⬡", label: "Secure Vault", sub: "Bank-level security for your collection" },
              { icon: "◆", label: "Portfolio Tracking", sub: "Track performance and value" },
              { icon: "▦", label: "Expert Insights", sub: "Articles, guides, and analysis" },
              { icon: "◉", label: "Global Community", sub: "Connect with serious collectors" },
            ].map((f, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0 12px" }}>
                <p style={{ color: "#C9A84C", fontSize: 20, marginBottom: 8 }}>{f.icon}</p>
                <p style={{ color: "#888", fontSize: "0.7rem", fontWeight: 600, marginBottom: 4 }}>{f.label}</p>
                <p style={{ color: "#333", fontSize: "0.62rem", lineHeight: 1.5 }}>{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — Market Watch + Recent Additions */}
      <div style={{
        width: 240, flexShrink: 0,
        borderLeft: "1px solid #141414",
        background: "#060606",
        display: "flex", flexDirection: "column",
      }}>
        {/* Market Watch */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #141414" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ color: "#888", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em" }}>MARKET WATCH</p>
            <Link href="/market" style={{ color: "#C9A84C", fontSize: "0.62rem", textDecoration: "none" }}>View All</Link>
          </div>

          {[
            { metal: "GOLD", price: "2,377.40", change: "+1.28%", up: true },
            { metal: "SILVER", price: "28.96", change: "+0.85%", up: true },
            { metal: "PLATINUM", price: "983.50", change: "-0.35%", up: false },
            { metal: "PALLADIUM", price: "1,032.90", change: "+0.12%", up: true },
          ].map(m => (
            <div key={m.metal} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 0", borderBottom: "1px solid #0E0E0E",
            }}>
              <div>
                <p style={{ color: "#F0F0F0", fontWeight: 700, fontSize: "0.85rem" }}>{m.metal}</p>
                <p style={{ color: "#C9A84C", fontWeight: 800, fontSize: "1rem" }}>${m.price}</p>
              </div>
              <span style={{
                fontSize: "0.7rem", fontWeight: 600,
                color: m.up ? "#4ade80" : "#f87171",
                background: m.up ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)",
                border: `1px solid ${m.up ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"}`,
                padding: "3px 7px", borderRadius: 100,
              }}>
                {m.change}
              </span>
            </div>
          ))}
          <p style={{ color: "#333", fontSize: "0.58rem", marginTop: 8 }}>Prices delayed 5 minutes ⓘ</p>
        </div>

        {/* Recent Additions */}
        <RecentAdditions />
      </div>
    </div>
  );
}
