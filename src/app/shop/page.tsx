import { Metadata } from "next";
import { Suspense } from "react";
import ShopView from "@/components/ShopView";
import { PRODUCTS } from "@/data/products";
import { DEFAULT_CATEGORIES } from "@/data/categories";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Shop Designer Luxury Collections | Aavya Boutique",
  description:
    "Explore luxury handcrafted dresses, kurtis, co-ords, ethnic, and party wear at Aavya Boutique. Elegant couture crafted for every occasion.",
};

export default async function ShopPage() {
  const supabase = await createClient();
  let categories = DEFAULT_CATEGORIES;

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      categories = data;
    }
  } catch (err) {
    console.error("Failed to load categories from Supabase in ShopPage:", err);
  }

  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--color-ivory)",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "2px solid rgba(195,185,175,0.4)",
              borderTopColor: "var(--color-gold)",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      }
    >
      <ShopView initialCategories={categories} initialProducts={PRODUCTS} />
    </Suspense>
  );
}
