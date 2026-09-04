"use client";

import { useRef } from "react";

const CATEGORIES = [
  { label: "New In", image: "/images/cat-newin.jpg", href: "#new-arrivals" },
  { label: "Dresses", image: "/images/cat-dresses.jpg", href: "#dresses" },
  { label: "Kurtis", image: "/images/cat-kurtis.jpg", href: "#kurtis" },
  { label: "Co-ords", image: "/images/cat-coords.jpg", href: "#coords" },
  { label: "Tops", image: "/images/cat-tops.jpg", href: "#tops" },
  { label: "Ethnic", image: "/images/cat-ethnic.jpg", href: "#ethnic" },
  { label: "Party Wear", image: "/images/cat-partywear.jpg", href: "#partywear" },
];

export default function CategoryStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="categories"
      aria-label="Shop by category"
      style={{
        backgroundColor: "var(--color-ivory)",
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
      }}
    >
      {/* Section Label */}
      <div className="container-brand" style={{ marginBottom: "1.25rem" }}>
        <p className="section-eyebrow">Browse by Category</p>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="no-scrollbar"
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {CATEGORIES.map((cat) => (
          <a
            key={cat.label}
            href={cat.href}
            id={`cat-${cat.label.toLowerCase().replace(/\s+/g, "-")}`}
            aria-label={`Shop ${cat.label}`}
            style={{
              flex: "0 0 auto",
              width: "clamp(110px, 26vw, 160px)",
              scrollSnapAlign: "start",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.6rem",
              cursor: "pointer",
            }}
          >
            {/* Category Image */}
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                overflow: "hidden",
                backgroundColor: "var(--color-cream)",
              }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  transition: "transform 0.5s var(--ease-smooth)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            {/* Label */}
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-charcoal)",
              }}
            >
              {cat.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
