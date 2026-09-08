"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

interface AdminShellProps {
  children: React.ReactNode;
  userEmail?: string;
}

export default function AdminShell({ children, userEmail }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f8f5",
        display: "flex",
      }}
    >
      {/* Sidebar Navigation */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          transition: "margin-left 0.3s ease",
        }}
        className="admin-main-content-wrapper"
      >
        {/* Top Navbar */}
        <AdminNavbar
          userEmail={userEmail}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Page Content */}
        <main style={{ flex: 1, width: "100%" }}>{children}</main>
      </div>

      <style jsx global>{`
        /* Desktop */
        @media (min-width: 1024px) {
          .admin-main-content-wrapper {
            margin-left: 260px !important;
          }
        }
        /* Mobile */
        @media (max-width: 1023px) {
          .admin-main-content-wrapper {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
