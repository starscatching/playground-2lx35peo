import Link from "next/link";
import MetalsTicker from "@/components/MetalsTicker";
import GoldParticles from "@/components/GoldParticles";
import { coinImg } from "@/lib/images";

const HERO_COINS = [
  { src: coinImg("1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg"), label: "Lincoln Wheat Cent", sub: "Key Date", size: "xs" },
  { src: coinImg("1916_1_2_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg"), label: "Buffalo Nickel", sub: "1913–1938", size: "sm" },
  { src: coinImg("1932_51_29_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg"), label: "Walking Liberty", sub: "Half Dollar", size: "md" },
  { src: coinImg("1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg"), label: "Morgan Dollar", sub: "1878–1921", size: "lg" },
  { src: coinImg("1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg"), label: "Saint-Gaudens $20", sub: "Gold Double Eagle", size: "md" },
  { src: coinImg("1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg"), label: "Peace Dollar", sub: "1921–1935", size: "sm" },
  { src: coinImg("1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg"), label: "Buffalo Nickel", sub: "1913–1938", size: "xs" },
];

const SIZES: Record<string, number> = { xs: 56, sm: 76, md: 100, lg: 130 };

const FEATURES = [
  { icon: "📷", title: "AI Coin Identification", body: <>Drop a photo. The AI gets <strong>one shot</strong> to identify your coin. If it&rsquo;s wrong, you take over — your correction is final. No second-guessing.</> , href: "/identify" },
  { icon: "⚖", title: "Melt Value Calculator", body: <>Enter weight and purity, or pick a known bullion product — see <strong>exact melt value</strong> against live spot prices, updated continuously.</>, href: "/tools/melt-calculator" },
  { icon: "📊", title: "Real Market Pricing", body: <>Not retail prices. Not wishlist prices. <strong>What people actually paid</strong> — PCGS auction records and price guide data, right in the app.</>, href: "/research" },
  { icon: "🔍", title: "Survival Reality Funnel", body: <>Mintage numbers mean nothing without context. See how many actually survived, how many are graded, and how rare yours really is.</>, href: "/research" },
  { icon: "⬡", title: "Private Vault", body: <>Your collection is <strong>completely private</strong>. An 8-question self-assessment estimates condition, and every coin becomes a printed collector card.</>, href: "/vault" },
  { icon: "▦", title: "Coin Series Database", body: <>3,167 coins across 46 U.S. Mint series from 1850 to present, browsable by denomination — real specimens, real specs.</>, href: "/catalog" },
  { icon: "⇩", title: "Bulk Data Import", body: <>Already tracking eBay sold prices or PCGS/NGC population counts in a spreadsheet? <strong>Import the CSV directly.</strong></>, href: "/data-import" },
  { icon: "☺", title: "Community", body: <>Talk coins with 2,800+ collectors — show & tell, grading questions, research threads. Not a marketplace.</>, href: "/community" },
  { icon: "📈", title: "Market Watch", body: <>Live metal spot prices and the Bullion Top 100 — Engelhard, PAMP, U.S. Mint, tracked like a trading desk.</>, href: "/market" },
];

export default function LandingPage() {
  return (
    <div className="pm-root">
      <MetalsTicker />

      <nav className="pm-nav">
        <div className="pm-nav-brand">
          <div>
            <div className="pm-nav-logo">Art of Metal</div>
            <div className="pm-nav-sub">Honoring Craft. Preserving History.</div>
          </div>
        </div>
        <div className="pm-nav-links">
          <Link className="pm-nav-link" href="#features">Features</Link>
          <Link className="pm-nav-link" href="#how">How It Works</Link>
          <Link className="pm-nav-link" href="#pricing">Pricing</Link>
          <Link className="pm-nav-link" href="/community">Community</Link>
          <Link className="pm-nav-link" href="/research">Research</Link>
        </div>
        <Link className="pm-nav-cta" href="/dashboard">Enter the Vault →</Link>
      </nav>

      <section className="pm-hero">
        <GoldParticles />
        <div className="pm-hero-content">
          <div className="pm-hero-eyebrow">⬡ The New Generation of Collecting</div>
          <h1 className="pm-hero-title">
            Your Coins.<br />
            <span className="gold">Finally Understood.</span>
          </h1>
          <p className="pm-hero-subtitle">
            Between AI and decades of new market data, you now have the same research tools professional dealers have always had. For the first time — so do you.
          </p>
          <div className="pm-hero-ctas">
            <Link className="pm-cta-primary" href="/identify">Identify Your First Coin Free →</Link>
            <Link className="pm-cta-secondary" href="#how">See How It Works</Link>
            <div className="pm-cta-note">Free to start · No credit card · No ads · Ever</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 16, flexWrap: "wrap", position: "relative", zIndex: 2 }}>
          {HERO_COINS.map((c, i) => {
            const size = SIZES[c.size];
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: size, height: size, borderRadius: "50%", overflow: "hidden",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.9)", background: "radial-gradient(circle at 32% 28%, #3a3020, #0A0A10)",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.src}
                    alt={c.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.95) contrast(1.05)", display: "block" }}
                  />
                </div>
                <div className="pm-mono" style={{ fontSize: 7, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(212,175,55,0.4)", textAlign: "center", lineHeight: 1.4 }}>
                  {c.label}<br />{c.sub}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="pm-stat-strip">
        <div className="pm-stat-item"><div className="pm-stat-n">3,167</div><div className="pm-stat-l">Coins in the Database</div></div>
        <div className="pm-stat-item"><div className="pm-stat-n">403</div><div className="pm-stat-l">PCGS Auction Records</div></div>
        <div className="pm-stat-item"><div className="pm-stat-n">60 sec</div><div className="pm-stat-l">Metal Value Updates</div></div>
        <div className="pm-stat-item"><div className="pm-stat-n">$0</div><div className="pm-stat-l">To Start — No Card Needed</div></div>
      </div>

      <section className="pm-section" id="features">
        <div className="pm-sec-eyebrow">What We Do</div>
        <h2 className="pm-sec-title">Everything in One Place</h2>
        <p className="pm-sec-sub">The tools professional dealers have always had — now available to everyone who collects.</p>
        <div className="pm-features-grid">
          {FEATURES.map((f, i) => (
            <Link key={i} href={f.href} style={{ textDecoration: "none" }}>
              <div className="pm-feat">
                <div className="pm-feat-icon">{f.icon}</div>
                <div className="pm-feat-title">{f.title}</div>
                <div className="pm-feat-body">{f.body}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="pm-no-ads">
        <div className="pm-na-item"><span className="pm-na-check">✓</span>No ads on any tier</div>
        <div className="pm-na-item"><span className="pm-na-check">✓</span>No data selling</div>
        <div className="pm-na-item"><span className="pm-na-check">✓</span>No dealer referral payments</div>
        <div className="pm-na-item"><span className="pm-na-check">✓</span>Subscription-supported only</div>
      </div>

      <section className="pm-philosophy">
        <p className="pm-phil-quote">A 200-year-old coin that survived at all is a miracle. The wear is the story.</p>
        <div className="pm-phil-credit">The Art of Metal Philosophy</div>
        <div className="pm-phil-body">
          <p>PCGS and NGC set the standard. They built something incredible over decades, and we respect that completely. We build on top of their foundation — not against it.</p>
          <p>What&rsquo;s changed is what we know now. <strong>Decades more market data. Live spot prices. AI that can read a coin&rsquo;s condition from a photo. Auction records going back years.</strong> The coins haven&rsquo;t changed. Our ability to understand them has.</p>
          <p>Worn doesn&rsquo;t mean worthless. A coin that circulated through the hands of miners, merchants, and families — and still exists — deserves to be researched. Not thrown away because it isn&rsquo;t perfect.</p>
        </div>
      </section>

      <section className="pm-how" id="how">
        <div className="pm-how-inner">
          <div className="pm-sec-eyebrow" style={{ textAlign: "center" }}>Simple Process</div>
          <h2 className="pm-sec-title" style={{ textAlign: "center" }}>How It Works</h2>
          <div className="pm-steps">
            <div className="pm-step"><div className="pm-step-n">01</div><div className="pm-step-title">Drop a Photo</div><div className="pm-step-body">The AI gets one identification attempt. If wrong, you fill it in — your input is final.</div></div>
            <div className="pm-step"><div className="pm-step-n">02</div><div className="pm-step-title">See the Research</div><div className="pm-step-body">Metal value, collector range, survival funnel, condition in plain English, and coin history.</div></div>
            <div className="pm-step"><div className="pm-step-n">03</div><div className="pm-step-title">Grade &amp; Card It</div><div className="pm-step-body">Run the 8-question self-assessment, then generate a printable collector card in your chosen style.</div></div>
            <div className="pm-step"><div className="pm-step-n">04</div><div className="pm-step-title">Save to Your Vault</div><div className="pm-step-body">Every coin you research is saved. Come back a week later and pick up exactly where you left off.</div></div>
          </div>
        </div>
      </section>

      <section className="pm-pricing" id="pricing">
        <div className="pm-sec-eyebrow">Simple Pricing</div>
        <h2 className="pm-sec-title">Start Free. Upgrade When Ready.</h2>
        <p className="pm-sec-sub">No pressure. No progress reset. Your research is saved at your own pace.</p>
        <div className="pm-price-cards">
          <div className="pm-pc">
            <div className="pm-pc-tier pm-pct-cu">Copper</div>
            <div><span className="pm-pc-price pm-pcp-f">$0</span><span className="pm-pc-per">/mo</span></div>
            <div className="pm-pc-name">Start Here</div>
            <div className="pm-pc-desc">5 coins saved, 3 AI identifications, full melt calculator. No card needed.</div>
            <Link className="pm-pc-btn pm-pcb-f" href="/dashboard">Start Free →</Link>
          </div>
          <div className="pm-pc featured">
            <div className="pm-pc-tier pm-pct-ag">Silver</div>
            <div><span className="pm-pc-price pm-pcp-ag">$6.58</span><span className="pm-pc-per">/mo billed annually</span></div>
            <div className="pm-pc-name">Serious Collector</div>
            <div className="pm-pc-desc">100 coins, unlimited AI, 5 set albums, digital cards, full database access.</div>
            <Link className="pm-pc-btn pm-pcb-ag" href="/dashboard">Start Silver →</Link>
          </div>
          <div className="pm-pc">
            <div className="pm-pc-tier pm-pct-au">Gold</div>
            <div><span className="pm-pc-price pm-pcp-au">$12.41</span><span className="pm-pc-per">/mo billed annually</span></div>
            <div className="pm-pc-name">Crown Jewel</div>
            <div className="pm-pc-desc">Unlimited everything. Physical cards mailed in a velvet box. Mining stocks coming soon.</div>
            <Link className="pm-pc-btn pm-pcb-au" href="/dashboard">Start Gold →</Link>
          </div>
        </div>
      </section>

      <footer className="pm-footer">
        <div className="pm-footer-top">
          <div>
            <div className="pm-fb-name">Art of Metal</div>
            <div className="pm-fb-sub">Honoring craft, preserving history. Built for collectors, by a collector.</div>
          </div>
          <div className="pm-footer-links">
            <div>
              <div className="pm-flg-title">Platform</div>
              <Link className="pm-fl-link" href="/identify">Identify a Coin</Link>
              <Link className="pm-fl-link" href="/tools/melt-calculator">Melt Calculator</Link>
              <Link className="pm-fl-link" href="/market">Market Watch</Link>
              <Link className="pm-fl-link" href="/community">Community</Link>
            </div>
            <div>
              <div className="pm-flg-title">Research</div>
              <a className="pm-fl-link" href="https://www.pcgs.com/coinfacts" target="_blank" rel="noreferrer">PCGS CoinFacts ↗</a>
              <a className="pm-fl-link" href="https://www.ngccoin.com/coin-explorer/" target="_blank" rel="noreferrer">NGC Coin Explorer ↗</a>
              <a className="pm-fl-link" href="https://coins.ha.com/" target="_blank" rel="noreferrer">Heritage Auctions ↗</a>
            </div>
            <div>
              <div className="pm-flg-title">Legal</div>
              <Link className="pm-fl-link" href="#">Terms of Service</Link>
              <Link className="pm-fl-link" href="#">Privacy Policy</Link>
              <Link className="pm-fl-link" href="#">Valuation Disclaimer</Link>
            </div>
          </div>
        </div>
        <div className="pm-footer-bottom">
          <div className="pm-fb-copy">© 2026 Art of Metal · Not affiliated with PCGS, NGC, or any grading service</div>
          <div className="pm-fb-legal">
            <Link className="pm-fb-lnk" href="#">Privacy</Link>
            <Link className="pm-fb-lnk" href="#">Terms</Link>
            <Link className="pm-fb-lnk" href="#">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
