"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { ProductItem } from "@/data/products";

interface NewArrivalsProps {
  products?: ProductItem[];
}

export default function NewArrivals({ products = [] }: NewArrivalsProps) {
  const displayProducts = products.length > 0 ? products : [];

  return (
    <section
      id="new-arrivals"
      aria-labelledby="new-arrivals-heading"
      style={{
        backgroundColor: "var(--color-ivory)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="container-brand">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p className="section-eyebrow" style={{ marginBottom: "0.5rem" }}>
              Just Dropped
            </p>
            <h2 id="new-arrivals-heading" className="section-title">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop"
            id="view-all-new-arrivals"
            className="btn-editorial"
            aria-label="View all new arrivals"
          >
            View All →
          </Link>
        </div>

        {/* Sub-heading */}
        <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
          Fresh silhouettes, effortless layers and statement pieces made for your wardrobe.
        </p>

        {/* Product Grid */}
        {displayProducts.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem 0.875rem",
              }}
              className="md:grid-cols-3 lg:grid-cols-4"
            >
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View More CTA */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
              <Link href="/shop" id="load-more-new" className="btn-outline">
                Explore Full Shop →
              </Link>
            </div>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1.5rem",
              backgroundColor: "var(--color-cream)",
              borderRadius: "4px",
              border: "1px dashed rgba(195,185,175,0.6)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                color: "var(--color-charcoal)",
                marginBottom: "0.5rem",
              }}
            >
              Curating New Silhouettes
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "var(--color-taupe)",
                maxWidth: "400px",
                margin: "0 auto 1.5rem",
              }}
            >
              Our artisans are currently preparing handcrafted pieces in the atelier. Explore our complete catalogue in the boutique shop.
            </p>
            <Link href="/shop" className="btn-primary">
              Visit Shop
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
