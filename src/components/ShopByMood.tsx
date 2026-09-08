"use client";

import Link from "next/link";

const MOODS = [
  {
    id: "mood-soft",
    label: "Soft & Feminine",
    subtitle: "Romantic silhouettes",
    image: "/images/mood-1.jpg",
    href: "/shop",
  },
  {
    id: "mood-minimal",
    label: "Minimal & Modern",
    subtitle: "Clean, confident cuts",
    image: "/images/mood-2.jpg",
    href: "/shop",
  },
  {
    id: "mood-festive",
    label: "Festive Energy",
    subtitle: "Statement ethnic pieces",
    image: "/images/mood-3.jpg",
    href: "/shop",
  },
  {
    id: "mood-weekend",
    label: "Weekend Edit",
    subtitle: "Easy everyday dressing",
    image: "/images/mood-4.jpg",
    href: "/shop",
  },
];

export default function ShopByMood() {
  return (
    <section
      id="shop-by-mood"
      aria-labelledby="mood-heading"
      style={{
        backgroundColor: "var(--color-cream)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="container-brand">
        <div style={{ marginBottom: "2rem" }}>
          <p className="section-eyebrow" style={{ marginBottom: "0.5rem" }}>
            Find Your Vibe
          </p>
          <h2 id="mood-heading" className="section-title">
            Shop by Mood
          </h2>
        </div>
      </div>

      {/* Mobile: horizontal scroll | Desktop: 4-col grid */}
      <div
        className="no-scrollbar"
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          scrollSnapType: "x mandatory",
        }}
      >
        {MOODS.map((mood) => (
          <Link
            key={mood.id}
            href={mood.href}
            id={mood.id}
            aria-label={`Shop ${mood.label}`}
            style={{
              flex: "0 0 auto",
              width: "clamp(240px, 70vw, 320px)",
              scrollSnapAlign: "start",
              textDecoration: "none",
              display: "block",
              position: "relative",
              overflow: "hidden",
            }}
            className="md:flex-1 md:w-auto md:min-w-0"
          >
            {/* Image */}
            <div
              style={{
                aspectRatio: "3/4",
                overflow: "hidden",
                backgroundColor: "var(--color-cream-dark)",
              }}
            >
              <img
                src={mood.image}
                alt={mood.label}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  transition: "transform 0.55s var(--ease-smooth)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            {/* Label */}
            <div
              style={{
                paddingTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.62rem",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-taupe)",
                }}
              >
                {mood.label}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    color: "var(--color-charcoal)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {mood.subtitle}
                </span>
                <span
                  style={{
                    color: "var(--color-taupe)",
                    fontSize: "1rem",
                    transition: "transform 0.25s",
                  }}
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
