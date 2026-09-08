import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Add New Product | Aavya Boutique Admin",
};

export default async function AdminNewProductPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div style={{ padding: "1.75rem 1.5rem", maxWidth: "900px", margin: "0 auto" }}>
      {/* Header & Back Link */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/admin/products"
          style={{
            fontSize: "0.82rem",
            color: "#6b7280",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            marginBottom: "0.75rem",
          }}
        >
          <span>← Back to Products</span>
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.1rem",
            fontWeight: 500,
            color: "var(--color-charcoal)",
            margin: 0,
          }}
        >
          Add New Product
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.25rem" }}>
          Create a new luxury fashion item for the Aavya Boutique storefront
        </p>
      </div>

      {/* Form Container */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          padding: "2rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
        }}
      >
        <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* General Information */}
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "1rem" }}>
              General Information
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Luminous Satin Wrap Midi"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  Category *
                </label>
                <select
                  defaultValue="Dresses"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <option value="Dresses">Dresses</option>
                  <option value="Co-ords">Co-ords</option>
                  <option value="Kurtis">Kurtis</option>
                  <option value="Ethnic">Ethnic Wear</option>
                  <option value="Tops">Tops</option>
                  <option value="Party Wear">Party Wear</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "1rem" }}>
              Pricing & Inventory
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  Price (₹) *
                </label>
                <input
                  type="number"
                  placeholder="2490"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="3290"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  Stock Count *
                </label>
                <input
                  type="number"
                  defaultValue="12"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  SKU
                </label>
                <input
                  type="text"
                  placeholder="AAV-DRS-001"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "1rem" }}>
              Details & Fabric
            </h2>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Exquisite craftsmanship with fluid silhouette, tailored for festive celebrations and evening galas..."
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  fontSize: "0.88rem",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
            <Link
              href="/admin/products"
              style={{
                padding: "0.65rem 1.25rem",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "0.88rem",
                fontWeight: 500,
                color: "#4b5563",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Cancel
            </Link>
            <button
              type="button"
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "6px",
                border: "1px solid var(--color-charcoal)",
                backgroundColor: "var(--color-charcoal)",
                color: "#ffffff",
                fontSize: "0.88rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
