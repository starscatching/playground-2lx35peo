"use client";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

const MATERIALS = ["Silver", "Gold", "Bronze", "Copper", "Cupronickel", "Platinum", "Nickel", "Other"];
const CONDITIONS = ["MS-70","MS-69","MS-68","MS-67","MS-66","MS-65","MS-64","MS-63","AU-58","AU-55","EF-45","VF-35","VF-30","F-15","F-12","VG-10","G-6","AG-3","Poor-1"];

export default function UploadPage() {
  const [obverse, setObverse] = useState<string | null>(null);
  const [reverse, setReverse] = useState<string | null>(null);
  const [obverseFile, setObverseFile] = useState<File | null>(null);
  const [reverseFile, setReverseFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: "", country: "", year: "", material: "Silver", denomination: "", mint: "", condition: "MS-65", notes: "", purchase_price: "" });
  const [dragging, setDragging] = useState<"obverse" | "reverse" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const obvRef = useRef<HTMLInputElement>(null);
  const revRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File, side: "obverse" | "reverse") => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => {
      if (side === "obverse") { setObverse(e.target?.result as string); setObverseFile(file); }
      else { setReverse(e.target?.result as string); setReverseFile(file); }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent, side: "obverse" | "reverse") => {
    e.preventDefault(); setDragging(null);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file, side);
  };

  async function uploadImage(file: File, path: string): Promise<string | null> {
    const { data, error } = await supabase.storage.from("coin-images").upload(path, file, { upsert: true });
    if (error) return null;
    const { data: urlData } = supabase.storage.from("coin-images").getPublicUrl(data.path);
    return urlData.publicUrl;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.country || !form.year) return;
    setLoading(true); setError("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const uid = user?.id ?? "anon";
      const ts = Date.now();
      let obvUrl = "", revUrl = "";
      if (obverseFile) { obvUrl = (await uploadImage(obverseFile, `${uid}/${ts}_obv.jpg`)) ?? ""; }
      if (reverseFile) { revUrl = (await uploadImage(reverseFile, `${uid}/${ts}_rev.jpg`)) ?? ""; }
      const { error: insertErr } = await supabase.from("coins").insert({
        user_id: uid,
        name: form.name,
        year: form.year,
        country: form.country,
        material: form.material,
        denomination: form.denomination,
        grade: form.condition,
        grader: "",
        mint: form.mint,
        notes: form.notes,
        purchase_price: parseFloat(form.purchase_price) || 0,
        current_value: 0,
        obverse_url: obvUrl,
        reverse_url: revUrl,
      });
      if (insertErr) throw insertErr;
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed. Are you signed in?");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#8B6914,#E8C76A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 28px", color: "#000" }}>⬡</div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: 12, color: "#F0F0F0" }}>Coin Added to Vault</h2>
          <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.7 }}>
            <strong style={{ color: "#C9A84C" }}>{form.name}</strong> has been saved to your private vault.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 28 }}>
            <button onClick={() => { setSubmitted(false); setObverse(null); setReverse(null); setObverseFile(null); setReverseFile(null); setForm({ name:"",country:"",year:"",material:"Silver",denomination:"",mint:"",condition:"MS-65",notes:"",purchase_price:"" }); }}
              style={{ padding: "11px 24px", borderRadius: 8, background: "rgba(201,168,76,.15)", border: "1px solid #2A2010", color: "#C9A84C", fontSize: ".8rem", fontWeight: 700, letterSpacing: ".08em", cursor: "pointer" }}>
              ADD ANOTHER
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputStyle = { width: "100%", background: "#0E0E0E", border: "1px solid #1A1A1A", color: "#E0E0E0", borderRadius: 8, padding: "10px 14px", fontSize: ".85rem", outline: "none" };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 28 }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "#C9A84C", fontSize: ".62rem", fontWeight: 700, letterSpacing: ".15em", marginBottom: 6 }}>VAULT UPLOAD</p>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#F0F0F0" }}>Add a Coin</h1>
        <p style={{ color: "#555", fontSize: ".82rem", marginTop: 6 }}>Upload photos and details — saved to your private Supabase vault.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
          {(["obverse", "reverse"] as const).map(side => {
            const preview = side === "obverse" ? obverse : reverse;
            const ref = side === "obverse" ? obvRef : revRef;
            return (
              <div key={side}
                onDragOver={e => { e.preventDefault(); setDragging(side); }}
                onDragLeave={() => setDragging(null)}
                onDrop={e => handleDrop(e, side)}
                onClick={() => ref.current?.click()}
                style={{
                  border: `2px dashed ${dragging === side ? "#C9A84C" : preview ? "#2A2010" : "#1A1A1A"}`,
                  borderRadius: 14, aspectRatio: "1", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", cursor: "pointer",
                  background: preview ? "#050505" : "#080808", overflow: "hidden", position: "relative",
                  transition: "border-color .2s",
                }}>
                {preview ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={preview} alt={side} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ) : (
                  <>
                    <span style={{ fontSize: 36, opacity: .15, color: "#C9A84C" }}>⬡</span>
                    <p style={{ color: "#444", fontSize: ".78rem", marginTop: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em" }}>{side.toUpperCase()}</p>
                    <p style={{ color: "#2A2A2A", fontSize: ".7rem", marginTop: 4 }}>Click or drop image</p>
                  </>
                )}
                <input ref={ref} type="file" accept="image/*" style={{ display: "none" }}
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f, side); }} />
              </div>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", color: "#555", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Coin Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Morgan Dollar" required style={inputStyle} />
          </div>
          {[
            { key: "country", label: "Country *", placeholder: "e.g. United States" },
            { key: "year", label: "Year *", placeholder: "e.g. 1921" },
            { key: "denomination", label: "Denomination", placeholder: "e.g. $1" },
            { key: "mint", label: "Mint Mark", placeholder: "e.g. S, O, D, CC" },
            { key: "purchase_price", label: "Purchase Price ($)", placeholder: "e.g. 450.00" },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: "block", color: "#555", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>{f.label}</label>
              <input value={(form as Record<string, string>)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder}
                required={f.key === "country" || f.key === "year"} style={inputStyle} />
            </div>
          ))}
          <div>
            <label style={{ display: "block", color: "#555", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Material</label>
            <select value={form.material} onChange={e => setForm({ ...form, material: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}>
              {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", color: "#555", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Grade / Condition</label>
            <select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", color: "#555", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Notes</label>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Provenance, purchase history, special details..."
              rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </div>
        </div>

        {error && (
          <p style={{ color: "#f87171", fontSize: ".82rem", background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading}
          style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#8B6914,#C9A84C,#E8C76A)", color: "#000", fontSize: ".8rem", fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase", cursor: loading ? "wait" : "pointer", opacity: loading ? .6 : 1 }}>
          {loading ? "SAVING TO VAULT..." : "ADD TO VAULT"}
        </button>
      </form>
    </div>
  );
}
