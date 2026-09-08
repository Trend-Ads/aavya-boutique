"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { ProductItem } from "@/data/products";
import { useUI } from "@/context/UIContext";
import ProductCard from "./ProductCard";

import { getColorHex, isLightColor } from "@/utils/colors";


const SIZE_GUIDE_DATA = [
  { size: "XS", bust: '32"', waist: '26"', hips: '36"', length: '46"' },
  { size: "S", bust: '34"', waist: '28"', hips: '38"', length: '46.5"' },
  { size: "M", bust: '36"', waist: '30"', hips: '40"', length: '47"' },
  { size: "L", bust: '38"', waist: '32"', hips: '42"', length: '47.5"' },
  { size: "XL", bust: '40"', waist: '34"', hips: '44"', length: '48"' },
  { size: "XXL", bust: '42"', waist: '36"', hips: '46"', length: '48"' },
];

interface ProductDetailViewProps {
  product: ProductItem;
  relatedProducts: ProductItem[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addToCart, openCart, isInWishlist, toggleWishlist } = useUI();

  // Gallery state
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Customization selection
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "Ivory");
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0] || "S");
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = typeof isInWishlist === "function" ? isInWishlist(product.id) : false;

  // UI state
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("details");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewAuthor, setNewReviewAuthor] = useState("");

  const mainActionRef = useRef<HTMLDivElement>(null);

  // Images fallback
  const galleryImages = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [product.image];
  }, [product]);

  // Enhanced zoom cursor move: tracks exact coordinates under cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  // Add to Bag handler
  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: galleryImages[activeImageIdx] || product.image,
      size: selectedSize,
      quantity: quantity,
      color: selectedColor,
    });
    openCart();
  };

  // WhatsApp direct buy URL
  const whatsappBuyUrl = useMemo(() => {
    const currentUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `https://aavyaboutique.in/product/${product.slug}`;
    const totalAmount = product.price * quantity;

    const message =
      `Hello Aavya Boutique! 🌸\n` +
      `I would like to order *${product.name}*:\n\n` +
      `• *Size:* ${selectedSize}\n` +
      `• *Color:* ${selectedColor}\n` +
      `• *Quantity:* ${quantity}\n` +
      `• *Price:* ₹${totalAmount.toLocaleString("en-IN")}\n` +
      `• *Product Link:* ${currentUrl}\n\n` +
      `Please confirm availability and share payment options for delivery. Thank you!`;

    return `https://wa.me/919778524133?text=${encodeURIComponent(message)}`;
  }, [product, selectedSize, selectedColor, quantity]);


  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="pdp-page-container" style={{ backgroundColor: "var(--color-ivory)", minHeight: "100vh" }}>
      {/* ─── Breadcrumbs ─────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="container-brand"
        style={{
          paddingTop: "6.5rem",
          paddingBottom: "1.5rem",
        }}
      >
        <ol
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            listStyle: "none",
            fontSize: "0.72rem",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-taupe)",
            flexWrap: "wrap",
          }}
        >
          <li>
            <Link
              href="/"
              style={{
                color: "inherit",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-charcoal)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-taupe)")}
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" style={{ opacity: 0.5 }}>/</li>
          <li>
            <Link
              href="/#shop"
              style={{
                color: "inherit",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-charcoal)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-taupe)")}
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true" style={{ opacity: 0.5 }}>/</li>
          <li
            aria-current="page"
            style={{
              color: "var(--color-charcoal)",
              fontWeight: 500,
              maxWidth: "280px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.name}
          </li>
        </ol>
      </nav>

      {/* ─── Main Product Section: Desktop 2-Column Split ───────── */}
      <section className="container-brand" style={{ paddingBottom: "4.5rem" }}>
        <div className="pdp-main-grid">
          {/* ─── LEFT COLUMN: Images & Gallery ─────────────────────── */}
          <div className="pdp-gallery-wrap">
            {/* Desktop Vertical Thumbnails Rail */}
            <div className="pdp-thumbnails-vertical no-scrollbar" aria-label="Product thumbnails">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  aria-label={`View image ${idx + 1}`}
                  aria-current={activeImageIdx === idx}
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    border:
                      activeImageIdx === idx
                        ? "1.5px solid var(--color-charcoal)"
                        : "1px solid var(--color-cream-dark)",
                    padding: 0,
                    background: "none",
                    cursor: "pointer",
                    overflow: "hidden",
                    opacity: activeImageIdx === idx ? 1 : 0.6,
                    transition: "all 0.2s var(--ease-smooth)",
                  }}
                  onMouseEnter={(e) => {
                    if (activeImageIdx !== idx) e.currentTarget.style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    if (activeImageIdx !== idx) e.currentTarget.style.opacity = "0.6";
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Image with Precision Cursor-Tracking Zoom */}
            <div
              className="pdp-main-image-frame"
              style={{
                cursor: isZoomed ? "zoom-out" : "zoom-in",
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                backgroundColor: "var(--color-cream)",
                overflow: "hidden",
              }}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              <img
                src={galleryImages[activeImageIdx]}
                alt={`${product.name} — featured view ${activeImageIdx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZoomed ? "scale(2.5)" : "scale(1)",
                  transition: isZoomed
                    ? "transform 0.12s ease-out"
                    : "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />

              {/* Badge */}
              {product.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    backgroundColor: "var(--color-charcoal)",
                    color: "var(--color-ivory)",
                    padding: "0.35rem 0.75rem",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                >
                  {product.badge}
                </span>
              )}

              {/* Zoom prompt indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  backgroundColor: "rgba(248, 245, 240, 0.94)",
                  backdropFilter: "blur(6px)",
                  padding: "0.35rem 0.65rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-charcoal)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
                className="hidden md:flex"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                {isZoomed ? "Move cursor to inspect details" : "Hover to Zoom"}
              </div>
            </div>

            {/* Mobile Horizontal Thumbnail Row */}
            <div
              className="no-scrollbar md:hidden"
              style={{
                display: "flex",
                gap: "0.5rem",
                overflowX: "auto",
                paddingTop: "0.25rem",
              }}
            >
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  aria-label={`Select photo ${idx + 1}`}
                  style={{
                    width: "64px",
                    aspectRatio: "3/4",
                    flexShrink: 0,
                    border:
                      activeImageIdx === idx
                        ? "2px solid var(--color-charcoal)"
                        : "1px solid var(--color-cream-dark)",
                    padding: 0,
                    background: "none",
                    cursor: "pointer",
                    overflow: "hidden",
                    opacity: activeImageIdx === idx ? 1 : 0.6,
                  }}
                >
                  <img
                    src={imgUrl}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Details & Purchase ──────────────────── */}
          <div className="pdp-details-wrap">
            {/* Header Block: Eyebrow + Title + SKU */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span className="section-eyebrow" style={{ color: "var(--color-taupe)" }}>
                  Aavya Atelier · Kochi Signature
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.65rem",
                    color: "var(--color-taupe)",
                    letterSpacing: "0.05em",
                  }}
                >
                  SKU: {product.sku}
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: "var(--color-charcoal)",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.5rem",
                }}
              >
                {product.name}
              </h1>

              {/* Tagline */}
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  color: "var(--color-taupe)",
                  lineHeight: 1.4,
                  marginBottom: "0.875rem",
                }}
              >
                &ldquo;{product.tagline}&rdquo;
              </p>

              {/* Rating & Review counter */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px", color: "#B8860B" }}
                  aria-label={`${product.reviews.rating} out of 5 stars`}
                >
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <a
                  href="#customer-reviews"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    color: "var(--color-taupe)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  {product.reviews.rating} ({product.reviews.count} reviews)
                </a>
                <span style={{ color: "var(--color-taupe-light)" }}>·</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    color: "#2E7D32",
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#2E7D32",
                      display: "inline-block",
                    }}
                  />
                  In Stock · Ready to Dispatch
                </span>
              </div>
            </div>

            {/* Price Row */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1rem",
                padding: "1rem 0",
                borderTop: "1px solid var(--color-cream-dark)",
                borderBottom: "1px solid var(--color-cream-dark)",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.75rem",
                  fontWeight: 500,
                  color: "var(--color-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              {product.originalPrice && (
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1.1rem",
                    color: "var(--color-taupe)",
                    textDecoration: "line-through",
                  }}
                >
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}

              {discountPercent && (
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    backgroundColor: "rgba(111, 48, 56, 0.1)",
                    color: "var(--color-burgundy)",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "2px",
                  }}
                >
                  Save {discountPercent}%
                </span>
              )}

              <span
                style={{
                  marginLeft: "auto",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  color: "var(--color-taupe)",
                }}
              >
                Inclusive of all taxes
              </span>
            </div>

            {/* Urgency Notice */}
            <div
              style={{
                backgroundColor: "rgba(185, 143, 143, 0.12)",
                borderLeft: "3px solid var(--color-dusty-rose)",
                padding: "0.75rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <span style={{ fontSize: "1rem" }}>🔥</span>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "var(--color-charcoal)",
                  margin: 0,
                }}
              >
                <strong>High Demand:</strong> Only {product.stockCount} pieces handcrafted in this batch at our Kochi atelier.
              </p>
            </div>

            {/* Color Swatches */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.6rem",
                }}
              >
                <label
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-charcoal)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span>Colour:</span>
                  <span style={{ fontWeight: 600, color: "var(--color-charcoal)" }}>{selectedColor}</span>
                  {selectedColor && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        backgroundColor: getColorHex(selectedColor),
                        border: isLightColor(getColorHex(selectedColor)) ? "1.5px solid rgba(0,0,0,0.25)" : "1.5px solid rgba(0,0,0,0.1)",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </label>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }} role="radiogroup" aria-label="Available Colours">
                {product.colors.map((colorName) => {
                  const isSelected = selectedColor === colorName;
                  const hexCode = getColorHex(colorName);
                  const isLight = isLightColor(hexCode);

                  return (
                    <button
                      key={colorName}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`Select colour ${colorName}`}
                      onClick={() => setSelectedColor(colorName)}
                      title={colorName}
                      style={{
                        position: "relative",
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        backgroundColor: hexCode,
                        border: isLight ? "1.5px solid rgba(0,0,0,0.25)" : "1.5px solid rgba(0,0,0,0.08)",
                        cursor: "pointer",
                        boxShadow: isSelected
                          ? "0 0 0 2px #fff, 0 0 0 4px var(--color-charcoal)"
                          : "0 2px 4px rgba(0,0,0,0.08)",
                        transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      {isSelected && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={isLight ? "#1a1a1a" : "#ffffff"}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.35))" }}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector + Size Guide Modal trigger */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.6rem",
                }}
              >
                <label
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-charcoal)",
                  }}
                >
                  Size: <span style={{ fontWeight: 400, color: "var(--color-taupe)" }}>{selectedSize}</span>
                </label>
                <button
                  type="button"
                  id="open-size-guide"
                  onClick={() => setIsSizeGuideOpen(true)}
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    color: "var(--color-charcoal)",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Size Guide & Measurements
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${product.sizes.length}, 1fr)`,
                  gap: "0.5rem",
                }}
                role="radiogroup"
                aria-label="Available Sizes"
              >
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: "0.75rem 0",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        fontWeight: isSelected ? 600 : 400,
                        backgroundColor: isSelected ? "var(--color-charcoal)" : "transparent",
                        color: isSelected ? "var(--color-ivory)" : "var(--color-charcoal)",
                        border: isSelected
                          ? "1px solid var(--color-charcoal)"
                          : "1px solid var(--color-cream-dark)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        minHeight: 44,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = "var(--color-charcoal)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = "var(--color-cream-dark)";
                        }
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector + Action Buttons */}
            <div
              ref={mainActionRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
                paddingTop: "0.5rem",
              }}
            >
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                {/* Quantity Pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    border: "1px solid var(--color-cream-dark)",
                    height: "48px",
                    backgroundColor: "transparent",
                  }}
                >
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      width: 40,
                      height: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                      fontSize: "1rem",
                      color: "var(--color-charcoal)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    –
                  </button>
                  <span
                    style={{
                      minWidth: 32,
                      textAlign: "center",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "var(--color-charcoal)",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    style={{
                      width: 40,
                      height: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                      fontSize: "1rem",
                      color: "var(--color-charcoal)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Primary: Add to Bag */}
                <button
                  id="add-to-bag-pdp"
                  type="button"
                  onClick={handleAddToCart}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    height: "48px",
                    justifyContent: "center",
                    letterSpacing: "0.14em",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Add to Bag
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  id="wishlist-pdp"
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  onClick={() => {
                    if (typeof toggleWishlist === "function") {
                      toggleWishlist({
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: galleryImages[0] || product.image,
                        category: product.category,
                        colors: product.colors,
                        inStock: product.inStock,
                        badge: product.badge,
                        descriptor: product.descriptor,
                      });
                    }
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    border: "1px solid var(--color-cream-dark)",
                    background: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isWishlisted ? "var(--color-burgundy)" : "var(--color-charcoal)",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-charcoal)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-cream-dark)")}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={isWishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Secondary: Instant WhatsApp Checkout */}
              <a
                id="whatsapp-buy-now"
                href={whatsappBuyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  backgroundColor: "#25D366",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  height: "48px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "background-color 0.2s, transform 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#20ba5a")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                </svg>
                Order via WhatsApp · Fast Checkout
              </a>
            </div>

            {/* Atelier Assurance Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.875rem",
                padding: "1.25rem 0",
                borderTop: "1px solid var(--color-cream-dark)",
                borderBottom: "1px solid var(--color-cream-dark)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.1rem" }}>🌿</span>
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-charcoal)", margin: 0 }}>
                    Pure Artisanal Fabrics
                  </h4>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--color-taupe)", margin: 0 }}>
                    Sustainably woven & certified textiles
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.1rem" }}>🚚</span>
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-charcoal)", margin: 0 }}>
                    Free Pan-India Delivery
                  </h4>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--color-taupe)", margin: 0 }}>
                    Dispatched in 24h · 3-5 days delivery
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.1rem" }}>🔄</span>
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-charcoal)", margin: 0 }}>
                    7-Day Easy Exchange
                  </h4>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--color-taupe)", margin: 0 }}>
                    Hassle-free size swaps & credits
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.1rem" }}>📍</span>
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-charcoal)", margin: 0 }}>
                    Kochi Atelier Handcrafted
                  </h4>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--color-taupe)", margin: 0 }}>
                    Panampilly Nagar bespoke tailoring
                  </p>
                </div>
              </div>
            </div>

            {/* Accordion Specs */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Accordion 1: Description & Highlights */}
              <div style={{ borderBottom: "1px solid var(--color-cream-dark)" }}>
                <button
                  type="button"
                  onClick={() => setActiveAccordion((curr) => (curr === "details" ? null : "details"))}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-charcoal)",
                  }}
                >
                  Description & Highlights
                  <span style={{ fontSize: "1rem" }}>
                    {activeAccordion === "details" ? "−" : "+"}
                  </span>
                </button>
                {activeAccordion === "details" && (
                  <div style={{ paddingBottom: "1.25rem" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        color: "var(--color-charcoal-soft)",
                        lineHeight: 1.7,
                        marginBottom: "1rem",
                      }}
                    >
                      {product.description}
                    </p>
                    <ul
                      style={{
                        paddingLeft: "1.25rem",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        color: "var(--color-taupe)",
                        lineHeight: 1.8,
                      }}
                    >
                      {product.highlights.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fabric & Care */}
              <div style={{ borderBottom: "1px solid var(--color-cream-dark)" }}>
                <button
                  type="button"
                  onClick={() => setActiveAccordion((curr) => (curr === "care" ? null : "care"))}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-charcoal)",
                  }}
                >
                  Fabric Composition & Care
                  <span style={{ fontSize: "1rem" }}>
                    {activeAccordion === "care" ? "−" : "+"}
                  </span>
                </button>
                {activeAccordion === "care" && (
                  <div
                    style={{
                      paddingBottom: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      color: "var(--color-charcoal-soft)",
                    }}
                  >
                    <p><strong>Composition:</strong> {product.details.fabric}</p>
                    <p><strong>Fit Guide:</strong> {product.details.fit}</p>
                    <p><strong>Wash Care:</strong> {product.details.care}</p>
                    <p><strong>Origin:</strong> {product.details.origin}</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Pan-India Shipping & Returns */}
              <div style={{ borderBottom: "1px solid var(--color-cream-dark)" }}>
                <button
                  type="button"
                  onClick={() => setActiveAccordion((curr) => (curr === "shipping" ? null : "shipping"))}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-charcoal)",
                  }}
                >
                  Pan-India Shipping & Returns
                  <span style={{ fontSize: "1rem" }}>
                    {activeAccordion === "shipping" ? "−" : "+"}
                  </span>
                </button>
                {activeAccordion === "shipping" && (
                  <div
                    style={{
                      paddingBottom: "1.25rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      color: "var(--color-charcoal-soft)",
                      lineHeight: 1.7,
                    }}
                  >
                    <p style={{ marginBottom: "0.5rem" }}>
                      • <strong>Dispatch:</strong> Orders placed before 2:00 PM are dispatched the next business day from our Panampilly Nagar studio.
                    </p>
                    <p style={{ marginBottom: "0.5rem" }}>
                      • <strong>Transit Time:</strong> South India: 2-3 business days. Rest of India: 3-5 business days via Blue Dart / Delhivery express.
                    </p>
                    <p>
                      • <strong>Exchanges:</strong> We offer a 7-day complimentary door-pickup exchange window for size adjustments.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Editorial Brand Quote Accent ─────────────────────────── */}
      <section
        style={{
          backgroundColor: "var(--color-cream)",
          padding: "4.5rem 1.5rem",
          textAlign: "center",
          borderTop: "1px solid var(--color-cream-dark)",
          borderBottom: "1px solid var(--color-cream-dark)",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>
            The Aavya Philosophy
          </p>
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.3,
              color: "var(--color-charcoal)",
              marginBottom: "1.25rem",
            }}
          >
            &ldquo;Every silhouette is tailored with the understanding that true elegance resides in ease, movement, and honest craftsmanship.&rdquo;
          </blockquote>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-taupe)",
            }}
          >
            Aavya Boutique Atelier · Kochi, Kerala
          </p>
        </div>
      </section>

      {/* ─── Customer Reviews Section ─────────────────────────────── */}
      <section
        id="customer-reviews"
        className="container-brand"
        style={{
          paddingTop: "4.5rem",
          paddingBottom: "4.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <p className="section-eyebrow" style={{ marginBottom: "0.4rem" }}>
              Client Testimonials
            </p>
            <h2 className="section-title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
              Words from our Patrons
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "3rem",
                lineHeight: 1,
                fontWeight: 500,
                color: "var(--color-charcoal)",
              }}
            >
              {product.reviews.rating}
            </span>
            <div>
              <div style={{ display: "flex", color: "#B8860B", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  color: "var(--color-taupe)",
                  margin: 0,
                }}
              >
                Based on {product.reviews.count} verified purchases
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
          className="md:grid-cols-3"
        >
          {product.reviews.items.map((rev) => {
            const starsCount = Math.min(5, Math.max(1, Math.round(rev.rating)));
            return (
              <article
                key={rev.id}
                style={{
                  backgroundColor: "var(--color-cream)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  border: "1px solid var(--color-cream-dark)",
                }}
              >
                {/* Stars + Verified */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", color: "#B8860B", gap: "2px" }}>
                    {[...Array(starsCount)].map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#2E7D32",
                      fontWeight: 600,
                    }}
                  >
                    ✓ Verified Client
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "var(--color-charcoal)",
                    margin: 0,
                  }}
                >
                  {rev.title}
                </h3>

                {/* Comment */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    color: "var(--color-charcoal-soft)",
                    lineHeight: 1.6,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Author Footer */}
                <div
                  style={{
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--color-cream-dark)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    color: "var(--color-taupe)",
                  }}
                >
                  <span style={{ fontWeight: 500, color: "var(--color-charcoal)" }}>{rev.author}</span>
                  <span>{rev.location} · {rev.date}</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Add review prompt */}
        <div
          style={{
            marginTop: "2.5rem",
            padding: "1.5rem",
            backgroundColor: "var(--color-ivory)",
            border: "1px dashed var(--color-taupe-light)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
          }}
        >
          {reviewSubmitted ? (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#2E7D32", fontWeight: 500 }}>
              Thank you for sharing your experience! Your review will be published after verification by our atelier.
            </p>
          ) : (
            <div style={{ width: "100%", maxWidth: "520px" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  color: "var(--color-charcoal)",
                  marginBottom: "0.5rem",
                }}
              >
                Have you worn this silhouette?
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  color: "var(--color-taupe)",
                  marginBottom: "1rem",
                }}
              >
                Share your styling experience with the Aavya community.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newReviewText && newReviewAuthor) {
                    setReviewSubmitted(true);
                  }
                }}
                style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                <input
                  type="text"
                  placeholder="Your Name & City (e.g. Maya, Kochi)"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    border: "1px solid var(--color-cream-dark)",
                    backgroundColor: "transparent",
                    color: "var(--color-charcoal)",
                  }}
                />
                <textarea
                  rows={3}
                  placeholder="How did the fit feel? How was the fabric quality?"
                  required
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    border: "1px solid var(--color-cream-dark)",
                    backgroundColor: "transparent",
                    color: "var(--color-charcoal)",
                    resize: "vertical",
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ alignSelf: "center", minWidth: "200px", justifyContent: "center" }}
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ─── Related Products ("You May Also Like") ───────────────── */}
      {relatedProducts.length > 0 && (
        <section
          style={{
            backgroundColor: "var(--color-ivory)",
            paddingTop: "3rem",
            paddingBottom: "5rem",
            borderTop: "1px solid var(--color-cream-dark)",
          }}
        >
          <div className="container-brand">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div>
                <p className="section-eyebrow" style={{ marginBottom: "0.4rem" }}>
                  Curated Pairings
                </p>
                <h2 className="section-title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                  You May Also Like
                </h2>
              </div>
              <Link href="/#shop" className="btn-editorial">
                View Collection →
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.25rem 0.875rem",
              }}
              className="md:grid-cols-4"
            >
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Fixed Mobile Action Bar (Buy Now & Add to Cart) ──────── */}
      <div
        className="pdp-mobile-fixed-bar"
        role="region"
        aria-label="Product actions"
      >
        <button
          id="pdp-mobile-add-to-cart"
          type="button"
          onClick={handleAddToCart}
          className="pdp-mobile-btn pdp-mobile-btn-cart"
          aria-label={`Add ${product.name} to Cart`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span>Add to Cart</span>
        </button>

        <a
          id="pdp-mobile-buy-now"
          href={whatsappBuyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            addToCart({
              id: `${product.id}-${selectedSize}-${selectedColor}`,
              name: product.name,
              price: product.price,
              image: galleryImages[activeImageIdx] || product.image,
              size: selectedSize,
              quantity: quantity,
              color: selectedColor,
            });
          }}
          className="pdp-mobile-btn pdp-mobile-btn-buy"
          aria-label={`Buy ${product.name} now`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span>Buy Now</span>
        </a>
      </div>

      {/* ─── Size Guide Modal ──────────────────────────────────────── */}
      {isSizeGuideOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsSizeGuideOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(23, 23, 23, 0.6)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Modal Container */}
          <div
            style={{
              position: "relative",
              backgroundColor: "var(--color-ivory)",
              maxWidth: "580px",
              width: "100%",
              padding: "2rem",
              zIndex: 1,
              boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
              border: "1px solid var(--color-cream-dark)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem",
              }}
            >
              <div>
                <p className="section-eyebrow" style={{ marginBottom: "0.25rem" }}>
                  Aavya Atelier Sizing
                </p>
                <h3
                  id="size-guide-title"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    color: "var(--color-charcoal)",
                    margin: 0,
                  }}
                >
                  Size & Body Measurements
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                aria-label="Close size guide"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "var(--color-charcoal)",
                  padding: "0.25rem",
                }}
              >
                ✕
              </button>
            </div>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                color: "var(--color-taupe)",
                marginBottom: "1.5rem",
                lineHeight: 1.5,
              }}
            >
              All measurements are tailored to Indian body proportions. For between-sizes, we recommend sizing up for a relaxed drape or sizing down for a fitted silhouette.
            </p>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1.5px solid var(--color-charcoal)" }}>
                    <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Size</th>
                    <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Bust</th>
                    <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Waist</th>
                    <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Hips</th>
                    <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Length</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE_DATA.map((row) => (
                    <tr
                      key={row.size}
                      style={{
                        borderBottom: "1px solid var(--color-cream-dark)",
                        backgroundColor:
                          selectedSize === row.size ? "var(--color-cream)" : "transparent",
                      }}
                    >
                      <td style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>{row.size}</td>
                      <td style={{ padding: "0.6rem 0.5rem" }}>{row.bust}</td>
                      <td style={{ padding: "0.6rem 0.5rem" }}>{row.waist}</td>
                      <td style={{ padding: "0.6rem 0.5rem" }}>{row.hips}</td>
                      <td style={{ padding: "0.6rem 0.5rem" }}>{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note */}
            <div
              style={{
                marginTop: "1.5rem",
                paddingTop: "1rem",
                borderTop: "1px solid var(--color-cream-dark)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "var(--color-taupe)",
                  margin: 0,
                }}
              >
                Need custom bespoke measurements? Message us on WhatsApp.
              </p>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="btn-outline"
                style={{ minHeight: 36, padding: "0.4rem 1rem", fontSize: "0.7rem" }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
