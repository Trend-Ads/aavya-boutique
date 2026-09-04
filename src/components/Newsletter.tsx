"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      style={{
        backgroundColor: "var(--color-ivory)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        borderTop: "1px solid var(--color-cream-dark)",
      }}
    >
      <div
        className="container-brand"
        style={{ maxWidth: "600px", textAlign: "center" }}
      >
        {/* Decorative */}
        <div
          aria-hidden="true"
          style={{
            width: "30px",
            height: "1px",
            backgroundColor: "var(--color-taupe-light)",
            margin: "0 auto 1.5rem",
          }}
        />

        <p className="section-eyebrow" style={{ marginBottom: "0.75rem" }}>
          Stay Connected
        </p>

        <h2
          id="newsletter-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 6vw, 3rem)",
            fontWeight: 400,
            color: "var(--color-charcoal)",
            lineHeight: 1.15,
            marginBottom: "1rem",
          }}
        >
          Stay in the Aavya Loop
        </h2>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            color: "var(--color-taupe)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "40ch",
            margin: "0 auto 2.5rem",
          }}
        >
          New drops. Styling inspiration. Private offers.
          <br />
          Nothing unnecessary.
        </p>

        {submitted ? (
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--color-charcoal)",
              animation: "fadeIn 0.5s ease",
            }}
          >
            Welcome to the edit. ✦
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            aria-label="Newsletter signup"
            style={{
              display: "flex",
              gap: "0",
              maxWidth: "440px",
              margin: "0 auto",
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              aria-required="true"
              style={{
                flex: 1,
                padding: "0.875rem 1rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "var(--color-charcoal)",
                backgroundColor: "var(--color-ivory)",
                border: "1px solid var(--color-cream-dark)",
                borderRight: "none",
                outline: "none",
                transition: "border-color 0.2s",
                minHeight: "44px",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-taupe)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-cream-dark)")}
            />
            <button
              id="newsletter-submit"
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                whiteSpace: "nowrap",
                opacity: loading ? 0.7 : 1,
                transition: "opacity 0.2s",
              }}
              aria-label="Subscribe to Aavya newsletter"
            >
              {loading ? "..." : "Join the Edit →"}
            </button>
          </form>
        )}

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.65rem",
            color: "var(--color-taupe)",
            marginTop: "1rem",
            letterSpacing: "0.04em",
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
