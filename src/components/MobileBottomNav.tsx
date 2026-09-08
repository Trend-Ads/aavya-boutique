"use client";

import { useState, useEffect } from "react";
import { useUI } from "@/context/UIContext";

const NAV_ITEMS = [
  {
    id: "bottom-nav-home",
    label: "Home",
    href: "/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "bottom-nav-shop",
    label: "Shop",
    href: "/shop",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    id: "bottom-nav-search",
    label: "Search",
    href: "#",
    action: "search",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: "bottom-nav-wishlist",
    label: "Wishlist",
    href: "/wishlist",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: "bottom-nav-bag",
    label: "Bag",
    href: "#",
    action: "cart",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

export default function MobileBottomNav() {
  const { cartCount, wishlistCount } = useUI();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeItem, setActiveItem] = useState("bottom-nav-home");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleAction = (item: typeof NAV_ITEMS[0], e: React.MouseEvent) => {
    setActiveItem(item.id);
    if (item.action === "search") {
      e.preventDefault();
      document.getElementById("search-btn")?.click();
    } else if (item.action === "cart") {
      e.preventDefault();
      document.getElementById("cart-btn")?.click();
    }
  };

  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Mobile bottom navigation"
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: "rgba(248, 245, 240, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(195, 185, 175, 0.3)",
        paddingBottom: "env(safe-area-inset-bottom, 0)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0.625rem 0",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeItem === item.id;
          const badgeCount =
            item.id === "bottom-nav-wishlist"
              ? wishlistCount
              : item.id === "bottom-nav-bag"
              ? cartCount
              : 0;

          return (
            <a
              key={item.id}
              id={item.id}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              onClick={(e) => handleAction(item, e)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                minWidth: 44,
                minHeight: 44,
                justifyContent: "center",
                textDecoration: "none",
                color: isActive ? "var(--color-charcoal)" : "var(--color-taupe)",
                transition: "color 0.2s, transform 0.15s",
                padding: "0 0.5rem",
                position: "relative",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
              onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ position: "relative", display: "inline-flex" }}>
                {item.icon}
                {badgeCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -8,
                      width: 15,
                      height: 15,
                      borderRadius: "50%",
                      backgroundColor:
                        item.id === "bottom-nav-bag"
                          ? "var(--color-burgundy)"
                          : "var(--color-gold, #c5a059)",
                      color: "white",
                      fontSize: "0.52rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-hidden="true"
                  >
                    {badgeCount}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.58rem",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
