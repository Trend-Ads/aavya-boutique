"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { PRODUCTS } from "@/data/products";

const SUGGESTED_SEARCHES = ["Dresses", "Kurtis", "Co-ords", "Party Wear", "New Arrivals", "Ethnic", "Tops"];

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) closeSearch();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  return (
    <div
      id="search-overlay"
      role="dialog"
      aria-label="Search"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        backgroundColor: "var(--color-ivory)",
        overflowY: "auto",
        animation: "fadeIn 0.2s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1.25rem",
          borderBottom: "1px solid var(--color-cream-dark)",
          position: "sticky",
          top: 0,
          backgroundColor: "var(--color-ivory)",
          zIndex: 1,
        }}
      >
        {/* Search Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-taupe)", flexShrink: 0 }} aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {/* Input */}
        <label htmlFor="search-input" className="sr-only">Search Aavya Boutique</label>
        <input
          ref={inputRef}
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          aria-label="Search for products"
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            color: "var(--color-charcoal)",
            height: "44px",
          }}
        />

        {/* Close */}
        <button
          id="close-search-btn"
          aria-label="Close search"
          onClick={closeSearch}
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
            flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "1.5rem 1.25rem", maxWidth: "700px", margin: "0 auto" }}>
        {/* Suggested Searches */}
        {!query && (
          <div style={{ marginBottom: "2.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-taupe)",
                marginBottom: "1rem",
              }}
            >
              Popular Searches
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {SUGGESTED_SEARCHES.map((s) => (
                <button
                  key={s}
                  id={`search-suggestion-${s.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setQuery(s)}
                  style={{
                    background: "none",
                    border: "1px solid var(--color-cream-dark)",
                    padding: "0.5rem 1rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                    color: "var(--color-charcoal)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    minHeight: 44,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-charcoal)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-cream-dark)";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular / Results Products */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-taupe)",
              marginBottom: "1rem",
            }}
          >
            {query ? `Results for "${query}"` : "Popular Right Now"}
          </p>
          {(() => {
            const filtered = query.trim()
              ? PRODUCTS.filter(
                  (p) =>
                    p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.category.toLowerCase().includes(query.toLowerCase()) ||
                    p.descriptor.toLowerCase().includes(query.toLowerCase())
                )
              : PRODUCTS.slice(0, 4);

            if (filtered.length === 0) {
              return (
                <div style={{ padding: "3rem 0", textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-charcoal)", marginBottom: "0.5rem" }}>
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-taupe)" }}>
                    Try searching for &ldquo;Dresses&rdquo;, &ldquo;Kurtis&rdquo;, or &ldquo;Linen&rdquo;
                  </p>
                </div>
              );
            }

            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                }}
                className="md:grid-cols-4"
              >
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    id={`search-result-${product.id}`}
                    onClick={closeSearch}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        aspectRatio: "3/4",
                        overflow: "hidden",
                        backgroundColor: "var(--color-cream)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center top",
                          transition: "transform 0.4s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-charcoal)", marginBottom: "0.2rem" }}>
                      {product.name}
                    </p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 500, color: "var(--color-charcoal)" }}>
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </Link>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
