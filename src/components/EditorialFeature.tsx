"use client";

export default function EditorialFeature() {
  return (
    <section
      id="editorial-feature"
      aria-label="The Everyday Edit editorial feature"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Full bleed image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4/5",
          overflow: "hidden",
        }}
        className="md:aspect-[16/9] lg:aspect-[21/9]"
      >
        <img
          src="/images/editorial.jpg"
          alt="Woman in burgundy co-ord set — The Everyday Edit by Aavya Boutique"
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(23,23,23,0.75) 0%, rgba(23,23,23,0.3) 60%, transparent 100%)",
          }}
        />

        {/* Text overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "2.5rem 1.5rem",
          }}
          className="md:justify-center md:pl-16 md:pr-0"
        >
          <div style={{ maxWidth: "480px" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(248,245,240,0.65)",
                marginBottom: "0.75rem",
              }}
            >
              The Everyday Edit
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "var(--color-ivory)",
                marginBottom: "1rem",
                letterSpacing: "-0.01em",
              }}
            >
              Made for moments
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>that matter.</em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "rgba(248,245,240,0.72)",
                lineHeight: 1.65,
                marginBottom: "1.75rem",
                maxWidth: "36ch",
              }}
            >
              Effortless silhouettes designed to move with you.
            </p>
            <a
              href="#shop"
              id="editorial-feature-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-ivory)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(248,245,240,0.4)",
                paddingBottom: "2px",
                transition: "gap 0.25s, border-color 0.2s",
                minHeight: "44px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = "0.875rem";
                e.currentTarget.style.borderColor = "rgba(248,245,240,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = "0.5rem";
                e.currentTarget.style.borderColor = "rgba(248,245,240,0.4)";
              }}
            >
              Explore the Edit →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
