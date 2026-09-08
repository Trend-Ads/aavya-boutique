import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

export const metadata = {
  title: "Add New Product | Aavya Boutique Admin",
};

export default async function AdminNewProductPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div style={{ padding: "1.75rem 1.5rem" }}>
      <ProductForm isEdit={false} />
    </div>
  );
}
