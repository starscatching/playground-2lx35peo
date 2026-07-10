import { getSeriesGroups, getDenomOrder, denomLabelOf, ALL_COINS } from "@/lib/coins";
import CatalogBrowser from "./CatalogBrowser";

export default function CatalogPage() {
  const groups = getSeriesGroups();
  const denomOrder = getDenomOrder();
  const denomLabels = Object.fromEntries(denomOrder.map((c) => [c, denomLabelOf(c)]));

  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: "#C9A84C", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", marginBottom: 12 }}>
            EXPLORE
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#F5F5F5", marginBottom: 8 }}>
            Coin Series Database
          </h1>
          <p style={{ color: "#555", fontSize: "0.95rem" }}>
            {ALL_COINS.length.toLocaleString()} specimens across {groups.length} series, drawn from the American Numismatic Society collection.
          </p>
        </div>
        <CatalogBrowser groups={groups} denomOrder={denomOrder} denomLabels={denomLabels} />
      </div>
    </div>
  );
}
