"use client";

import { useState } from "react";
import Link from "next/link";
import { useUI, WishlistItem } from "@/context/UIContext";

export default function WishlistView() {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
    addToCart,
    openCart,
  } = useUI();

  const [confirmClear, setConfirmClear] = useState(false);
  const [movingAll, setMovingAll] = useState(false);

  const handleMoveToBag = (item: WishlistItem) => {
    addToCart({
      id: `${item.id}-S-${item.colors?.[0] || "Standard"}`,
      slug: item.slug,
      name: item.name,
      price: item.price,
      image: item.image,
      size: "S",
      quantity: 1,
      color: item.colors?.[0] || "Standard",
    });
    removeFromWishlist(item.id);
    openCart();
  };

  const handleAddAllToBag = () => {
    setMovingAll(true);
    wishlistItems.forEach((item) => {
      addToCart({
        id: `${item.id}-S-${item.colors?.[0] || "Standard"}`,
        slug: item.slug,
        name: item.name,
        price: item.price,
        image: item.image,
        size: "S",
        quantity: 1,
        color: item.colors?.[0] || "Standard",
      });
    });
    clearWishlist();
    setMovingAll(false);
    openCart();
  };

  return (
    <div style={{ backgroundColor: "var(--color-ivory)", minHeight: "80vh", paddingBottom: "5rem" }}>
      {/* Breadcrumb banner */}
      <div
        style={{
          borderBottom: "1px solid var(--color-cream-dark)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          className="container-custom"
          style={{
            padding: "0.875rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            color: "var(--color-taupe)",
          }}
        >
          <Link href="/" style={{ color: "var(--color-taupe)", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" style={{ color: "var(--color-taupe)", textDecoration: "none" }}>
            Shop
          </Link>
          <span>/</span>
          <span style={{ color: "var(--color-charcoal)", fontWeight: 500 }}>Wishlist</span>
        </div>
      </div>

      <div className="container-custom" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "1.5rem",
            paddingBottom: "1.75rem",
            borderBottom: "1px solid var(--color-cream-dark)",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#B8860B",
                marginBottom: "0.35rem",
              }}
            >
              Saved Collections
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 400,
                color: "var(--color-charcoal)",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              My Wishlist{" "}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.1rem",
                  color: "var(--color-taupe)",
                  fontWeight: 300,
                }}
              >
                ({wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"})
              </span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "var(--color-taupe)",
                marginTop: "0.35rem",
                marginBottom: 0,
              }}
            >
              Handcrafted couture and silhouettes you&apos;ve curated. Saved across your visits.
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={handleAddAllToBag}
                disabled={movingAll}
                className="btn-primary"
                style={{
                  padding: "0.65rem 1.25rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Move All to Bag
              </button>

              {confirmClear ? (
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => {
                      clearWishlist();
                      setConfirmClear(false);
                    }}
                    style={{
                      background: "#DC2626",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "0.65rem 1rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Confirm Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    style={{
                      background: "transparent",
                      color: "var(--color-charcoal)",
                      border: "1px solid var(--color-cream-dark)",
                      padding: "0.65rem 0.85rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.72rem",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--color-cream-dark)",
                    color: "var(--color-taupe)",
                    padding: "0.65rem 1rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#DC2626";
                    e.currentTarget.style.color = "#DC2626";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-cream-dark)";
                    e.currentTarget.style.color = "var(--color-taupe)";
                  }}
                >
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 1.5rem",
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                backgroundColor: "rgba(184, 134, 11, 0.08)",
                border: "1px solid rgba(184, 134, 11, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                color: "#B8860B",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.75rem",
                fontWeight: 400,
                color: "var(--color-charcoal)",
                marginBottom: "0.75rem",
              }}
            >
              Your Wishlist is Empty
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "var(--color-taupe)",
                lineHeight: 1.6,
                marginBottom: "2rem",
              }}
            >
              Explore our boutique collection of handcrafted silhouettes, bespoke festive wear, and artisanal ensembles to curate your personal style.
            </p>
            <Link
              href="/shop"
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 2rem",
                letterSpacing: "0.12em",
                textDecoration: "none",
              }}
            >
              <span>Explore Boutique Collections</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "2rem 1.5rem",
            }}
          >
            {wishlistItems.map((item) => {
              const productSlug =
                item.slug ||
                item.name
                  .toLowerCase()
                  .trim()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");

              const discountPercent = item.originalPrice
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : null;

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--color-cream-dark)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "box-shadow 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Image container */}
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "3/4",
                      backgroundColor: "var(--color-cream)",
                      overflow: "hidden",
                    }}
                  >
                    <Link href={`/product/${productSlug}`} style={{ display: "block", width: "100%", height: "100%" }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </Link>

                    {/* Badge */}
                    {item.badge && (
                      <span
                        style={{
                          position: "absolute",
                          top: "0.75rem",
                          left: "0.75rem",
                          backgroundColor: "var(--color-charcoal)",
                          color: "var(--color-ivory)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "0.25rem 0.5rem",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Remove cross button */}
                    <button
                      type="button"
                      aria-label="Remove from wishlist"
                      onClick={() => removeFromWishlist(item.id)}
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        right: "0.75rem",
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid var(--color-cream-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "var(--color-charcoal)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#DC2626";
                        e.currentTarget.style.color = "#FFFFFF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                        e.currentTarget.style.color = "var(--color-charcoal)";
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  {/* Info */}
                  <div
                    style={{
                      padding: "1rem 1.15rem",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      {item.category && (
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.65rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--color-taupe)",
                            display: "block",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {item.category}
                        </span>
                      )}

                      <Link
                        href={`/product/${productSlug}`}
                        style={{
                          textDecoration: "none",
                          color: "var(--color-charcoal)",
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.05rem",
                            fontWeight: 400,
                            margin: "0 0 0.5rem 0",
                            lineHeight: 1.25,
                          }}
                        >
                          {item.name}
                        </h3>
                      </Link>

                      {/* Pricing */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "var(--color-charcoal)",
                          }}
                        >
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        {item.originalPrice && (
                          <>
                            <span
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.8rem",
                                color: "var(--color-taupe)",
                                textDecoration: "line-through",
                              }}
                            >
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                            {discountPercent && (
                              <span
                                style={{
                                  fontFamily: "var(--font-sans)",
                                  fontSize: "0.7rem",
                                  fontWeight: 600,
                                  color: "var(--color-burgundy)",
                                }}
                              >
                                {discountPercent}% OFF
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid var(--color-cream)" }}>
                      <button
                        type="button"
                        onClick={() => handleMoveToBag(item)}
                        className="btn-primary"
                        style={{
                          flex: 1,
                          padding: "0.6rem 0.5rem",
                          fontSize: "0.72rem",
                          justifyContent: "center",
                          letterSpacing: "0.08em",
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                        </svg>
                        Move to Bag
                      </button>

                      <Link
                        href={`/product/${productSlug}`}
                        className="btn-outline"
                        style={{
                          padding: "0.6rem 0.85rem",
                          fontSize: "0.72rem",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
