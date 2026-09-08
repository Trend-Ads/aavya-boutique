"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface AdminHeaderProps {
  userEmail?: string;
}

export default function AdminHeader({ userEmail }: AdminHeaderProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      setLoggingOut(false);
    }
  };

  return (
    <header
      style={{
        backgroundColor: "#1a1a1a",
        color: "#fdfbf7",
        borderBottom: "1px solid rgba(197, 160, 89, 0.25)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0.85rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Brand & Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <Link
            href="/admin"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.45rem",
              fontWeight: 500,
              letterSpacing: "0.03em",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Aavya Boutique
          </Link>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              backgroundColor: "rgba(197, 160, 89, 0.2)",
              color: "var(--color-gold-light)",
              border: "1px solid rgba(197, 160, 89, 0.4)",
              padding: "0.2rem 0.5rem",
              borderRadius: "4px",
            }}
          >
            Admin
          </span>
        </div>

        {/* User Info & Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.82rem",
              color: "#d1d5db",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-gold-light)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = "#d1d5db")}
          >
            <span>Live Store</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>

          {userEmail && (
            <div
              style={{
                display: "none",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8rem",
                color: "#9ca3af",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                padding: "0.35rem 0.75rem",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              className="admin-email-badge"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{userEmail}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              background: "none",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#fdfbf7",
              fontSize: "0.8rem",
              fontWeight: 500,
              padding: "0.4rem 0.85rem",
              borderRadius: "6px",
              cursor: loggingOut ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
            onMouseOver={(e) => {
              if (!loggingOut) {
                (e.currentTarget as HTMLElement).style.borderColor = "#ef4444";
                (e.currentTarget as HTMLElement).style.color = "#ef4444";
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(239, 68, 68, 0.1)";
              }
            }}
            onMouseOut={(e) => {
              if (!loggingOut) {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.25)";
                (e.currentTarget as HTMLElement).style.color = "#fdfbf7";
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>{loggingOut ? "Signing Out..." : "Sign Out"}</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          :global(.admin-email-badge) {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
