"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: name } },
        });
        if (err) throw err;
        setSuccess("Check your email to confirm your account, then sign in.");
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        router.push("/portfolio");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#060606", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link href="/" style={{ display: "inline-block" }}>
            <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.8rem", fontWeight: 900, letterSpacing: ".1em", color: "#f8edd2" }}>ART OF METAL</p>
            <p style={{ color: "#f2c66d", fontSize: ".6rem", letterSpacing: ".25em", textTransform: "uppercase", marginTop: 4 }}>Coin Collectors Platform</p>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: "#0A0A0A", border: "1px solid rgba(242,198,109,.22)", borderRadius: 20, padding: "36px 32px", boxShadow: "0 28px 80px rgba(0,0,0,.8)" }}>

          {/* Tabs */}
          <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "1px solid #1a1a1a", marginBottom: 28 }}>
            {(["signin", "signup"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); setSuccess(""); }}
                style={{
                  flex: 1, padding: "11px", fontSize: ".72rem", fontWeight: 900,
                  letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", border: "none",
                  background: mode === m ? "rgba(242,198,109,.15)" : "transparent",
                  color: mode === m ? "#f2c66d" : "#555",
                  borderRight: m === "signin" ? "1px solid #1a1a1a" : "none",
                  transition: "all .2s",
                }}>
                {m === "signin" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {success ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <p style={{ fontSize: "1.5rem", marginBottom: 12 }}>✓</p>
              <p style={{ color: "#4ade80", fontSize: ".9rem", lineHeight: 1.6 }}>{success}</p>
              <button onClick={() => { setSuccess(""); setMode("signin"); }} style={{ marginTop: 20, color: "#f2c66d", background: "none", border: "none", fontSize: ".8rem", cursor: "pointer", textDecoration: "underline" }}>
                Go to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {mode === "signup" && (
                <div>
                  <label style={{ display: "block", color: "#777", fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 7 }}>Display Name</label>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your collector name"
                    style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 10, padding: "12px 16px", color: "#f8edd2", fontSize: ".9rem", outline: "none" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(242,198,109,.5)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#222")}
                  />
                </div>
              )}
              <div>
                <label style={{ display: "block", color: "#777", fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 7 }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 10, padding: "12px 16px", color: "#f8edd2", fontSize: ".9rem", outline: "none" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(242,198,109,.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#222")}
                />
              </div>
              <div>
                <label style={{ display: "block", color: "#777", fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 7 }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 10, padding: "12px 16px", color: "#f8edd2", fontSize: ".9rem", outline: "none" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(242,198,109,.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#222")}
                />
              </div>

              {error && (
                <p style={{ color: "#f87171", fontSize: ".8rem", background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.2)", borderRadius: 8, padding: "10px 14px" }}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading}
                style={{
                  marginTop: 4, padding: "14px", borderRadius: 12,
                  outline: "1px solid rgba(242,198,109,.45)",
                  background: "radial-gradient(circle at 30% 15%,rgba(255,235,170,.45),rgba(167,109,34,.22) 45%,rgba(0,0,0,.2))",
                  color: "#ffe3a3", fontSize: ".8rem", fontWeight: 900,
                  letterSpacing: ".12em", textTransform: "uppercase",
                  cursor: loading ? "wait" : "pointer",
                  opacity: loading ? .6 : 1,
                  boxShadow: "0 10px 30px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.15)",
                  transition: "all .2s",
                  border: "none",
                }}>
                {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: 20, color: "#333", fontSize: ".75rem" }}>
          <Link href="/" style={{ color: "#555" }}>← Back to Art of Metal</Link>
        </p>
      </div>
    </div>
  );
}
