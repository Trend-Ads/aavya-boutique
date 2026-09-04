"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const scrollY = window.scrollY;
      imgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Hero — Aavya Boutique"
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "600px",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          inset: 0,
          top: "-15%",
          bottom: "-15%",
          willChange: "transform",
        }}
      >
        <picture>
          <source media="(min-width: 768px)" srcSet="/landing/hero-main.png" />
          <img
            src="/images/hero.jpg"
            alt="Woman in elegant cream kurta dress — Aavya Boutique New Edit"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              animation: "scaleIn 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
            }}
            fetchPriority="high"
          />
        </picture>
      </div>

      {/* Gradient Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(23,23,23,0.72) 0%, rgba(23,23,23,0.2) 45%, rgba(23,23,23,0.05) 100%)",
        }}
      />

      {/* Hero Text Content */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          padding: "0 1.25rem 2.5rem",
        }}
      >
        <div style={{ maxWidth: "580px" }}>
          {/* Eyebrow Label */}
          <p
            className="animate-slide-up-delay-1"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(248,245,240,0.75)",
              marginBottom: "0.75rem",
            }}
          >
            The New Edit
          </p>

          {/* Main Headline */}
          <h1
            className="animate-slide-up-delay-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 8vw, 5rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              color: "var(--color-ivory)",
              marginBottom: "1rem",
            }}
          >
            Dress Your
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>Everyday</em>
            <br />
            Beautifully.
          </h1>

          {/* Subtext */}
          <p
            className="animate-slide-up-delay-3"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "rgba(248,245,240,0.78)",
              lineHeight: 1.6,
              marginBottom: "1.75rem",
              maxWidth: "36ch",
            }}
          >
            Contemporary styles curated for the modern Indian woman.
          </p>

          {/* CTAs */}
          <div
            className="animate-slide-up-delay-3"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.875rem",
              alignItems: "center",
            }}
          >
            <a
              href="#new-arrivals"
              id="hero-primary-cta"
              className="btn-primary"
              style={{
                backgroundColor: "var(--color-ivory)",
                color: "var(--color-charcoal)",
                borderColor: "var(--color-ivory)",
              }}
            >
              Shop New Arrivals
              <span aria-hidden="true" style={{ transition: "transform 0.25s" }}>→</span>
            </a>
            <a
              href="#collections"
              id="hero-secondary-cta"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(248,245,240,0.85)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(248,245,240,0.4)",
                paddingBottom: "2px",
                transition: "border-color 0.2s, color 0.2s",
                minHeight: "44px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Explore Collection
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          animation: "fadeIn 1s 1.2s both",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(248,245,240,0.5)",
            writingMode: "vertical-rl",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            backgroundColor: "rgba(248,245,240,0.3)",
          }}
        />
      </div>
    </section>
  );
}
