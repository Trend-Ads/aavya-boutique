"use client";

import { useEffect } from "react";
import { useUI } from "@/context/UIContext";

const MAIN_NAV = [
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Shop", href: "#shop" },
  { label: "Dresses", href: "#dresses" },
  { label: "Kurtis", href: "#kurtis" },
  { label: "Co-ords", href: "#coords" },
  { label: "Ethnic", href: "#ethnic" },
  { label: "Party Wear", href: "#partywear" },
  { label: "Sale", href: "#sale" },
];

const SECONDARY_NAV = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Track Order", href: "#track" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenuDrawer({ isOpen }: Props) {
  const { closeMobileMenu } = useUI();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="overlay-backdrop"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <nav
        id="mobile-nav-drawer"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "min(340px, 90vw)",
          backgroundColor: "var(--color-ivory)",
          zIndex: 60,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          paddingBottom: "env(safe-area-inset-bottom, 24px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--color-cream-dark)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-charcoal)",
            }}
          >
            AAVYA
          </span>
          <button
            id="close-mobile-menu-btn"
            aria-label="Close menu"
            onClick={closeMobileMenu}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              color: "var(--color-charcoal)",
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Main Nav Items */}
        <div style={{ padding: "2rem 1.5rem 1rem", flex: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {MAIN_NAV.map((link, i) => (
              <li key={link.label} style={{ borderBottom: "1px solid var(--color-cream)", animationDelay: `${i * 0.05}s` }}>
                <a
                  href={link.href}
                  onClick={closeMobileMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 0",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    color: "var(--color-charcoal)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-taupe)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-charcoal)"}
                >
                  {link.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* Secondary Links */}
          <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-cream-dark)" }}>
            {SECONDARY_NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-taupe)",
                  textDecoration: "none",
                  padding: "0.6rem 0",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid var(--color-cream-dark)",
          }}
        >
          <div style={{ display: "flex", gap: "1.25rem", marginBottom: "1rem" }}>
            <a
              href="https://instagram.com/aavyaboutique"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Aavya Boutique on Instagram"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-charcoal)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Aavya Boutique on WhatsApp"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-charcoal)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp
            </a>
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.68rem",
              color: "var(--color-taupe)",
              letterSpacing: "0.08em",
            }}
          >
            Kochi, Kerala · All India Delivery
          </p>
        </div>
      </nav>
    </>
  );
}
