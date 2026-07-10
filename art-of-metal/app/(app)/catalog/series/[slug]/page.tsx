import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeriesBySlug, denomLabelOf } from "@/lib/coins";
import CoinCard from "@/components/CoinCard";

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();

  const shown = series.coins.slice(0, 60);

  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 24, fontSize: "0.78rem", color: "#444" }}>
          <Link href="/catalog" style={{ color: "#444", textDecoration: "none" }}>Coin Series Database</Link>
          <span>/</span>
          <span style={{ color: "#C9A84C" }}>{series.name}</span>
        </div>

        <div style={{ marginBottom: 36 }}>
          <p style={{ color: "#C9A84C", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", marginBottom: 12 }}>
            {series.denomCode} · {denomLabelOf(series.denomCode).toUpperCase()}
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#F5F5F5", marginBottom: 8 }}>
            {series.name}
          </h1>
          <p style={{ color: "#555", fontSize: "0.95rem" }}>
            {series.count.toLocaleString()} specimen{series.count !== 1 ? "s" : ""} in the American Numismatic Society collection
            {series.count > shown.length ? ` — showing the first ${shown.length}` : ""}.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
          {shown.map((coin) => (
            <CoinCard
              key={coin.id}
              id={coin.id}
              name={coin.name}
              country="United States"
              year={String(coin.year ?? "")}
              material={coin.material ?? ""}
              gcsUrl={coin.obverseImg ?? undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
