import { createClient } from "@/lib/supabase/server";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Portal | Aavya Boutique",
  description: "Administrative dashboard for Aavya Boutique",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If unauthenticated (e.g. on /admin/login), render children without the admin topbar
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f8f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AdminHeader userEmail={user.email} />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
