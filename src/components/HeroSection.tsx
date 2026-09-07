"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const ribbonText =
    "QUALITY CERTIFIED  •  30% OFF IF YOU SPEND $100 OR MORE  •  FREE WORLDWIDE DELIVERY  •  QUALITY CERTIFIED  •  30% OFF IF YOU SPEND $100 OR MORE  •  FREE WORLDWIDE DELIVERY  •  ";

  return (
    <section
      id="hero"
      aria-label="Hero — Aavya Boutique Elite Collection"
      className="hero-section"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fbecee",
      }}
    >
      {/* ─── 1. Watercolor Canvas Background ─── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/hero/watercolor_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />

      {/* Subtle Tinted Gradient Overlay to blend tones seamlessly */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 45%, rgba(255, 240, 243, 0.4) 0%, rgba(252, 222, 229, 0.55) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* ─── 2. Main Content Wrapper ─── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container-brand"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: "clamp(5rem, 12vh, 7.5rem)",
            paddingBottom: "clamp(4.5rem, 10vh, 6.5rem)",
          }}
        >
          {/* Top Row: Left placeholder & Right Editorial Blurb */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
              zIndex: 20,
            }}
          >
            {/* Empty space on top left so ELITE can sit boldly below */}
            <div className="hidden lg:block" style={{ width: "35%" }} />

            {/* Right Editorial Paragraph matching screenshot */}
            <div
              className="animate-slide-up-delay-1"
              style={{
                maxWidth: "380px",
                marginLeft: "auto",
                textAlign: "left",
                padding: "0 0.5rem",
              }}
            >
              <p
                className="hidden sm:block"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.82rem, 1.05vw, 0.98rem)",
                  fontWeight: 500,
                  lineHeight: 1.62,
                  color: "#222226",
                  letterSpacing: "-0.01em",
                }}
              >
                Discover An Exclusive Collection Of Premium Apparel And Sophisticated Accessories. At Aavya Boutique,
                We Blend Classic Craftsmanship With Contemporary Style To Ensure You Always Make A Lasting Impression.
              </p>
              <p
                className="sm:hidden"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.74rem",
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: "#222226",
                  textAlign: "center",
                  margin: "0 auto",
                  maxWidth: "300px",
                }}
              >
                Exclusive Haute Couture &amp; Contemporary Luxury. Designed to make a lasting impression.
              </p>
            </div>
          </div>

          {/* Middle Row: Giant Typography behind the Model */}
          {/* Left giant word: "ELITE" */}
          <div
            aria-hidden="true"
            className="animate-slide-up-delay-2"
            style={{
              position: "absolute",
              top: "35%",
              left: "clamp(1rem, 4.5vw, 5.5rem)",
              transform: "translateY(-50%)",
              zIndex: 5,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(5rem, 13vw, 13.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.82,
                display: "flex",
                alignItems: "center",
                textShadow: "0 4px 25px rgba(225, 145, 165, 0.28)",
              }}
            >
              <span style={{ color: "#FFFFFF" }}>ELIT</span>
              <span className="text-stroke-white">E</span>
            </div>
          </div>

          {/* Right giant word: "STYLE" */}
          <div
            aria-hidden="true"
            className="animate-slide-up-delay-2"
            style={{
              position: "absolute",
              bottom: "23%",
              right: "clamp(1rem, 4.5vw, 5.5rem)",
              zIndex: 5,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(5rem, 13vw, 13.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.82,
                display: "flex",
                alignItems: "center",
                textShadow: "0 4px 25px rgba(225, 145, 165, 0.28)",
              }}
            >
              <span className="text-stroke-white">S</span>
              <span style={{ color: "#FFFFFF" }}>TYLE</span>
            </div>
          </div>

          {/* Bottom Left Content: Headline + Subheading + Pill CTA */}
          <div
            className="animate-slide-up-delay-3 hero-left-content"
            style={{
              position: "relative",
              zIndex: 30,
              maxWidth: "460px",
              marginTop: "auto",
              paddingLeft: "clamp(0.5rem, 2vw, 1.5rem)",
              marginBottom: "clamp(0.5rem, 2vh, 1.5rem)",
            }}
          >
            {/* Kicker */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.72rem, 0.85vw, 0.88rem)",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.95)",
                marginBottom: "0.4rem",
                textShadow: "0 1px 6px rgba(0,0,0,0.18)",
              }}
            >
              TIMELESS ELEGANCE.
            </p>

            {/* Secondary Headline */}
            <h1
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.6rem, 2.7vw, 2.6rem)",
                fontWeight: 900,
                letterSpacing: "-0.01em",
                lineHeight: 1.08,
                color: "#FFFFFF",
                textTransform: "uppercase",
                marginBottom: "1.4rem",
                textShadow: "0 2px 12px rgba(0,0,0,0.18)",
              }}
            >
              LUXURY REDEFINED.
            </h1>

            {/* Pill Button "Shop Now" */}
            <a
              href="#new-arrivals"
              id="hero-shop-now-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#171717",
                color: "#FFFFFF",
                borderRadius: "9999px",
                padding: "0.85rem 2.35rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(23, 23, 23, 0.28)",
                transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                e.currentTarget.style.backgroundColor = "#262626";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(23, 23, 23, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.backgroundColor = "#171717";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(23, 23, 23, 0.28)";
              }}
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* ─── 3. Center Silhouette Cutout Model (public/hero/hero1.png) ─── */}
      <div
        aria-hidden="true"
        className="hero-model-wrap"
      >
        <img
          src="/hero/hero1.png"
          alt="Aavya Boutique Haute Couture Collection"
          fetchPriority="high"
        />
      </div>

      {/* ─── 4. Straight Promotional Ribbon Banner (bottom flush ticker) ─── */}
      <div
        id="hero-ribbon"
        aria-label="Promotional Announcement"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          transform: "none",
          background: "linear-gradient(90deg, #e05e81 0%, #eb6f92 50%, #e05e81 100%)",
          boxShadow: "0 -2px 14px rgba(224, 94, 129, 0.25)",
          zIndex: 20,
          overflow: "hidden",
          height: "42px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              paddingRight: "2rem",
            }}
          >
            {ribbonText}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              paddingRight: "2rem",
            }}
          >
            {ribbonText}
          </span>
        </div>
      </div>
    </section>
  );
}

