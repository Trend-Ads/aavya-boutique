"use client";
import { UIProvider } from "@/context/UIContext";
import { ToastProvider } from "@/context/ToastContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <UIProvider>{children}</UIProvider>
    </ToastProvider>
  );
}
