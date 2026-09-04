"use client";

export default function PromotionalSection() {
  return (
    <section
      id="promo"
      aria-label="First order discount offer"
      style={{
        backgroundColor: "var(--color-cream)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(8rem, 25vw, 18rem)",
            fontWeight: 400,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-cream-dark)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          AAVYA
        </span>
      </div>

      {/* Content */}
      <div
        className="container-brand"
        style={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        {/* Decorative line */}
        <div
          aria-hidden="true"
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "var(--color-taupe)",
            margin: "0 auto 1.5rem",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.62rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-taupe)",
            marginBottom: "0.75rem",
          }}
        >
          Welcome Offer
        </p>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "var(--color-charcoal)",
            marginBottom: "1rem",
            letterSpacing: "-0.01em",
          }}
        >
          10% Off
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>Your First Order</em>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--color-taupe)",
            lineHeight: 1.4,
            marginBottom: "0.75rem",
          }}
        >
          Your wardrobe called.
          <br />
          It wants something new.
        </p>

        {/* Code pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "var(--color-charcoal)",
            color: "var(--color-ivory)",
            padding: "0.4rem 1rem",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              color: "var(--color-taupe-light)",
            }}
          >
            USE CODE
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "var(--color-ivory)",
            }}
          >
            AAVYA10
          </span>
        </div>

        <div>
          <a
            href="#shop"
            id="promo-shop-now"
            className="btn-primary"
            style={{ display: "inline-flex" }}
          >
            Shop Now →
          </a>
        </div>

        {/* Fine print */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.68rem",
            color: "var(--color-taupe)",
            marginTop: "1.5rem",
          }}
        >
          Valid on orders above ₹1,500. First-time customers only.
        </p>
      </div>
    </section>
  );
}
