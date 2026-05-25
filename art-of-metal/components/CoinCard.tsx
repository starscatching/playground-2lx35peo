import Link from "next/link";

interface CoinCardProps {
  id: string;
  name: string;
  country: string;
  year: string;
  material: string;
  imageUrl?: string;
  gcsUrl?: string;
}

export default function CoinCard({ id, name, country, year, material, imageUrl, gcsUrl }: CoinCardProps) {
  const img = imageUrl || gcsUrl || null;

  return (
    <Link href={`/coin/${id}`} style={{ textDecoration: "none", display: "block" }}>
      <div className="card" style={{ borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
        {/* Image */}
        <div style={{ position: "relative", background: "#0C0C0C", aspectRatio: "1/1", overflow: "hidden" }}>
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "contain", padding: 12 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 8,
            }}>
              <span style={{ fontSize: 36, opacity: 0.15 }}>⬡</span>
              <span style={{ color: "#333", fontSize: "0.7rem", letterSpacing: "0.1em" }}>NO IMAGE</span>
            </div>
          )}

          {/* Material badge */}
          {material && (
            <div style={{
              position: "absolute", top: 8, right: 8,
              background: "rgba(0,0,0,0.8)",
              border: "1px solid #2A2010",
              borderRadius: 4,
              padding: "2px 7px",
              fontSize: "0.65rem",
              color: "#C9A84C",
              letterSpacing: "0.08em",
              fontWeight: 600,
              backdropFilter: "blur(4px)",
            }}>
              {material.toUpperCase().slice(0, 6)}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px" }}>
          <p style={{ color: "#888", fontSize: "0.7rem", letterSpacing: "0.08em", marginBottom: 4, fontWeight: 500 }}>
            {country?.toUpperCase() || "UNKNOWN"}
          </p>
          <p style={{
            color: "#F0F0F0", fontSize: "0.85rem", fontWeight: 600,
            lineHeight: 1.35, marginBottom: 8,
            overflow: "hidden", display: "-webkit-box",
            WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          }}>
            {name}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#C9A84C", fontSize: "0.78rem", fontWeight: 600 }}>{year}</span>
            <span style={{ color: "#333", fontSize: "0.72rem" }}>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
