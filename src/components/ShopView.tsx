"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import MobileBottomNav from "@/components/MobileBottomNav";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import ProductCard from "@/components/ProductCard";
import AdminDropdown, { DropdownOption } from "@/components/admin/AdminDropdown";
import { ProductItem } from "@/data/products";
import { Category } from "@/data/categories";

interface ShopViewProps {
  initialCategories: Category[];
  initialProducts: ProductItem[];
}

type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "rating";

const SORT_OPTIONS: DropdownOption[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopView({
  initialCategories,
  initialProducts,
}: ShopViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategoryParam = searchParams.get("category") || "";
  const activeBadgeParam = searchParams.get("badge") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryParam);
  const [selectedBadge, setSelectedBadge] = useState<string>(activeBadgeParam);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Keep state synced if URL changes
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
    setSelectedBadge(searchParams.get("badge") || "");
  }, [searchParams]);

  // Handle category pill click
  const handleCategorySelect = (slug: string) => {
    const nextCategory = selectedCategory === slug ? "" : slug;
    setSelectedCategory(nextCategory);
    setSelectedBadge(""); // reset badge if specific category chosen

    const params = new URLSearchParams();
    if (nextCategory) params.set("category", nextCategory);
    const queryString = params.toString();
    router.push(queryString ? `/shop?${queryString}` : "/shop", { scroll: false });
  };

  // Handle badge pill click (e.g. New or Sale)
  const handleBadgeSelect = (badge: string) => {
    const nextBadge = selectedBadge === badge ? "" : badge;
    setSelectedBadge(nextBadge);
    setSelectedCategory(""); // reset category if badge chosen

    const params = new URLSearchParams();
    if (nextBadge) params.set("badge", nextBadge);
    const queryString = params.toString();
    router.push(queryString ? `/shop?${queryString}` : "/shop", { scroll: false });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedBadge("");
    setSortBy("featured");
    setInStockOnly(false);
    setSearchQuery("");
    router.push("/shop", { scroll: false });
  };

  // Map slug to category name helper
  const activeCategoryObj = useMemo(() => {
    return initialCategories.find(
      (c) => c.slug.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [initialCategories, selectedCategory]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Filter by category
    if (selectedCategory) {
      list = list.filter((p) => {
        const matchSlug =
          p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") ===
          selectedCategory.toLowerCase();
        const matchName =
          activeCategoryObj?.name.toLowerCase() === p.category.toLowerCase();
        return matchSlug || matchName;
      });
    }

    // Filter by badge (e.g. "New", "Sale")
    if (selectedBadge) {
      list = list.filter((p) => {
        if (selectedBadge.toLowerCase() === "new") return p.badge === "New";
        if (selectedBadge.toLowerCase() === "sale") return p.badge === "Sale";
        return p.badge?.toLowerCase() === selectedBadge.toLowerCase();
      });
    }

    // Filter by stock
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.descriptor.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        list.sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => (b.reviews?.rating || 0) - (a.reviews?.rating || 0));
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return list;
  }, [
    initialProducts,
    selectedCategory,
    selectedBadge,
    activeCategoryObj,
    inStockOnly,
    searchQuery,
    sortBy,
  ]);

  // Page title / heading depending on filters
  const pageHeading = useMemo(() => {
    if (selectedBadge === "Sale") return "Sale & Special Offers";
    if (selectedBadge === "New") return "New Arrivals";
    if (activeCategoryObj) return activeCategoryObj.name;
    return "All Collections";
  }, [selectedBadge, activeCategoryObj]);

  return (
    <>
      {/* Fixed Header & Announcement */}
      <AnnouncementBar />
      <Header />

      <main
        id="shop-main"
        style={{
          backgroundColor: "var(--color-ivory)",
          minHeight: "100vh",
          paddingTop: "clamp(6.5rem, 12vw, 8.5rem)",
          paddingBottom: "5rem",
        }}
      >
        <div className="container-brand">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumbs"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              fontFamily: "var(--font-sans)",
              color: "var(--color-taupe)",
              marginBottom: "1.5rem",
            }}
          >
            <Link
              href="/"
              style={{
                color: "var(--color-taupe)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-charcoal)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-taupe)")}
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/shop"
              style={{
                color: selectedCategory || selectedBadge ? "var(--color-taupe)" : "var(--color-charcoal)",
                fontWeight: selectedCategory || selectedBadge ? 400 : 600,
                textDecoration: "none",
              }}
            >
              Shop
            </Link>
            {(selectedCategory || selectedBadge) && (
              <>
                <span>/</span>
                <span style={{ color: "var(--color-charcoal)", fontWeight: 600 }}>
                  {pageHeading}
                </span>
              </>
            )}
          </nav>

          {/* Category Cards Carousel / Strip on Shop page */}
          <div
            style={{
              marginBottom: "2.5rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid rgba(195, 185, 175, 0.25)",
            }}
          >
            <div
              className="no-scrollbar"
              style={{
                display: "flex",
                gap: "1rem",
                overflowX: "auto",
                paddingBottom: "0.5rem",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* "All" Card */}
              <button
                type="button"
                onClick={() => handleCategorySelect("")}
                style={{
                  flex: "0 0 auto",
                  width: "clamp(100px, 22vw, 130px)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    borderRadius: "4px",
                    overflow: "hidden",
                    backgroundColor: "var(--color-cream)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border:
                      !selectedCategory && !selectedBadge
                        ? "2px solid var(--color-charcoal)"
                        : "1px solid rgba(195, 185, 175, 0.4)",
                    boxShadow:
                      !selectedCategory && !selectedBadge
                        ? "0 4px 12px rgba(26,26,26,0.12)"
                        : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      fontStyle: "italic",
                      color: "var(--color-charcoal)",
                    }}
                  >
                    View All
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.68rem",
                    fontWeight: !selectedCategory && !selectedBadge ? 700 : 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-charcoal)",
                  }}
                >
                  All Items
                </span>
              </button>

              {/* Dynamic Categories */}
              {initialCategories
                .filter((cat) => cat.is_active !== false)
                .sort((a, b) => a.display_order - b.display_order)
                .map((cat) => {
                  const isSelected =
                    selectedCategory.toLowerCase() === cat.slug.toLowerCase();

                  return (
                    <button
                      key={cat.id || cat.slug}
                      type="button"
                      onClick={() => handleCategorySelect(cat.slug)}
                      style={{
                        flex: "0 0 auto",
                        width: "clamp(100px, 22vw, 130px)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "3/4",
                          borderRadius: "4px",
                          overflow: "hidden",
                          backgroundColor: "var(--color-cream)",
                          border: isSelected
                            ? "2px solid var(--color-charcoal)"
                            : "1px solid rgba(195, 185, 175, 0.4)",
                          boxShadow: isSelected
                            ? "0 4px 12px rgba(26,26,26,0.12)"
                            : "none",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <img
                          src={cat.image_url || "/images/cat-dresses.jpg"}
                          alt={cat.name}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                            transform: isSelected ? "scale(1.05)" : "scale(1)",
                            transition: "transform 0.4s ease",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.68rem",
                          fontWeight: isSelected ? 700 : 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: isSelected
                            ? "var(--color-charcoal)"
                            : "var(--color-taupe)",
                          textAlign: "center",
                        }}
                      >
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Quick Filter Pills Row (Tags, Sale, New In) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {/* Filter Pills */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => handleCategorySelect("")}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "999px",
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: !selectedCategory && !selectedBadge ? 600 : 400,
                  border:
                    !selectedCategory && !selectedBadge
                      ? "1px solid var(--color-charcoal)"
                      : "1px solid rgba(195, 185, 175, 0.4)",
                  backgroundColor:
                    !selectedCategory && !selectedBadge
                      ? "var(--color-charcoal)"
                      : "transparent",
                  color:
                    !selectedCategory && !selectedBadge
                      ? "#ffffff"
                      : "var(--color-charcoal)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                All ({initialProducts.length})
              </button>

              <button
                type="button"
                onClick={() => handleBadgeSelect("New")}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "999px",
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: selectedBadge === "New" ? 600 : 400,
                  border:
                    selectedBadge === "New"
                      ? "1px solid var(--color-charcoal)"
                      : "1px solid rgba(195, 185, 175, 0.4)",
                  backgroundColor:
                    selectedBadge === "New"
                      ? "var(--color-charcoal)"
                      : "transparent",
                  color:
                    selectedBadge === "New"
                      ? "#ffffff"
                      : "var(--color-charcoal)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                ✨ New Arrivals
              </button>

              <button
                type="button"
                onClick={() => handleBadgeSelect("Sale")}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "999px",
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: selectedBadge === "Sale" ? 600 : 400,
                  border:
                    selectedBadge === "Sale"
                      ? "1px solid #e11d48"
                      : "1px solid rgba(225, 29, 72, 0.3)",
                  backgroundColor:
                    selectedBadge === "Sale" ? "#e11d48" : "transparent",
                  color: selectedBadge === "Sale" ? "#ffffff" : "#e11d48",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                🏷️ On Sale
              </button>

              {/* In-Stock Filter */}
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  cursor: "pointer",
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-charcoal)",
                  padding: "0.45rem 0.8rem",
                  borderRadius: "999px",
                  border: inStockOnly
                    ? "1px solid var(--color-gold)"
                    : "1px solid rgba(195, 185, 175, 0.3)",
                  backgroundColor: inStockOnly
                    ? "rgba(197, 160, 89, 0.08)"
                    : "transparent",
                  userSelect: "none",
                  marginLeft: "0.25rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ accentColor: "var(--color-gold)", cursor: "pointer" }}
                />
                In Stock Only
              </label>

              {/* Active Filter Clear Button */}
              {(selectedCategory || selectedBadge || inStockOnly || searchQuery) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-taupe)",
                    textDecoration: "underline",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    padding: "0.45rem 0.5rem",
                  }}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Sort Dropdown & Product Count */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginLeft: "auto",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-taupe)",
                  whiteSpace: "nowrap",
                }}
              >
                Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-charcoal-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Sort by:
                </span>
                <div style={{ width: "175px" }}>
                  <AdminDropdown
                    options={SORT_OPTIONS}
                    value={sortBy}
                    onChange={(val) => setSortBy(val as SortOption)}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(160px, 22vw, 270px), 1fr))",
                gap: "clamp(1rem, 2.5vw, 2rem)",
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div
              style={{
                textAlign: "center",
                padding: "5rem 1rem",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid rgba(195, 185, 175, 0.3)",
                maxWidth: "500px",
                margin: "2rem auto",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-cream)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                  fontSize: "1.5rem",
                }}
              >
                ✨
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.6rem",
                  color: "var(--color-charcoal)",
                  marginBottom: "0.5rem",
                }}
              >
                No pieces found
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  color: "var(--color-taupe)",
                  marginBottom: "1.5rem",
                }}
              >
                We couldn&apos;t find any items matching your selected criteria. Try adjusting or clearing your filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn-primary"
                style={{
                  padding: "0.65rem 1.5rem",
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Global Overlays */}
      <MobileBottomNav />
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}
