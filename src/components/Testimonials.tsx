"use client";

import { useRef, useState } from "react";

const TESTIMONIALS = [
  {
    id: "t1",
    stars: 5,
    quote: "Beautiful fabric, perfect fit and even better in person. The packaging felt so luxurious — I knew this was a special brand.",
    name: "Ananya",
    city: "Bengaluru",
    product: "Satin Draped Midi Dress",
  },
  {
    id: "t2",
    stars: 5,
    quote: "Everything from the packaging to the outfit felt so premium. I've ordered three times now and every piece is stunning.",
    name: "Meera",
    city: "Kochi",
    product: "Linen Co-ord Set",
  },
  {
    id: "t3",
    stars: 5,
    quote: "My new favourite boutique. The block print kurta is exactly what I was looking for — effortless and so beautiful.",
    name: "Riya",
    city: "Mumbai",
    product: "Block Print Kurta",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const cardWidth = (scrollWidth - clientWidth) / (TESTIMONIALS.length - 1);
    setActiveIdx(Math.round(scrollLeft / cardWidth));
  };

  return (
    <section
      id="reviews"
      aria-labelledby="testimonials-heading"
      style={{
        backgroundColor: "var(--color-cream)",
        paddingTop: "4.5rem",
        paddingBottom: "4.5rem",
      }}
    >
      <div className="container-brand" style={{ marginBottom: "2rem" }}>
        <div style={{ textAlign: "center" }}>
          <p className="section-eyebrow" style={{ marginBottom: "0.5rem" }}>
            Reviews
          </p>
          <h2 id="testimonials-heading" className="section-title">
            Loved by Women Across India
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
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
        {TESTIMONIALS.map((t) => (
          <blockquote
            key={t.id}
            style={{
              flex: "0 0 auto",
              width: "min(320px, 85vw)",
              scrollSnapAlign: "start",
              backgroundColor: "var(--color-ivory)",
              padding: "2rem 1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              borderTop: "2px solid var(--color-charcoal)",
            }}
            className="md:flex-1 md:w-auto md:min-w-0"
          >
            {/* Stars */}
            <div
              style={{ display: "flex", gap: "3px" }}
              aria-label={`${t.stars} out of 5 stars`}
            >
              {Array.from({ length: t.stars }).map((_, i) => (
                <span key={i} style={{ color: "var(--color-burgundy)", fontSize: "0.875rem" }} aria-hidden="true">
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.15rem",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.55,
                color: "var(--color-charcoal)",
                flex: 1,
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Attribution */}
            <footer>
              <cite
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--color-charcoal)",
                  fontStyle: "normal",
                  letterSpacing: "0.04em",
                  display: "block",
                  marginBottom: "0.2rem",
                }}
              >
                — {t.name}, {t.city}
              </cite>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.68rem",
                  color: "var(--color-taupe)",
                  letterSpacing: "0.06em",
                }}
              >
                {t.product}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>

      {/* Dots */}
      <div
        style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "1.5rem" }}
        role="tablist"
        aria-label="Testimonial navigation"
      >
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            role="tab"
            id={`t-dot-${i}`}
            aria-label={`Go to review ${i + 1}`}
            aria-selected={activeIdx === i}
            style={{
              width: activeIdx === i ? 28 : 8,
              height: 4,
              borderRadius: 2,
              backgroundColor: activeIdx === i ? "var(--color-charcoal)" : "var(--color-cream-dark)",
              border: "none",
              cursor: "pointer",
              transition: "width 0.3s var(--ease-smooth)",
              padding: 0,
              minHeight: 20,
            }}
          />
        ))}
      </div>
    </section>
  );
}
