"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductRecord } from "@/types/product";
import { createClient } from "@/lib/supabase/client";
import ConfirmationModal from "./ConfirmationModal";
import { useToast } from "@/context/ToastContext";

import { getColorHex, isLightColor } from "@/utils/colors";


interface AdminProductDetailViewProps {
  product: ProductRecord;
}

export default function AdminProductDetailView({ product: initialProduct }: AdminProductDetailViewProps) {
  const router = useRouter();
  const supabase = createClient();
  const toast = useToast();

  const [product, setProduct] = useState<ProductRecord>(initialProduct);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedSku, setCopiedSku] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Confirmation Modal state for Delete, List, and Unlist
  const [confirmModal, setConfirmModal] = useState<{
    type: "delete" | "unlist" | "list";
  } | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image || "/images/product-1.jpg"];

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleCopySku = () => {
    if (product.sku) {
      navigator.clipboard.writeText(product.sku);
      setCopiedSku(true);
      toast.success(`SKU code "${product.sku}" copied to clipboard!`, "SKU Copied");
      setTimeout(() => setCopiedSku(false), 2000);
    }
  };

  const handleToggleStock = async () => {
    setIsUpdating(true);
    const nextStock = !product.inStock;
    setProduct((prev) => ({ ...prev, inStock: nextStock }));

    try {
      const { error } = await supabase
        .from("products")
        .update({ in_stock: nextStock, updated_at: new Date().toISOString() })
        .eq("id", product.id);

      if (error) throw error;
      toast.success(
        `"${product.name}" marked as ${nextStock ? "In Stock" : "Out of Stock"}.`,
        "Inventory Updated"
      );
    } catch {
      setProduct((prev) => ({ ...prev, inStock: product.inStock }));
      toast.error("Failed to update inventory status.", "Update Failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleExecuteConfirmedAction = async () => {
    if (!confirmModal) return;
    const { type } = confirmModal;
    setModalLoading(true);

    try {
      if (type === "delete") {
        const { error } = await supabase.from("products").delete().eq("id", product.id);
        if (error) throw error;

        toast.success(`"${product.name}" was permanently removed.`, "Product Deleted");
        router.push("/admin/products");
      } else if (type === "unlist" || type === "list") {
        const nextListed = type === "list";
        setProduct((prev) => ({ ...prev, is_listed: nextListed }));

        const { error } = await supabase
          .from("products")
          .update({ is_listed: nextListed, updated_at: new Date().toISOString() })
          .eq("id", product.id);

        if (error) throw error;
        toast.success(
          nextListed
            ? `"${product.name}" is now live on the storefront!`
            : `"${product.name}" is now unlisted and hidden from storefront.`,
          nextListed ? "Product Published" : "Product Hidden"
        );
      }
    } catch {
      toast.error("Action could not be completed on server.", "Error");
    } finally {
      setModalLoading(false);
      setConfirmModal(null);
    }
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem 1rem 5rem" }}>
      {/* Navigation & Breadcrumb */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.75rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link
            href="/admin/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              borderRadius: "6px",
              backgroundColor: "#ffffff",
              border: "1px solid #d1d5db",
              fontSize: "0.82rem",
              fontWeight: 500,
              color: "var(--color-charcoal)",
              textDecoration: "none",
            }}
          >
            ← Back to Products
          </Link>
          <span style={{ color: "#9ca3af" }}>/</span>
          <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 500 }}>
            {product.name}
          </span>
        </div>

        {/* Top Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {/* Edit */}
          <Link
            href={`/admin/products/${product.slug || product.id}/edit`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.55rem 1rem",
              borderRadius: "6px",
              backgroundColor: "var(--color-charcoal)",
              color: "#ffffff",
              fontSize: "0.82rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Edit Product</span>
          </Link>

          {/* List / Unlist Toggle */}
          <button
            type="button"
            onClick={() => setConfirmModal({ type: product.is_listed ? "unlist" : "list" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.55rem 0.9rem",
              borderRadius: "6px",
              backgroundColor: "#ffffff",
              border: product.is_listed ? "1px solid #10b981" : "1px solid #d1d5db",
              color: product.is_listed ? "#059669" : "#4b5563",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <span>{product.is_listed ? "✓ Listed on Store" : "○ Unlisted (Hidden)"}</span>
          </button>

          {/* View Live on Storefront */}
          <Link
            href={`/product/${product.slug}`}
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.55rem 0.9rem",
              borderRadius: "6px",
              backgroundColor: "#ffffff",
              border: "1px solid #d1d5db",
              color: "var(--color-gold-dark)",
              fontSize: "0.82rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Live Store Preview ↗</span>
          </Link>

          {/* Delete */}
          <button
            type="button"
            onClick={() => setConfirmModal({ type: "delete" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.55rem 0.85rem",
              borderRadius: "6px",
              backgroundColor: "#fee2e2",
              border: "1px solid #fca5a5",
              color: "#b91c1c",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <span>🗑️ Delete</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery on Left, Details on Right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* ── LEFT COLUMN: Imagery Gallery ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Main Photo Viewer */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3/4",
              borderRadius: "12px",
              backgroundColor: "#f3f4f6",
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <Image
              src={images[activeImageIdx] || "/images/product-1.jpg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              style={{ objectFit: "cover" }}
            />

            {/* Badges Overlay */}
            <div
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <span
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(4px)",
                  color: "var(--color-charcoal)",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {product.category}
              </span>
              {product.badge && (
                <span
                  style={{
                    backgroundColor: "var(--color-charcoal)",
                    color: "#ffffff",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "6px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* 4 Thumbnails Selector */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.75rem",
            }}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border:
                    activeImageIdx === idx
                      ? "2px solid var(--color-charcoal)"
                      : "1px solid #d1d5db",
                  backgroundColor: "#f9fafb",
                  padding: 0,
                  cursor: "pointer",
                  opacity: activeImageIdx === idx ? 1 : 0.65,
                  transition: "all 0.15s ease",
                }}
              >
                <Image
                  src={img}
                  alt={`Slot ${idx + 1}`}
                  fill
                  sizes="120px"
                  style={{ objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    left: "4px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "#ffffff",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    padding: "0.1rem 0.35rem",
                    borderRadius: "3px",
                  }}
                >
                  #{idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Comprehensive Specifications ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Header Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              padding: "1.75rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            {/* SKU and Live Status */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <button
                type="button"
                onClick={handleCopySku}
                title="Click to copy SKU"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.25rem 0.65rem",
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  fontSize: "0.78rem",
                  color: "#4b5563",
                  cursor: "pointer",
                }}
              >
                <span>SKU: {product.sku || "N/A"}</span>
                <span>{copiedSku ? "✓ Copied" : "📋"}</span>
              </button>

              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={handleToggleStock}
                  disabled={isUpdating}
                  style={{
                    padding: "0.25rem 0.65rem",
                    borderRadius: "999px",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    border: "none",
                    backgroundColor: product.inStock ? "#d1fae5" : "#fee2e2",
                    color: product.inStock ? "#065f46" : "#991b1b",
                    cursor: "pointer",
                  }}
                >
                  ● {product.inStock ? `In Stock (${product.stockCount || 1} units)` : "Out of Stock"}
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 500,
                color: "var(--color-charcoal)",
                margin: "0 0 0.5rem 0",
                lineHeight: 1.2,
              }}
            >
              {product.name}
            </h1>

            {/* Tagline */}
            {product.tagline && (
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "var(--color-taupe)",
                  margin: "0 0 1.25rem 0",
                  lineHeight: 1.4,
                }}
              >
                &ldquo;{product.tagline}&rdquo;
              </p>
            )}

            {/* Pricing Summary */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.75rem",
                padding: "1rem 1.25rem",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            >
              <div>
                <span style={{ fontSize: "0.72rem", color: "#6b7280", textTransform: "uppercase", display: "block" }}>
                  Active Price
                </span>
                <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-charcoal)" }}>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              </div>

              {product.originalPrice && (
                <div>
                  <span style={{ fontSize: "0.72rem", color: "#6b7280", textTransform: "uppercase", display: "block" }}>
                    Regular MRP
                  </span>
                  <span style={{ fontSize: "1.1rem", color: "#9ca3af", textDecoration: "line-through" }}>
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              {discountPercent && (
                <span
                  style={{
                    backgroundColor: "#fee2e2",
                    color: "#e11d48",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "4px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    marginLeft: "auto",
                  }}
                >
                  {discountPercent}% SAVINGS
                </span>
              )}
            </div>
          </div>

          {/* Variants Card: Colors & Sizes */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              padding: "1.5rem 1.75rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-charcoal)", margin: "0 0 1rem 0" }}>
              Variants & Sizing
            </h3>

            {/* Colors */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                Available Colors ({product.colors?.length || 0})
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {product.colors && product.colors.length > 0 ? (
                  product.colors.map((c) => {
                    const hex = getColorHex(c);
                    const isLight = isLightColor(hex);
                    return (
                      <div
                        key={c}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.35rem 0.65rem",
                          borderRadius: "999px",
                          border: "1px solid #e5e7eb",
                          backgroundColor: "#f9fafb",
                          fontSize: "0.78rem",
                          fontWeight: 500,
                          color: "var(--color-charcoal)",
                        }}
                      >
                        <span
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            backgroundColor: hex,
                            border: isLight ? "1.5px solid rgba(0,0,0,0.25)" : "1px solid rgba(0,0,0,0.15)",

                          }}
                        />
                        <span>{c}</span>
                      </div>
                    );
                  })
                ) : (
                  <span style={{ fontSize: "0.82rem", color: "#9ca3af" }}>No colors configured</span>
                )}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                Available Sizes ({product.sizes?.length || 0})
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {product.sizes && product.sizes.length > 0 ? (
                  product.sizes.map((s) => (
                    <span
                      key={s}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "6px",
                        backgroundColor: "var(--color-charcoal)",
                        color: "#ffffff",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: "0.82rem", color: "#9ca3af" }}>No sizes configured</span>
                )}
              </div>
            </div>
          </div>

          {/* Story & Craftsmanship Highlights */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              padding: "1.5rem 1.75rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-charcoal)", margin: "0 0 1rem 0" }}>
              Craftsmanship Story & Highlights
            </h3>

            {product.description && (
              <p
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  color: "#4b5563",
                  marginBottom: "1.25rem",
                  whiteSpace: "pre-line",
                }}
              >
                {product.description}
              </p>
            )}

            {product.highlights && product.highlights.length > 0 && (
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                  Key Highlights ({product.highlights.length})
                </label>
                <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {product.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize: "0.82rem", color: "#374151" }}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Fabric, Care & Logistics Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              padding: "1.5rem 1.75rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-charcoal)", margin: "0 0 1rem 0" }}>
              Textile Composition & Pan-India Logistics
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600, display: "block" }}>
                  Fabric Composition
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-charcoal)", fontWeight: 500 }}>
                  {product.details?.fabric || "Artisanal Luxury Fabric"}
                </span>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600, display: "block" }}>
                  Fit Silhouette
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-charcoal)", fontWeight: 500 }}>
                  {product.details?.fit || "Relaxed tailored fit"}
                </span>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600, display: "block" }}>
                  Wash Care
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-charcoal)", fontWeight: 500 }}>
                  {product.details?.care || "Gentle cold hand wash or dry clean"}
                </span>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600, display: "block" }}>
                  Artisanal Origin
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-charcoal)", fontWeight: 500 }}>
                  {product.details?.origin || "Handcrafted in Kochi, Kerala, India"}
                </span>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600, display: "block" }}>
                  Dispatch Schedule
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-charcoal)", fontWeight: 500 }}>
                  {product.shipping?.dispatch || "Dispatches in 24-48 business hours"}
                </span>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600, display: "block" }}>
                  Transit Estimate
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-charcoal)", fontWeight: 500 }}>
                  {product.shipping?.transit || "3-5 business days across Pan-India"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
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
                Are you sure you want to delete <strong>{product.name}</strong>?
                This action is permanent and removes the item from the catalog.
              </span>
            ) : confirmModal.type === "unlist" ? (
              <span>
                Are you sure you want to unlist <strong>{product.name}</strong>?
                It will be hidden from customer view on the storefront.
              </span>
            ) : (
              <span>
                Are you sure you want to publish <strong>{product.name}</strong>?
                It will be immediately visible for shopping.
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
            name: product.name,
            subtitle: `${product.category} • ₹${Number(product.price).toLocaleString("en-IN")}`,
            image: images[0],
            badge: product.sku || undefined,
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
