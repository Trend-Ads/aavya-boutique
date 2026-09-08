"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEnvConfigured, setIsEnvConfigured] = useState<boolean>(true);

  useEffect(() => {
    // Check if client has access to Supabase anon key
    const hasAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    if (!hasAnonKey) {
      setIsEnvConfigured(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError("Supabase Anon Key is not configured yet. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file as detailed in ADMIN_SETUP_GUIDE.md.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (signInError) {
        setError(signInError.message || "Failed to sign in. Please verify your credentials.");
        setLoading(false);
        return;
      }

      if (data?.user) {
        // Successful login
        router.push(redirectedFrom);
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--color-ivory)",
        padding: "1.5rem",
        position: "relative",
      }}
    >
      {/* Decorative background gradients */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "350px",
          background: "radial-gradient(ellipse at center, rgba(197, 160, 89, 0.12) 0%, rgba(253, 251, 247, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "2.5rem 2rem",
          boxShadow: "0 20px 45px -15px rgba(26, 26, 26, 0.08), 0 0 0 1px rgba(197, 160, 89, 0.18)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(197, 160, 89, 0.12)",
              color: "var(--color-gold)",
              marginBottom: "1rem",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.85rem",
              fontWeight: "500",
              letterSpacing: "0.02em",
              color: "var(--color-charcoal)",
              marginBottom: "0.35rem",
            }}
          >
            Aavya Boutique
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6b7280",
              fontWeight: 500,
            }}
          >
            Administrator Portal
          </p>
        </div>

        {/* Missing Config Notification */}
        {!isEnvConfigured && (
          <div
            style={{
              backgroundColor: "rgba(217, 119, 6, 0.08)",
              border: "1px solid rgba(217, 119, 6, 0.3)",
              borderRadius: "8px",
              padding: "0.85rem",
              marginBottom: "1.5rem",
              fontSize: "0.8rem",
              color: "#92400e",
              lineHeight: 1.45,
            }}
          >
            <strong>Setup Notice:</strong> <br />
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> is missing from your <code>.env</code> file. Please add your Supabase keys to log in.
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div
            style={{
              backgroundColor: "rgba(220, 38, 38, 0.06)",
              border: "1px solid rgba(220, 38, 38, 0.2)",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              marginBottom: "1.25rem",
              fontSize: "0.85rem",
              color: "#dc2626",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              htmlFor="admin-email"
              style={{
                display: "block",
                fontSize: "0.82rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "var(--color-charcoal)",
                marginBottom: "0.4rem",
              }}
            >
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aavyaboutique.in"
              required
              autoComplete="email"
              style={{
                width: "100%",
                padding: "0.75rem 0.9rem",
                fontSize: "0.9rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: "#fafafa",
                color: "var(--color-charcoal)",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-gold)";
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.boxShadow = "0 0 0 3px rgba(197, 160, 89, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <label
                htmlFor="admin-password"
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: "var(--color-charcoal)",
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "0.75rem",
                  color: "var(--color-gold)",
                  cursor: "pointer",
                  padding: 0,
                  fontWeight: 500,
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "0.75rem 0.9rem",
                fontSize: "0.9rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: "#fafafa",
                color: "var(--color-charcoal)",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-gold)";
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.boxShadow = "0 0 0 3px rgba(197, 160, 89, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.85rem 1.25rem",
              fontSize: "0.88rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              backgroundColor: loading ? "#9ca3af" : "var(--color-charcoal)",
              color: "#ffffff",
              border: "1px solid var(--color-charcoal)",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.25s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-gold-dark)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-gold-dark)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-charcoal)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-charcoal)";
              }
            }}
          >
            {loading ? (
              <>
                <svg
                  style={{
                    animation: "spin 1s linear infinite",
                    height: "16px",
                    width: "16px",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    style={{ opacity: 0.25 }}
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    style={{ opacity: 0.75 }}
                  />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* Live Store Link */}
        <div style={{ textAlign: "center", marginTop: "1.75rem", borderTop: "1px solid #f3f4f6", paddingTop: "1.25rem" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.82rem",
              color: "#6b7280",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-charcoal)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b7280")}
          >
            <span>← Back to Aavya Boutique storefront</span>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
