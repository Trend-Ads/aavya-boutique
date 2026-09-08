import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_CATEGORIES, Category } from "@/data/categories";
import CategoryManager from "@/components/admin/CategoryManager";

export const metadata = {
  title: "Categories Management | Aavya Boutique Admin",
};

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  let categories: Category[] = DEFAULT_CATEGORIES;

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      categories = data;
    }
  } catch {
    // Graceful fallback to default seed categories
    categories = DEFAULT_CATEGORIES;
  }

  return (
    <div style={{ padding: "1.75rem 1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Page Header */}
      <div
        style={{
          marginBottom: "2rem",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            fontWeight: 500,
            color: "var(--color-charcoal)",
            margin: 0,
          }}
        >
          Storefront Categories
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.25rem" }}>
          Manage navigation collections, display order, and active boutique categories
        </p>
      </div>

      {/* Interactive Category Manager */}
      <CategoryManager initialCategories={categories} />
    </div>
  );
}
