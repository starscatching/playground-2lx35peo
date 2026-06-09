"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { coinDatabase, totalCoins } from "@/lib/coinDatabase";
import { localImageForDriveId, metalPlaceholderColor, metalTextColor } from "@/lib/localCoinImages";

const G = "#C9A84C", GD = "#8B6914";
const BD = "#1A1A1A", BG2 = "#0E0E0E";
const MONO = "'JetBrains Mono', monospace";
const SERIF = "'Cinzel', serif";
const BODY = "'Cormorant Garamond', serif";

const PAGE_SIZE = 48;

const METALS = ["All", "Gold", "Silver", "Cupronickel", "Bronze", "Copper", "Brass", "Nickel"];
const DENOMS = ["All", "Dollar", "1/2 dollar", "1/4 Dollar", "Dime", "5 cent", "Cent", "10 dollar", "20 Dollar", "5 dollar"];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [metal, setMetal] = useState("All");
  const [denom, setDenom] = useState("All");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const yFrom = yearFrom ? parseInt(yearFrom, 10) : 0;
    const yTo = yearTo ? parseInt(yearTo, 10) : 9999;
    return coinDatabase.filter(c => {
      if (q && !c.title.toLowerCase().includes(q) && !c.metal.toLowerCase().includes(q) && !String(c.year).includes(q) && !c.denomination.toLowerCase().includes(q)) return false;
      if (metal !== "All" && !c.metal.toLowerCase().includes(metal.toLowerCase())) return false;
      if (denom !== "All" && !c.denomination.toLowerCase().includes(denom.toLowerCase())) return false;
      if (c.year > 0 && (c.year < yFrom || c.year > yTo)) return false;
      return true;
    });
  }, [search, metal, denom, yearFrom, yearTo]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageCoins = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetPage() { setPage(1); }

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#F0EDE8", fontFamily: BODY }}>

      {/* Header */}
      <div style={{ padding: "36px 28px 20px", borderBottom: `1px solid ${BD}` }}>
        <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: ".2em", color: GD, textTransform: "uppercase", marginBottom: 6 }}>Research</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: SERIF, fontSize: "clamp(22px,4vw,36px)", fontWeight: 700, color: "#F0EDE8", lineHeight: 1.1, marginBottom: 4 }}>
              Coin Catalog
            </h1>
            <p style={{ fontFamily: BODY, fontSize: 15, fontStyle: "italic", color: "#555" }}>
              {totalCoins.toLocaleString()} museum-grade coins — American Numismatic Society collection
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontFamily: MONO, fontSize: 8, color: "#333", letterSpacing: ".1em" }}>
              {filtered.length.toLocaleString()} RESULTS
            </span>
            <div style={{ display: "flex", gap: 3 }}>
              {(["grid", "list"] as const).map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  background: view === v ? "rgba(201,168,76,.08)" : "transparent",
                  border: `1px solid ${view === v ? "#2A2010" : BD}`,
                  color: view === v ? G : "#444",
                  borderRadius: 4, padding: "7px 11px", cursor: "pointer",
                  fontFamily: MONO, fontSize: 12, transition: "all .15s",
                }}>{v === "grid" ? "⊞" : "≡"}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: "14px 28px", borderBottom: `1px solid ${BD}`, background: "#060606", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); resetPage(); }}
          placeholder="Search coins, metal, year, denomination…"
          style={{
            flex: "1 1 220px", background: BG2, border: `1px solid ${BD}`, color: "#F0EDE8",
            borderRadius: 4, padding: "9px 14px", fontFamily: MONO, fontSize: 11,
            outline: "none",
          }}
        />

        {/* Metal */}
        <select value={metal} onChange={e => { setMetal(e.target.value); resetPage(); }} style={{ background: BG2, border: `1px solid ${BD}`, color: "#888", borderRadius: 4, padding: "9px 12px", fontFamily: MONO, fontSize: 10, flex: "0 1 130px" }}>
          {METALS.map(m => <option key={m}>{m}</option>)}
        </select>

        {/* Denomination */}
        <select value={denom} onChange={e => { setDenom(e.target.value); resetPage(); }} style={{ background: BG2, border: `1px solid ${BD}`, color: "#888", borderRadius: 4, padding: "9px 12px", fontFamily: MONO, fontSize: 10, flex: "0 1 140px" }}>
          {DENOMS.map(d => <option key={d}>{d}</option>)}
        </select>

        {/* Year range */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input value={yearFrom} onChange={e => { setYearFrom(e.target.value); resetPage(); }} placeholder="From" style={{ width: 64, background: BG2, border: `1px solid ${BD}`, color: "#888", borderRadius: 4, padding: "9px 10px", fontFamily: MONO, fontSize: 10, textAlign: "center" }} />
          <span style={{ color: "#333", fontFamily: MONO, fontSize: 9 }}>–</span>
          <input value={yearTo} onChange={e => { setYearTo(e.target.value); resetPage(); }} placeholder="To" style={{ width: 64, background: BG2, border: `1px solid ${BD}`, color: "#888", borderRadius: 4, padding: "9px 10px", fontFamily: MONO, fontSize: 10, textAlign: "center" }} />
        </div>

        {/* Clear */}
        {(search || metal !== "All" || denom !== "All" || yearFrom || yearTo) && (
          <button onClick={() => { setSearch(""); setMetal("All"); setDenom("All"); setYearFrom(""); setYearTo(""); resetPage(); }} style={{ background: "transparent", border: `1px solid ${BD}`, color: "#444", borderRadius: 4, padding: "8px 14px", fontFamily: MONO, fontSize: 9, cursor: "pointer", letterSpacing: ".08em" }}>
            ✕ Clear
          </button>
        )}
      </div>

      {/* Results */}
      <div style={{ padding: "20px 28px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 40, opacity: .1, marginBottom: 16 }}>⬡</div>
            <p style={{ fontFamily: SERIF, color: "#444", fontSize: 16 }}>No coins match your search.</p>
          </div>
        ) : view === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12, marginBottom: 28 }}>
            {pageCoins.map(coin => {
              const localImg = localImageForDriveId(coin.driveId);
              const ph = metalPlaceholderColor(coin.metal);
              const tc = metalTextColor(coin.metal);
              return (
                <Link key={coin.uid} href={`/coin/${coin.uid}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: BG2, border: `1px solid ${BD}`, borderRadius: 8,
                    overflow: "hidden", cursor: "pointer", transition: "all .2s",
                    display: "flex", flexDirection: "column",
                  }}
                    onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-2px)"; d.style.borderColor = "#2A2010"; d.style.boxShadow = "0 8px 24px rgba(0,0,0,.6)"; }}
                    onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "none"; d.style.borderColor = BD; d.style.boxShadow = "none"; }}
                  >
                    {/* Image area */}
                    <div style={{ height: 140, background: ph, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", borderBottom: `1px solid ${BD}` }}>
                      {localImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={localImg} alt={coin.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }}
                          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontFamily: MONO, fontSize: 18, color: tc, opacity: .3, marginBottom: 4 }}>
                            {coin.metal.includes("Gold") ? "◆" : coin.metal.includes("Silver") ? "○" : "●"}
                          </div>
                          <div style={{ fontFamily: MONO, fontSize: 7, color: tc, opacity: .25, letterSpacing: ".1em" }}>{coin.metal.toUpperCase()}</div>
                        </div>
                      )}
                      {/* Metal badge */}
                      <div style={{ position: "absolute", top: 6, left: 6, fontFamily: MONO, fontSize: 7, padding: "2px 5px", borderRadius: 2, background: "rgba(0,0,0,.6)", color: tc, letterSpacing: ".05em", fontWeight: 600 }}>
                        {coin.metal || "—"}
                      </div>
                    </div>
                    {/* Info */}
                    <div style={{ padding: "9px 10px" }}>
                      <div style={{ fontFamily: SERIF, fontSize: 9, fontWeight: 700, color: "#F0EDE8", lineHeight: 1.4, marginBottom: 3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as never }}>{coin.title}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: MONO, fontSize: 8, color: "#3A3030" }}>{coin.denomination || "—"}</span>
                        <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, color: coin.year > 0 ? G : "#333" }}>{coin.year > 0 ? coin.year : "?"}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* List view */
          <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 28 }}>
            {pageCoins.map(coin => {
              const localImg = localImageForDriveId(coin.driveId);
              const ph = metalPlaceholderColor(coin.metal);
              const tc = metalTextColor(coin.metal);
              return (
                <Link key={coin.uid} href={`/coin/${coin.uid}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 6, padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "border-color .15s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#2A2010"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = BD; }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 6, background: ph, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {localImg
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={localImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                        : <span style={{ color: tc, opacity: .3, fontSize: 16 }}>{coin.metal.includes("Gold") ? "◆" : "○"}</span>
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: SERIF, fontSize: 11, color: "#F0EDE8", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{coin.title}</div>
                      <div style={{ fontFamily: MONO, fontSize: 9, color: "#3A3030" }}>{coin.metal}{coin.denomination ? ` · ${coin.denomination}` : ""}</div>
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: coin.year > 0 ? G : "#333", flexShrink: 0 }}>{coin.year > 0 ? coin.year : "—"}</div>
                    <div style={{ fontFamily: MONO, fontSize: 9, color: "#333", flexShrink: 0 }}>{coin.uid}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ background: "transparent", border: `1px solid ${BD}`, color: page === 1 ? "#222" : "#555", borderRadius: 4, padding: "8px 14px", cursor: page === 1 ? "default" : "pointer", fontFamily: MONO, fontSize: 10 }}>
              ←
            </button>
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              let p = i + 1;
              if (totalPages > 7) {
                if (page <= 4) p = i + 1;
                else if (page >= totalPages - 3) p = totalPages - 6 + i;
                else p = page - 3 + i;
              }
              return (
                <button key={p} onClick={() => setPage(p)} style={{
                  background: p === page ? "rgba(201,168,76,.1)" : "transparent",
                  border: `1px solid ${p === page ? "#2A2010" : BD}`,
                  color: p === page ? G : "#555",
                  borderRadius: 4, padding: "8px 12px", cursor: "pointer",
                  fontFamily: MONO, fontSize: 10, minWidth: 36,
                }}>{p}</button>
              );
            })}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ background: "transparent", border: `1px solid ${BD}`, color: page === totalPages ? "#222" : "#555", borderRadius: 4, padding: "8px 14px", cursor: page === totalPages ? "default" : "pointer", fontFamily: MONO, fontSize: 10 }}>
              →
            </button>
            <span style={{ fontFamily: MONO, fontSize: 8, color: "#333", marginLeft: 8 }}>
              Page {page} of {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
