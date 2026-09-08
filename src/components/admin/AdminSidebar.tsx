"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
  badge?: string;
  isComingSoon?: boolean;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--color-gold-light)" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--color-gold-light)" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      ),
    },
    {
      label: "Add Product",
      href: "/admin/products/new",
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--color-gold-light)" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--color-gold-light)" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      ),
    },
    {
      label: "Orders",
      href: "#",
      badge: "Coming Soon",
      isComingSoon: true,
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--color-gold-light)" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      label: "Report",
      href: "#",
      badge: "Coming Soon",
      isComingSoon: true,
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--color-gold-light)" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(2px)",
          zIndex: 90,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
        className="admin-mobile-backdrop"
      />

      {/* Sidebar Container */}
      <aside
        style={{
          width: "260px",
          height: "100vh",
          backgroundColor: "#161616",
          color: "#fdfbf7",
          borderRight: "1px solid rgba(197, 160, 89, 0.2)",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={`admin-sidebar ${isOpen ? "open" : ""}`}
      >
        {/* Sidebar Header / Brand */}
        <div
          style={{
            padding: "1.5rem 1.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <Link
            href="/admin/dashboard"
            onClick={onClose}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  color: "#ffffff",
                }}
              >
                Aavya Boutique
              </span>
            </div>
            <span
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-gold-light)",
                fontWeight: 600,
                marginTop: "0.15rem",
              }}
            >
              Control Center
            </span>
          </Link>

          {/* Close Button for Mobile Drawer */}
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            style={{
              background: "none",
              border: "none",
              color: "#9ca3af",
              cursor: "pointer",
              padding: "0.4rem",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="admin-sidebar-close-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          style={{
            padding: "1.25rem 0.75rem",
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
          }}
        >
          <div
            style={{
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#6b7280",
              padding: "0 0.75rem 0.5rem",
              fontWeight: 600,
            }}
          >
            Store Management
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && item.href !== "#" && pathname.startsWith(item.href));

            if (item.isComingSoon) {
              return (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 0.85rem",
                    borderRadius: "8px",
                    color: "#6b7280",
                    cursor: "not-allowed",
                    userSelect: "none",
                    opacity: 0.75,
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {item.icon(false)}
                    <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        backgroundColor: "rgba(197, 160, 89, 0.15)",
                        color: "var(--color-gold-light)",
                        border: "1px solid rgba(197, 160, 89, 0.3)",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "4px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 0.85rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  backgroundColor: isActive ? "rgba(197, 160, 89, 0.15)" : "transparent",
                  color: isActive ? "#ffffff" : "#d1d5db",
                  border: isActive ? "1px solid rgba(197, 160, 89, 0.35)" : "1px solid transparent",
                  transition: "all 0.15s ease",
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                    (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#d1d5db";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {item.icon(isActive)}
                  <span style={{ fontSize: "0.88rem", fontWeight: isActive ? 600 : 500 }}>
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-gold)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Link to Live Store */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.82rem",
              color: "var(--color-gold-light)",
              textDecoration: "none",
              padding: "0.5rem 0",
              fontWeight: 500,
            }}
          >
            <span>Visit Live Store</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>
      </aside>

      <style jsx global>{`
        /* Desktop styles (min-width: 1024px) */
        @media (min-width: 1024px) {
          .admin-sidebar {
            transform: translateX(0) !important;
          }
          .admin-sidebar-close-btn {
            display: none !important;
          }
          .admin-mobile-backdrop {
            display: none !important;
          }
        }

        /* Mobile styles (max-width: 1023px) */
        @media (max-width: 1023px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
            box-shadow: 10px 0 25px rgba(0, 0, 0, 0.5);
          }
          .admin-sidebar-close-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
