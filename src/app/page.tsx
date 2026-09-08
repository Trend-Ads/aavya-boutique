import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryStrip from "@/components/CategoryStrip";
import NewArrivals from "@/components/NewArrivals";
import EditorialFeature from "@/components/EditorialFeature";
import ShopByMood from "@/components/ShopByMood";
import FeaturedCollection from "@/components/FeaturedCollection";
import Bestsellers from "@/components/Bestsellers";
import PromotionalSection from "@/components/PromotionalSection";
import InstagramSection from "@/components/InstagramSection";
import BrandStory from "@/components/BrandStory";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";

import { createClient } from "@/lib/supabase/server";
import { DEFAULT_CATEGORIES } from "@/data/categories";
import { ProductItem } from "@/data/products";

export default async function Home() {
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
    console.error("Failed to fetch data from Supabase on Home page:", err);
  }

  return (
    <>
      {/* Fixed UI Layer */}
      <AnnouncementBar />
      <Header />

      {/* Main Content */}
      <main id="main-content" aria-label="Aavya Boutique — Main content">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Categories */}
        <CategoryStrip categories={categories} />

        {/* Divider */}
        <div className="divider" />

        {/* 3. New Arrivals */}
        <NewArrivals products={productsList} />

        {/* 4. Editorial Feature */}
        <EditorialFeature />

        {/* 5. Shop by Mood */}
        <ShopByMood />

        {/* 6. Featured Collection */}
        <FeaturedCollection />

        {/* 7. Bestsellers */}
        <Bestsellers products={productsList} />

        {/* 8. Promotional Offer */}
        <PromotionalSection />

        {/* 9. Instagram */}
        <InstagramSection />

        {/* 10. Brand Story */}
        <BrandStory />

        {/* 11. Testimonials */}
        <Testimonials />

        {/* 12. Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays & Drawers */}
      <MobileBottomNav />
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}
