"use client";

import { usePwaInstall } from "@/hooks/usePwaInstall";
import PwaInstallModal from "./PwaInstallModal";

interface PwaInstallButtonProps {
  variant?: "sidebar" | "navbar";
}

export default function PwaInstallButton({ variant = "sidebar" }: PwaInstallButtonProps) {
  const {
    isInstallable,
    isInstalled,
    isIos,
    isModalOpen,
    openModal,
    closeModal,
    promptInstall,
  } = usePwaInstall();

  // If already installed in standalone mode
  if (isInstalled) {
    if (variant === "navbar") return null;

    return (
      <div
        style={{
          padding: "0.6rem 0.85rem",
          margin: "0 0.75rem 0.5rem",
          borderRadius: "8px",
          backgroundColor: "rgba(16, 185, 129, 0.08)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#10b981",
            boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "0.76rem", fontWeight: 600, color: "#34d399" }}>
            Aavya App Installed
          </span>
          <span style={{ fontSize: "0.68rem", color: "#9ca3af" }}>
            Running in Standalone Window
          </span>
        </div>
      </div>
    );
  }

  // If in navbar mode
  if (variant === "navbar") {
    return (
      <>
        <button
          type="button"
          onClick={openModal}
          title="Install Aavya Admin Web App"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.4rem 0.75rem",
            borderRadius: "6px",
            backgroundColor: "#fdfbf7",
            border: "1px solid #e5e7eb",
            color: "var(--color-charcoal, #161616)",
            fontSize: "0.78rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          className="admin-pwa-navbar-btn"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold, #c5a059)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Install App</span>
        </button>

        <PwaInstallModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onInstall={async () => {
            await promptInstall();
          }}
          isIos={isIos}
          isInstalled={isInstalled}
        />
      </>
    );
  }

  // Sidebar variant (default)
  return (
    <>
      <div style={{ padding: "0 0.75rem", marginBottom: "0.5rem" }}>
        <button
          type="button"
          onClick={openModal}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "0.7rem 0.85rem",
            borderRadius: "8px",
            backgroundColor: "rgba(212, 175, 55, 0.08)",
            border: "1px solid rgba(212, 175, 55, 0.25)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.15)";
            e.currentTarget.style.borderColor = "var(--color-gold, #c5a059)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.08)";
            e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.25)";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: "var(--color-gold, #c5a059)",
                color: "#161616",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#ffffff" }}>
                  Install Web App
                </span>
              </div>
              <span style={{ fontSize: "0.68rem", color: "var(--color-gold-light, #d4af37)", display: "block" }}>
                Desktop &amp; Mobile PWA
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              padding: "0.15rem 0.4rem",
              borderRadius: "4px",
              backgroundColor: "rgba(212, 175, 55, 0.2)",
              color: "var(--color-gold-light, #d4af37)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            PWA
          </span>
        </button>
      </div>

      <PwaInstallModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onInstall={async () => {
          await promptInstall();
        }}
        isIos={isIos}
        isInstalled={isInstalled}
      />
    </>
  );
}
