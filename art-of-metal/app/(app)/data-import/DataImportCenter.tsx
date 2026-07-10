"use client";
import { useEffect, useState } from "react";
import { parseCSV } from "@/lib/csv";

type Source = "ebay" | "population";

const TEMPLATES: Record<Source, { columns: string; sample: string }> = {
  ebay: {
    columns: "coinName,soldPrice,year,series,mintMark,grade,soldDate,listingTitle",
    sample: "1893-S Morgan Dollar,150000,1893,Morgan Dollar,S,VF-35,2024-03-15,Heritage Auctions",
  },
  population: {
    columns: "coinName,totalGraded,year,series,mintMark,pcgsNumber,highestGrade",
    sample: "1893-S Morgan Dollar,2450,1893,Morgan Dollar,S,7180,MS-67",
  },
};

interface ImportRecord {
  id: string;
  source: Source;
  rowCount: number;
  notes: string;
  importedAt: string;
}

export default function DataImportCenter() {
  const [tab, setTab] = useState<Source | "history">("ebay");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [preview, setPreview] = useState<{ headers: string[]; rows: Record<string, string>[] } | null>(null);
  const [history, setHistory] = useState<ImportRecord[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("aom_import_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  function loadSample() {
    if (tab === "history") return;
    setText(`${TEMPLATES[tab].columns}\n${TEMPLATES[tab].sample}`);
  }

  function parse() {
    setError("");
    if (tab === "history") return;
    if (!text.trim()) { setError("Paste CSV data or upload a file first."); return; }
    const result = parseCSV(text);
    const required = TEMPLATES[tab].columns.split(",").slice(0, 2);
    const missing = required.filter((r) => !result.headers.includes(r));
    if (missing.length) {
      setError(`Missing required column(s): ${missing.join(", ")}`);
      return;
    }
    setPreview(result);
    const rec: ImportRecord = {
      id: Math.random().toString(36).slice(2),
      source: tab,
      rowCount: result.rows.length,
      notes,
      importedAt: new Date().toISOString(),
    };
    const next = [rec, ...history].slice(0, 25);
    setHistory(next);
    localStorage.setItem("aom_import_history", JSON.stringify(next));
  }

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result || ""));
    reader.readAsText(file);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
        {(["ebay", "population", "history"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setPreview(null); setError(""); }}
            style={{
              flex: 1, padding: "14px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600,
              background: tab === t ? "rgba(212,175,55,0.12)" : "#141414",
              border: `1px solid ${tab === t ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.05)"}`,
              color: tab === t ? "#D4AF37" : "#888",
            }}
          >
            {t === "ebay" ? "eBay Sold Data" : t === "population" ? "PCGS/NGC Population" : "Import History"}
          </button>
        ))}
      </div>

      {tab !== "history" ? (
        <div className="pm-card">
          <p className="pm-mono" style={{ fontSize: "0.7rem", color: "#8A7220", letterSpacing: "0.1em", marginBottom: 16 }}>① PASTE OR UPLOAD CSV</p>

          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
            <label style={{ padding: "9px 16px", background: "#141414", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, cursor: "pointer", fontSize: "0.8rem", color: "#D4AF37" }}>
              Upload CSV File
              <input type="file" accept=".csv,text/csv" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </label>
            <span style={{ color: "#555", fontSize: "0.8rem" }}>or paste data below</span>
            <button onClick={loadSample} style={{ marginLeft: "auto", background: "none", border: "none", color: "#666", fontSize: "0.75rem", cursor: "pointer", textDecoration: "underline" }}>Load sample</button>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`${TEMPLATES[tab].columns}\n${TEMPLATES[tab].sample}`}
            className="input-dark pm-mono"
            style={{ width: "100%", minHeight: 140, resize: "vertical", fontSize: "0.78rem", lineHeight: 1.6 }}
          />

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <input
              className="input-dark"
              style={{ flex: 1 }}
              placeholder="Import notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button onClick={parse} className="btn-gold" style={{ padding: "10px 26px", borderRadius: 4, border: "none", cursor: "pointer", fontSize: "0.8rem" }}>
              Parse CSV
            </button>
          </div>
          {error && <p style={{ color: "#EF4444", fontSize: "0.8rem", marginTop: 10 }}>{error}</p>}

          <div style={{ marginTop: 24, padding: "16px 18px", background: "#141414", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 3 }}>
            <p className="pm-mono" style={{ color: "#8A7220", fontSize: "0.68rem", letterSpacing: "0.08em", marginBottom: 8 }}>CSV FORMAT GUIDE</p>
            <p style={{ color: "#888", fontSize: "0.8rem" }}>
              <strong style={{ color: "#aaa" }}>Required columns:</strong> {TEMPLATES[tab].columns.split(",").slice(0, 2).join(", ")}<br />
              <strong style={{ color: "#aaa" }}>All columns:</strong> {TEMPLATES[tab].columns}
            </p>
          </div>

          {preview && (
            <div style={{ marginTop: 24 }}>
              <p className="pm-mono" style={{ color: "#22C55E", fontSize: "0.72rem", marginBottom: 10 }}>✓ Parsed {preview.rows.length} row{preview.rows.length !== 1 ? "s" : ""}</p>
              <div style={{ overflowX: "auto" }}>
                <table className="pm-table">
                  <thead><tr>{preview.headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {preview.rows.slice(0, 20).map((r, i) => (
                      <tr key={i}>{preview.headers.map((h) => <td key={h}>{r[h]}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="pm-card">
          <p className="pm-mono" style={{ fontSize: "0.7rem", color: "#8A7220", letterSpacing: "0.1em", marginBottom: 16 }}>IMPORT HISTORY</p>
          {history.length === 0 ? (
            <p style={{ color: "#555", fontSize: "0.85rem" }}>No imports yet. Parse a CSV above to see it appear here.</p>
          ) : (
            <table className="pm-table">
              <thead><tr><th>Source</th><th>Rows</th><th>Notes</th><th>Imported</th></tr></thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id}>
                    <td>{h.source === "ebay" ? "eBay Sold Data" : "PCGS/NGC Population"}</td>
                    <td>{h.rowCount}</td>
                    <td style={{ color: "#888" }}>{h.notes || "—"}</td>
                    <td className="pm-mono">{new Date(h.importedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
