"use client";

import React, { useEffect, useRef } from "react";

export type ConfirmationVariant = "danger" | "warning" | "success" | "info";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmationVariant;
  isLoading?: boolean;
  itemDetails?: {
    name?: string;
    image?: string;
    subtitle?: string;
    badge?: string;
  };
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
  itemDetails,
}: ConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Variant color mapping
  const config = {
    danger: {
      accentColor: "#dc2626",
      accentBg: "#fef2f2",
      borderAccent: "#fecaca",
      buttonBg: "#dc2626",
      buttonHoverBg: "#b91c1c",
      buttonColor: "#ffffff",
      defaultConfirmText: "Yes, Delete",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      ),
    },
    warning: {
      accentColor: "#d97706",
      accentBg: "#fffbeb",
      borderAccent: "#fde68a",
      buttonBg: "#d97706",
      buttonHoverBg: "#b45309",
      buttonColor: "#ffffff",
      defaultConfirmText: "Yes, Unlist",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ),
    },
    success: {
      accentColor: "#059669",
      accentBg: "#ecfdf5",
      borderAccent: "#a7f3d0",
      buttonBg: "var(--color-charcoal, #171717)",
      buttonHoverBg: "#059669",
      buttonColor: "#ffffff",
      defaultConfirmText: "Yes, Publish",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    info: {
      accentColor: "var(--color-gold-dark, #8a704c)",
      accentBg: "#faf7f2",
      borderAccent: "rgba(195, 185, 175, 0.4)",
      buttonBg: "var(--color-charcoal, #171717)",
      buttonHoverBg: "var(--color-gold-dark, #8a704c)",
      buttonColor: "#ffffff",
      defaultConfirmText: "Confirm Action",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-dark, #8a704c)" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
  }[variant];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(17, 17, 17, 0.65)",
        backdropFilter: "blur(4px)",
        animation: "fadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div
        ref={modalRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
          animation: "scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Top Accent Line */}
        <div
          style={{
            height: "4px",
            width: "100%",
            backgroundColor: config.accentColor,
          }}
        />

        {/* Modal Body */}
        <div style={{ padding: "1.75rem" }}>
          {/* Header with Icon */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: config.accentBg,
                border: `1px solid ${config.borderAccent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {config.icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h2
                id="confirm-modal-title"
                style={{
                  fontFamily: "var(--font-display, serif)",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--color-charcoal, #171717)",
                  margin: "0 0 0.35rem 0",
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h2>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  lineHeight: 1.55,
                }}
              >
                {message}
              </div>
            </div>

            {/* Close Button */}
            {!isLoading && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "0.25rem",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Optional Item Preview Card */}
          {itemDetails && (
            <div
              style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "0.85rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                marginBottom: "1.5rem",
              }}
            >
              {itemDetails.image ? (
                <img
                  src={itemDetails.image}
                  alt={itemDetails.name || "Item thumbnail"}
                  style={{
                    width: "44px",
                    height: "56px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#f3f4f6",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "44px",
                    height: "56px",
                    borderRadius: "6px",
                    backgroundColor: "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9ca3af",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}

              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "var(--color-charcoal, #171717)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {itemDetails.name || "Selected Item"}
                </div>
                {itemDetails.subtitle && (
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#6b7280",
                      marginTop: "0.15rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {itemDetails.subtitle}
                  </div>
                )}
              </div>

              {itemDetails.badge && (
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    padding: "0.2rem 0.55rem",
                    borderRadius: "12px",
                    backgroundColor: "#e5e7eb",
                    color: "#374151",
                    flexShrink: 0,
                  }}
                >
                  {itemDetails.badge}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "0.75rem",
              marginTop: itemDetails ? "0" : "1.5rem",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              style={{
                padding: "0.65rem 1.15rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: "#ffffff",
                color: "#374151",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.6 : 1,
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#9ca3af";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }
              }}
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.35rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: config.buttonBg,
                color: config.buttonColor,
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.75 : 1,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = config.buttonHoverBg;
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = config.buttonBg;
                }
              }}
            >
              {isLoading && (
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    border: "2px solid rgba(255, 255, 255, 0.4)",
                    borderTopColor: "#ffffff",
                    borderRadius: "50%",
                    animation: "spin 0.75s linear infinite",
                  }}
                />
              )}
              <span>{confirmText || config.defaultConfirmText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
