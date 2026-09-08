"use client";

import React from "react";

interface AdminLoaderProps {
  title?: string;
  subtitle?: string;
  fullScreen?: boolean;
}

export default function AdminLoader({
  title = "Aavya Atelier Portal",
  subtitle = "Synchronizing Boutique Management Data...",
  fullScreen = true,
}: AdminLoaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: fullScreen ? "100vh" : "320px",
        backgroundColor: "#f9fafb",
        padding: "1.5rem",
        zIndex: fullScreen ? 9999 : 1,
        position: fullScreen ? "fixed" : "relative",
        inset: fullScreen ? 0 : "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          padding: "2.5rem 2.25rem",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Animated Dual Spinner */}
        <div
          style={{
            position: "relative",
            width: "64px",
            height: "64px",
            marginBottom: "1.5rem",
          }}
        >
          {/* Outer Ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "3px solid #f3f4f6",
              borderTopColor: "var(--color-charcoal, #171717)",
              animation: "spin 1.2s linear infinite",
            }}
          />

          {/* Inner Accent Ring */}
          <div
            style={{
              position: "absolute",
              inset: "8px",
              borderRadius: "50%",
              border: "2.5px solid transparent",
              borderRightColor: "var(--color-gold-dark, #b8860b)",
              animation: "spin 0.8s linear infinite reverse",
            }}
          />

          {/* Center Dot */}
          <div
            style={{
              position: "absolute",
              inset: "26px",
              borderRadius: "50%",
              backgroundColor: "var(--color-charcoal, #171717)",
            }}
          />
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display, serif)",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--color-charcoal, #171717)",
            margin: "0 0 0.4rem 0",
            letterSpacing: "0.04em",
          }}
        >
          {title}
        </h3>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "0.82rem",
            color: "#6b7280",
            margin: "0 0 1.5rem 0",
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>

        {/* Indeterminate Progress Bar */}
        <div
          style={{
            width: "100%",
            height: "4px",
            backgroundColor: "#f3f4f6",
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
              width: "45%",
              background: "linear-gradient(90deg, var(--color-gold-dark, #b8860b), var(--color-charcoal, #171717))",
              borderRadius: "999px",
              animation: "adminProgress 1.4s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes adminProgress {
          0% {
            left: -45%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
