import DataImportCenter from "./DataImportCenter";

export default function DataImportPage() {
  return (
    <div className="pm-root" style={{ minHeight: "100vh", padding: "40px 40px 100px" }}>
      <p className="pm-sec-eyebrow" style={{ textAlign: "left" }}>CSV &amp; Population</p>
      <h1 className="pm-cinzel" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700, color: "#F5F5F5", marginBottom: 8 }}>Data Import Center</h1>
      <p style={{ color: "#888", fontSize: "1rem", fontStyle: "italic", marginBottom: 32 }}>
        Batch import eBay sold data &amp; PCGS/NGC population numbers. Parsed client-side; nothing leaves your browser.
      </p>
      <DataImportCenter />
    </div>
  );
}
