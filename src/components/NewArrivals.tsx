"use client";

import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/data/products";

const NEW_ARRIVALS = PRODUCTS;

export default function NewArrivals() {
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
            <h2
              id="new-arrivals-heading"
              className="section-title"
            >
              New Arrivals
            </h2>
          </div>
          <a
            href="#shop"
            id="view-all-new-arrivals"
            className="btn-editorial"
            aria-label="View all new arrivals"
          >
            View All →
          </a>
        </div>

        {/* Sub-heading */}
        <p
          className="section-subtitle"
          style={{ marginBottom: "2rem" }}
        >
          Fresh silhouettes, effortless layers and statement pieces made for your wardrobe.
        </p>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem 0.875rem",
          }}
          className="md:grid-cols-3 lg:grid-cols-4"
        >
          {NEW_ARRIVALS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View More CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
          <a href="#shop" id="load-more-new" className="btn-outline">
            Load More
          </a>
        </div>
      </div>
    </section>
  );
}
