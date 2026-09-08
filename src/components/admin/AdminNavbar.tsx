"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface AdminNavbarProps {
  userEmail?: string;
  onToggleSidebar: () => void;
}

export default function AdminNavbar({ userEmail, onToggleSidebar }: AdminNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  // Compute page title from path
  const getPageTitle = () => {
    if (pathname.includes("/admin/products/new")) return "Add New Product";
    if (pathname.includes("/admin/products")) return "Products Management";
    if (pathname.includes("/admin/categories")) return "Categories Management";
    if (pathname.includes("/admin/dashboard")) return "Dashboard";
    return "Admin Portal";
  };

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
        height: "64px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
      }}
    >
      {/* Left side: Hamburger button + Page title */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleSidebar}
          aria-label="Open sidebar menu"
          style={{
            background: "none",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            padding: "0.45rem",
            cursor: "pointer",
            color: "var(--color-charcoal)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="admin-hamburger-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Breadcrumb / Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.85rem", color: "#9ca3af", fontWeight: 500 }} className="admin-breadcrumb-root">
            Admin /
          </span>
          <h1
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "var(--color-charcoal)",
              margin: 0,
            }}
          >
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right side: Live Store, Email, Sign Out */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.82rem",
            color: "#4b5563",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontWeight: 500,
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-gold-dark)")}
          onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = "#4b5563")}
          className="admin-live-store-link"
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
              color: "#4b5563",
              backgroundColor: "#f3f4f6",
              padding: "0.35rem 0.75rem",
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            className="admin-navbar-email"
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{userEmail}</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            background: "none",
            border: "1px solid #d1d5db",
            color: "var(--color-charcoal)",
            fontSize: "0.8rem",
            fontWeight: 500,
            padding: "0.4rem 0.75rem",
            borderRadius: "6px",
            cursor: loggingOut ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
          onMouseOver={(e) => {
            if (!loggingOut) {
              (e.currentTarget as HTMLElement).style.borderColor = "#ef4444";
              (e.currentTarget as HTMLElement).style.color = "#ef4444";
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(239, 68, 68, 0.05)";
            }
          }}
          onMouseOut={(e) => {
            if (!loggingOut) {
              (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db";
              (e.currentTarget as HTMLElement).style.color = "var(--color-charcoal)";
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="admin-signout-text">{loggingOut ? "Exiting..." : "Sign Out"}</span>
        </button>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .admin-hamburger-btn {
            display: none !important;
          }
        }
        @media (min-width: 640px) {
          .admin-navbar-email {
            display: flex !important;
          }
        }
        @media (max-width: 480px) {
          .admin-breadcrumb-root {
            display: none !important;
          }
          .admin-signout-text {
            display: none !important;
          }
          .admin-live-store-link span {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
