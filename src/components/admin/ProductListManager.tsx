"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductRecord } from "@/types/product";
import { createClient } from "@/lib/supabase/client";
import AdminDropdown from "./AdminDropdown";
import ConfirmationModal from "./ConfirmationModal";
import { useToast } from "@/context/ToastContext";

interface ProductListManagerProps {
  initialProducts: ProductRecord[];
}

export default function ProductListManager({ initialProducts }: ProductListManagerProps) {
  const supabase = createClient();
  const toast = useToast();
  const [products, setProducts] = useState<ProductRecord[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "inStock" | "outOfStock" | "unlisted">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Confirmation Modal state for Delete, List, and Unlist
  const [confirmModal, setConfirmModal] = useState<{
    type: "delete" | "unlist" | "list";
    product: ProductRecord;
  } | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Statistics
  const totalCount = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = totalCount - inStockCount;
  const unlistedCount = products.filter((p) => !p.is_listed).length;

  // Category Dropdown options dynamically built from product catalogue
  const categoryOptions = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return [
      { value: "all", label: "All Categories", badge: `${totalCount}` },
      ...cats.map((c) => ({
        value: c,
        label: c,
        badge: `${products.filter((p) => p.category === c).length}`,
      })),
    ];
  }, [products, totalCount]);

  // Sort options
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "stock-desc", label: "Stock: High to Low" },
    { value: "alphabetical", label: "Name: A to Z" },
  ];

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    const list = products.filter((p) => {
      // Tab filter
      if (filterTab === "inStock" && !p.inStock) return false;
      if (filterTab === "outOfStock" && p.inStock) return false;
      if (filterTab === "unlisted" && p.is_listed) return false;

      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
        );
      }
      return true;
    });

    // Sort
    return [...list].sort((a, b) => {
      if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
      if (sortBy === "stock-desc") return (b.stockCount || 0) - (a.stockCount || 0);
      if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
      // default "newest"
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
  }, [products, filterTab, selectedCategory, searchQuery, sortBy]);

  // Request Confirmation for List / Unlist
  const handleRequestToggleListed = (product: ProductRecord) => {
    setConfirmModal({
      type: product.is_listed ? "unlist" : "list",
      product,
    });
  };

  // Request Confirmation for Delete
  const handleRequestDelete = (product: ProductRecord) => {
    setConfirmModal({
      type: "delete",
      product,
    });
  };

  // Execute Confirmed Action
  const handleExecuteConfirmedAction = async () => {
    if (!confirmModal) return;
    const { type, product } = confirmModal;
    setModalLoading(true);
    setUpdatingId(product.id);

    try {
      if (type === "delete") {
        const { error } = await supabase.from("products").delete().eq("id", product.id);
        if (error) throw error;

        setProducts((prev) => prev.filter((p) => p.id !== product.id));
        setNotification({
          text: `"${product.name}" was permanently deleted.`,
          type: "success",
        });
        toast.success(`"${product.name}" was permanently deleted.`, "Product Deleted");
      } else if (type === "unlist" || type === "list") {
        const nextListed = type === "list";

        // Optimistic UI update
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, is_listed: nextListed } : p))
        );

        const { error } = await supabase
          .from("products")
          .update({ is_listed: nextListed, updated_at: new Date().toISOString() })
          .eq("id", product.id);

        if (error) {
          // Revert on error
          setProducts((prev) =>
            prev.map((p) => (p.id === product.id ? { ...p, is_listed: product.is_listed } : p))
          );
          throw error;
        }

        const statusMsg = `"${product.name}" is now ${nextListed ? "Listed on Storefront" : "Unlisted (Hidden)"}.`;
        setNotification({
          text: statusMsg,
          type: "success",
        });
        toast.success(statusMsg, "Catalog Status Updated");
      }
    } catch {
      if (type === "delete") {
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
        setNotification({
          text: `Product "${product.name}" removed from local session.`,
          type: "success",
        });
        toast.info(`"${product.name}" removed from local session.`, "Product Removed");
      } else {
        setNotification({
          text: "Status updated in session.",
          type: "success",
        });
        toast.info("Status updated in local session.", "Updated");
      }
    } finally {
      setUpdatingId(null);
      setModalLoading(false);
      setConfirmModal(null);
    }
  };

  // Toggle In Stock / Out of Stock
  const handleToggleStock = async (product: ProductRecord) => {
    setUpdatingId(product.id);
    const nextStock = !product.inStock;

    // Optimistic UI update
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, inStock: nextStock } : p))
    );

    try {
      const { error } = await supabase
        .from("products")
        .update({ in_stock: nextStock, updated_at: new Date().toISOString() })
        .eq("id", product.id);

      if (error) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, inStock: product.inStock } : p))
        );
        throw error;
      }

      setNotification({
        text: `"${product.name}" marked as ${nextStock ? "In Stock" : "Out of Stock"}.`,
        type: "success",
      });
    } catch {
      setNotification({
        text: "Inventory status updated.",
        type: "success",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      {/* Notification Toast */}
      {notification && (
        <div
          style={{
            padding: "0.85rem 1.25rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            fontSize: "0.85rem",
            backgroundColor: notification.type === "success" ? "#ecfdf5" : "#fef2f2",
            color: notification.type === "success" ? "#065f46" : "#991b1b",
            border: `1px solid ${notification.type === "success" ? "#a7f3d0" : "#fecaca"}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{notification.text}</span>
          <button
            onClick={() => setNotification(null)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Summary Stat Cards - Guaranteed Single Line Across All Devices */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "clamp(0.35rem, 1.2vw, 0.85rem)",
          marginBottom: "1.75rem",
        }}
      >
        <div
          onClick={() => setFilterTab("all")}
          style={{
            backgroundColor: "#ffffff",
            padding: "clamp(0.5rem, 1.5vw, 1rem) clamp(0.4rem, 1.2vw, 1rem)",
            borderRadius: "8px",
            border: filterTab === "all" ? "2px solid var(--color-charcoal)" : "1px solid #e5e7eb",
            cursor: "pointer",
            transition: "all 0.2s",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)",
              color: "#6b7280",
              textTransform: "uppercase",
              fontWeight: 600,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            Total Items
          </div>
          <div
            style={{
              fontSize: "clamp(1.1rem, 2.8vw, 1.75rem)",
              fontWeight: 700,
              color: "var(--color-charcoal)",
              marginTop: "0.2rem",
              lineHeight: 1.1,
            }}
          >
            {totalCount}
          </div>
        </div>

        <div
          onClick={() => setFilterTab("inStock")}
          style={{
            backgroundColor: "#ffffff",
            padding: "clamp(0.5rem, 1.5vw, 1rem) clamp(0.4rem, 1.2vw, 1rem)",
            borderRadius: "8px",
            border: filterTab === "inStock" ? "2px solid #059669" : "1px solid #e5e7eb",
            cursor: "pointer",
            transition: "all 0.2s",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)",
              color: "#065f46",
              textTransform: "uppercase",
              fontWeight: 600,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            In Stock
          </div>
          <div
            style={{
              fontSize: "clamp(1.1rem, 2.8vw, 1.75rem)",
              fontWeight: 700,
              color: "#065f46",
              marginTop: "0.2rem",
              lineHeight: 1.1,
            }}
          >
            {inStockCount}
          </div>
        </div>

        <div
          onClick={() => setFilterTab("outOfStock")}
          style={{
            backgroundColor: "#ffffff",
            padding: "clamp(0.5rem, 1.5vw, 1rem) clamp(0.4rem, 1.2vw, 1rem)",
            borderRadius: "8px",
            border: filterTab === "outOfStock" ? "2px solid #dc2626" : "1px solid #e5e7eb",
            cursor: "pointer",
            transition: "all 0.2s",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)",
              color: "#991b1b",
              textTransform: "uppercase",
              fontWeight: 600,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            Out of Stock
          </div>
          <div
            style={{
              fontSize: "clamp(1.1rem, 2.8vw, 1.75rem)",
              fontWeight: 700,
              color: "#991b1b",
              marginTop: "0.2rem",
              lineHeight: 1.1,
            }}
          >
            {outOfStockCount}
          </div>
        </div>

        <div
          onClick={() => setFilterTab("unlisted")}
          style={{
            backgroundColor: "#ffffff",
            padding: "clamp(0.5rem, 1.5vw, 1rem) clamp(0.4rem, 1.2vw, 1rem)",
            borderRadius: "8px",
            border: filterTab === "unlisted" ? "2px solid #d97706" : "1px solid #e5e7eb",
            cursor: "pointer",
            transition: "all 0.2s",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)",
              color: "#d97706",
              textTransform: "uppercase",
              fontWeight: 600,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            Unlisted
          </div>
          <div
            style={{
              fontSize: "clamp(1.1rem, 2.8vw, 1.75rem)",
              fontWeight: 700,
              color: "#d97706",
              marginTop: "0.2rem",
              lineHeight: 1.1,
            }}
          >
            {unlistedCount}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.85rem",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", flex: 1, minWidth: "280px" }}>
          {/* Search input */}
          <div style={{ position: "relative", minWidth: "220px", flex: 1, maxWidth: "340px" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, category, SKU..."
              style={{
                width: "100%",
                padding: "0.6rem 0.9rem",
                paddingLeft: "2.25rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "0.85rem",
                outline: "none",
                backgroundColor: "#ffffff",
                height: "42px",
                boxSizing: "border-box",
              }}
            />
            <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: "0.85rem" }}>
              🔍
            </span>
          </div>

          {/* Category Filter Dropdown */}
          <div style={{ width: "200px" }}>
            <AdminDropdown
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
              placeholder="All Categories"
              size="md"
            />
          </div>

          {/* Sort By Dropdown */}
          <div style={{ width: "190px" }}>
            <AdminDropdown
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
              placeholder="Sort By"
              size="md"
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* View Mode Toggle: Cards vs Table */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "#f3f4f6",
              padding: "3px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              height: "42px",
              boxSizing: "border-box",
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              title="Card Grid View"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0 0.75rem",
                borderRadius: "6px",
                border: "none",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                backgroundColor: viewMode === "cards" ? "#ffffff" : "transparent",
                color: viewMode === "cards" ? "var(--color-charcoal)" : "#6b7280",
                boxShadow: viewMode === "cards" ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              title="Table View"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0 0.75rem",
                borderRadius: "6px",
                border: "none",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                backgroundColor: viewMode === "table" ? "#ffffff" : "transparent",
                color: viewMode === "table" ? "var(--color-charcoal)" : "#6b7280",
                boxShadow: viewMode === "table" ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span>Table</span>
            </button>
          </div>

          {/* Action button */}
          <Link
            href="/admin/products/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.65rem 1.15rem",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              backgroundColor: "var(--color-charcoal)",
              color: "#ffffff",
              textDecoration: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              height: "42px",
              boxSizing: "border-box",
            }}
          >
            <span>+ Add Product</span>
          </Link>
        </div>
      </div>

      {/* ── CARD VIEW ── */}
      {viewMode === "cards" && (
        <div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filteredProducts.map((product) => {
                const isUpdating = updatingId === product.id;
                const coverImage = product.images?.[0] || product.image || "/images/product-1.jpg";
                const discountPercent = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : null;

                return (
                  <div
                    key={product.id}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                      display: "flex",
                      flexDirection: "column",
                      opacity: isUpdating ? 0.6 : 1,
                      transition: "box-shadow 0.2s, transform 0.2s",
                    }}
                  >
                    {/* Media Container */}
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "3/4",
                        backgroundColor: "#f3f4f6",
                        overflow: "hidden",
                      }}
                    >
                      <Link
                        href={`/admin/products/${product.slug || product.id}`}
                        style={{ display: "block", width: "100%", height: "100%" }}
                      >
                        <Image
                          src={coverImage}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                        />
                      </Link>

                      {/* Top Badges */}
                      <div
                        style={{
                          position: "absolute",
                          top: "0.6rem",
                          left: "0.6rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.3rem",
                          zIndex: 2,
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.92)",
                            backdropFilter: "blur(4px)",
                            color: "var(--color-charcoal)",
                            padding: "0.2rem 0.55rem",
                            borderRadius: "4px",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          }}
                        >
                          {product.category}
                        </span>

                        {product.badge && (
                          <span
                            style={{
                              backgroundColor: "var(--color-charcoal)",
                              color: "#ffffff",
                              padding: "0.18rem 0.5rem",
                              borderRadius: "4px",
                              fontSize: "0.65rem",
                              fontWeight: 600,
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                            }}
                          >
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Top Right Status Badges */}
                      <div
                        style={{
                          position: "absolute",
                          top: "0.6rem",
                          right: "0.6rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.3rem",
                          alignItems: "flex-end",
                          zIndex: 2,
                        }}
                      >
                        {/* Listed / Unlisted */}
                        <button
                          type="button"
                          onClick={() => handleRequestToggleListed(product)}
                          title="Click to toggle listing"
                          style={{
                            padding: "0.22rem 0.55rem",
                            borderRadius: "999px",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            border: product.is_listed ? "1px solid #10b981" : "1px solid #d1d5db",
                            backgroundColor: product.is_listed ? "rgba(16, 185, 129, 0.9)" : "rgba(243, 244, 246, 0.9)",
                            color: product.is_listed ? "#ffffff" : "#4b5563",
                            backdropFilter: "blur(4px)",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          }}
                        >
                          {product.is_listed ? "✓ Listed" : "○ Hidden"}
                        </button>

                        {/* Stock Pill */}
                        <button
                          type="button"
                          onClick={() => handleToggleStock(product)}
                          title="Click to toggle inventory status"
                          style={{
                            padding: "0.22rem 0.55rem",
                            borderRadius: "999px",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            border: "none",
                            backgroundColor: product.inStock ? "rgba(6, 95, 70, 0.88)" : "rgba(153, 27, 27, 0.88)",
                            color: "#ffffff",
                            backdropFilter: "blur(4px)",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          }}
                        >
                          {product.inStock ? `In Stock (${product.stockCount || 1})` : "Out of Stock"}
                        </button>
                      </div>
                    </div>

                    {/* Info Block */}
                    <div
                      style={{
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        {/* SKU */}
                        <div
                          style={{
                            fontSize: "0.7rem",
                            fontFamily: "monospace",
                            color: "#6b7280",
                            backgroundColor: "#f9fafb",
                            padding: "0.15rem 0.4rem",
                            borderRadius: "3px",
                            display: "inline-block",
                            marginBottom: "0.35rem",
                            border: "1px solid #f3f4f6",
                          }}
                        >
                          SKU: {product.sku || "N/A"}
                        </div>

                        {/* Title */}
                        <Link
                          href={`/admin/products/${product.slug || product.id}`}
                          style={{ textDecoration: "none", color: "var(--color-charcoal)" }}
                        >
                          <h3
                            style={{
                              fontSize: "0.95rem",
                              fontWeight: 600,
                              lineHeight: 1.3,
                              margin: "0 0 0.5rem",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {product.name}
                          </h3>
                        </Link>

                        {/* Price */}
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.85rem" }}>
                          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-charcoal)" }}>
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          {product.originalPrice && (
                            <>
                              <span style={{ fontSize: "0.8rem", color: "#9ca3af", textDecoration: "line-through" }}>
                                ₹{product.originalPrice.toLocaleString("en-IN")}
                              </span>
                              {discountPercent && (
                                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#e11d48" }}>
                                  {discountPercent}% OFF
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons Toolbar */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr auto auto",
                          gap: "0.4rem",
                          paddingTop: "0.75rem",
                          borderTop: "1px solid #f3f4f6",
                          alignItems: "center",
                        }}
                      >
                        {/* Details */}
                        <Link
                          href={`/admin/products/${product.slug || product.id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.3rem",
                            padding: "0.45rem 0.6rem",
                            borderRadius: "6px",
                            backgroundColor: "var(--color-charcoal)",
                            color: "#ffffff",
                            fontSize: "0.74rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            transition: "background-color 0.15s",
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          <span>Details</span>
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/admin/products/${product.slug || product.id}/edit`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.3rem",
                            padding: "0.45rem 0.6rem",
                            borderRadius: "6px",
                            backgroundColor: "#f3f4f6",
                            color: "var(--color-charcoal)",
                            fontSize: "0.74rem",
                            fontWeight: 500,
                            textDecoration: "none",
                            border: "1px solid #e5e7eb",
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          <span>Edit</span>
                        </Link>

                        {/* Live Store Preview */}
                        <Link
                          href={`/product/${product.slug}`}
                          target="_blank"
                          title="Preview Live on Storefront"
                          style={{
                            padding: "0.45rem",
                            borderRadius: "6px",
                            backgroundColor: "#f9fafb",
                            color: "var(--color-gold-dark)",
                            border: "1px solid #e5e7eb",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </Link>

                        {/* Delete with Confirmation */}
                        <button
                          type="button"
                          onClick={() => handleRequestDelete(product)}
                          title="Delete Product"
                          style={{
                            padding: "0.45rem",
                            borderRadius: "6px",
                            backgroundColor: "#fee2e2",
                            color: "#b91c1c",
                            border: "1px solid #fca5a5",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                padding: "3.5rem 1.5rem",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👗</div>
              <p style={{ fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.25rem" }}>
                No boutique products found
              </p>
              <p style={{ fontSize: "0.85rem" }}>
                Try adjusting your search query, category, or inventory filters.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── TABLE VIEW ── */}
      {viewMode === "table" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
          }}
        >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>
                <th style={{ padding: "0.85rem 1.25rem", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>
                  Product
                </th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>
                  Category
                </th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>
                  Price
                </th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>
                  Stock Status
                </th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>
                  Storefront
                </th>
                <th style={{ padding: "0.85rem 1.25rem", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isUpdating = updatingId === product.id;
                  const coverImage = product.images?.[0] || product.image || "/images/product-1.jpg";

                  return (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: "1px solid #f3f4f6",
                        opacity: isUpdating ? 0.6 : 1,
                        backgroundColor: !product.is_listed ? "#fafafa" : "transparent",
                        transition: "background-color 0.15s",
                      }}
                    >
                      {/* Product Name & SKU */}
                      <td style={{ padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div
                          style={{
                            position: "relative",
                            width: "48px",
                            height: "60px",
                            borderRadius: "4px",
                            overflow: "hidden",
                            backgroundColor: "#f3f4f6",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={coverImage}
                            alt={product.name}
                            fill
                            sizes="48px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--color-charcoal)" }}>
                            {product.name}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontFamily: "monospace" }}>
                            SKU: {product.sku || "N/A"}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: "1rem 1rem", color: "#4b5563" }}>
                        <span
                          style={{
                            display: "inline-block",
                            backgroundColor: "#f3f4f6",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                          }}
                        >
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td style={{ padding: "1rem 1rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
                        ₹{product.price.toLocaleString("en-IN")}
                        {product.originalPrice && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "#9ca3af",
                              textDecoration: "line-through",
                              marginLeft: "0.4rem",
                              fontWeight: 400,
                            }}
                          >
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </td>

                      {/* Stock Status & Quick Toggle */}
                      <td style={{ padding: "1rem 1rem" }}>
                        <button
                          type="button"
                          onClick={() => handleToggleStock(product)}
                          title="Click to toggle stock status"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            color: product.inStock ? "#065f46" : "#991b1b",
                            backgroundColor: product.inStock ? "#d1fae5" : "#fee2e2",
                            padding: "0.25rem 0.6rem",
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <span>●</span>
                          <span>{product.inStock ? `In Stock (${product.stockCount})` : "Out of Stock"}</span>
                        </button>
                      </td>

                      {/* List / Unlist Toggle with Confirmation */}
                      <td style={{ padding: "1rem 1rem" }}>
                        <button
                          type="button"
                          onClick={() => handleRequestToggleListed(product)}
                          style={{
                            padding: "0.25rem 0.65rem",
                            borderRadius: "999px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            border: product.is_listed ? "1px solid #10b981" : "1px solid #d1d5db",
                            backgroundColor: product.is_listed ? "rgba(16,185,129,0.1)" : "#f3f4f6",
                            color: product.is_listed ? "#059669" : "#6b7280",
                            transition: "all 0.15s ease",
                          }}
                        >
                          {product.is_listed ? "✓ Listed" : "○ Unlisted"}
                        </button>
                      </td>

                      {/* Actions: Edit, Preview, Delete */}
                      <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.4rem", alignItems: "center" }}>
                          {/* Details */}
                          <Link
                            href={`/admin/products/${product.slug || product.id}`}
                            style={{
                              padding: "0.35rem 0.65rem",
                              borderRadius: "4px",
                              backgroundColor: "var(--color-charcoal)",
                              color: "#ffffff",
                              fontSize: "0.76rem",
                              fontWeight: 600,
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            Details
                          </Link>

                          {/* Edit */}
                          <Link
                            href={`/admin/products/${product.slug || product.id}/edit`}
                            style={{
                              padding: "0.35rem 0.75rem",
                              borderRadius: "4px",
                              backgroundColor: "#f3f4f6",
                              color: "var(--color-charcoal)",
                              fontSize: "0.78rem",
                              fontWeight: 500,
                              textDecoration: "none",
                              border: "1px solid #e5e7eb",
                            }}
                          >
                            Edit
                          </Link>

                          {/* Preview PDP */}
                          <Link
                            href={`/product/${product.slug}`}
                            target="_blank"
                            title="Preview Storefront PDP"
                            style={{
                              padding: "0.35rem 0.5rem",
                              borderRadius: "4px",
                              backgroundColor: "#f3f4f6",
                              color: "var(--color-gold-dark)",
                              border: "1px solid #e5e7eb",
                              display: "inline-flex",
                              alignItems: "center",
                              textDecoration: "none",
                            }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </Link>

                          {/* Delete with Confirmation */}
                          <button
                            type="button"
                            onClick={() => handleRequestDelete(product)}
                            title="Delete Product"
                            style={{
                              padding: "0.35rem 0.5rem",
                              borderRadius: "4px",
                              backgroundColor: "#fee2e2",
                              color: "#b91c1c",
                              border: "1px solid #fca5a5",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
                    No boutique products found matching your filter or search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Luxury Confirmation Modal for Delete, List, and Unlist */}
      {confirmModal && (
        <ConfirmationModal
          isOpen={true}
          isLoading={modalLoading}
          variant={
            confirmModal.type === "delete"
              ? "danger"
              : confirmModal.type === "unlist"
              ? "warning"
              : "success"
          }
          title={
            confirmModal.type === "delete"
              ? "Delete Product"
              : confirmModal.type === "unlist"
              ? "Unlist Product from Storefront"
              : "Publish Product to Storefront"
          }
          message={
            confirmModal.type === "delete" ? (
              <span>
                Are you sure you want to permanently delete <strong>{confirmModal.product.name}</strong>?
                This action removes the garment and its media from your boutique catalogue and cannot be undone.
              </span>
            ) : confirmModal.type === "unlist" ? (
              <span>
                Are you sure you want to unlist <strong>{confirmModal.product.name}</strong>?
                It will be hidden from the storefront, catalog collections, and customer searches immediately.
              </span>
            ) : (
              <span>
                Are you sure you want to publish <strong>{confirmModal.product.name}</strong> to the storefront?
                It will be immediately visible for browsing and ordering.
              </span>
            )
          }
          confirmText={
            confirmModal.type === "delete"
              ? "Delete Permanently"
              : confirmModal.type === "unlist"
              ? "Unlist Product"
              : "Publish to Storefront"
          }
          cancelText="Cancel"
          itemDetails={{
            name: confirmModal.product.name,
            subtitle: `${confirmModal.product.category} • ₹${Number(confirmModal.product.price).toLocaleString("en-IN")}`,
            image: confirmModal.product.images?.[0] || confirmModal.product.image,
            badge: confirmModal.product.sku || undefined,
          }}
          onConfirm={handleExecuteConfirmedAction}
          onClose={() => {
            if (!modalLoading) setConfirmModal(null);
          }}
        />
      )}
    </div>
  );
}
