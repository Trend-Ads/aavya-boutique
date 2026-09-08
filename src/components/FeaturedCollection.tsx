"use client";

import Link from "next/link";

export default function FeaturedCollection() {
  return (
    <section
      id="collections"
      aria-labelledby="collection-heading"
      style={{
        backgroundColor: "var(--color-ivory)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="container-brand">
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p className="section-eyebrow" style={{ marginBottom: "0.5rem" }}>
            Curated For You
          </p>
          <h2 id="collection-heading" className="section-title">
            The Aavya Edit
          </h2>
        </div>

        {/* Asymmetric Layout — Desktop: 60/40, Mobile: stacked */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
          }}
          className="lg:grid-cols-[60fr_40fr]"
        >
          {/* Large Image — left on desktop */}
          <div
            style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
              backgroundColor: "var(--color-cream)",
            }}
            className="lg:aspect-[4/5]"
          >
            <img
              src="/images/featured-large.jpg"
              alt="Model in burgundy ensemble — The Aavya Edit"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                transition: "transform 0.6s var(--ease-smooth)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            {/* Floating label */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                backgroundColor: "var(--color-ivory)",
                padding: "0.6rem 1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-charcoal)",
                }}
              >
                New Collection
              </span>
            </div>
          </div>

          {/* Right column — text + small image */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* Small secondary image */}
            <div
              style={{
                aspectRatio: "3/4",
                overflow: "hidden",
                backgroundColor: "var(--color-cream)",
                maxHeight: "360px",
              }}
              className="hidden lg:block"
            >
              <img
                src="/images/featured-small.jpg"
                alt="Block print kurta — The Aavya Edit"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  transition: "transform 0.6s var(--ease-smooth)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            {/* Text Block */}
            <div
              style={{
                padding: "1.5rem 0",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
              className="lg:mt-auto"
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.25,
                  color: "var(--color-charcoal)",
                }}
              >
                "Curated pieces for every version of you."
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "var(--color-taupe)",
                  lineHeight: 1.7,
                  maxWidth: "38ch",
                }}
              >
                The Aavya Edit brings together our most-loved silhouettes and
                newest styles — a wardrobe built around the real moments of your life.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/shop" id="explore-aavya-edit" className="btn-primary">
                  Explore the Edit →
                </Link>
                <a href="#about" id="our-story-link" className="btn-outline">
                  Our Story
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
