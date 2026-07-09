import Link from "next/link";
import CoinImage from "@/components/CoinImage";
import { coinImg } from "@/lib/images";

const COIN_DATA: Record<string, {
  name: string; country: string; year: string; material: string;
  denomination: string; weight: string; diameter: string; edge: string;
  mint: string; mintage: string; obverse: string; reverse: string;
  obvFile: string; revFile: string; description: string;
}> = {
  "1": {
    name: "Morgan Silver Dollar",
    country: "United States", year: "1921", material: "Silver",
    denomination: "1 Dollar", weight: "26.73 g", diameter: "38.1 mm",
    edge: "Reeded", mint: "Philadelphia",
    mintage: "44,690,000",
    obverse: "Liberty facing left, wearing a Phrygian cap and a laurel wreath, stars around.",
    reverse: "American bald eagle with wings spread, holding arrows and olive branch.",
    obvFile: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg",
    revFile: "1934_146_1_Cupronickel_5_cent_of_The_United_States,_United_St_rev.jpg",
    description: "The Morgan dollar is one of the most collected United States coins. Designed by George T. Morgan, it was minted from 1878 to 1904, and again in 1921.",
  },
  "2": {
    name: "Saint-Gaudens Double Eagle",
    country: "United States", year: "1932", material: "Gold",
    denomination: "20 Dollars", weight: "33.436 g", diameter: "34.0 mm",
    edge: "Lettered", mint: "Philadelphia",
    mintage: "1,101,750",
    obverse: "Lady Liberty striding forward with torch and olive branch, sun rays behind.",
    reverse: "American bald eagle in flight, rising sun in background.",
    obvFile: "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg",
    revFile: "1915_226_4_Gold_20_Dollar,_United_States,_1915._1915.226.4_obv.jpg",
    description: "Widely considered the most beautiful American coin ever minted, designed by sculptor Augustus Saint-Gaudens at the request of President Theodore Roosevelt.",
  },
};

export default async function CoinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coin = COIN_DATA[id] || COIN_DATA["1"];

  const specs = [
    { label: "Country", value: coin.country },
    { label: "Year", value: coin.year },
    { label: "Material", value: coin.material },
    { label: "Denomination", value: coin.denomination },
    { label: "Weight", value: coin.weight },
    { label: "Diameter", value: coin.diameter },
    { label: "Edge", value: coin.edge },
    { label: "Mint", value: coin.mint },
    { label: "Mintage", value: parseInt(coin.mintage.replace(/,/g, "")).toLocaleString() },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 40, fontSize: "0.78rem", color: "#444" }}>
          <Link href="/" style={{ color: "#444", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/catalog" style={{ color: "#444", textDecoration: "none" }}>Catalog</Link>
          <span>/</span>
          <span style={{ color: "#C9A84C" }}>{coin.name}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>

          {/* Left — Images */}
          <div>
            {/* Main image */}
            <div style={{
              background: "#0C0C0C",
              border: "1px solid #1A1A1A",
              borderRadius: 16,
              aspectRatio: "1",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 16,
              overflow: "hidden",
            }}>
              <CoinImage
                src={coinImg(coin.obvFile)}
                alt={`${coin.name} obverse`}
                style={{ width: "85%", height: "85%", objectFit: "contain" }}
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[{ file: coin.obvFile, label: "OBVERSE" }, { file: coin.revFile, label: "REVERSE" }].map(({ file, label }) => (
                <div key={label} style={{
                  background: "#0C0C0C", border: "1px solid #1A1A1A",
                  borderRadius: 10, aspectRatio: "1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden", position: "relative", cursor: "pointer",
                }}>
                  <CoinImage
                    src={coinImg(file)}
                    alt={label}
                    style={{ width: "80%", height: "80%", objectFit: "contain" }}
                  />
                  <span style={{
                    position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)",
                    fontSize: "0.6rem", color: "#444", letterSpacing: "0.1em", whiteSpace: "nowrap",
                  }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Details */}
          <div>
            <p style={{ color: "#C9A84C", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", marginBottom: 12 }}>
              {coin.country.toUpperCase()} · {coin.year}
            </p>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#F5F5F5", marginBottom: 16, lineHeight: 1.1 }}>
              {coin.name}
            </h1>

            <p style={{ color: "#555", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 32 }}>
              {coin.description}
            </p>

            {/* Add to vault */}
            <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
              <Link
                href="/upload"
                className="btn-gold"
                style={{ padding: "12px 28px", borderRadius: 8, fontSize: "0.82rem", letterSpacing: "0.08em", textDecoration: "none", flex: 1, textAlign: "center" }}
              >
                + ADD TO VAULT
              </Link>
              <button style={{
                padding: "12px 16px", borderRadius: 8,
                background: "transparent", border: "1px solid #1A1A1A",
                color: "#555", cursor: "pointer", fontSize: "1.1rem",
              }}>
                ♡
              </button>
            </div>

            <div className="gold-divider" style={{ marginBottom: 32 }} />

            {/* Specs table */}
            <div>
              <p style={{ color: "#888", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 16 }}>
                SPECIFICATIONS
              </p>
              <div>
                {specs.map((s, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: i < specs.length - 1 ? "1px solid #111" : "none",
                  }}>
                    <span style={{ color: "#444", fontSize: "0.82rem" }}>{s.label}</span>
                    <span style={{ color: "#C9A84C", fontSize: "0.82rem", fontWeight: 600 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="gold-divider" style={{ margin: "32px 0" }} />

            {/* Descriptions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[{ label: "OBVERSE", text: coin.obverse }, { label: "REVERSE", text: coin.reverse }].map(({ label, text }) => (
                <div key={label} style={{ background: "#0E0E0E", border: "1px solid #1A1A1A", borderRadius: 10, padding: 16 }}>
                  <p style={{ color: "#C9A84C", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", marginBottom: 8 }}>{label}</p>
                  <p style={{ color: "#555", fontSize: "0.78rem", lineHeight: 1.65 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back */}
        <div style={{ marginTop: 60, paddingTop: 40, borderTop: "1px solid #141414" }}>
          <Link href="/catalog" style={{ color: "#444", textDecoration: "none", fontSize: "0.82rem", letterSpacing: "0.08em" }}>
            ← BACK TO CATALOG
          </Link>
        </div>
      </div>
    </div>
  );
}
