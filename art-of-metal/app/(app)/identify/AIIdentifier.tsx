"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ALL_COINS, type Coin } from "@/lib/coins";
import { coinImg } from "@/lib/images";

const DEMO_MATCHES: Coin[] = [
  ALL_COINS.find((c) => c.name?.includes("Morgan")) ?? ALL_COINS[0],
  ALL_COINS.find((c) => c.name?.includes("Saint-Gaudens")) ?? ALL_COINS[1],
  ALL_COINS.find((c) => c.name?.includes("Indian Head Cent")) ?? ALL_COINS[2],
].filter(Boolean) as Coin[];

type Stage = "upload" | "identifying" | "result" | "correct" | "confirmed";

export default function AIIdentifier() {
  const [stage, setStage] = useState<Stage>("upload");
  const [preview, setPreview] = useState<string | null>(null);
  const [match, setMatch] = useState<Coin | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [correction, setCorrection] = useState({ name: "", year: "", material: "", mint: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  function runIdentification(imgUrl: string) {
    setPreview(imgUrl);
    setStage("identifying");
    setTimeout(() => {
      const picked = DEMO_MATCHES[Math.floor(Math.random() * DEMO_MATCHES.length)];
      setMatch(picked);
      setConfidence(72 + Math.floor(Math.random() * 22));
      setCorrection({ name: picked.name, year: String(picked.year ?? ""), material: picked.material ?? "", mint: picked.mint ?? "" });
      setStage("result");
    }, 1400);
  }

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    runIdentification(url);
  }

  function reset() {
    setStage("upload");
    setPreview(null);
    setMatch(null);
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {stage === "upload" && (
        <div>
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f) handleFile(f);
            }}
            style={{
              height: 340, background: "#0C0C0C", border: "1px dashed rgba(212,175,55,0.25)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
              cursor: "pointer", borderRadius: 4,
            }}
          >
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            <span style={{ fontSize: 40, opacity: 0.4 }}>📷</span>
            <p style={{ color: "#F0EAD6" }}>Drop a photo, or click to choose one</p>
            <p className="pm-mono" style={{ color: "#555", fontSize: "0.7rem" }}>The AI gets one identification attempt</p>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
            <span className="pm-mono" style={{ color: "#555", fontSize: "0.68rem", alignSelf: "center" }}>OR TRY A SAMPLE:</span>
            {DEMO_MATCHES.map((c, i) => (
              <button
                key={i}
                onClick={() => runIdentification(coinImg(c.obverseImg || ""))}
                style={{ padding: "8px 14px", borderRadius: 2, fontSize: "0.72rem", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", color: "#999", cursor: "pointer" }}
              >{c.name?.split(",")[0]}</button>
            ))}
          </div>
        </div>
      )}

      {stage === "identifying" && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          {preview && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={preview} alt="Uploaded coin" style={{ width: 220, height: 220, objectFit: "contain", borderRadius: "50%", background: "#0C0C0C", marginBottom: 24 }} />
          )}
          <p className="pm-cinzel" style={{ color: "#D4AF37", fontSize: "1.1rem", marginBottom: 8 }}>Analyzing…</p>
          <p style={{ color: "#666", fontSize: "0.85rem", fontStyle: "italic" }}>Comparing against the Coin Series Database</p>
        </div>
      )}

      {stage === "result" && match && (
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32 }}>
          <div>
            {preview && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={preview} alt="Uploaded coin" style={{ width: "100%", aspectRatio: "1", objectFit: "contain", borderRadius: "50%", background: "#0C0C0C" }} />
            )}
            <p className="pm-mono" style={{ textAlign: "center", color: "#555", fontSize: "0.62rem", marginTop: 10 }}>DEMO IDENTIFICATION — sample output</p>
          </div>
          <div>
            <p className="pm-mono" style={{ color: "#22C55E", fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: 8 }}>MATCH FOUND · {confidence}% CONFIDENCE</p>
            <h2 className="pm-cinzel" style={{ fontSize: "1.5rem", color: "#F5F5F5", fontWeight: 700, marginBottom: 6 }}>{match.name}</h2>
            <p style={{ color: "#888", marginBottom: 20 }}>{match.year} · {match.material} · {match.mint || "Mint unknown"}</p>

            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              <button onClick={() => setStage("confirmed")} className="btn-gold" style={{ padding: "11px 22px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: "0.8rem" }}>
                ✓ Looks Right — Add to Vault
              </button>
              <button onClick={() => setStage("correct")} style={{ padding: "11px 22px", borderRadius: 6, border: "1px solid #2A2A2A", background: "transparent", color: "#999", cursor: "pointer", fontSize: "0.8rem" }}>
                ✗ Not Quite — I&rsquo;ll Correct It
              </button>
            </div>
            <p style={{ color: "#555", fontSize: "0.8rem", fontStyle: "italic", maxWidth: 420 }}>
              The AI gets one shot. If it&rsquo;s wrong, your correction is final — no second-guessing, no override. The human always wins.
            </p>
          </div>
        </div>
      )}

      {stage === "correct" && (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 className="pm-cinzel" style={{ fontSize: "1.2rem", color: "#F5F5F5", marginBottom: 16 }}>Your Correction (Final)</h2>
          {(["name", "year", "material", "mint"] as const).map((field) => (
            <div key={field} style={{ marginBottom: 12 }}>
              <p className="pm-mono" style={{ fontSize: "0.62rem", color: "#666", marginBottom: 5, textTransform: "uppercase" }}>{field}</p>
              <input
                className="input-dark"
                value={correction[field]}
                onChange={(e) => setCorrection({ ...correction, [field]: e.target.value })}
              />
            </div>
          ))}
          <button onClick={() => setStage("confirmed")} className="btn-gold" style={{ padding: "11px 22px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: "0.8rem", marginTop: 8 }}>
            Save &amp; Add to Vault
          </button>
        </div>
      )}

      {stage === "confirmed" && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>⬡</p>
          <h2 className="pm-cinzel" style={{ fontSize: "1.3rem", color: "#F5F5F5", marginBottom: 10 }}>Added to Your Vault</h2>
          <p style={{ color: "#777", marginBottom: 24 }}>{correction.name || match?.name}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/vault" className="btn-gold" style={{ padding: "10px 22px", borderRadius: 6, textDecoration: "none", fontSize: "0.8rem" }}>Go to Vault →</Link>
            <button onClick={reset} style={{ padding: "10px 22px", borderRadius: 6, border: "1px solid #2A2A2A", background: "transparent", color: "#999", cursor: "pointer", fontSize: "0.8rem" }}>Identify Another</button>
          </div>
        </div>
      )}
    </div>
  );
}
