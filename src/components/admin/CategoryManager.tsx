"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Category, DEFAULT_CATEGORIES } from "@/data/categories";
import { createClient } from "@/lib/supabase/client";
import ImageCropperModal from "./ImageCropperModal";
import AdminDropdown from "./AdminDropdown";
import ConfirmationModal from "./ConfirmationModal";
import { useToast } from "@/context/ToastContext";

interface CategoryManagerProps {
  initialCategories: Category[];
}

export default function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const toast = useToast();
  const [categories, setCategories] = useState<Category[]>(
    initialCategories.length > 0 ? initialCategories : DEFAULT_CATEGORIES
  );
  const [loading, setLoading] = useState(false);
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    type: "delete" | "toggleActive";
    category: Category;
  } | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Cropper states
  const [cropperImageSrc, setCropperImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image_url: "",
    display_order: 1,
    is_active: true,
  });

  // Real-time slug validation
  const [slugStatus, setSlugStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");
  const [slugFeedback, setSlugFeedback] = useState<string | null>(null);
  const [slugSuggestions, setSlugSuggestions] = useState<string[]>([]);

  // Helper to format manual typing in slug input (allows and preserves hyphens as user types)
  const formatManualSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-") // convert spaces & special characters to hyphen
      .replace(/-+/g, "-"); // prevent multiple consecutive hyphens
  };

  // Helper to slugify category name (clean full slug)
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Algorithm to generate intelligent, unique slug suggestions for taken slugs
  const generateSlugSuggestions = (
    baseSlug: string,
    existingSlugs: Set<string>
  ): string[] => {
    const cleanBase = baseSlug.replace(/^-+|-+$/g, "");
    if (!cleanBase) return [];

    const suggestions: string[] = [];
    const currentYear = new Date().getFullYear();

    // High-value boutique & fashion semantic variants
    const candidateVariants = [
      `${cleanBase}-collection`,
      `${cleanBase}-edit`,
      `shop-${cleanBase}`,
      `${cleanBase}-boutique`,
      `${cleanBase}-curation`,
      `${cleanBase}-exclusive`,
      `${cleanBase}-${currentYear}`,
    ];

    for (const variant of candidateVariants) {
      if (!existingSlugs.has(variant) && !suggestions.includes(variant)) {
        suggestions.push(variant);
      }
      if (suggestions.length >= 4) break;
    }

    // Numbered increment fallback if needed (e.g. dresses-2, dresses-3)
    let counter = 2;
    while (suggestions.length < 4 && counter <= 20) {
      const candidate = `${cleanBase}-${counter}`;
      if (!existingSlugs.has(candidate) && !suggestions.includes(candidate)) {
        suggestions.push(candidate);
      }
      counter++;
    }

    return suggestions;
  };

  // Real-time debounced slug uniqueness checker
  useEffect(() => {
    if (!isAddModalOpen && !editingCategory) {
      setSlugStatus("idle");
      setSlugFeedback(null);
      setSlugSuggestions([]);
      return;
    }

    const rawSlug = formData.slug.trim().toLowerCase();
    const cleanSlug = rawSlug.replace(/^-+|-+$/g, "");

    if (!cleanSlug) {
      setSlugStatus("invalid");
      setSlugFeedback("Slug cannot be empty.");
      setSlugSuggestions([]);
      return;
    }

    // If user is currently typing a trailing hyphen (e.g. "party-"), allow smooth typing
    if (rawSlug.endsWith("-")) {
      setSlugStatus("checking");
      setSlugFeedback("Typing hyphen...");
      return;
    }

    // If editing and slug is unchanged from original
    if (editingCategory && cleanSlug === editingCategory.slug.toLowerCase()) {
      setSlugStatus("available");
      setSlugFeedback("Current slug (unchanged).");
      setSlugSuggestions([]);
      return;
    }

    // Build set of currently known taken slugs
    const takenSlugsSet = new Set(
      categories
        .filter((c) => !editingCategory || c.id !== editingCategory.id)
        .map((c) => c.slug.toLowerCase())
    );

    // Instant local memory check against existing categories
    const localConflict = categories.find(
      (c) =>
        c.slug.toLowerCase() === cleanSlug &&
        (!editingCategory || c.id !== editingCategory.id)
    );

    if (localConflict) {
      setSlugStatus("taken");
      setSlugFeedback(`Already in use by category "${localConflict.name}".`);
      const suggestions = generateSlugSuggestions(cleanSlug, takenSlugsSet);
      setSlugSuggestions(suggestions);
      return;
    }

    // Debounced database check with Supabase
    setSlugStatus("checking");
    setSlugFeedback("Checking availability...");

    const timer = setTimeout(async () => {
      try {
        const supabase = createClient();
        let query = supabase
          .from("categories")
          .select("id, name, slug")
          .eq("slug", cleanSlug);

        if (editingCategory?.id) {
          query = query.neq("id", editingCategory.id);
        }

        const { data, error } = await query;

        if (!error && data && data.length > 0) {
          setSlugStatus("taken");
          setSlugFeedback(
            `Already in use by category "${data[0].name || data[0].slug}".`
          );
          data.forEach((d: { slug: string }) =>
            takenSlugsSet.add(d.slug.toLowerCase())
          );
          const suggestions = generateSlugSuggestions(cleanSlug, takenSlugsSet);
          setSlugSuggestions(suggestions);
        } else {
          setSlugStatus("available");
          setSlugFeedback("Slug is available!");
          setSlugSuggestions([]);
        }
      } catch {
        setSlugStatus("available");
        setSlugFeedback("Slug is available!");
        setSlugSuggestions([]);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [formData.slug, isAddModalOpen, editingCategory, categories]);

  // Fetch from Supabase
  const loadCategories = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        setDbConnected(false);
      } else if (data && data.length > 0) {
        setCategories(data);
        setDbConnected(true);
      } else {
        setDbConnected(true);
      }
    } catch {
      setDbConnected(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Handle file select for cropping
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setCropperImageSrc(reader.result?.toString() || null);
      });
      reader.readAsDataURL(file);
    }
    // reset input so same file can be picked again if desired
    e.target.value = "";
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    const nextOrder =
      categories.length > 0
        ? Math.max(...categories.map((c) => c.display_order)) + 1
        : 1;
    setFormData({
      name: "",
      slug: "",
      description: "",
      image_url: "",
      display_order: nextOrder,
      is_active: true,
    });
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      image_url: cat.image_url || "",
      display_order: cat.display_order,
      is_active: cat.is_active,
    });
  };

  // Submit Add or Edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (slugStatus === "taken" || slugStatus === "invalid") {
      const errorMsg = slugFeedback || "Please resolve the duplicate slug before saving.";
      setMessage({
        text: errorMsg,
        type: "error",
      });
      toast.error(errorMsg, "Duplicate Slug");
      return;
    }

    setLoading(true);
    setMessage(null);

    const targetSlug =
      formData.slug.trim().toLowerCase().replace(/^-+|-+$/g, "") ||
      slugify(formData.name);

    try {
      const supabase = createClient();

      if (editingCategory) {
        // UPDATE existing category
        const { error } = await supabase
          .from("categories")
          .update({
            name: formData.name.trim(),
            slug: targetSlug,
            description: formData.description.trim() || null,
            image_url: formData.image_url.trim() || null,
            display_order: Number(formData.display_order),
            is_active: formData.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingCategory.id);

        if (error) {
          // Optimistic local update with notice
          setCategories((prev) =>
            prev.map((c) =>
              c.id === editingCategory.id
                ? {
                    ...c,
                    name: formData.name.trim(),
                    slug: targetSlug,
                    description: formData.description.trim() || null,
                    image_url: formData.image_url.trim() || null,
                    display_order: Number(formData.display_order),
                    is_active: formData.is_active,
                  }
                : c
            )
          );
          setMessage({
            text: "Updated locally. Note: Run supabase/schema.sql in Supabase SQL editor to sync with your database.",
            type: "info",
          });
          toast.info(`Category "${formData.name}" updated locally.`, "Category Updated");
        } else {
          setMessage({
            text: `Category "${formData.name}" updated successfully!`,
            type: "success",
          });
          toast.success(`Category "${formData.name}" updated successfully!`, "Category Updated");
          await loadCategories();
        }
        setEditingCategory(null);
      } else {
        // INSERT new category
        const newCatData = {
          name: formData.name.trim(),
          slug: targetSlug,
          description: formData.description.trim() || null,
          image_url: formData.image_url.trim() || null,
          display_order: Number(formData.display_order),
          is_active: formData.is_active,
        };

        const { data, error } = await supabase
          .from("categories")
          .insert([newCatData])
          .select();

        if (error) {
          // Optimistic local add
          const optimisticCat: Category = {
            id: `temp-${Date.now()}`,
            ...newCatData,
          };
          setCategories((prev) => [...prev, optimisticCat]);
          setMessage({
            text: `Category "${formData.name}" added locally. Run supabase/schema.sql in Supabase to sync persistently.`,
            type: "info",
          });
          toast.info(`Category "${formData.name}" added locally.`, "Category Created");
        } else if (data) {
          setMessage({
            text: `Category "${formData.name}" created successfully!`,
            type: "success",
          });
          toast.success(`Category "${formData.name}" created successfully!`, "Category Created");
          await loadCategories();
        }
        setIsAddModalOpen(false);
      }
    } catch {
      setMessage({
        text: "An error occurred while saving the category.",
        type: "error",
      });
      toast.error("An error occurred while saving the category.", "Save Failed");
    } finally {
      setLoading(false);
    }
  };

  // Request Toggle Active Confirmation
  const handleRequestToggleActive = (cat: Category) => {
    setConfirmModal({
      type: "toggleActive",
      category: cat,
    });
  };

  // Request Delete Confirmation
  const handleRequestDelete = (cat: Category) => {
    setConfirmModal({
      type: "delete",
      category: cat,
    });
  };

  // Execute Confirmed Action
  const handleExecuteConfirmedAction = async () => {
    if (!confirmModal) return;
    const { type, category: cat } = confirmModal;
    setModalLoading(true);

    try {
      if (type === "delete") {
        setCategories((prev) => prev.filter((c) => c.id !== cat.id));
        const supabase = createClient();
        const { error } = await supabase.from("categories").delete().eq("id", cat.id);
        if (!error) {
          setMessage({ text: `Category "${cat.name}" removed successfully.`, type: "info" });
          toast.success(`Category "${cat.name}" permanently deleted.`, "Category Deleted");
        } else {
          toast.info(`Category "${cat.name}" removed from session.`, "Category Removed");
        }
      } else if (type === "toggleActive") {
        const updatedStatus = !cat.is_active;
        setCategories((prev) =>
          prev.map((c) => (c.id === cat.id ? { ...c, is_active: updatedStatus } : c))
        );
        const supabase = createClient();
        await supabase
          .from("categories")
          .update({
            is_active: updatedStatus,
            updated_at: new Date().toISOString(),
          })
          .eq("id", cat.id);

        const statusMsg = `Category "${cat.name}" is now ${updatedStatus ? "Active on Storefront" : "Hidden (Inactive)"}.`;
        setMessage({
          text: statusMsg,
          type: "success",
        });
        toast.success(statusMsg, "Status Updated");
      }
    } catch (err) {
      console.warn("Error executing category action:", err);
      toast.error("An unexpected error occurred while executing action.", "Action Failed");
    } finally {
      setModalLoading(false);
      setConfirmModal(null);
    }
  };

  return (
    <div>
      {/* Hidden File Picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Image Cropper Modal */}
      {cropperImageSrc && (
        <ImageCropperModal
          imageSrc={cropperImageSrc}
          onClose={() => setCropperImageSrc(null)}
          onUploadSuccess={(url) => {
            setFormData((prev) => ({ ...prev, image_url: url }));
            setMessage({
              text: "Image cropped and uploaded to Cloudinary successfully!",
              type: "success",
            });
            toast.success("Category image cropped and uploaded successfully!", "Image Uploaded");
          }}
        />
      )}

      {/* Notifications */}
      {message && (
        <div
          style={{
            padding: "0.85rem 1.25rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            fontSize: "0.88rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor:
              message.type === "success"
                ? "rgba(16, 185, 129, 0.1)"
                : message.type === "error"
                ? "rgba(239, 68, 68, 0.1)"
                : "rgba(197, 160, 89, 0.15)",
            color:
              message.type === "success"
                ? "#065f46"
                : message.type === "error"
                ? "#991b1b"
                : "var(--color-gold-dark)",
            border: `1px solid ${
              message.type === "success"
                ? "rgba(16, 185, 129, 0.3)"
                : message.type === "error"
                ? "rgba(239, 68, 68, 0.3)"
                : "rgba(197, 160, 89, 0.4)"
            }`,
          }}
        >
          <span>{message.text}</span>
          <button
            onClick={() => setMessage(null)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              fontWeight: 600,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Supabase Schema Helper Banner */}
      {dbConnected === false && (
        <div
          style={{
            backgroundColor: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: "8px",
            padding: "1rem 1.25rem",
            marginBottom: "1.75rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d97706"
            strokeWidth="2"
            style={{ flexShrink: 0, marginTop: "2px" }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div style={{ fontSize: "0.85rem", color: "#92400e", lineHeight: 1.5 }}>
            <strong>Supabase Setup Note:</strong> The <code>categories</code> table
            is not yet detected in your database. Default storefront categories are
            currently loaded.
            <br />
            To enable database persistence, run <code>supabase/schema.sql</code> in
            your{" "}
            <a
              href="https://supabase.com/dashboard/project/spdzbnlwowrmuyypcapi/sql"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#b45309",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Supabase SQL Editor ↗
            </a>
            .
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
          Showing <strong>{categories.length}</strong> categories
        </div>

        <button
          onClick={handleOpenAdd}
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
            border: "1px solid var(--color-charcoal)",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--color-gold-dark)")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--color-charcoal)")
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Table */}
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
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "0.88rem",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  color: "#4b5563",
                }}
              >
                <th
                  style={{
                    padding: "0.85rem 1.25rem",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    width: "60px",
                  }}
                >
                  Order
                </th>
                <th
                  style={{
                    padding: "0.85rem 1rem",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    width: "80px",
                  }}
                >
                  Image
                </th>
                <th
                  style={{
                    padding: "0.85rem 1.25rem",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                  }}
                >
                  Category Name
                </th>
                <th
                  style={{
                    padding: "0.85rem 1rem",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                  }}
                >
                  Slug
                </th>
                <th
                  style={{
                    padding: "0.85rem 1rem",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    padding: "0.85rem 1rem",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "0.85rem 1.5rem",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    textAlign: "right",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr
                  key={cat.id || cat.slug || idx}
                  style={{
                    borderBottom: "1px solid #f3f4f6",
                    transition: "background-color 0.15s",
                  }}
                >
                  <td
                    style={{
                      padding: "1rem 1.25rem",
                      color: "#6b7280",
                      fontWeight: 600,
                    }}
                  >
                    #{cat.display_order}
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <div
                      style={{
                        position: "relative",
                        width: "48px",
                        height: "56px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {cat.image_url ? (
                        <Image
                          src={cat.image_url}
                          alt={cat.name}
                          fill
                          sizes="48px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#9ca3af",
                          }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "var(--color-charcoal)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {cat.name}
                    </div>
                  </td>
                  <td style={{ padding: "1rem 1rem" }}>
                    <code
                      style={{
                        backgroundColor: "#f3f4f6",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.78rem",
                        color: "#4b5563",
                      }}
                    >
                      {cat.slug}
                    </code>
                  </td>
                  <td
                    style={{
                      padding: "1rem 1rem",
                      color: "#6b7280",
                      fontSize: "0.82rem",
                      maxWidth: "240px",
                    }}
                  >
                    {cat.description || "—"}
                  </td>
                  <td style={{ padding: "1rem 1rem" }}>
                    <button
                      onClick={() => handleRequestToggleActive(cat)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      title="Click to toggle active status"
                    >
                      {cat.is_active ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            color: "#065f46",
                            backgroundColor: "#d1fae5",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "12px",
                          }}
                        >
                          <span>●</span> Active
                        </span>
                      ) : (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            color: "#6b7280",
                            backgroundColor: "#f3f4f6",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "12px",
                          }}
                        >
                          <span>○</span> Inactive
                        </span>
                      )}
                    </button>
                  </td>
                  <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <button
                        onClick={() => handleOpenEdit(cat)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--color-gold-dark)",
                          fontWeight: 500,
                          fontSize: "0.82rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleRequestDelete(cat)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#9ca3af",
                          fontSize: "0.82rem",
                          cursor: "pointer",
                          padding: "0.2rem",
                        }}
                        onMouseOver={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "#ef4444")
                        }
                        onMouseOut={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "#9ca3af")
                        }
                        title="Delete Category"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {(isAddModalOpen || editingCategory) && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(3px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            zIndex: 200,
          }}
          onClick={() => {
            setIsAddModalOpen(false);
            setEditingCategory(null);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "2rem",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              position: "relative",
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  fontWeight: 500,
                  margin: 0,
                  color: "var(--color-charcoal)",
                }}
              >
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingCategory(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  color: "#9ca3af",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {/* Category Image Upload & Crop Trigger */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "var(--color-charcoal)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Category Cover Image
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    backgroundColor: "#f9fafb",
                    padding: "0.85rem",
                    borderRadius: "10px",
                    border: "1px dashed #d1d5db",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "60px",
                      height: "75px",
                      borderRadius: "6px",
                      overflow: "hidden",
                      backgroundColor: "#e5e7eb",
                      flexShrink: 0,
                    }}
                  >
                    {formData.image_url ? (
                      <Image
                        src={formData.image_url}
                        alt="Category preview"
                        fill
                        sizes="60px"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#9ca3af",
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          padding: "0.45rem 0.85rem",
                          borderRadius: "6px",
                          border: "1px solid var(--color-charcoal)",
                          backgroundColor: "#ffffff",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          cursor: "pointer",
                          color: "var(--color-charcoal)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span>{formData.image_url ? "Crop New Photo" : "Upload & Crop"}</span>
                      </button>

                      {formData.image_url && (
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, image_url: "" }))}
                          style={{
                            padding: "0.45rem 0.75rem",
                            borderRadius: "6px",
                            border: "1px solid #e5e7eb",
                            backgroundColor: "transparent",
                            fontSize: "0.78rem",
                            color: "#ef4444",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p style={{ fontSize: "0.72rem", color: "#6b7280", margin: "0.4rem 0 0" }}>
                      Upload image to crop with zoom/pan and upload to Cloudinary
                    </p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "var(--color-charcoal)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      name: val,
                      slug: editingCategory ? prev.slug : slugify(val),
                    }));
                  }}
                  placeholder="e.g. Sarees or Resort Wear"
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.85rem",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              {/* Slug with Real-Time Uniqueness Check */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.4rem",
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      color: "var(--color-charcoal)",
                    }}
                  >
                    URL Slug *
                  </label>
                  {slugStatus === "checking" && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <svg
                        style={{
                          animation: "spin 1s linear infinite",
                          width: "12px",
                          height: "12px",
                        }}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          style={{ opacity: 0.25 }}
                        />
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          style={{ opacity: 0.75 }}
                        />
                      </svg>
                      Checking...
                    </span>
                  )}
                  {slugStatus === "available" && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#059669",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      ✓ Available
                    </span>
                  )}
                  {slugStatus === "taken" && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#dc2626",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      ✕ Already Taken
                    </span>
                  )}
                </div>

                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        slug: formatManualSlug(e.target.value),
                      }))
                    }
                    onBlur={() => {
                      setFormData((prev) => ({
                        ...prev,
                        slug: prev.slug.replace(/^-+|-+$/g, ""),
                      }));
                    }}
                    placeholder="e.g. party-wear"
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.85rem",
                      borderRadius: "8px",
                      border:
                        slugStatus === "taken" || slugStatus === "invalid"
                          ? "1px solid #ef4444"
                          : slugStatus === "available"
                          ? "1px solid #10b981"
                          : "1px solid #d1d5db",
                      backgroundColor:
                        slugStatus === "taken" ? "#fef2f2" : "#ffffff",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "all 0.2s ease",
                    }}
                  />
                </div>

                {/* Real-time slug status message */}
                {slugFeedback && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      marginTop: "0.35rem",
                      marginBottom: 0,
                      color:
                        slugStatus === "taken" || slugStatus === "invalid"
                          ? "#dc2626"
                          : slugStatus === "available"
                          ? "#059669"
                          : "#6b7280",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <span>{slugFeedback}</span>
                  </p>
                )}

                {/* Real-time intelligent slug suggestions when taken */}
                {slugStatus === "taken" && slugSuggestions.length > 0 && (
                  <div
                    style={{
                      marginTop: "0.6rem",
                      padding: "0.65rem 0.85rem",
                      backgroundColor: "rgba(197, 160, 89, 0.08)",
                      border: "1px dashed rgba(197, 160, 89, 0.45)",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.74rem",
                        fontWeight: 600,
                        color: "var(--color-gold-dark)",
                        marginBottom: "0.45rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2v4" />
                        <path d="M12 18v4" />
                        <path d="M4.93 4.93l2.83 2.83" />
                        <path d="M16.24 16.24l2.83 2.83" />
                        <path d="M2 12h4" />
                        <path d="M18 12h4" />
                        <path d="M4.93 19.07l2.83-2.83" />
                        <path d="M16.24 7.76l2.83-2.83" />
                      </svg>
                      <span>Suggested unique alternatives (click to use):</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.4rem",
                      }}
                    >
                      {slugSuggestions.map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, slug: sug }));
                          }}
                          style={{
                            fontSize: "0.75rem",
                            fontFamily: "monospace",
                            padding: "0.3rem 0.65rem",
                            borderRadius: "6px",
                            border: "1px solid rgba(197, 160, 89, 0.4)",
                            backgroundColor: "#ffffff",
                            color: "var(--color-charcoal)",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            transition: "all 0.15s ease",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                          }}
                          onMouseOver={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor =
                              "var(--color-charcoal)";
                            (e.currentTarget as HTMLElement).style.color = "#ffffff";
                            (e.currentTarget as HTMLElement).style.borderColor =
                              "var(--color-charcoal)";
                          }}
                          onMouseOut={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor =
                              "#ffffff";
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--color-charcoal)";
                            (e.currentTarget as HTMLElement).style.borderColor =
                              "rgba(197, 160, 89, 0.4)";
                          }}
                          title={`Click to select "${sug}"`}
                        >
                          <span style={{ color: "var(--color-gold)", fontWeight: 700 }}>+</span>
                          <span>{sug}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "var(--color-charcoal)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Brief description for category collection"
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.85rem",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Order & Status */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      color: "var(--color-charcoal)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        display_order: Number(e.target.value),
                      }))
                    }
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.85rem",
                      borderRadius: "8px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <AdminDropdown
                    label="Storefront Status"
                    value={formData.is_active ? "true" : "false"}
                    onChange={(val) =>
                      setFormData((prev) => ({
                        ...prev,
                        is_active: val === "true",
                      }))
                    }
                    options={[
                      { value: "true", label: "Active (Visible on Storefront)", badge: "Live" },
                      { value: "false", label: "Inactive (Hidden)", badge: "Hidden" },
                    ]}
                  />
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                  marginTop: "1rem",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingCategory(null);
                  }}
                  style={{
                    padding: "0.65rem 1.25rem",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    background: "none",
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    color: "#4b5563",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    loading ||
                    slugStatus === "taken" ||
                    slugStatus === "invalid" ||
                    slugStatus === "checking"
                  }
                  style={{
                    padding: "0.65rem 1.5rem",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor:
                      loading ||
                      slugStatus === "taken" ||
                      slugStatus === "invalid" ||
                      slugStatus === "checking"
                        ? "#9ca3af"
                        : "var(--color-charcoal)",
                    backgroundColor:
                      loading ||
                      slugStatus === "taken" ||
                      slugStatus === "invalid" ||
                      slugStatus === "checking"
                        ? "#9ca3af"
                        : "var(--color-charcoal)",
                    color: "#ffffff",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    cursor:
                      loading ||
                      slugStatus === "taken" ||
                      slugStatus === "invalid" ||
                      slugStatus === "checking"
                        ? "not-allowed"
                        : "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {loading
                    ? "Saving..."
                    : slugStatus === "checking"
                    ? "Verifying Slug..."
                    : editingCategory
                    ? "Save Changes"
                    : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Category Delete and Toggle Active */}
      {confirmModal && (
        <ConfirmationModal
          isOpen={true}
          isLoading={modalLoading}
          variant={
            confirmModal.type === "delete"
              ? "danger"
              : confirmModal.category.is_active
              ? "warning"
              : "success"
          }
          title={
            confirmModal.type === "delete"
              ? "Delete Category"
              : confirmModal.category.is_active
              ? "Hide Category from Storefront"
              : "Publish Category to Storefront"
          }
          message={
            confirmModal.type === "delete" ? (
              <span>
                Are you sure you want to delete the category <strong>{confirmModal.category.name}</strong>?
                Products associated with this category will remain, but the collection will no longer appear in the store.
              </span>
            ) : confirmModal.category.is_active ? (
              <span>
                Are you sure you want to deactivate <strong>{confirmModal.category.name}</strong>?
                It will be hidden from the storefront header, home category strip, and catalog filters.
              </span>
            ) : (
              <span>
                Are you sure you want to activate <strong>{confirmModal.category.name}</strong>?
                It will be immediately visible to customers across the site.
              </span>
            )
          }
          confirmText={
            confirmModal.type === "delete"
              ? "Delete Category"
              : confirmModal.category.is_active
              ? "Hide Category"
              : "Activate Category"
          }
          cancelText="Cancel"
          itemDetails={{
            name: confirmModal.category.name,
            subtitle: `Slug: /shop?category=${confirmModal.category.slug}`,
            image: confirmModal.category.image_url || undefined,
            badge: `#${confirmModal.category.display_order}`,
          }}
          onConfirm={handleExecuteConfirmedAction}
          onClose={() => {
            if (!modalLoading) setConfirmModal(null);
          }}
        />
      )}
    </div>
  );
}
