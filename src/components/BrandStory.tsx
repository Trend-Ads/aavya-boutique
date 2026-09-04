"use client";

export default function BrandStory() {
  return (
    <section
      id="about"
      aria-labelledby="brand-story-heading"
      style={{
        backgroundColor: "var(--color-charcoal)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image with overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
        }}
      >
        <img
          src="/images/brand-story.jpg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="container-brand"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Decorative element */}
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div style={{ height: "1px", width: "40px", backgroundColor: "rgba(248,245,240,0.25)" }} />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.58rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(248,245,240,0.4)",
              }}
            >
              Our Story
            </span>
            <div style={{ height: "1px", width: "40px", backgroundColor: "rgba(248,245,240,0.25)" }} />
          </div>

          <h2
            id="brand-story-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--color-ivory)",
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            Made for{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>Her.</em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              lineHeight: 1.8,
              color: "rgba(248,245,240,0.7)",
              marginBottom: "2rem",
            }}
          >
            Aavya Boutique brings together contemporary silhouettes, effortless styling and the
            spirit of modern Indian fashion — curated for women who want to feel confident,
            expressive and beautifully themselves.
          </p>

          {/* Location signature */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
            }}
          >
            <div style={{ height: "1px", width: "30px", backgroundColor: "rgba(248,245,240,0.2)" }} />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontStyle: "italic",
                color: "rgba(248,245,240,0.5)",
                letterSpacing: "0.05em",
              }}
            >
              Kochi, Kerala
            </span>
            <div style={{ height: "1px", width: "30px", backgroundColor: "rgba(248,245,240,0.2)" }} />
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <a
              href="#about"
              id="read-our-story"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(248,245,240,0.6)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(248,245,240,0.2)",
                paddingBottom: "2px",
                transition: "color 0.25s, border-color 0.25s, gap 0.25s",
                minHeight: "44px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-ivory)";
                e.currentTarget.style.borderColor = "rgba(248,245,240,0.5)";
                e.currentTarget.style.gap = "0.875rem";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(248,245,240,0.6)";
                e.currentTarget.style.borderColor = "rgba(248,245,240,0.2)";
                e.currentTarget.style.gap = "0.5rem";
              }}
            >
              Read Our Story →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
