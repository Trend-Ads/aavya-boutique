"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ProductItem } from "@/data/products";

interface BestsellersProps {
  products?: ProductItem[];
}

export default function Bestsellers({ products = [] }: BestsellersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const bestsellersList = products.filter((p) => p.isBestseller || p.badge === "Bestseller");
  const displayItems = bestsellersList.length > 0 ? bestsellersList : products.slice(0, 6);

  if (displayItems.length === 0) return null;

  const scrollToIdx = (idx: number) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[idx] as HTMLElement;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveIdx(idx);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const cardWidth = (scrollRef.current.children[0] as HTMLElement)?.offsetWidth || clientWidth;
    setActiveIdx(Math.round(scrollLeft / cardWidth));
  };

  return (
    <section
      id="bestsellers"
      aria-labelledby="bestsellers-heading"
      style={{
        backgroundColor: "var(--color-ivory)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        borderTop: "1px solid var(--color-cream-dark)",
      }}
    >
      <div className="container-brand" style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p className="section-eyebrow" style={{ marginBottom: "0.5rem" }}>
              Loved by You
            </p>
            <h2 id="bestsellers-heading" className="section-title">
              Our Bestsellers
            </h2>
          </div>
          <Link href="/shop" id="view-all-bestsellers" className="btn-editorial">
            View All →
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="no-scrollbar"
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {displayItems.map((product) => (
          <div
            key={product.id}
            style={{
              flex: "0 0 auto",
              width: "calc(50% + 20px)",
              scrollSnapAlign: "start",
            }}
            className="md:w-1/3 lg:w-1/4"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "6px",
          marginTop: "1.5rem",
        }}
        role="tablist"
        aria-label="Bestsellers carousel navigation"
      >
        {displayItems.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            id={`bs-dot-${idx}`}
            aria-label={`Go to bestseller ${idx + 1}`}
            aria-selected={activeIdx === idx}
            onClick={() => scrollToIdx(idx)}
            style={{
              width: idx === activeIdx ? 28 : 8,
              height: 4,
              borderRadius: 2,
              backgroundColor:
                idx === activeIdx ? "var(--color-charcoal)" : "var(--color-cream-dark)",
              border: "none",
              cursor: "pointer",
              transition: "width 0.3s var(--ease-smooth), background-color 0.3s",
              padding: 0,
              minHeight: 20,
            }}
          />
        ))}
      </div>
    </section>
  );
}
