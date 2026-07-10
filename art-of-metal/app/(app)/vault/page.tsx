"use client";
import { useEffect, useState } from "react";
import { GRADING_QUESTIONS, computeGrade, CARD_STYLES } from "@/lib/grading";
import { CoinCardFront, CoinCardBack } from "@/components/CoinCardTemplate";
import { coinImg } from "@/lib/images";

interface VaultEntry {
  id: string;
  name: string;
  year: string;
  mint: string;
  material: string;
  composition: string;
  weight: string;
  diameter: string;
  edge: string;
  designer: string;
  grade: string;
  gradeLabel: string;
  detailsFlag: boolean;
  cardStyle: string;
  imgSrc?: string;
  serial: string;
  addedAt: string;
}

const SUGGESTIONS = [
  { name: "Morgan Silver Dollar", year: "1893", mint: "S", material: "Silver", composition: "90% Silver, 10% Copper", weight: "26.73 g", diameter: "38.1 mm", edge: "Reeded", designer: "George T. Morgan", img: "1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg" },
  { name: "Saint-Gaudens Double Eagle", year: "1907", mint: "P", material: "Gold", composition: "90% Gold, 10% Copper", weight: "33.44 g", diameter: "34.0 mm", edge: "Lettered", designer: "Augustus Saint-Gaudens", img: "1932_133_4_Gold_20_Dollar,_United_States,_1932._1932.133.4_rev.jpg" },
  { name: "Lincoln Wheat Cent", year: "1909", mint: "S", material: "Bronze", composition: "95% Copper, 5% Zinc/Tin", weight: "3.11 g", diameter: "19.0 mm", edge: "Plain", designer: "Victor D. Brenner", img: "1932_51_22_Cupronickel_5_cent_of_The_United_States,_United_St_obv.jpg" },
];

type Stage = "list" | "form" | "quiz" | "result" | "card";

function seedIfEmpty(): VaultEntry[] {
  const raw = localStorage.getItem("aom_vault_entries");
  if (raw) return JSON.parse(raw);
  const seed: VaultEntry[] = [
    { id: "seed1", name: "Morgan Silver Dollar", year: "1921", mint: "P", material: "Silver", composition: "90% Silver, 10% Copper", weight: "26.73 g", diameter: "38.1 mm", edge: "Reeded", designer: "George T. Morgan", grade: "MS-63", gradeLabel: "Choice Uncirculated", detailsFlag: false, cardStyle: "gold", imgSrc: coinImg("1932_79_1_Silver_1_4_Dollar,_United_States,_1932._1932.79.1_obv.jpg"), serial: "AOM-000001", addedAt: new Date().toISOString() },
  ];
  localStorage.setItem("aom_vault_entries", JSON.stringify(seed));
  return seed;
}

export default function VaultPage() {
  const [stage, setStage] = useState<Stage>("list");
  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [form, setForm] = useState({ name: "", year: "", mint: "", material: "Silver", composition: "", weight: "", diameter: "", edge: "", designer: "", imgSrc: "" });
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [cardStyle, setCardStyle] = useState("gold");

  useEffect(() => { setEntries(seedIfEmpty()); }, []);

  function startWizard() {
    setForm({ name: "", year: "", mint: "", material: "Silver", composition: "", weight: "", diameter: "", edge: "", designer: "", imgSrc: "" });
    setAnswers([]);
    setQIndex(0);
    setStage("form");
  }

  function applySuggestion(s: typeof SUGGESTIONS[number]) {
    setForm({ name: s.name, year: s.year, mint: s.mint, material: s.material, composition: s.composition, weight: s.weight, diameter: s.diameter, edge: s.edge, designer: s.designer, imgSrc: coinImg(s.img) });
  }

  function answerQuestion(idx: number) {
    const next = [...answers, idx];
    setAnswers(next);
    if (qIndex + 1 < GRADING_QUESTIONS.length) {
      setQIndex(qIndex + 1);
    } else {
      setStage("result");
    }
  }

  const gradeResult = answers.length === GRADING_QUESTIONS.length ? computeGrade(answers) : null;
  const gradeDisplay = gradeResult ? `${gradeResult.grade}${gradeResult.detailsFlag ? " Details" : ""}` : "";

  function saveToVault() {
    if (!gradeResult) return;
    const entry: VaultEntry = {
      id: Math.random().toString(36).slice(2),
      name: form.name || "Unnamed Coin",
      year: form.year,
      mint: form.mint,
      material: form.material,
      composition: form.composition || form.material,
      weight: form.weight,
      diameter: form.diameter,
      edge: form.edge,
      designer: form.designer,
      grade: gradeResult.grade,
      gradeLabel: gradeResult.label,
      detailsFlag: gradeResult.detailsFlag,
      cardStyle,
      imgSrc: form.imgSrc || undefined,
      serial: `AOM-${String(entries.length + 1).padStart(6, "0")}`,
      addedAt: new Date().toISOString(),
    };
    const next = [entry, ...entries];
    setEntries(next);
    localStorage.setItem("aom_vault_entries", JSON.stringify(next));
    setStage("card");
  }

  return (
    <div className="pm-root" style={{ minHeight: "100vh", padding: "40px 40px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <p className="pm-sec-eyebrow" style={{ textAlign: "left" }}>Your Digital Vault</p>
          <h1 className="pm-cinzel" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700, color: "#F5F5F5" }}>Vault</h1>
        </div>
        {stage === "list" && (
          <button onClick={startWizard} className="btn-gold" style={{ padding: "12px 26px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: "0.82rem" }}>
            + Grade a New Coin
          </button>
        )}
        {stage !== "list" && (
          <button onClick={() => setStage("list")} style={{ padding: "10px 20px", borderRadius: 6, border: "1px solid #2A2A2A", background: "transparent", color: "#999", cursor: "pointer", fontSize: "0.78rem" }}>
            ← Back to Vault
          </button>
        )}
      </div>

      {stage === "list" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
          {entries.map((e) => (
            <div key={e.id} className="pm-card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ aspectRatio: "1/1", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {e.imgSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={e.imgSrc} alt={e.name} style={{ width: "70%", height: "70%", objectFit: "contain" }} />
                ) : <span style={{ fontSize: 36, opacity: 0.15, color: "#C9A84C" }}>⬡</span>}
              </div>
              <div style={{ padding: 16 }}>
                <p style={{ color: "#F0EAD6", fontWeight: 600, fontSize: "0.88rem", marginBottom: 4 }}>{e.name}</p>
                <p style={{ color: "#666", fontSize: "0.75rem", marginBottom: 8 }}>{e.year} {e.mint} · {e.material}</p>
                <span className="pm-mono" style={{ color: "#D4AF37", fontSize: "0.7rem", fontWeight: 700 }}>{e.grade}{e.detailsFlag ? " Details" : ""}</span>
              </div>
            </div>
          ))}
          {entries.length === 0 && <p style={{ color: "#555" }}>Your vault is empty. Grade your first coin to get started.</p>}
        </div>
      )}

      {stage === "form" && (
        <div style={{ maxWidth: 520 }}>
          <h2 className="pm-cinzel" style={{ fontSize: "1.2rem", color: "#F5F5F5", marginBottom: 14 }}>What coin are you grading?</h2>
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            {SUGGESTIONS.map((s) => (
              <button key={s.name} onClick={() => applySuggestion(s)} style={{ padding: "6px 12px", fontSize: "0.72rem", borderRadius: 100, background: "#141414", border: "1px solid rgba(255,255,255,0.08)", color: "#999", cursor: "pointer" }}>
                {s.name}
              </button>
            ))}
          </div>
          {[
            { key: "name", label: "Coin Name", ph: "e.g. Morgan Silver Dollar" },
            { key: "year", label: "Year", ph: "e.g. 1893" },
            { key: "mint", label: "Mint Mark", ph: "e.g. S" },
            { key: "material", label: "Material", ph: "e.g. Silver" },
          ].map((f) => (
            <div key={f.key} style={{ marginBottom: 12 }}>
              <p className="pm-mono" style={{ fontSize: "0.62rem", color: "#666", marginBottom: 5 }}>{f.label.toUpperCase()}</p>
              <input
                className="input-dark"
                placeholder={f.ph}
                value={(form as Record<string, string>)[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            </div>
          ))}
          <button
            disabled={!form.name}
            onClick={() => setStage("quiz")}
            className="btn-gold"
            style={{ padding: "11px 26px", borderRadius: 6, border: "none", cursor: form.name ? "pointer" : "not-allowed", fontSize: "0.82rem", opacity: form.name ? 1 : 0.5, marginTop: 8 }}
          >
            Start Self-Assessment →
          </button>
        </div>
      )}

      {stage === "quiz" && (
        <div style={{ maxWidth: 620 }}>
          <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 6, padding: "16px 18px", marginBottom: 28 }}>
            <p className="pm-mono" style={{ color: "#EF4444", fontSize: "0.68rem", letterSpacing: "0.06em", marginBottom: 6 }}>⚠ SELF-ASSESSMENT ONLY — NOT A PROFESSIONAL GRADE</p>
            <p style={{ color: "#999", fontSize: "0.82rem", lineHeight: 1.6 }}>This questionnaire helps you estimate your coin&rsquo;s condition so you can track it in your vault. It is <strong style={{ color: "#ccc" }}>not</strong> a PCGS or NGC grade. Be honest — an accurate self-assessment helps you decide whether professional grading is worth the cost.</p>
          </div>

          <p className="pm-mono" style={{ color: "#8A7220", fontSize: "0.68rem", letterSpacing: "0.08em", marginBottom: 8 }}>
            QUESTION {qIndex + 1} OF {GRADING_QUESTIONS.length} — {GRADING_QUESTIONS[qIndex].category.toUpperCase()}
          </p>
          <div style={{ height: 3, background: "#141414", borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
            <div style={{ width: `${((qIndex) / GRADING_QUESTIONS.length) * 100}%`, height: "100%", background: "#D4AF37" }} />
          </div>
          <h2 className="pm-cinzel" style={{ fontSize: "1.2rem", color: "#F0EAD6", fontWeight: 600, marginBottom: 22, lineHeight: 1.4 }}>
            {GRADING_QUESTIONS[qIndex].question}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {GRADING_QUESTIONS[qIndex].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => answerQuestion(i)}
                style={{ textAlign: "left", padding: "14px 18px", borderRadius: 6, background: "#0E0E0E", border: "1px solid rgba(212,175,55,0.15)", color: "#ccc", cursor: "pointer", fontSize: "0.9rem" }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === "result" && gradeResult && (
        <div style={{ maxWidth: 620 }}>
          <div style={{ border: "1px solid rgba(212,175,55,0.3)", borderRadius: 6, padding: "20px 22px", marginBottom: 20 }}>
            <p className="pm-mono" style={{ color: "#8A7220", fontSize: "0.65rem", letterSpacing: "0.08em", marginBottom: 8 }}>YOUR SELF-ASSESSMENT RESULT</p>
            <p className="pm-cinzel" style={{ color: "#D4AF37", fontSize: "1.8rem", fontWeight: 700, marginBottom: 8 }}>{gradeDisplay}</p>
            <p style={{ color: "#ccc", fontSize: "0.9rem", marginBottom: 10 }}>{gradeResult.label}</p>
            <p style={{ color: "#777", fontSize: "0.78rem", fontStyle: "italic" }}>⚠ This is an estimate only. Not a PCGS or NGC grade.</p>
          </div>
          <div style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 6, padding: "16px 18px", marginBottom: 28 }}>
            <p style={{ color: "#22C55E", fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>✓ Consider Professional Grading</p>
            <p style={{ color: "#999", fontSize: "0.82rem", lineHeight: 1.6 }}>
              If this is a key date or scarce coin, professional grading is likely worth it. For common dates, weigh the grading cost against the coin&rsquo;s value.
            </p>
          </div>

          <p className="pm-mono" style={{ color: "#8A7220", fontSize: "0.68rem", letterSpacing: "0.08em", marginBottom: 14 }}>CHOOSE YOUR CARD STYLE</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {CARD_STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setCardStyle(s.id)}
                style={{
                  textAlign: "left", padding: "14px 16px", borderRadius: 6, cursor: "pointer",
                  background: cardStyle === s.id ? "rgba(212,175,55,0.06)" : "#0E0E0E",
                  border: `1px solid ${cardStyle === s.id ? "#D4AF37" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <p style={{ color: cardStyle === s.id ? "#D4AF37" : "#ccc", fontWeight: 700, fontSize: "0.85rem", marginBottom: 6 }}>{s.name.toUpperCase()}</p>
                <div style={{ height: 3, borderRadius: 2, background: s.swatch, marginBottom: 8 }} />
                <p style={{ color: "#777", fontSize: "0.75rem" }}>{s.desc}</p>
              </button>
            ))}
          </div>
          <button onClick={saveToVault} className="btn-gold" style={{ padding: "12px 26px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: "0.85rem" }}>
            Generate Collector Card →
          </button>
        </div>
      )}

      {stage === "card" && (
        <div>
          <h2 className="pm-cinzel" style={{ fontSize: "1.2rem", color: "#F5F5F5", marginBottom: 20 }}>Your Collector Card</h2>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 28 }}>
            <CoinCardFront
              style={cardStyle}
              name={form.name}
              mint={form.mint || "—"}
              year={form.year || "—"}
              composition={form.composition || form.material}
              weight={form.weight || "—"}
              diameter={form.diameter || "—"}
              edge={form.edge || "—"}
              designer={form.designer || "Designer unknown"}
              serial={`AOM-${String(entries.length).padStart(6, "0")}`}
              imgSrc={form.imgSrc}
            />
            <CoinCardBack
              style={cardStyle}
              composition={form.composition || form.material}
              historicalNotes={[
                `Self-assessed grade: ${gradeDisplay}`,
                gradeResult ? gradeResult.label : "",
                "Added to your private Art of Metal vault.",
              ].filter(Boolean)}
              pcgsGrade={gradeDisplay}
              serial={`AOM-${String(entries.length).padStart(6, "0")}`}
            />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => window.print()} style={{ padding: "11px 22px", borderRadius: 6, border: "1px solid #2A2A2A", background: "transparent", color: "#999", cursor: "pointer", fontSize: "0.8rem" }}>
              🖨 Print Card
            </button>
            <button onClick={() => setStage("list")} className="btn-gold" style={{ padding: "11px 22px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: "0.8rem" }}>
              Done — View Vault
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
