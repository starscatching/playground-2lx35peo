import Link from "next/link";
import { topAuctionRecords, seriesNames, POPULATION_INDEX, rarestQuarterEagle } from "@/lib/research";

function cleanCoinFacts(text: string): string {
  return text
    .replace(/\d{1,2}\/\d{1,2}\/\d{2,4},?\s*\d{1,2}:\d{2}\s*[AP]M/g, "")
    .replace(/Page \d+ of \d+/g, "")
    .replace(/PCGS The Standard for the Rare Coin Industry/g, "")
    .replace(/View on Photograde™/g, "")
    .replace(/All Your Hobby Needs\. One App\. Install Now/g, "")
    .replace(/×\s*PCGS CoinFacts/g, "")
    .replace(/Install Now/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const HISTORICAL_NOTES: Record<string, string> = {
  "Morgan Dollar (1878-1921)":
    "The Coinage Act of 1873 demonetized silver, ending the earlier silver dollar. The Bland-Allison Act of 1878 forced the U.S. Mint to buy silver and strike it into dollars — the Morgan dollar, named for designer George T. Morgan, struck without interruption from 1878–1904, then again in 1921. Key dates include 1889-CC, 1893-S, and 1895 (proof only); the Redfield hoard, GSA sales, and Continental-Illinois Bank hoard shaped the surviving population.",
  "Lincoln Cent (Wheat Reverse) (1909-1958)":
    "Wheat Reverse cents were struck at Philadelphia, Denver, and San Francisco from 1909–1958. Philadelphia coins are generally well made; Denver and San Francisco issues are often poorly struck from worn dies. Key dates: 1909-S VDB, 1914-D, 1922 \"Plain\", 1909-S, and 1931-S, plus the 1917 and 1936 Doubled Die Obverse varieties.",
};

export default function ResearchPage() {
  const series = seriesNames();
  const rarest = rarestQuarterEagle();
  const survivors = parseInt(rarest.estimated_survivors_all || "0");
  const ms60 = parseInt(rarest.estimated_survivors_ms60 || "0");
  const ms65 = parseInt(rarest.estimated_survivors_ms65 || "0");
  const mintage = parseInt(rarest.mintage || "0");

  const funnelSteps = [
    { label: "Original Mintage", value: mintage },
    { label: "Estimated Surviving", value: survivors },
    { label: "Graded MS-60 or Better", value: ms60 },
    { label: "Graded MS-65 (Gem)", value: ms65 },
  ];
  const maxV = funnelSteps[0].value || 1;

  return (
    <div className="pm-root" style={{ minHeight: "100vh", padding: "0 0 60px" }}>
      <div style={{ padding: "48px 40px 0" }}>
        <p className="pm-mono" style={{ color: "#C9A84C", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", marginBottom: 10 }}>COIN &amp; BULLION DATA</p>
        <h1 className="pm-cinzel" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: "#F5F5F5", marginBottom: 10 }}>Research</h1>
        <p style={{ color: "#888", fontSize: "0.95rem", maxWidth: 640, fontStyle: "italic" }}>
          Population reports, auction records, and survival estimates pulled directly from PCGS and the master coin database — not marketing copy.
        </p>
      </div>

      {/* Survival Funnel case study */}
      <div style={{ padding: "40px" }}>
        <div className="pm-sec-eyebrow" style={{ textAlign: "left" }}>Signature Analysis</div>
        <h2 className="pm-cinzel" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#F5F5F5", marginBottom: 6 }}>The Survival Funnel</h2>
        <p style={{ color: "#777", fontSize: "0.85rem", marginBottom: 24, fontStyle: "italic" }}>
          Case study — {rarest.coin_name} ({rarest.year}-{rarest.mint}), PCGS #{rarest.pcgs_number}
        </p>
        <div className="pm-card" style={{ maxWidth: 780, display: "flex", flexDirection: "column", gap: 10 }}>
          {funnelSteps.map((s, i) => {
            const pct = (s.value / maxV) * 100;
            const thin = pct < 15;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 190, fontSize: "0.72rem", color: "#999", letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</div>
                <div style={{ flex: 1, background: "#141414", borderRadius: 4, height: 30, position: "relative", overflow: "visible" }}>
                  <div style={{
                    width: `${Math.max(4, pct)}%`, height: "100%", borderRadius: 4,
                    background: `linear-gradient(90deg, rgba(212,175,55,${0.25 + i * 0.2}), rgba(212,175,55,${0.5 + i * 0.15}))`,
                    display: "flex", alignItems: "center",
                    justifyContent: thin ? "flex-start" : "flex-end",
                    paddingRight: thin ? 0 : 10,
                  }}>
                    {!thin && <span className="pm-mono" style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1a1a1a" }}>{s.value.toLocaleString()}</span>}
                  </div>
                  {thin && (
                    <span className="pm-mono" style={{ position: "absolute", left: `calc(${Math.max(4, pct)}% + 10px)`, top: "50%", transform: "translateY(-50%)", fontSize: "0.78rem", fontWeight: 700, color: "#F0EAD6", whiteSpace: "nowrap" }}>
                      {s.value.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ color: "#666", fontSize: "0.8rem", marginTop: 16, maxWidth: 640, fontStyle: "italic" }}>
          Of {mintage.toLocaleString()} struck, an estimated {survivors.toLocaleString()} survive today across all grades — PCGS numismatic rarity {rarest.numismatic_rarity_all}. Auction record: {rarest.auction_record_price ? `$${Number(rarest.auction_record_price).toLocaleString()}` : "—"} ({rarest.auction_record_grade}, {rarest.auction_record_company}, {rarest.auction_record_date}).
        </p>
      </div>

      {/* Auction records by series */}
      {series.map((s) => {
        const records = topAuctionRecords(s, 8);
        return (
          <div key={s} style={{ padding: "0 40px 40px" }}>
            <div className="pm-sec-eyebrow" style={{ textAlign: "left" }}>Market Intelligence</div>
            <h2 className="pm-cinzel" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F5F5F5", marginBottom: 4 }}>{s}</h2>
            <p style={{ color: "#666", fontSize: "0.82rem", marginBottom: 16, fontStyle: "italic", maxWidth: 780 }}>
              {cleanCoinFacts((HISTORICAL_NOTES[s] || "")).slice(0, 480)}
            </p>
            <div className="pm-card" style={{ overflowX: "auto" }}>
              <table className="pm-table">
                <thead>
                  <tr><th>Specimen</th><th>Lots Realized</th><th>Auction Record</th></tr>
                </thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr key={i}>
                      <td>{r.coin_title}</td>
                      <td>{r.lots.toLocaleString()}</td>
                      <td style={{ color: "#C9A84C", fontWeight: 700 }}>{r.record_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* Population report index */}
      <div style={{ padding: "0 40px 40px" }}>
        <div className="pm-sec-eyebrow" style={{ textAlign: "left" }}>PCGS Data On File</div>
        <h2 className="pm-cinzel" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F5F5F5", marginBottom: 16 }}>Population Reports</h2>
        <div className="pm-card" style={{ overflowX: "auto" }}>
          <table className="pm-table">
            <thead>
              <tr><th>Series</th><th>Report Type</th><th>Pages</th><th>Labels Extracted</th><th>Source Date</th></tr>
            </thead>
            <tbody>
              {POPULATION_INDEX.map((p, i) => (
                <tr key={i}>
                  <td>{p.series}</td>
                  <td>{p.report_type}</td>
                  <td>{p.page_count}</td>
                  <td>{p.coin_rows_extracted || "—"}</td>
                  <td>{p.source_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ padding: "0 40px" }}>
        <Link href="/catalog" className="pm-cta-secondary" style={{ fontSize: 11 }}>Browse the Coin Series Database →</Link>
      </div>
    </div>
  );
}
