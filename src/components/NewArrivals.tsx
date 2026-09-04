"use client";

import ProductCard from "./ProductCard";

const NEW_ARRIVALS = [
  {
    id: "na-1",
    name: "Satin Draped Midi Dress",
    descriptor: "Flowing satin with wrap silhouette",
    price: 2490,
    image: "/images/product-1.jpg",
    colors: ["Dusty Rose", "Ivory", "Charcoal"],
    badge: "New",
  },
  {
    id: "na-2",
    name: "Linen Co-ord Set",
    descriptor: "Relaxed blazer & wide-leg trousers",
    price: 3290,
    image: "/images/product-2.jpg",
    colors: ["Sage Green", "Sand", "Cream"],
    badge: "New",
  },
  {
    id: "na-3",
    name: "Block Print Kurta",
    descriptor: "Handcrafted cotton with border motifs",
    price: 1890,
    image: "/images/product-3.jpg",
    colors: ["Terracotta", "Navy", "Blush"],
  },
  {
    id: "na-4",
    name: "Gold Embroidered Anarkali",
    descriptor: "Silk with zari border & dupatta",
    price: 4990,
    originalPrice: 6490,
    image: "/images/product-4.jpg",
    colors: ["Teal", "Burgundy", "Ivory"],
    badge: "Sale",
  },
  {
    id: "na-5",
    name: "Off-Shoulder Linen Top",
    descriptor: "Effortless summer essential",
    price: 1290,
    image: "/images/product-5.jpg",
    colors: ["Sand", "Cream", "Lavender"],
    badge: "New",
  },
  {
    id: "na-6",
    name: "Floral Wrap Maxi",
    descriptor: "Flowy print with tie-front waist",
    price: 2190,
    image: "/images/product-1.jpg",
    colors: ["Dusty Rose", "Teal"],
  },
  {
    id: "na-7",
    name: "Minimal Silk Kurta",
    descriptor: "Understated luxury in pure silk",
    price: 3490,
    image: "/images/product-2.jpg",
    colors: ["Ivory", "Charcoal", "Terracotta"],
    isBestseller: true,
  },
  {
    id: "na-8",
    name: "Print Palazzos",
    descriptor: "Relaxed co-ord with bold print",
    price: 1690,
    image: "/images/product-3.jpg",
    colors: ["Navy", "Sage Green"],
  },
];

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
