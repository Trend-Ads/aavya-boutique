"use client";

import { useEffect } from "react";

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => Promise<void>;
  isIos: boolean;
  isInstalled: boolean;
}

export default function PwaInstallModal({
  isOpen,
  onClose,
  onInstall,
  isIos,
  isInstalled,
}: PwaInstallModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.72)",
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#1c1c1c",
          color: "#fdfbf7",
          borderRadius: "16px",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)",
          overflow: "hidden",
          animation: "fadeInUp 0.2s ease-out",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "1.5rem 1.5rem 1.25rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#262626",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              {/* App Icon */}
              <img
                src="/icons/icon-192x192.png"
                alt="Aavya Admin App"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display, serif)",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  margin: 0,
                  letterSpacing: "0.02em",
                }}
              >
                Aavya Admin App
              </h3>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-gold-light, #d4af37)",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  marginTop: "0.15rem",
                }}
              >
                <span>⚡ Progressive Web App (PWA)</span>
                {isInstalled && (
                  <span
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.2)",
                      color: "#34d399",
                      padding: "0.1rem 0.4rem",
                      borderRadius: "4px",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                    }}
                  >
                    Installed ✓
                  </span>
                )}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: "none",
              border: "none",
              color: "#9ca3af",
              fontSize: "1.2rem",
              cursor: "pointer",
              padding: "0.25rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "1.5rem" }}>
          {isInstalled ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                  margin: "0 auto 1rem",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
              >
                ✓
              </div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#ffffff", margin: "0 0 0.5rem" }}>
                Web App is Already Installed
              </h4>
              <p style={{ fontSize: "0.82rem", color: "#9ca3af", margin: 0, lineHeight: 1.5 }}>
                You can launch Aavya Admin directly from your desktop dock, Windows Start menu, or mobile home screen as a standalone application.
              </p>
            </div>
          ) : isIos ? (
            <div>
              <p style={{ fontSize: "0.84rem", color: "#d1d5db", margin: "0 0 1rem", lineHeight: 1.5 }}>
                Install Aavya Admin on your iPhone or iPad for an app-like full screen experience without browser tabs:
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  backgroundColor: "#262626",
                  padding: "1rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.82rem" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-gold, #c5a059)",
                      color: "#161616",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      flexShrink: 0,
                    }}
                  >
                    1
                  </span>
                  <span>
                    Tap the <strong>Share</strong> icon{" "}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ display: "inline-block", verticalAlign: "middle" }}
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>{" "}
                    in Safari&apos;s bottom bar.
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.82rem" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-gold, #c5a059)",
                      color: "#161616",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      flexShrink: 0,
                    }}
                  >
                    2
                  </span>
                  <span>
                    Scroll down and tap <strong>&quot;Add to Home Screen&quot; ⊞</strong>.
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.82rem" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-gold, #c5a059)",
                      color: "#161616",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      flexShrink: 0,
                    }}
                  >
                    3
                  </span>
                  <span>
                    Tap <strong>&quot;Add&quot;</strong> in the top right corner.
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: "0.84rem", color: "#d1d5db", margin: "0 0 1.25rem", lineHeight: 1.5 }}>
                Install the official Aavya Admin web app on your device for instant launch and standalone desktop performance:
              </p>

              {/* Benefits list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>⚡</span>
                  <div>
                    <strong style={{ fontSize: "0.82rem", color: "#ffffff", display: "block" }}>
                      Instant Native Launch
                    </strong>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      Pin to Windows Taskbar, macOS Dock, or Mobile Home Screen.
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>🖥️</span>
                  <div>
                    <strong style={{ fontSize: "0.82rem", color: "#ffffff", display: "block" }}>
                      Focused Standalone Window
                    </strong>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      No address bars, no browser tab distractions, full workspace view.
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>🔒</span>
                  <div>
                    <strong style={{ fontSize: "0.82rem", color: "#ffffff", display: "block" }}>
                      Persistent Secure Session
                    </strong>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      Quick access to products, stock, and orders on the go.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <button
                type="button"
                onClick={async () => {
                  await onInstall();
                  onClose();
                }}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "8px",
                  backgroundColor: "var(--color-gold, #c5a059)",
                  color: "#161616",
                  border: "none",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 14px rgba(197, 160, 89, 0.35)",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Install Admin App Now</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "0.9rem 1.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              backgroundColor: "transparent",
              color: "#9ca3af",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "0.8rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {isInstalled ? "Close" : "Maybe Later"}
          </button>
        </div>
      </div>
    </div>
  );
}
