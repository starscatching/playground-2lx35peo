import { AUCTION_PRICES, topAuctionRecords, seriesNames } from "@/lib/research";

export default function AuctionsPage() {
  const series = seriesNames();
  const grandTop = topAuctionRecords(undefined, 15);
  const totalLots = AUCTION_PRICES.reduce((s, a) => s + (a.lots || 0), 0);
  const totalVolume = AUCTION_PRICES.reduce((s, a) => s + (a.record_price_num || 0), 0);

  return (
    <div className="pm-root" style={{ minHeight: "100vh" }}>
      <div style={{ padding: "40px 40px 0" }}>
        <p className="pm-mono" style={{ color: "#C9A84C", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", marginBottom: 10 }}>HERITAGE &amp; MORE</p>
        <h1 className="pm-cinzel" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: "#F5F5F5", marginBottom: 10 }}>Auctions</h1>
        <p style={{ color: "#888", fontSize: "0.95rem", maxWidth: 640, fontStyle: "italic", marginBottom: 32 }}>
          Realized PCGS auction records across {series.length} tracked series — {AUCTION_PRICES.length.toLocaleString()} priced lots on file.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 44 }}>
          <div className="pm-card">
            <p className="pm-mono" style={{ color: "#666", fontSize: "0.62rem", letterSpacing: "0.1em", marginBottom: 6 }}>PRICED LOTS ON FILE</p>
            <p className="pm-cinzel" style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "1.4rem" }}>{AUCTION_PRICES.length.toLocaleString()}</p>
          </div>
          <div className="pm-card">
            <p className="pm-mono" style={{ color: "#666", fontSize: "0.62rem", letterSpacing: "0.1em", marginBottom: 6 }}>CUMULATIVE LOTS REALIZED</p>
            <p className="pm-cinzel" style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "1.4rem" }}>{totalLots.toLocaleString()}</p>
          </div>
          <div className="pm-card">
            <p className="pm-mono" style={{ color: "#666", fontSize: "0.62rem", letterSpacing: "0.1em", marginBottom: 6 }}>SUM OF RECORD PRICES</p>
            <p className="pm-cinzel" style={{ color: "#C9A84C", fontWeight: 700, fontSize: "1.4rem" }}>${totalVolume.toLocaleString()}</p>
          </div>
        </div>

        <div className="pm-sec-eyebrow" style={{ textAlign: "left" }}>Top Records</div>
        <h2 className="pm-cinzel" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F5F5F5", marginBottom: 16 }}>Highest Realized Prices, All Series</h2>
        <div className="pm-card" style={{ overflowX: "auto", marginBottom: 44 }}>
          <table className="pm-table">
            <thead>
              <tr><th>Specimen</th><th>Series</th><th>Lots Realized</th><th>Auction Record</th></tr>
            </thead>
            <tbody>
              {grandTop.map((r, i) => (
                <tr key={i}>
                  <td>{r.coin_title}</td>
                  <td style={{ color: "#888" }}>{r.series}</td>
                  <td>{r.lots.toLocaleString()}</td>
                  <td style={{ color: "#C9A84C", fontWeight: 700 }}>{r.record_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {series.map((s) => (
          <div key={s} style={{ marginBottom: 40 }}>
            <h3 className="pm-cinzel" style={{ fontSize: "1.05rem", fontWeight: 700, color: "#F0EAD6", marginBottom: 12 }}>{s}</h3>
            <div className="pm-card" style={{ overflowX: "auto" }}>
              <table className="pm-table">
                <thead>
                  <tr><th>Specimen</th><th>Lots Realized</th><th>Auction Record</th></tr>
                </thead>
                <tbody>
                  {topAuctionRecords(s, 12).map((r, i) => (
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
        ))}

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
