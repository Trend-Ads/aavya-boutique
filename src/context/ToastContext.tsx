"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { usePathname } from "next/navigation";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  title?: string;
  duration?: number; // duration in ms, default 4200ms
  flash?: boolean; // persist to sessionStorage for next route load
}

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration: number;
  timestamp: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => string;
  success: (message: string, titleOrOptions?: string | ToastOptions, options?: ToastOptions) => string;
  error: (message: string, titleOrOptions?: string | ToastOptions, options?: ToastOptions) => string;
  info: (message: string, titleOrOptions?: string | ToastOptions, options?: ToastOptions) => string;
  warning: (message: string, titleOrOptions?: string | ToastOptions, options?: ToastOptions) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const FLASH_STORAGE_KEY = "aavya_admin_flash_toasts";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const pathname = usePathname();

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", options?: ToastOptions): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      const duration = options?.duration !== undefined ? options.duration : 4200;
      const title = options?.title;

      if (options?.flash && typeof window !== "undefined") {
        try {
          const stored = window.sessionStorage.getItem(FLASH_STORAGE_KEY);
          const flashList = stored ? JSON.parse(stored) : [];
          flashList.push({ message, type, title, duration });
          window.sessionStorage.setItem(FLASH_STORAGE_KEY, JSON.stringify(flashList));
        } catch {
          // Ignore session storage errors
        }
      }

      const newToast: ToastItem = {
        id,
        type,
        message,
        title,
        duration,
        timestamp: Date.now(),
      };

      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    []
  );

  // Check and consume flash toasts on mount and route changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.sessionStorage.getItem(FLASH_STORAGE_KEY);
      if (stored) {
        window.sessionStorage.removeItem(FLASH_STORAGE_KEY);
        const flashList = JSON.parse(stored);
        if (Array.isArray(flashList) && flashList.length > 0) {
          flashList.forEach((item) => {
            showToast(item.message, item.type || "success", {
              title: item.title,
              duration: item.duration,
            });
          });
        }
      }
    } catch {
      // Ignore
    }
  }, [pathname, showToast]);

  const normalizeArgs = (
    message: string,
    titleOrOptions?: string | ToastOptions,
    options?: ToastOptions
  ): { title?: string; duration?: number; flash?: boolean } => {
    if (typeof titleOrOptions === "string") {
      return { ...options, title: titleOrOptions };
    }
    return titleOrOptions || {};
  };

  const success = useCallback(
    (message: string, titleOrOptions?: string | ToastOptions, options?: ToastOptions) => {
      const opts = normalizeArgs(message, titleOrOptions, options);
      return showToast(message, "success", opts);
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, titleOrOptions?: string | ToastOptions, options?: ToastOptions) => {
      const opts = normalizeArgs(message, titleOrOptions, options);
      return showToast(message, "error", opts);
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, titleOrOptions?: string | ToastOptions, options?: ToastOptions) => {
      const opts = normalizeArgs(message, titleOrOptions, options);
      return showToast(message, "info", opts);
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, titleOrOptions?: string | ToastOptions, options?: ToastOptions) => {
      const opts = normalizeArgs(message, titleOrOptions, options);
      return showToast(message, "warning", opts);
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        success,
        error,
        info,
        warning,
        dismissToast,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// -------------------------------------------------------------
// Toast Container and Item Components
// -------------------------------------------------------------

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "1.25rem",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        maxWidth: "420px",
        width: "calc(100vw - 2.5rem)",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef(Date.now());
  const remainingTimeRef = useRef(toast.duration);
  const animationFrameRef = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 240);
  }, [onDismiss, toast.id]);

  useEffect(() => {
    if (toast.duration <= 0) return;

    let start = Date.now();
    const total = remainingTimeRef.current;

    const tick = () => {
      if (!isPaused) {
        const elapsed = Date.now() - start;
        const currentRemaining = Math.max(0, total - elapsed);
        const percent = (currentRemaining / toast.duration) * 100;
        setProgress(percent);

        if (currentRemaining <= 0) {
          handleClose();
          return;
        }
      }
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, toast.duration, handleClose]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    remainingTimeRef.current = (progress / 100) * toast.duration;
  };

  const handleMouseLeave = () => {
    startTimeRef.current = Date.now();
    setIsPaused(false);
  };

  // Luxury Config per type
  const config = {
    success: {
      accent: "#10b981",
      border: "rgba(16, 185, 129, 0.35)",
      bg: "#ffffff",
      iconBg: "#ecfdf5",
      iconColor: "#059669",
      defaultTitle: "Action Completed",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
    error: {
      accent: "#ef4444",
      border: "rgba(239, 68, 68, 0.35)",
      bg: "#ffffff",
      iconBg: "#fef2f2",
      iconColor: "#dc2626",
      defaultTitle: "Error Occurred",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
    },
    info: {
      accent: "#c5a059",
      border: "rgba(197, 160, 89, 0.4)",
      bg: "#ffffff",
      iconBg: "rgba(197, 160, 89, 0.12)",
      iconColor: "#93702c",
      defaultTitle: "Information",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
    warning: {
      accent: "#f59e0b",
      border: "rgba(245, 158, 11, 0.4)",
      bg: "#ffffff",
      iconBg: "#fffbeb",
      iconColor: "#d97706",
      defaultTitle: "Attention Needed",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  }[toast.type];

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        pointerEvents: "auto",
        position: "relative",
        overflow: "hidden",
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderLeft: `5px solid ${config.accent}`,
        borderRadius: "10px",
        boxShadow:
          "0 12px 30px -4px rgba(0, 0, 0, 0.14), 0 4px 8px -2px rgba(0, 0, 0, 0.06)",
        padding: "0.95rem 1rem 1.05rem 1rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.85rem",
        transition: "all 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "translateX(100%) scale(0.96)" : "translateX(0) scale(1)",
        animation: !isExiting ? "aavyaToastIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards" : undefined,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: config.iconBg,
          color: config.iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {config.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, paddingRight: "0.5rem" }}>
        <h4
          style={{
            margin: "0 0 0.2rem 0",
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "#1f2937",
            fontFamily: "var(--font-sans)",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          {toast.title || config.defaultTitle}
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: "0.82rem",
            color: "#4b5563",
            lineHeight: 1.45,
            wordBreak: "break-word",
          }}
        >
          {toast.message}
        </p>
      </div>

      {/* Close Button */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close notification"
        style={{
          background: "none",
          border: "none",
          color: "#9ca3af",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          transition: "color 0.15s ease, background-color 0.15s ease",
          marginTop: "-2px",
          marginRight: "-4px",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#374151";
          e.currentTarget.style.backgroundColor = "#f3f4f6";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#9ca3af";
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Progress Bar for Auto-dismiss */}
      {toast.duration > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2.5px",
            width: `${progress}%`,
            backgroundColor: config.accent,
            opacity: 0.85,
            transition: "width 0.05s linear",
          }}
        />
      )}

      <style jsx global>{`
        @keyframes aavyaToastIn {
          0% {
            opacity: 0;
            transform: translateX(100%) scale(0.92);
          }
          70% {
            transform: translateX(-4px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
