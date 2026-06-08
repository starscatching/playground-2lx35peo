"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Overview", sub: "Home", icon: "⊟" },
  { href: "/research", label: "Research", sub: "Coin & Bullion Data", icon: "◎" },
  { href: "/market", label: "Market Watch", sub: "Live Prices & Trends", icon: "◈" },
  { href: "/portfolio", label: "Portfolio", sub: "Track Your Holdings", icon: "◆" },
  { href: "/vault", label: "Vault", sub: "Your Digital Vault", icon: "⬡" },
  { href: "/catalog", label: "Catalog", sub: "Browse Collection", icon: "▦" },
  { href: "/upload", label: "Upload", sub: "Add to Vault", icon: "+" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      position: "fixed", top: 0, left: 0, bottom: 0, width: 160,
      background: "#060606",
      borderRight: "1px solid #141414",
      display: "flex", flexDirection: "column",
      zIndex: 50, overflowY: "auto",
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid #141414" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{
            width: 26, height: 26, borderRadius: "50%",
            background: "linear-gradient(135deg, #8B6914, #E8C76A)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 900, color: "#000", flexShrink: 0,
          }}>⬡</div>
          <span style={{ fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em", color: "#F5F5F5", lineHeight: 1.1 }}>
            ART OF<br /><span className="gold-text">METAL</span>
          </span>
        </div>
        <p style={{ color: "#333", fontSize: "0.55rem", letterSpacing: "0.08em", marginLeft: 34 }}>
          PRECIOUS HISTORY.
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {nav.map(({ href, label, sub, icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{ textDecoration: "none", display: "block" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px",
                background: active ? "rgba(201,168,76,0.08)" : "transparent",
                borderLeft: active ? "2px solid #C9A84C" : "2px solid transparent",
                transition: "all 0.2s",
                cursor: "pointer",
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: active ? "rgba(201,168,76,0.15)" : "#0E0E0E",
                  border: `1px solid ${active ? "#2A2010" : "#1A1A1A"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: active ? "#C9A84C" : "#444",
                  flexShrink: 0, transition: "all 0.2s",
                }}>
                  {icon}
                </span>
                <div>
                  <p style={{
                    fontSize: "0.72rem", fontWeight: 600,
                    color: active ? "#C9A84C" : "#777",
                    letterSpacing: "0.03em",
                  }}>{label}</p>
                  <p style={{ fontSize: "0.58rem", color: "#333", lineHeight: 1.3 }}>{sub}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Auth + Vault */}
      <div style={{ padding: "12px", borderTop: "1px solid #141414", display: "flex", flexDirection: "column", gap: 8 }}>
        <Link href="/auth" style={{
          display: "block", textAlign: "center",
          border: "1px solid #1A1A1A", borderRadius: 8,
          padding: "8px 10px", color: "#555", fontSize: "0.62rem",
          fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none",
          transition: "all .2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2A2010"; (e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1A1A1A"; (e.currentTarget as HTMLAnchorElement).style.color = "#555"; }}
        >
          SIGN IN
        </Link>
        <div style={{ background: "linear-gradient(135deg,#0E0A02,#1A1208)", border: "1px solid #2A2010", borderRadius: 10, padding: "12px", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.08em", marginBottom: 8 }}>THE VAULT</p>
          <Link href="/vault" style={{ display: "block", background: "linear-gradient(135deg,#8B6914,#C9A84C)", color: "#000", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.08em", padding: "6px 10px", borderRadius: 6, textDecoration: "none" }}>
            ENTER VAULT
          </Link>
        </div>
      </div>
    </aside>
  );
}
