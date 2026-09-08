"use client";

import React from "react";

interface BoutiqueLoaderProps {
  message?: string;
  subMessage?: string;
  fullScreen?: boolean;
}

export default function BoutiqueLoader({
  message = "Aavya Boutique",
  subMessage = "Curating Handcrafted Luxury & Atelier Silhouettes...",
  fullScreen = true,
}: BoutiqueLoaderProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: fullScreen ? "100vh" : "320px",
        backgroundColor: "var(--color-ivory, #FAF8F5)",
        color: "var(--color-charcoal, #1C1C1C)",
        padding: "2rem",
        zIndex: fullScreen ? 9999 : 1,
        position: fullScreen ? "fixed" : "relative",
        inset: fullScreen ? 0 : "auto",
      }}
    >
      {/* Animated Brand Emblem */}
      <div
        style={{
          position: "relative",
          width: "80px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.75rem",
        }}
      >
        {/* Outer Rotating Gold Ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(197, 160, 89, 0.2)",
            borderTopColor: "var(--color-gold, #C5A059)",
            borderRightColor: "var(--color-gold-dark, #B8860B)",
            animation: "spin 1.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite",
          }}
        />

        {/* Inner Pulsing Diamond */}
        <div
          style={{
            width: "36px",
            height: "36px",
            transform: "rotate(45deg)",
            border: "1.5px solid var(--color-charcoal, #1C1C1C)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "pulse 2s ease-in-out infinite",
            boxShadow: "0 4px 14px rgba(197, 160, 89, 0.18)",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "var(--color-gold-dark, #B8860B)",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>

      {/* Brand Name */}
      <h2
        style={{
          fontFamily: "var(--font-display, serif)",
          fontSize: "1.6rem",
          fontWeight: 400,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-charcoal, #1C1C1C)",
          margin: "0 0 0.5rem 0",
          textAlign: "center",
        }}
      >
        {message}
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: "0.82rem",
          letterSpacing: "0.06em",
          color: "var(--color-taupe, #7D7571)",
          margin: "0 0 1.5rem 0",
          textAlign: "center",
          maxWidth: "340px",
          lineHeight: 1.5,
        }}
      >
        {subMessage}
      </p>

      {/* Shimmer Progress Track */}
      <div
        style={{
          width: "180px",
          height: "2.5px",
          backgroundColor: "rgba(197, 160, 89, 0.2)",
          borderRadius: "999px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "50%",
            background: "linear-gradient(90deg, transparent, var(--color-gold, #C5A059), transparent)",
            borderRadius: "999px",
            animation: "boutiqueShimmer 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes boutiqueShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }
      `}</style>
    </div>
  );
}
