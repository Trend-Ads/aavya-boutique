import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

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

  // If unauthenticated (e.g. on /admin/login), render children directly without admin shell
  if (!user) {
    return <>{children}</>;
  }

  return <AdminShell userEmail={user.email}>{children}</AdminShell>;
}
