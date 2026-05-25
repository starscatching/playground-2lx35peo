"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/catalog", label: "Catalog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/upload", label: "Upload" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: "#080808", borderBottom: "1px solid #161616" }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #8B6914, #E8C76A)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 800, color: "#000"
          }}>⬡</div>
          <span style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "0.08em" }}>
            <span className="gold-text">ART OF</span>
            <span style={{ color: "#f5f5f5", marginLeft: 6 }}>METAL</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                fontWeight: 500,
                color: pathname === l.href ? "#C9A84C" : "#888",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/portfolio"
            className="btn-gold"
            style={{ padding: "8px 20px", borderRadius: 6, fontSize: "0.8rem", letterSpacing: "0.06em", textDecoration: "none" }}
          >
            MY VAULT
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 1.5,
              background: open ? "#C9A84C" : "#888",
              transition: "background 0.2s",
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#0C0C0C", borderTop: "1px solid #1A1A1A" }} className="md:hidden px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                color: pathname === l.href ? "#C9A84C" : "#888",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
              }}
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
          <Link
            href="/portfolio"
            className="btn-gold"
            onClick={() => setOpen(false)}
            style={{ padding: "10px 20px", borderRadius: 6, fontSize: "0.85rem", textDecoration: "none", display: "inline-block", textAlign: "center" }}
          >
            MY VAULT
          </Link>
        </div>
      )}
    </nav>
  );
}
