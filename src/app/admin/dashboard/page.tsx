import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PRODUCTS } from "@/data/products";

export const metadata = {
  title: "Admin Dashboard | Aavya Boutique",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Strict server-side route protection
  if (!user) {
    redirect("/admin/login");
  }

  // Calculate quick metrics
  const totalProducts = PRODUCTS.length;
  const inStockCount = PRODUCTS.filter((p) => p.inStock).length;
  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)));
  const avgPrice = Math.round(
    PRODUCTS.reduce((acc, p) => acc + p.price, 0) / (totalProducts || 1)
  );

  return (
    <div style={{ padding: "1.75rem 1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Welcome Banner */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "1.5rem",
          marginBottom: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-gold-dark)",
              marginBottom: "0.4rem",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                display: "inline-block",
              }}
            />
            Boutique Live & Operational
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.1rem",
              fontWeight: 500,
              color: "var(--color-charcoal)",
              lineHeight: 1.15,
            }}
          >
            Executive Dashboard
          </h1>
          <p style={{ fontSize: "0.88rem", color: "#6b7280", marginTop: "0.25rem" }}>
            Welcome back, <strong>{user.email}</strong> • Administrative privileges active
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link
            href="/admin/products/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.65rem 1.15rem",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              backgroundColor: "var(--color-gold-dark)",
              color: "#ffffff",
              border: "1px solid var(--color-gold-dark)",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            <span>+ Add Product</span>
          </Link>
          <Link
            href="/admin/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.65rem 1.15rem",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 500,
              backgroundColor: "#ffffff",
              color: "var(--color-charcoal)",
              border: "1px solid #d1d5db",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            <span>View All Products</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2.5rem",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ fontSize: "0.78rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            Catalog Products
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 600, color: "var(--color-charcoal)", marginTop: "0.35rem" }}>
            {totalProducts}
          </div>
          <div style={{ fontSize: "0.8rem", color: "#10b981", marginTop: "0.35rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span>●</span> {inStockCount} active in stock
          </div>
        </div>

        {/* Card 2 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ fontSize: "0.78rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            Active Categories
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 600, color: "var(--color-charcoal)", marginTop: "0.35rem" }}>
            {categories.length}
          </div>
          <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "0.35rem" }}>
            {categories.slice(0, 3).join(", ")} +more
          </div>
        </div>

        {/* Card 3 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ fontSize: "0.78rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            Average Item Price
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 600, color: "var(--color-charcoal)", marginTop: "0.35rem" }}>
            ₹{avgPrice.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-gold-dark)", marginTop: "0.35rem" }}>
            Luxury Segment
          </div>
        </div>

        {/* Card 4 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ fontSize: "0.78rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            Order Channel
          </div>
          <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#10b981", marginTop: "0.55rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
            </svg>
            Direct WhatsApp
          </div>
          <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "0.35rem" }}>
            +91 85940 31993
          </div>
        </div>
      </div>

      {/* Catalog Table Section */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
        }}
      >
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
              Recent Boutique Catalog
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#6b7280", marginTop: "0.15rem" }}>
              Quick view of catalog items available on the storefront
            </p>
          </div>

          <Link
            href="/admin/products"
            style={{
              fontSize: "0.82rem",
              fontWeight: 500,
              color: "var(--color-gold-dark)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <span>View All ({totalProducts})</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Responsive Table */}
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.slice(0, 6).map((product) => (
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
                        width: "44px",
                        height: "56px",
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
                        sizes="44px"
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
                      <span>View</span>
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
