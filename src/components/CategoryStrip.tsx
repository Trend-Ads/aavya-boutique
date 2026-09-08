"use client";

import { useRef } from "react";
import Link from "next/link";
import { Category, DEFAULT_CATEGORIES } from "@/data/categories";

interface CategoryStripProps {
  categories?: Category[];
}

export default function CategoryStrip({ categories = DEFAULT_CATEGORIES }: CategoryStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter only active categories and sort by display_order
  const activeCategories = (categories.length > 0 ? categories : DEFAULT_CATEGORIES)
    .filter((cat) => cat.is_active !== false)
    .sort((a, b) => a.display_order - b.display_order);

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
        {activeCategories.map((cat) => {
          const categoryImage =
            cat.image_url ||
            DEFAULT_CATEGORIES.find((d) => d.slug === cat.slug)?.image_url ||
            "/images/cat-dresses.jpg";

          return (
            <Link
              key={cat.id || cat.slug}
              href={`/shop?category=${cat.slug}`}
              id={`cat-${cat.slug}`}
              aria-label={`Shop ${cat.name}`}
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
                  borderRadius: "2px",
                }}
              >
                <img
                  src={categoryImage}
                  alt={cat.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    transition: "transform 0.5s var(--ease-smooth)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = "scale(1.06)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
                  }
                />
              </div>

              {/* Label */}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-charcoal)",
                  textAlign: "center",
                }}
              >
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
