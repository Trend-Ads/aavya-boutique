"use client";

import { useState, useEffect, useMemo } from "react";
import { useUI } from "@/context/UIContext";

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity, clearCart } = useUI();

  const [siteOrigin, setSiteOrigin] = useState("https://aavyaboutique.in");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSiteOrigin(window.location.origin);
    }
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const buildWhatsAppMessage = (origin: string) => {
    let message = `Hello Aavya Boutique! 🌸\nI would like to place an order for the following boutique items:\n\n*🛍️ ORDER DETAILS:*\n`;

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      const productSlug =
        item.slug ||
        item.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      const productUrl = `${origin}/product/${productSlug}`;
      const imageUrl = item.image.startsWith("http")
        ? item.image
        : `${origin}${item.image.startsWith("/") ? "" : "/"}${item.image}`;

      message += `------------------------------\n`;
      message += `${index + 1}. *${item.name}*\n`;
      message += `   • Size: ${item.size}\n`;
      if (item.color) {
        message += `   • Color: ${item.color}\n`;
      }
      message += `   • Quantity: ${item.quantity}\n`;
      message += `   • Price: ₹${itemTotal.toLocaleString("en-IN")}\n`;
      message += `   • Product Link: ${productUrl}\n`;
      message += `   • Image: ${imageUrl}\n\n`;
    });

    message += `------------------------------\n`;
    message += `*Total Order Value:* ₹${subtotal.toLocaleString("en-IN")}\n`;
    message += `*Shipping:* Free Shipping across India 📦\n\n`;
    message += `Please confirm my order and share the payment details. Thank you!`;

    return `https://wa.me/919778524133?text=${encodeURIComponent(message)}`;
  };

  const whatsappCheckoutUrl = useMemo(() => {
    if (cartItems.length === 0) return "https://wa.me/919778524133";
    return buildWhatsAppMessage(siteOrigin);
  }, [cartItems, subtotal, siteOrigin]);

  const getDynamicWhatsAppCheckoutUrl = () => {
    if (cartItems.length === 0) return "https://wa.me/919778524133";
    const origin = typeof window !== "undefined" ? window.location.origin : siteOrigin;
    return buildWhatsAppMessage(origin);
  };




  // Close on escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isCartOpen, closeCart]);

  // Lock body scroll
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="overlay-backdrop"
          onClick={closeCart}
          aria-hidden="true"
          style={{ zIndex: 55 }}
        />
      )}

      {/* Drawer */}
      <aside
        id="cart-drawer"
        aria-label="Shopping bag"
        aria-hidden={!isCartOpen}
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          backgroundColor: "var(--color-ivory)",
          borderRadius: "16px 16px 0 0",
          transform: isCartOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          maxHeight: "90dvh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -8px 40px rgba(23,23,23,0.15)",
        }}
        className="md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-96 md:rounded-none md:max-h-full"
      >
        {/* Handle bar */}
        <div
          aria-hidden="true"
          className="md:hidden"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "0.75rem",
            paddingBottom: "0.25rem",
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: "var(--color-cream-dark)",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--color-cream-dark)",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "var(--color-charcoal)",
              }}
            >
              Shopping Bag
            </h2>
            {cartItems.length > 0 && (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "var(--color-taupe)",
                  marginTop: "2px",
                }}
              >
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </p>
            )}
          </div>
          <button
            id="close-cart-btn"
            aria-label="Close shopping bag"
            onClick={closeCart}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              color: "var(--color-charcoal)",
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {cartItems.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--color-taupe)",
                  marginBottom: "1.25rem",
                }}
              >
                Your bag is empty.
              </p>
              <a href="#shop" onClick={closeCart} id="cart-start-shopping" className="btn-outline">
                Start Shopping
              </a>
            </div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {cartItems.map((item) => (
                <li
                  key={`${item.id}-${item.size}`}
                  style={{
                    display: "flex",
                    gap: "0.875rem",
                    paddingBottom: "1.25rem",
                    borderBottom: "1px solid var(--color-cream)",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: 72,
                      height: 90,
                      flexShrink: 0,
                      overflow: "hidden",
                      backgroundColor: "var(--color-cream)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.825rem",
                        fontWeight: 400,
                        color: "var(--color-charcoal)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.72rem",
                        color: "var(--color-taupe)",
                        marginBottom: "0.6rem",
                      }}
                    >
                      Size: {item.size}
                      {item.color && ` · ${item.color}`}
                    </p>

                    {/* Quantity + Remove */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid var(--color-cream-dark)",
                        }}
                      >
                        <button
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.375rem 0.625rem",
                            color: "var(--color-charcoal)",
                            fontSize: "0.875rem",
                            minWidth: 36,
                            minHeight: 36,
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.8rem",
                            padding: "0 0.5rem",
                            color: "var(--color-charcoal)",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.375rem 0.625rem",
                            color: "var(--color-charcoal)",
                            fontSize: "0.875rem",
                            minWidth: 36,
                            minHeight: 36,
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "var(--color-charcoal)",
                          }}
                        >
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <button
                          aria-label={`Remove ${item.name} from bag`}
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--color-taupe)",
                            padding: "4px",
                            transition: "color 0.2s",
                            minWidth: 32,
                            minHeight: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderTop: "1px solid var(--color-cream-dark)",
              paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom, 0))",
            }}
          >
            {/* Subtotal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-taupe)" }}>
                Subtotal
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-charcoal)" }}>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--color-taupe)", marginBottom: "1rem" }}>
              Free shipping on all orders · Easy returns
            </p>

            <a
              href={whatsappCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="cart-checkout-cta"
              suppressHydrationWarning
              onClick={(e) => {
                e.currentTarget.href = getDynamicWhatsAppCheckoutUrl();
              }}
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "100%",
                marginBottom: "0.625rem",
                textDecoration: "none",
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Checkout via WhatsApp →</span>
            </a>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
              <button
                id="cart-continue-shopping"
                onClick={closeCart}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  color: "var(--color-taupe)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.5rem 0",
                  transition: "color 0.2s",
                }}
              >
                ← Continue Shopping
              </button>

              <button
                id="cart-clear-bag"
                onClick={() => {
                  if (confirm("Are you sure you want to empty your shopping bag?")) {
                    clearCart();
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  color: "#9ca3af",
                  padding: "0.5rem 0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Empty Bag
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
