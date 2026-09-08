import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PRODUCTS } from "@/data/products";

export const metadata = {
  title: "Products Management | Aavya Boutique Admin",
};

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const totalProducts = PRODUCTS.length;
  const inStockCount = PRODUCTS.filter((p) => p.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;

  return (
    <div style={{ padding: "1.75rem 1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 500,
              color: "var(--color-charcoal)",
              margin: 0,
            }}
          >
            Product Catalog
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.25rem" }}>
            Manage boutique items, inventory availability, and storefront catalog
          </p>
        </div>

        <Link
          href="/admin/products/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.65rem 1.25rem",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: 600,
            backgroundColor: "var(--color-charcoal)",
            color: "#ffffff",
            textDecoration: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "background-color 0.2s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Summary Stat Pills */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1.75rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "0.75rem 1.25rem",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            fontSize: "0.85rem",
            color: "var(--color-charcoal)",
          }}
        >
          Total Products: <strong>{totalProducts}</strong>
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "0.75rem 1.25rem",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            fontSize: "0.85rem",
            color: "#065f46",
          }}
        >
          In Stock: <strong>{inStockCount}</strong>
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "0.75rem 1.25rem",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            fontSize: "0.85rem",
            color: outOfStockCount > 0 ? "#991b1b" : "#6b7280",
          }}
        >
          Out of Stock: <strong>{outOfStockCount}</strong>
        </div>
      </div>

      {/* Product Table */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>
                <th style={{ padding: "0.85rem 1.5rem", fontWeight: 600, fontSize: "0.78rem", textTransform: "uppercase" }}>
                  Product
                </th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600, fontSize: "0.78rem", textTransform: "uppercase" }}>
                  Category
                </th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600, fontSize: "0.78rem", textTransform: "uppercase" }}>
                  Price
                </th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 600, fontSize: "0.78rem", textTransform: "uppercase" }}>
                  Stock Status
                </th>
                <th style={{ padding: "0.85rem 1.5rem", fontWeight: 600, fontSize: "0.78rem", textTransform: "uppercase", textAlign: "right" }}>
                  Store Link
                </th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((product) => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom: "1px solid #f3f4f6",
                    transition: "background-color 0.15s",
                  }}
                >
                  <td style={{ padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
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
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="48px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--color-charcoal)" }}>{product.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>SKU: {product.sku}</div>
                    </div>
                  </td>
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
                  <td style={{ padding: "1rem 1rem" }}>
                    {product.inStock ? (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontSize: "0.78rem",
                          fontWeight: 500,
                          color: "#065f46",
                          backgroundColor: "#d1fae5",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "4px",
                        }}
                      >
                        <span>●</span> In Stock ({product.stockCount})
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontSize: "0.78rem",
                          fontWeight: 500,
                          color: "#991b1b",
                          backgroundColor: "#fee2e2",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "4px",
                        }}
                      >
                        <span>●</span> Out of Stock
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                    <Link
                      href={`/product/${product.slug}`}
                      target="_blank"
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--color-gold-dark)",
                        fontWeight: 500,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <span>Preview</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
