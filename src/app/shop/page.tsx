import { Metadata } from "next";
import { Suspense } from "react";
import ShopView from "@/components/ShopView";
import { ProductItem } from "@/data/products";
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
  let productsList: ProductItem[] = [];

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      categories = data;
    }

    const { data: dbProducts, error: prodErr } = await supabase
      .from("products")
      .select("*")
      .eq("is_listed", true)
      .order("created_at", { ascending: false });

    if (!prodErr && dbProducts && dbProducts.length > 0) {
      productsList = dbProducts.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        descriptor: p.descriptor,
        tagline: p.tagline,
        price: Number(p.price),
        originalPrice: p.original_price ? Number(p.original_price) : undefined,
        image: p.images?.[0] || p.image || "/images/product-1.jpg",
        images: p.images && p.images.length > 0 ? p.images : [p.image],
        category: p.category,
        colors: p.colors || [],
        sizes: p.sizes || [],
        badge: p.badge || undefined,
        isBestseller: p.is_bestseller,
        inStock: p.in_stock,
        stockCount: p.stock_count,
        sku: p.sku || "",
        description: p.description || "",
        highlights: p.highlights || [],
        details: p.details || { fabric: "", fit: "", care: "", origin: "" },
        reviews: p.reviews || { rating: 5, count: 0, items: [] },
      }));
    }
  } catch (err) {
    console.error("Failed to load products/categories from Supabase in ShopPage:", err);
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
      <ShopView initialCategories={categories} initialProducts={productsList} />
    </Suspense>
  );
}
