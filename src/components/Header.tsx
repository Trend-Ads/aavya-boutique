"use client";

import { useState, useEffect } from "react";
import { useUI } from "@/context/UIContext";
import MobileMenuDrawer from "./MobileMenuDrawer";

const NAV_LINKS = [
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Women", href: "#shop" },
  { label: "Collections", href: "#collections" },
  { label: "Dresses", href: "#dresses" },
  { label: "Ethnic", href: "#ethnic" },
  { label: "Sale", href: "#sale" },
];

export default function Header() {
  const { openCart, openSearch, openMobileMenu, isMobileMenuOpen, cartCount } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        id="site-header"
        style={{
          position: "fixed",
          top: 34,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease",
          backgroundColor: scrolled ? "rgba(248, 245, 240, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(195, 185, 175, 0.3)" : "1px solid transparent",
        }}
      >
        <div className="container-brand">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "60px",
            }}
          >
            {/* Mobile: Hamburger */}
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <button
                id="mobile-menu-btn"
                aria-label="Open navigation menu"
                onClick={openMobileMenu}
                className="md:hidden"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px 8px 10px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  minWidth: 44,
                  minHeight: 44,
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: 22,
                    height: 1,
                    backgroundColor: scrolled ? "var(--color-charcoal)" : "var(--color-ivory)",
                    transition: "background-color 0.3s",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: 16,
                    height: 1,
                    backgroundColor: scrolled ? "var(--color-charcoal)" : "var(--color-ivory)",
                    transition: "background-color 0.3s",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: 20,
                    height: 1,
                    backgroundColor: scrolled ? "var(--color-charcoal)" : "var(--color-ivory)",
                    transition: "background-color 0.3s",
                  }}
                />
              </button>

              {/* Desktop Nav */}
              <nav className="hidden md:flex" aria-label="Main navigation" style={{ gap: "2rem" }}>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: scrolled ? "var(--color-charcoal)" : "var(--color-ivory)",
                      textDecoration: "none",
                      transition: "color 0.3s, opacity 0.2s",
                      opacity: 0.85,
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Logo — always centered */}
            <a
              href="/"
              id="site-logo"
              aria-label="Aavya Boutique — Home"
              style={{
                textDecoration: "none",
                textAlign: "center",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.55rem",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: scrolled ? "var(--color-charcoal)" : "var(--color-ivory)",
                  transition: "color 0.3s",
                  lineHeight: 1,
                }}
              >
                AAVYA
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.52rem",
                  fontWeight: 400,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: scrolled ? "var(--color-taupe)" : "rgba(248,245,240,0.7)",
                  transition: "color 0.3s",
                  marginTop: "3px",
                }}
              >
                BOUTIQUE
              </span>
            </a>

            {/* Right Icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              {/* Search */}
              <button
                id="search-btn"
                aria-label="Search"
                onClick={openSearch}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px",
                  color: scrolled ? "var(--color-charcoal)" : "var(--color-ivory)",
                  transition: "color 0.3s",
                  minWidth: 44,
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconSearch />
              </button>

              {/* Wishlist — desktop only */}
              <button
                id="wishlist-btn"
                aria-label="Wishlist"
                className="hidden md:flex"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px",
                  color: scrolled ? "var(--color-charcoal)" : "var(--color-ivory)",
                  transition: "color 0.3s",
                  minWidth: 44,
                  minHeight: 44,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconHeart />
              </button>

              {/* Account — desktop only */}
              <button
                id="account-btn"
                aria-label="My Account"
                className="hidden md:flex"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px",
                  color: scrolled ? "var(--color-charcoal)" : "var(--color-ivory)",
                  transition: "color 0.3s",
                  minWidth: 44,
                  minHeight: 44,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconUser />
              </button>

              {/* Cart */}
              <button
                id="cart-btn"
                aria-label={`Shopping bag, ${cartCount} items`}
                onClick={openCart}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px",
                  color: scrolled ? "var(--color-charcoal)" : "var(--color-ivory)",
                  transition: "color 0.3s",
                  minWidth: 44,
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <IconBag />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: "var(--color-burgundy)",
                      color: "white",
                      fontSize: "0.55rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-hidden="true"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenuDrawer isOpen={isMobileMenuOpen} onClose={() => {}} />
    </>
  );
}

/* ── SVG Icons ── */
function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
