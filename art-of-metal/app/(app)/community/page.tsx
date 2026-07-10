const POSTS = [
  {
    user: "MorganKing_1878", tier: "Silver · 847 pts", tag: "Show & Tell",
    ref: "1893-S Morgan Dollar · PCGS F-12",
    body: "Just got this back from PCGS after 6 weeks. F-12 Details (Cleaned) — not what I hoped for, but at least now I know. The cleaning was done decades ago, you can see it in the luster break under the cheek. Still a survivor. Still an 1893-S. My Art Score came back 58 which I thought was fair given the details grade. Sharing the research in case it helps someone else thinking about submitting.",
    replies: 14, likes: 32, time: "3 hours ago",
  },
  {
    user: "GoldHunter_TX", tier: "Gold · 1,204 pts", tag: "Question",
    ref: null,
    body: "Question for the group — I have a 1927-D Saint-Gaudens that the AI Identifier flagged as possibly having a weak strike on the eagle's breast feathers. My Art Score came back 78 but I'm wondering if the weak strike is a known issue on this date or if mine is unusual. Anyone researched this date heavily? Worth submitting or hold raw?",
    replies: 8, likes: 19, time: "7 hours ago",
  },
  {
    user: "WheatPenny_Rose", tier: "Copper · 312 pts", tag: "For Sale (eBay)",
    ref: null,
    body: "Posting my 1914-D Lincoln cent to eBay tonight. Art Score 87, AI rated it strong VF, no cleaning detected. I researched it here first — survival funnel showed only 22 in this grade range for sale right now which surprised me. Did my homework before listing. Not selling for melt on this one!",
    ebay: true,
    replies: 5, likes: 28, time: "1 day ago",
  },
  {
    user: "AncientMetal_NYC", tier: "Ancient specialist", tag: "Research",
    ref: null,
    body: "Did you know the 1921 Morgan was struck as a political compromise? The Pittman Act of 1918 melted 270 million silver dollars to sell the silver to Britain for the war effort. Congress had to pass another law just to restart production — which is why the Morgan design was dusted off for one final year. When you hold a 1921 Morgan, you're holding a coin that almost never existed.",
    replies: 21, likes: 87, time: "2 days ago",
  },
];

const TABS = ["All Posts", "Questions", "Show & Tell", "Research", "For Sale (eBay)"];

export default function CommunityPage() {
  return (
    <div className="pm-root" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 300px" }}>
      <div>
        <div style={{ padding: "24px 32px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 className="pm-cinzel" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#F5F5F5" }}>Community</h1>
          <button className="pm-nav-cta" style={{ border: "none", cursor: "pointer" }}>+ New Post</button>
        </div>

        <div style={{ padding: "12px 32px", background: "rgba(212,175,55,0.025)", borderBottom: "1px solid rgba(212,175,55,0.08)", display: "flex", gap: 10 }}>
          <span style={{ fontSize: 13 }}>📌</span>
          <p style={{ color: "rgba(212,175,55,0.55)", fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.5 }}>
            <strong style={{ color: "rgba(212,175,55,0.75)", fontStyle: "normal" }}>Community Rule:</strong> Talk coins here. If you have something for sale, link to your eBay listing — but keep deal-making off this page. We&rsquo;re not a marketplace and can&rsquo;t protect you from scams. Be good to each other.
          </p>
        </div>

        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 32px" }}>
          {TABS.map((t, i) => (
            <div key={t} className="pm-mono" style={{
              padding: "12px 16px", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
              color: i === 0 ? "#D4AF37" : "#666", borderBottom: i === 0 ? "2px solid #D4AF37" : "2px solid transparent", cursor: "pointer",
            }}>{t}</div>
          ))}
        </div>

        <div style={{ padding: "18px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
          {POSTS.map((p, i) => (
            <div key={i} className="pm-card">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 34, height: 46, borderRadius: 3, background: "linear-gradient(160deg,#1a1a1a,#0a0a0a)",
                  border: "1px solid #3a2c14", flexShrink: 0,
                }} />
                <div>
                  <p style={{ color: "#F0EAD6", fontWeight: 600, fontSize: "0.85rem" }}>{p.user}</p>
                  <p className="pm-mono" style={{ color: "#666", fontSize: "0.65rem", display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", padding: "1px 6px", borderRadius: 2, color: "#D4AF37" }}>{p.tag}</span>
                    {p.tier}
                  </p>
                </div>
              </div>
              {p.ref && (
                <div className="pm-mono" style={{ display: "inline-block", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)", padding: "3px 10px", borderRadius: 2, fontSize: "0.72rem", color: "#8A7220", marginBottom: 10 }}>
                  ⬡ {p.ref}
                </div>
              )}
              <p style={{ color: "rgba(240,234,214,0.82)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 12 }}>{p.body}</p>
              {p.ebay && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 3, marginBottom: 10 }}>
                  <span>🔗</span>
                  <span style={{ color: "#777", fontSize: "0.85rem", fontStyle: "italic" }}>Listed on eBay — see the full listing and photos</span>
                  <span className="pm-mono" style={{ marginLeft: "auto", fontSize: "0.7rem", color: "#8A7220" }}>View on eBay ↗</span>
                </div>
              )}
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span className="pm-mono" style={{ fontSize: "0.68rem", color: "#666" }}>💬 {p.replies} replies</span>
                <span className="pm-mono" style={{ fontSize: "0.68rem", color: "#666" }}>👍 {p.likes}</span>
                <span className="pm-mono" style={{ marginLeft: "auto", fontSize: "0.65rem", color: "#333" }}>{p.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ borderLeft: "1px solid rgba(255,255,255,0.05)", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <p className="pm-mono" style={{ color: "#8A7220", fontSize: "0.68rem", letterSpacing: "0.08em", marginBottom: 10 }}>ACTIVE NOW</p>
          {["MorganKing_1878 — Gold tier", "GoldHunter_TX — Silver tier", "WheatPenny_Rose — Copper tier"].map((a) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 22, height: 30, borderRadius: 2, background: "#141414", border: "1px solid #2a2010", flexShrink: 0 }} />
              <span style={{ color: "#999", fontSize: "0.78rem" }}>{a}</span>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", marginLeft: "auto" }} />
            </div>
          ))}
        </div>
        <div>
          <p className="pm-mono" style={{ color: "#8A7220", fontSize: "0.68rem", letterSpacing: "0.08em", marginBottom: 10 }}>TRENDING</p>
          {[
            { tag: "Morgan Dollars", title: "Are 1921-P Morgans undervalued right now?", n: 34 },
            { tag: "Engelhard Bars", title: "Prospector round vs. Maple bar — stronger premium?", n: 18 },
            { tag: "Grading", title: "Worth submitting to PCGS at current turnaround?", n: 27 },
          ].map((t) => (
            <div key={t.title} style={{ padding: "8px 10px", background: "#141414", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 3, marginBottom: 6 }}>
              <p className="pm-mono" style={{ color: "#8A7220", fontSize: "0.62rem", letterSpacing: "0.06em", marginBottom: 3 }}>{t.tag}</p>
              <p style={{ color: "rgba(240,234,214,0.8)", fontSize: "0.82rem", lineHeight: 1.4 }}>{t.title}</p>
              <p className="pm-mono" style={{ color: "#555", fontSize: "0.62rem", marginTop: 3 }}>{t.n} posts this week</p>
            </div>
          ))}
        </div>
        <div>
          <p className="pm-mono" style={{ color: "#8A7220", fontSize: "0.68rem", letterSpacing: "0.08em", marginBottom: 10 }}>MARKET NEWS</p>
          {[
            { src: "Kitco News", title: "Gold holds above $2,377 as dollar weakens on Fed signals" },
            { src: "Mining.com", title: "Silver industrial demand rises — solar sector stockpiling" },
            { src: "CoinWorld", title: "Heritage summer auction totals $48M — Morgan/Peace stay hot" },
          ].map((n) => (
            <div key={n.title} style={{ padding: "7px 10px", background: "#141414", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 3, marginBottom: 5 }}>
              <p className="pm-mono" style={{ color: "#8A7220", fontSize: "0.58rem", letterSpacing: "0.08em", marginBottom: 3 }}>{n.src}</p>
              <p style={{ color: "rgba(240,234,214,0.75)", fontSize: "0.78rem", lineHeight: 1.4 }}>{n.title}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 14px", background: "rgba(168,85,247,0.04)", border: "1px solid rgba(168,85,247,0.15)", borderRadius: 3 }}>
          <p className="pm-cinzel" style={{ color: "rgba(168,85,247,0.7)", fontSize: "0.8rem", fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            Mining Stocks
            <span className="pm-mono" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)", padding: "1px 6px", borderRadius: 2, fontSize: "0.55rem" }}>GOLD TIER · SOON</span>
          </p>
          {["NEM  Newmont Corp", "GOLD  Barrick Gold", "WPM  Wheaton Precious"].map((s) => (
            <div key={s} style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", padding: "3px 0" }}>{s} 🔒</div>
          ))}
        </div>
      </div>
    </div>
  );
}
