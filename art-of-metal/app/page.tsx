import Link from "next/link";

const features = [
  {
    icon: "◎",
    title: "Coin Catalog",
    desc: "Browse thousands of coins from around the world — sorted by country, era, material, and rarity.",
    href: "/catalog",
  },
  {
    icon: "◈",
    title: "Your Portfolio",
    desc: "Upload photos of your coins, track your collection, and keep every detail in one secure place.",
    href: "/portfolio",
  },
  {
    icon: "◆",
    title: "Image Vault",
    desc: "High-resolution coin imagery organized by collection. Obverse, reverse, and details preserved.",
    href: "/upload",
  },
];

const stats = [
  { value: "6,000+", label: "Coin Images" },
  { value: "50+", label: "Countries" },
  { value: "100+", label: "Years Covered" },
  { value: "∞", label: "Your Collection" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 780, textAlign: "center", position: "relative" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid #2A2010",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 36,
            background: "rgba(201,168,76,0.05)",
          }}>
            <span style={{ color: "#C9A84C", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em" }}>
              NUMISMATIC EXCELLENCE
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 28,
          }}>
            <span style={{ color: "#F5F5F5" }}>Your Coins.</span>
            <br />
            <span className="gold-text">Your Legacy.</span>
          </h1>

          <p style={{
            color: "#666",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 auto 48px",
          }}>
            Art of Metal is the premium platform for serious coin collectors.
            Catalog your collection, upload your images, and preserve your numismatic legacy.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/catalog"
              className="btn-gold"
              style={{ padding: "14px 36px", borderRadius: 8, fontSize: "0.85rem", letterSpacing: "0.08em", textDecoration: "none" }}
            >
              BROWSE CATALOG
            </Link>
            <Link
              href="/upload"
              style={{
                padding: "14px 36px",
                borderRadius: 8,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textDecoration: "none",
                border: "1px solid #2A2A2A",
                color: "#888",
                transition: "all 0.2s",
              }}
            >
              UPLOAD COINS
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: "1px solid #161616", borderBottom: "1px solid #161616", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                textAlign: "center",
                padding: "32px 0",
                borderRight: i < 3 ? "1px solid #161616" : "none",
              }}>
                <p className="gold-text" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ color: "#444", fontSize: "0.72rem", letterSpacing: "0.1em", marginTop: 8, fontWeight: 500 }}>
                  {s.label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ color: "#C9A84C", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", marginBottom: 16 }}>
              THE PLATFORM
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#F5F5F5" }}>
              Everything a collector needs
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {features.map((f) => (
              <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: 32, borderRadius: 14, height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{
                    width: 48, height: 48,
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid #2A2010",
                    borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, color: "#C9A84C",
                    marginBottom: 24,
                  }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F0F0F0", marginBottom: 12 }}>{f.title}</h3>
                  <p style={{ color: "#555", fontSize: "0.88rem", lineHeight: 1.7, flex: 1 }}>{f.desc}</p>
                  <p style={{ color: "#C9A84C", fontSize: "0.78rem", marginTop: 24, letterSpacing: "0.06em", fontWeight: 600 }}>
                    EXPLORE →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, #0E0A02, #161006)",
            border: "1px solid #2A2010",
            borderRadius: 20,
            padding: "64px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />
            <p style={{ color: "#C9A84C", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", marginBottom: 20, position: "relative" }}>
              START TODAY
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#F5F5F5", marginBottom: 16, position: "relative" }}>
              Build your vault.
            </h2>
            <p style={{ color: "#555", fontSize: "1rem", marginBottom: 36, position: "relative" }}>
              Upload your coin images and start cataloging your collection in minutes.
            </p>
            <Link
              href="/upload"
              className="btn-gold"
              style={{ padding: "14px 40px", borderRadius: 8, fontSize: "0.85rem", letterSpacing: "0.08em", textDecoration: "none", position: "relative" }}
            >
              START UPLOADING
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
