"use client";

import { useState, useEffect } from "react";
import { useUI } from "@/context/UIContext";
import MobileMenuDrawer from "./MobileMenuDrawer";

interface NavLink {
  label: string;
  href: string;
  isSale?: boolean;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Shop All", href: "/shop" },
  { label: "Dresses", href: "/shop?category=dresses" },
  { label: "Kurtis", href: "/shop?category=kurtis" },
  { label: "Co-ords", href: "/shop?category=co-ords" },
  { label: "Ethnic", href: "/shop?category=ethnic" },
  { label: "Party Wear", href: "/shop?category=party-wear" },
  // { label: "Sale", href: "/shop?badge=Sale", isSale: true },
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
          top: scrolled ? "12px" : "36px",
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          padding: scrolled ? "0 1rem" : "0",
          transition: "top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.4s",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: scrolled ? "1200px" : "100%",
            backgroundColor: scrolled ? "rgba(248, 245, 240, 0.95)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
            borderRadius: scrolled ? "16px" : "0px",
            boxShadow: scrolled ? "0 8px 32px rgba(23, 23, 23, 0.08), 0 1px 2px rgba(23, 23, 23, 0.04)" : "none",
            border: scrolled ? "1px solid rgba(195, 185, 175, 0.3)" : "1px solid transparent",
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            pointerEvents: "auto",
          }}
        >
          <div
            className="container-brand"
            style={{
              paddingLeft: scrolled ? "1.5rem" : undefined,
              paddingRight: scrolled ? "1.5rem" : undefined,
              transition: "padding 0.4s",
            }}
          >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "62px",
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
                    height: 1.5,
                    backgroundColor: "var(--color-charcoal)",
                    transition: "background-color 0.3s",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: 16,
                    height: 1.5,
                    backgroundColor: "var(--color-charcoal)",
                    transition: "background-color 0.3s",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: 20,
                    height: 1.5,
                    backgroundColor: "var(--color-charcoal)",
                    transition: "background-color 0.3s",
                  }}
                />
              </button>

              {/* Desktop Nav */}
              <nav className="hidden md:flex" aria-label="Main navigation" style={{ gap: "1.75rem", alignItems: "center" }}>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      fontWeight: link.isSale ? 600 : 500,
                      letterSpacing: "0.02em",
                      color: link.isSale ? "#e11d48" : "var(--color-charcoal)",
                      textDecoration: "none",
                      transition: "color 0.2s, opacity 0.2s",
                      opacity: link.isSale ? 1 : 0.9,
                      whiteSpace: "nowrap",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = link.isSale ? "1" : "0.9")}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
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
                  fontSize: "1.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-charcoal)",
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
                  fontWeight: 500,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "var(--color-taupe)",
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
                  color: "var(--color-charcoal)",
                  transition: "color 0.3s, transform 0.2s",
                  minWidth: 44,
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconSearch />
              </button>

              {/* Account */}
              <button
                id="account-btn"
                aria-label="My Account"
                className="hidden md:flex"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px",
                  color: "var(--color-charcoal)",
                  transition: "color 0.3s, transform 0.2s",
                  minWidth: 44,
                  minHeight: 44,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconUser />
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
                  color: "var(--color-charcoal)",
                  transition: "color 0.3s, transform 0.2s",
                  minWidth: 44,
                  minHeight: 44,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconHeart />
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
                  color: "var(--color-charcoal)",
                  transition: "color 0.3s, transform 0.2s",
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
