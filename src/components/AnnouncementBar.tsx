"use client";

import { useState } from "react";

export default function AnnouncementBar() {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const offers = [
    "Free Shipping On All Orders Over ₹2,500.",
    "Special Inaugural Offer: Use Code AAVYA15 for 15% Off",
    "Handcrafted Luxury • Easy 7-Day Returns",
  ];

  const nextOffer = () => {
    setActiveOfferIndex((prev) => (prev + 1) % offers.length);
  };

  const prevOffer = () => {
    setActiveOfferIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <div
      className="relative z-50 bg-[#171717] text-[#f8f5f0]"
      style={{ height: "36px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      role="region"
      aria-label="Site announcement"
    >
      <div
        className="container-brand h-full"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.68rem",
          fontWeight: 400,
          letterSpacing: "0.04em",
        }}
      >
        {/* Left: Social Icons (hidden on small mobile) */}
        <div className="hidden sm:flex items-center gap-4 text-[#e0dad1]">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white transition-colors"
          >
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
            </svg>
          </a>
          {/* Twitter / X */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-white transition-colors"
          >
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/aavyaboutique.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          {/* WhatsApp */}
          <a
            href="https://wa.me/918594031993"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-white transition-colors"
          >
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>

        {/* Center: Interactive Announcement Carousel */}
        <div className="flex-1 flex items-center justify-center gap-3 text-center px-2">
          <button
            onClick={prevOffer}
            aria-label="Previous announcement"
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "#FFFFFF",
            }}
          >
            {offers[activeOfferIndex]}
          </span>
          <button
            onClick={nextOffer}
            aria-label="Next announcement"
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Right: Currency & Language Selector */}
        <div className="hidden sm:flex items-center gap-3 text-[#d8d2c8] text-[0.66rem]">
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            <span>INR ₹</span>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <span className="opacity-30">|</span>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            <span>English</span>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

