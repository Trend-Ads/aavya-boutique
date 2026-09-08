"use client";

import { useState } from "react";
import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { getColorHex, isLightColor } from "@/utils/colors";


interface Product {
  id: string;
  slug?: string;
  name: string;
  descriptor: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors: string[];
  badge?: string;
  isBestseller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openCart, isInWishlist, toggleWishlist } = useUI();
  const isWishlisted = typeof isInWishlist === "function" ? isInWishlist(product.id) : false;

  const productSlug =
    product.slug ||
    product.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const productUrl = `/product/${productSlug}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof addToCart === "function") {
      addToCart({
        id: `${product.id}-S-${product.colors[0] || "Standard"}`,
        slug: productSlug,
        name: product.name,
        price: product.price,
        image: product.image,
        size: "S",
        quantity: 1,
        color: product.colors[0] || "Standard",
      });
    }
    if (typeof openCart === "function") openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof toggleWishlist === "function") {
      toggleWishlist({
        id: product.id,
        slug: productSlug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.descriptor || "Boutique Collection",
        colors: product.colors,
        badge: product.badge,
      });
    }
  };

  return (
    <article
      aria-label={product.name}
      style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}
    >
      {/* Image Container */}
      <div className="product-image-wrap" style={{ position: "relative", overflow: "hidden" }}>
        <Link
          href={productUrl}
          aria-label={`View details of ${product.name}`}
          style={{ display: "block", width: "100%", height: "100%", textDecoration: "none" }}
        >
          <img
            src={product.image}
            alt={`${product.name} — Aavya Boutique`}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              transition: "transform 0.55s var(--ease-smooth)",
            }}
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span
            style={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.58rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              backgroundColor: "var(--color-charcoal)",
              color: "var(--color-ivory)",
              padding: "0.3rem 0.6rem",
              pointerEvents: "none",
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          id={`wishlist-${product.id}`}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
          onClick={handleWishlist}
          style={{
            position: "absolute",
            top: "0.625rem",
            right: "0.625rem",
            width: "36px",
            height: "36px",
            minWidth: 44,
            minHeight: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(248,245,240,0.88)",
            border: "none",
            cursor: "pointer",
            color: isWishlisted ? "var(--color-burgundy)" : "var(--color-charcoal)",
            transition: "color 0.25s, transform 0.2s",
            backdropFilter: "blur(4px)",
            zIndex: 2,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick Add — desktop hover, mobile always visible at bottom */}
        <button
          id={`quickadd-${product.id}`}
          aria-label={`Add ${product.name} to bag`}
          onClick={handleAddToCart}
          className="product-quick-add"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(23,23,23,0.88)",
            color: "var(--color-ivory)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            border: "none",
            padding: "0.8rem",
            cursor: "pointer",
            transform: "translateY(100%)",
            transition: "transform 0.28s var(--ease-smooth)",
            minHeight: "44px",
            zIndex: 2,
          }}
          onFocus={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          onBlur={(e) => (e.currentTarget.style.transform = "translateY(100%)")}
        >
          Add to Bag
        </button>
      </div>

      {/* Product Info */}
      <div style={{ padding: "0 0.125rem" }}>
        {/* Name */}
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.825rem",
            fontWeight: 400,
            color: "var(--color-charcoal)",
            marginBottom: "0.2rem",
            letterSpacing: "0.01em",
          }}
        >
          <Link
            href={productUrl}
            style={{
              color: "inherit",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            {product.name}
          </Link>
        </h3>

        {/* Descriptor */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            color: "var(--color-taupe)",
            marginBottom: "0.4rem",
          }}
        >
          {product.descriptor}
        </p>

        {/* Price + Colors Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-charcoal)",
              }}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "var(--color-taupe)",
                  textDecoration: "line-through",
                }}
              >
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors.length > 0 && (
            <div style={{ display: "flex", gap: "4px" }} aria-label={`Available in ${product.colors.length} colours`}>
              {product.colors.slice(0, 4).map((color, i) => {
                const hex = getColorHex(color);
                return (
                  <span
                    key={i}
                    title={color}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: hex,
                      border: isLightColor(hex) ? "1px solid rgba(0,0,0,0.25)" : "1px solid rgba(0,0,0,0.12)",
                      display: "block",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}


/* Add hover show/hide for desktop via CSS injection */
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @media (hover: hover) {
      .product-image-wrap:hover .product-quick-add {
        transform: translateY(0) !important;
      }
    }
    @media (hover: none) {
      .product-quick-add {
        transform: translateY(0) !important;
      }
    }
  `;
  document.head.appendChild(style);
}
