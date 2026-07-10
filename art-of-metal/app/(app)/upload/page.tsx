"use client";
import { useState, useRef } from "react";

interface CoinForm {
  name: string;
  country: string;
  year: string;
  material: string;
  denomination: string;
  mint: string;
  condition: string;
  notes: string;
}

const MATERIALS = ["Silver", "Gold", "Bronze", "Copper", "Cupronickel", "Platinum", "Nickel", "Other"];
const CONDITIONS = ["MS-70", "MS-69", "MS-68", "MS-67", "MS-66", "MS-65", "MS-64", "MS-63", "AU-58", "AU-55", "EF-45", "VF-35", "VF-30", "F-15", "F-12", "VG-10", "G-6", "AG-3", "Poor-1"];

export default function UploadPage() {
  const [obverse, setObverse] = useState<string | null>(null);
  const [reverse, setReverse] = useState<string | null>(null);
  const [form, setForm] = useState<CoinForm>({ name: "", country: "", year: "", material: "Silver", denomination: "", mint: "", condition: "MS-65", notes: "" });
  const [dragging, setDragging] = useState<"obverse" | "reverse" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const obvRef = useRef<HTMLInputElement>(null);
  const revRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File, side: "obverse" | "reverse") => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      if (side === "obverse") setObverse(result);
      else setReverse(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent, side: "obverse" | "reverse") => {
    e.preventDefault();
    setDragging(null);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file, side);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.country || !form.year) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, #8B6914, #E8C76A)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32, margin: "0 auto 28px", color: "#000",
          }}>
            ✓
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#F5F5F5", marginBottom: 16 }}>Coin Added!</h2>
          <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 32 }}>
            <strong style={{ color: "#C9A84C" }}>{form.name}</strong> has been added to your vault.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={() => { setSubmitted(false); setObverse(null); setReverse(null); setForm({ name: "", country: "", year: "", material: "Silver", denomination: "", mint: "", condition: "MS-65", notes: "" }); }}
              className="btn-gold"
              style={{ padding: "12px 28px", borderRadius: 8, fontSize: "0.82rem", letterSpacing: "0.08em", cursor: "pointer", border: "none" }}
            >
              ADD ANOTHER
            </button>
            <a href="/portfolio" style={{
              padding: "12px 28px", borderRadius: 8, fontSize: "0.82rem",
              letterSpacing: "0.08em", textDecoration: "none",
              border: "1px solid #2A2A2A", color: "#888",
            }}>
              VIEW VAULT
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ color: "#C9A84C", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", marginBottom: 12 }}>
            ADD TO VAULT
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#F5F5F5", marginBottom: 8 }}>
            Upload Coin
          </h1>
          <p style={{ color: "#555", fontSize: "0.9rem" }}>
            Add a coin to your personal collection with images and metadata.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>

            {/* Left — Images */}
            <div>
              <h2 style={{ color: "#888", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 20 }}>
                COIN IMAGES
              </h2>

              {/* Obverse */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ color: "#555", fontSize: "0.75rem", marginBottom: 8, letterSpacing: "0.08em" }}>OBVERSE (FRONT)</p>
                <div
                  onClick={() => obvRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragging("obverse"); }}
                  onDragLeave={() => setDragging(null)}
                  onDrop={e => handleDrop(e, "obverse")}
                  style={{
                    border: `2px dashed ${dragging === "obverse" ? "#C9A84C" : obverse ? "#2A2010" : "#1A1A1A"}`,
                    borderRadius: 12,
                    aspectRatio: "1",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    background: obverse ? `url(${obverse}) center/contain no-repeat #0C0C0C` : "#0C0C0C",
                    transition: "border-color 0.2s",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {!obverse && (
                    <div style={{ textAlign: "center", color: "#333" }}>
                      <p style={{ fontSize: 32, marginBottom: 8 }}>+</p>
                      <p style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>DROP IMAGE</p>
                    </div>
                  )}
                  <input ref={obvRef} type="file" accept="image/*" style={{ display: "none" }}
                    onChange={e => e.target.files?.[0] && handleFile(e.target.files[0], "obverse")} />
                </div>
              </div>

              {/* Reverse */}
              <div>
                <p style={{ color: "#555", fontSize: "0.75rem", marginBottom: 8, letterSpacing: "0.08em" }}>REVERSE (BACK)</p>
                <div
                  onClick={() => revRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragging("reverse"); }}
                  onDragLeave={() => setDragging(null)}
                  onDrop={e => handleDrop(e, "reverse")}
                  style={{
                    border: `2px dashed ${dragging === "reverse" ? "#C9A84C" : reverse ? "#2A2010" : "#1A1A1A"}`,
                    borderRadius: 12,
                    aspectRatio: "1",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    background: reverse ? `url(${reverse}) center/contain no-repeat #0C0C0C` : "#0C0C0C",
                    transition: "border-color 0.2s",
                    overflow: "hidden",
                  }}
                >
                  {!reverse && (
                    <div style={{ textAlign: "center", color: "#333" }}>
                      <p style={{ fontSize: 32, marginBottom: 8 }}>+</p>
                      <p style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>DROP IMAGE</p>
                    </div>
                  )}
                  <input ref={revRef} type="file" accept="image/*" style={{ display: "none" }}
                    onChange={e => e.target.files?.[0] && handleFile(e.target.files[0], "reverse")} />
                </div>
              </div>
            </div>

            {/* Right — Metadata */}
            <div>
              <h2 style={{ color: "#888", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 20 }}>
                COIN DETAILS
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                    COIN NAME *
                  </label>
                  <input
                    className="input-dark"
                    placeholder="e.g. Morgan Silver Dollar"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                      COUNTRY *
                    </label>
                    <input
                      className="input-dark"
                      placeholder="e.g. United States"
                      value={form.country}
                      onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                      YEAR *
                    </label>
                    <input
                      className="input-dark"
                      placeholder="e.g. 1921"
                      value={form.year}
                      onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                      MATERIAL
                    </label>
                    <select
                      value={form.material}
                      onChange={e => setForm(f => ({ ...f, material: e.target.value }))}
                      style={{ background: "#161616", border: "1px solid #1A1A1A", color: "#888", borderRadius: 6, padding: "10px 14px", fontSize: "0.85rem", width: "100%" }}
                    >
                      {MATERIALS.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                      CONDITION
                    </label>
                    <select
                      value={form.condition}
                      onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}
                      style={{ background: "#161616", border: "1px solid #1A1A1A", color: "#888", borderRadius: 6, padding: "10px 14px", fontSize: "0.85rem", width: "100%" }}
                    >
                      {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                      DENOMINATION
                    </label>
                    <input
                      className="input-dark"
                      placeholder="e.g. 1 Dollar"
                      value={form.denomination}
                      onChange={e => setForm(f => ({ ...f, denomination: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                      MINT
                    </label>
                    <input
                      className="input-dark"
                      placeholder="e.g. Philadelphia"
                      value={form.mint}
                      onChange={e => setForm(f => ({ ...f, mint: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                    NOTES
                  </label>
                  <textarea
                    className="input-dark"
                    placeholder="Provenance, variety, purchase details..."
                    value={form.notes}
                    onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    rows={4}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ padding: "14px", borderRadius: 8, fontSize: "0.85rem", letterSpacing: "0.1em", cursor: "pointer", border: "none", marginTop: 8 }}
                >
                  ADD TO VAULT
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
