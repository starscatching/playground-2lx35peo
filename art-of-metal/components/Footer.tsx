"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#060606", borderTop: "1px solid #161616" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "linear-gradient(135deg, #8B6914, #E8C76A)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, color: "#000"
              }}>⬡</div>
              <span style={{ fontWeight: 700, letterSpacing: "0.08em", fontSize: "0.95rem" }}>
                <span className="gold-text">ART OF</span>
                <span style={{ color: "#f5f5f5", marginLeft: 5 }}>METAL</span>
              </span>
            </div>
            <p style={{ color: "#555", fontSize: "0.82rem", lineHeight: 1.7 }}>
              The premier platform for numismatic collectors.<br />
              Catalog, track, and showcase your collection.
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{ color: "#C9A84C", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 14 }}>PLATFORM</p>
            <div className="flex flex-col gap-2">
              {[["Catalog", "/catalog"], ["Portfolio", "/portfolio"], ["Upload", "/upload"]].map(([label, href]) => (
                <Link key={href} href={href} style={{ color: "#555", fontSize: "0.83rem", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#C9A84C")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <div>
            <p style={{ color: "#C9A84C", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 14 }}>THE VAULT</p>
            <p style={{ color: "#555", fontSize: "0.82rem", lineHeight: 1.7 }}>
              Every coin tells a story.<br />
              Yours deserves to be preserved.
            </p>
          </div>
        </div>

        <div className="gold-divider my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p style={{ color: "#333", fontSize: "0.75rem" }}>
            © 2026 Art of Metal. All rights reserved.
          </p>
          <p style={{ color: "#333", fontSize: "0.75rem", letterSpacing: "0.06em" }}>
            NUMISMATIC EXCELLENCE
          </p>
        </div>
      </div>
    </footer>
  );
}
