import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductRecord } from "@/types/product";
import ProductListManager from "@/components/admin/ProductListManager";

export const metadata = {
  title: "Products Management | Aavya Boutique Admin",
};

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  let products: ProductRecord[] = [];

  // Try fetching products from Supabase
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      products = data.map((item) => ({
        ...item,
        originalPrice: item.original_price,
        stockCount: item.stock_count,
        inStock: item.in_stock,
        isBestseller: item.is_bestseller,
        is_listed: item.is_listed !== false,
      }));
    }
  } catch (err) {
    console.error("Failed to load products from Supabase:", err);
  }

  return (
    <div style={{ padding: "1.75rem 1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Page Header */}
      <div
        style={{
          marginBottom: "1.75rem",
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
          Product Catalog
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.25rem" }}>
          Manage boutique items, inventory availability, storefront listing, and pricing
        </p>
      </div>

      {/* Interactive Product List Manager */}
      <ProductListManager initialProducts={products} />
    </div>
  );
}
