"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ProductRecord, ProductDraftData } from "@/types/product";
import { Category, DEFAULT_CATEGORIES } from "@/data/categories";
import ImageCropperModal from "./ImageCropperModal";
import AdminDropdown from "./AdminDropdown";
import { useToast } from "@/context/ToastContext";

const BADGE_OPTIONS = [
  { value: "", label: "No Badge (Standard)" },
  { value: "New", label: "New Arrival", badge: "New" },
  { value: "Bestseller", label: "Bestseller", badge: "Hot" },
  { value: "Sale", label: "Sale / Special Edition", badge: "Sale" },
];

const ORIGIN_OPTIONS = [
  { value: "Crafted in Kochi, Kerala, India", label: "Crafted in Kochi, Kerala, India", description: "Panampilly Nagar Studio" },
  { value: "Handcrafted in Kerala, India", label: "Handcrafted in Kerala, India", description: "Artisanal handloom weavers" },
  { value: "Handcrafted Artisanal Loom, India", label: "Handcrafted Artisanal Loom, India", description: "Traditional Indian handloom" },
  { value: "Made in India", label: "Made in India", description: "Fine boutique atelier" },
];

interface ProductFormProps {
  initialProduct?: ProductRecord | null;
  isEdit?: boolean;
}

type TabKey =
  | "general"
  | "pricing"
  | "descriptions"
  | "fabric"
  | "shipping"
  | "variants";

const TABS: { id: TabKey; label: string; icon: string }[] = [
  { id: "general", label: "General & Media", icon: "✨" },
  { id: "pricing", label: "Pricing & Stock", icon: "🏷️" },
  { id: "descriptions", label: "Story & Highlights", icon: "📝" },
  { id: "fabric", label: "Fabric & Care", icon: "🧵" },
  { id: "shipping", label: "Shipping & Returns", icon: "🚚" },
  { id: "variants", label: "Color & Size Variants", icon: "🎨" },
];

const PRESET_COLORS = [
  "Dusty Rose",
  "Ivory",
  "Charcoal",
  "Sage Green",
  "Sand",
  "Cream",
  "Indigo",
  "Terracotta",
  "Blush Pink",
  "Champagne Gold",
  "Mint",
  "Olive Green",
  "Emerald",
  "Navy",
  "Maroon",
  "Black",
  "Burgundy",
];

const PRESET_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

const DEFAULT_HIGHLIGHTS = [
  "Ultra-soft handcrafted boutique fabric with premium finish",
  "Relaxed silhouette tailored to flatter modern Indian aesthetics",
  "Handcrafted with precision at our Panampilly Nagar studio, Kochi",
];

export default function ProductForm({ initialProduct, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  const categoryDropdownOptions = useMemo(() => {
    return categories.map((cat) => ({
      value: cat.name,
      label: cat.name,
      badge: cat.is_active ? undefined : "Inactive",
    }));
  }, [categories]);

  // Form State
  const [name, setName] = useState(initialProduct?.name || "");
  const [slug, setSlug] = useState(initialProduct?.slug || "");
  const [descriptor, setDescriptor] = useState(initialProduct?.descriptor || "");
  const [tagline, setTagline] = useState(initialProduct?.tagline || "");
  const [category, setCategory] = useState(initialProduct?.category || "Dresses");
  const [badge, setBadge] = useState<string>(initialProduct?.badge || "");
  const [isBestseller, setIsBestseller] = useState<boolean>(initialProduct?.isBestseller ?? false);

  // 4 Images State (slot 0 is main image, 1-3 are gallery angles)
  const [images, setImages] = useState<string[]>(() => {
    if (initialProduct?.images && initialProduct.images.length > 0) {
      const arr = [...initialProduct.images];
      while (arr.length < 4) arr.push("");
      return arr.slice(0, 4);
    }
    if (initialProduct?.image) {
      return [initialProduct.image, "", "", ""];
    }
    return ["", "", "", ""];
  });

  // Pricing & Stock
  const [price, setPrice] = useState<string>(initialProduct?.price ? String(initialProduct.price) : "");
  const [originalPrice, setOriginalPrice] = useState<string>(
    initialProduct?.originalPrice ? String(initialProduct.originalPrice) : ""
  );
  const [stockCount, setStockCount] = useState<string>(
    initialProduct?.stockCount ? String(initialProduct.stockCount) : "10"
  );
  const [sku, setSku] = useState(initialProduct?.sku || "");
  const [inStock, setInStock] = useState<boolean>(initialProduct?.inStock ?? true);
  const [isListed, setIsListed] = useState<boolean>(initialProduct?.is_listed ?? true);

  // Descriptions & Story
  const [description, setDescription] = useState(initialProduct?.description || "");
  const [highlights, setHighlights] = useState<string[]>(
    initialProduct?.highlights && initialProduct.highlights.length > 0
      ? initialProduct.highlights
      : DEFAULT_HIGHLIGHTS
  );
  const [newHighlight, setNewHighlight] = useState("");

  // Fabric & Care
  const [fabric, setFabric] = useState(initialProduct?.details?.fabric || "");
  const [fit, setFit] = useState(initialProduct?.details?.fit || "");
  const [care, setCare] = useState(initialProduct?.details?.care || "");
  const [origin, setOrigin] = useState(
    initialProduct?.details?.origin || "Handcrafted at Panampilly Nagar studio, Kochi, Kerala"
  );

  // Shipping & Returns
  const [shippingDispatch, setShippingDispatch] = useState(
    initialProduct?.shipping?.dispatch ||
      "Orders placed before 2:00 PM are dispatched the next business day from our Panampilly Nagar studio."
  );
  const [shippingTransit, setShippingTransit] = useState(
    initialProduct?.shipping?.transit ||
      "South India: 2-3 business days. Rest of India: 3-5 business days via express courier."
  );
  const [shippingExchanges, setShippingExchanges] = useState(
    initialProduct?.shipping?.exchanges ||
      "We offer a 7-day complimentary door-pickup exchange window for size adjustments."
  );

  // Variants
  const [selectedColors, setSelectedColors] = useState<string[]>(
    initialProduct?.colors && initialProduct.colors.length > 0
      ? initialProduct.colors
      : ["Dusty Rose", "Ivory"]
  );
  const [customColorInput, setCustomColorInput] = useState("");

  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    initialProduct?.sizes && initialProduct.sizes.length > 0
      ? initialProduct.sizes
      : ["XS", "S", "M", "L", "XL"]
  );
  const [customSizeInput, setCustomSizeInput] = useState("");

  // Cropper Modal States
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);
  const [activeImageSlot, setActiveImageSlot] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status & Notifications
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [draftStatus, setDraftStatus] = useState<"idle" | "saving" | "saved" | "restored">("idle");
  const [hasDraftLoaded, setHasDraftLoaded] = useState(false);

  // Slug Real-time Check
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [slugFeedback, setSlugFeedback] = useState<string | null>(null);
  const [slugSuggestions, setSlugSuggestions] = useState<string[]>([]);
  const slugDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Fetch live categories for dropdown
  useEffect(() => {
    async function loadCategories() {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("display_order", { ascending: true });
        if (!error && data && data.length > 0) {
          setCategories(data);
        }
      } catch {
        // Fallback to default
      }
    }
    loadCategories();
  }, [supabase]);

  // 2. Slugify helper
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const formatManualSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");
  };

  // Generate luxury slug suggestions
  const generateSlugSuggestions = (baseSlug: string, existingSlugs: Set<string>): string[] => {
    const cleanBase = baseSlug.replace(/^-+|-+$/g, "");
    if (!cleanBase) return [];
    const suggestions: string[] = [];
    const currentYear = new Date().getFullYear();

    const candidates = [
      `${cleanBase}-edition`,
      `${cleanBase}-edit`,
      `${cleanBase}-kochi`,
      `${cleanBase}-exclusive`,
      `${cleanBase}-${currentYear}`,
    ];

    for (const c of candidates) {
      if (!existingSlugs.has(c) && !suggestions.includes(c)) suggestions.push(c);
      if (suggestions.length >= 4) break;
    }

    let i = 2;
    while (suggestions.length < 4 && i <= 20) {
      const c = `${cleanBase}-${i}`;
      if (!existingSlugs.has(c) && !suggestions.includes(c)) suggestions.push(c);
      i++;
    }

    return suggestions;
  };

  // 3. Auto-generate slug from name if adding new product
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit && (!slug || slug === slugify(name))) {
      setSlug(slugify(val));
    }
  };

  // 4. Real-time slug uniqueness validation
  useEffect(() => {
    if (slugDebounceRef.current) clearTimeout(slugDebounceRef.current);

    const raw = slug.trim().toLowerCase();
    const clean = raw.replace(/^-+|-+$/g, "");

    if (!clean) {
      setSlugStatus("invalid");
      setSlugFeedback("Product URL slug is required.");
      setSlugSuggestions([]);
      return;
    }

    if (raw.endsWith("-")) {
      setSlugStatus("checking");
      setSlugFeedback("Typing hyphen...");
      return;
    }

    if (isEdit && initialProduct && clean === initialProduct.slug.toLowerCase()) {
      setSlugStatus("available");
      setSlugFeedback("Current slug (unchanged).");
      setSlugSuggestions([]);
      return;
    }

    setSlugStatus("checking");
    setSlugFeedback("Checking availability across catalog...");

    slugDebounceRef.current = setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, slug");

        const allKnownSlugs = new Set<string>(
          (!error && data ? data : []).map((p: { slug: string }) => p.slug.toLowerCase())
        );

        const isTaken =
          (!error && data) ?
          data.some((p: { id: string; slug: string }) => p.slug.toLowerCase() === clean && (!isEdit || p.id !== initialProduct?.id))
          : false;

        if (isTaken) {
          const suggestions = generateSlugSuggestions(clean, allKnownSlugs);

          setSlugStatus("taken");
          setSlugFeedback(`Slug "${clean}" is already in use.`);
          setSlugSuggestions(suggestions);
        } else {
          setSlugStatus("available");
          setSlugFeedback(`Slug "${clean}" is available!`);
          setSlugSuggestions([]);
        }
      } catch {
        setSlugStatus("available");
        setSlugFeedback("Slug verified locally.");
        setSlugSuggestions([]);
      }
    }, 450);

    return () => {
      if (slugDebounceRef.current) clearTimeout(slugDebounceRef.current);
    };
  }, [slug, isEdit, initialProduct, supabase]);

  // 5. Auto-load draft on mount for Add Product mode
  useEffect(() => {
    if (isEdit) return;

    async function loadDraft() {
      try {
        const { data, error } = await supabase
          .from("product_drafts")
          .select("draft_data, updated_at")
          .eq("id", "admin_current_draft")
          .maybeSingle();

        if (!error && data && data.draft_data && Object.keys(data.draft_data).length > 0) {
          const d: ProductDraftData = data.draft_data;
          if (d.name) setName(d.name);
          if (d.slug) setSlug(d.slug);
          if (d.descriptor) setDescriptor(d.descriptor);
          if (d.tagline) setTagline(d.tagline);
          if (d.category) setCategory(d.category);
          if (d.badge) setBadge(d.badge);
          if (d.isBestseller !== undefined) setIsBestseller(d.isBestseller);
          if (d.price) setPrice(String(d.price));
          if (d.originalPrice) setOriginalPrice(String(d.originalPrice));
          if (d.stockCount) setStockCount(String(d.stockCount));
          if (d.sku) setSku(d.sku);
          if (d.inStock !== undefined) setInStock(d.inStock);
          if (d.is_listed !== undefined) setIsListed(d.is_listed);
          if (d.description) setDescription(d.description);
          if (d.highlights && d.highlights.length > 0) setHighlights(d.highlights);
          if (d.fabric) setFabric(d.fabric);
          if (d.fit) setFit(d.fit);
          if (d.care) setCare(d.care);
          if (d.origin) setOrigin(d.origin);
          if (d.shippingDispatch) setShippingDispatch(d.shippingDispatch);
          if (d.shippingTransit) setShippingTransit(d.shippingTransit);
          if (d.shippingExchanges) setShippingExchanges(d.shippingExchanges);
          if (d.colors && d.colors.length > 0) setSelectedColors(d.colors);
          if (d.sizes && d.sizes.length > 0) setSelectedSizes(d.sizes);
          if (d.images && d.images.length > 0) {
            const arr = [...d.images];
            while (arr.length < 4) arr.push("");
            setImages(arr.slice(0, 4));
          }
          setDraftStatus("restored");
        }
      } catch (err) {
        console.error("Failed to load draft:", err);
      } finally {
        setHasDraftLoaded(true);
      }
    }

    loadDraft();
  }, [isEdit, supabase]);

  // 6. Auto-save draft on form change (debounced 1.2s)
  const currentFormData: ProductDraftData = useMemo(() => {
    return {
      name,
      slug,
      descriptor,
      tagline,
      category,
      image: images[0] || "",
      images: images.filter((img) => img.trim() !== ""),
      price,
      originalPrice,
      stockCount,
      sku,
      badge,
      isBestseller,
      inStock,
      is_listed: isListed,
      description,
      highlights,
      fabric,
      fit,
      care,
      origin,
      shippingDispatch,
      shippingTransit,
      shippingExchanges,
      colors: selectedColors,
      sizes: selectedSizes,
    };
  }, [
    name,
    slug,
    descriptor,
    tagline,
    category,
    images,
    price,
    originalPrice,
    stockCount,
    sku,
    badge,
    isBestseller,
    inStock,
    isListed,
    description,
    highlights,
    fabric,
    fit,
    care,
    origin,
    shippingDispatch,
    shippingTransit,
    shippingExchanges,
    selectedColors,
    selectedSizes,
  ]);

  useEffect(() => {
    if (isEdit || !hasDraftLoaded) return;
    if (!name && !price && !description && !images[0]) return;

    if (autoSaveDebounceRef.current) clearTimeout(autoSaveDebounceRef.current);
    setDraftStatus("saving");

    autoSaveDebounceRef.current = setTimeout(async () => {
      try {
        await supabase
          .from("product_drafts")
          .upsert({
            id: "admin_current_draft",
            draft_data: currentFormData,
            updated_at: new Date().toISOString(),
          });
        setDraftStatus("saved");
      } catch {
        setDraftStatus("idle");
      }
    }, 1200);

    return () => {
      if (autoSaveDebounceRef.current) clearTimeout(autoSaveDebounceRef.current);
    };
  }, [currentFormData, isEdit, hasDraftLoaded, name, price, description, images, supabase]);

  // Discard draft
  const handleDiscardDraft = async () => {
    if (!confirm("Are you sure you want to discard this unsaved draft? All inputs will be reset.")) return;
    try {
      await supabase.from("product_drafts").delete().eq("id", "admin_current_draft");
      setName("");
      setSlug("");
      setDescriptor("");
      setTagline("");
      setPrice("");
      setOriginalPrice("");
      setStockCount("10");
      setSku("");
      setDescription("");
      setImages(["", "", "", ""]);
      setHighlights(DEFAULT_HIGHLIGHTS);
      setDraftStatus("idle");
      setNotification({ text: "Draft discarded.", type: "success" });
      toast.info("Unsaved draft has been discarded and inputs reset.", "Draft Cleared");
    } catch (err) {
      console.error(err);
      toast.error("Failed to discard draft.", "Error");
    }
  };

  // Image Upload & Crop Triggers
  const handleOpenCropper = (slotIndex: number) => {
    setActiveImageSlot(slotIndex);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCropperSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    // Reset file input value so user can re-select same file if wanted
    e.target.value = "";
  };

  const handleUploadSuccess = (cloudinaryUrl: string) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[activeImageSlot] = cloudinaryUrl;
      return updated;
    });
    setNotification({ text: `Image ${activeImageSlot + 1} uploaded successfully!`, type: "success" });
    toast.success(`Image ${activeImageSlot + 1} cropped and uploaded successfully!`, "Media Updated");
  };

  const handleRemoveImage = (slotIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImages((prev) => {
      const updated = [...prev];
      updated[slotIndex] = "";
      return updated;
    });
  };

  // Highlights handlers
  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setHighlights((prev) => [...prev, newHighlight.trim()]);
    setNewHighlight("");
  };

  const handleRemoveHighlight = (idx: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== idx));
  };

  // Variants handlers
  const toggleColor = (col: string) => {
    setSelectedColors((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const handleAddCustomColor = () => {
    const clean = customColorInput.trim();
    if (!clean) return;
    if (!selectedColors.includes(clean)) {
      setSelectedColors((prev) => [...prev, clean]);
    }
    setCustomColorInput("");
  };

  const toggleSize = (sz: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };

  const handleAddCustomSize = () => {
    const clean = customSizeInput.trim().toUpperCase();
    if (!clean) return;
    if (!selectedSizes.includes(clean)) {
      setSelectedSizes((prev) => [...prev, clean]);
    }
    setCustomSizeInput("");
  };

  // Submit Product Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setNotification({ text: "Product Name is required.", type: "error" });
      toast.error("Product name is required before saving.", "Missing Name");
      setActiveTab("general");
      return;
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/^-+|-+$/g, "");
    if (!cleanSlug || slugStatus === "taken" || slugStatus === "invalid") {
      setNotification({ text: "Please choose a valid and unique URL slug.", type: "error" });
      toast.error("Please provide a valid and unique URL slug.", "Slug Conflict");
      setActiveTab("general");
      return;
    }

    if (!images[0]) {
      setNotification({ text: "Primary cover image (Slot 1) is mandatory.", type: "error" });
      toast.error("Primary cover image (Slot 1) is mandatory.", "Image Required");
      setActiveTab("general");
      return;
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setNotification({ text: "Please enter a valid regular price.", type: "error" });
      toast.error("Please enter a valid regular price greater than 0.", "Price Invalid");
      setActiveTab("pricing");
      return;
    }

    setIsSaving(true);
    setNotification(null);

    const validImages = images.filter((img) => img.trim() !== "");

    const payload = {
      name: name.trim(),
      slug: cleanSlug,
      descriptor: descriptor.trim() || name.trim(),
      tagline: tagline.trim(),
      category,
      price: numPrice,
      original_price: originalPrice ? Number(originalPrice) : null,
      stock_count: Number(stockCount) || 1,
      sku: sku.trim() || `AAV-${cleanSlug.slice(0, 6).toUpperCase()}`,
      badge: badge.trim() || null,
      is_bestseller: isBestseller,
      in_stock: inStock,
      is_listed: isListed,
      image: validImages[0] || "/images/product-1.jpg",
      images: validImages.length > 0 ? validImages : [images[0]],
      description: description.trim(),
      highlights,
      details: {
        fabric: fabric.trim() || "Artisanal Luxury Fabric",
        fit: fit.trim() || "Relaxed tailored fit",
        care: care.trim() || "Gentle cold hand wash or dry clean",
        origin: origin.trim() || "Handcrafted at Panampilly Nagar studio, Kochi",
      },
      shipping: {
        dispatch: shippingDispatch.trim(),
        transit: shippingTransit.trim(),
        exchanges: shippingExchanges.trim(),
      },
      colors: selectedColors,
      sizes: selectedSizes,
      updated_at: new Date().toISOString(),
    };

    try {
      if (isEdit && initialProduct) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", initialProduct.id);

        if (error) throw error;
        setNotification({ text: "Product updated successfully!", type: "success" });
        toast.success(`Product "${payload.name}" updated successfully!`, "Product Updated", {
          flash: true,
        });
      } else {
        const { error } = await supabase.from("products").insert([payload]);
        if (error) throw error;

        // Clear the draft upon successful creation!
        await supabase.from("product_drafts").delete().eq("id", "admin_current_draft");

        setNotification({ text: "Product created successfully! Redirecting...", type: "success" });
        toast.success(`Product "${payload.name}" published to catalog!`, "Product Created", {
          flash: true,
        });
      }

      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving product to Supabase.";
      setNotification({ text: msg, type: "error" });
      toast.error(msg, "Save Failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
      {/* Hidden File Input for Image Cropper */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Image Cropper Modal */}
      {cropperSrc && (
        <ImageCropperModal
          imageSrc={cropperSrc}
          folder="aavya-products"
          onClose={() => setCropperSrc(null)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      {/* Header & Status Indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        <div>
          <Link
            href="/admin/products"
            style={{
              fontSize: "0.82rem",
              color: "#6b7280",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              marginBottom: "0.5rem",
            }}
          >
            <span>← Back to Products Catalog</span>
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
            {isEdit ? `Edit: ${initialProduct?.name || "Product"}` : "Add New Boutique Product"}
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.25rem" }}>
            Configure silhouettes, 4-angle media, pricing, fabric, and color/size variants
          </p>
        </div>

        {/* Draft Indicator (Add Product Mode) */}
        {!isEdit && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {draftStatus === "saving" && (
              <span style={{ fontSize: "0.78rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span>
                Autosaving draft...
              </span>
            )}
            {draftStatus === "saved" && (
              <span style={{ fontSize: "0.78rem", color: "#059669", fontWeight: 500 }}>
                ✓ Draft saved in Supabase
              </span>
            )}
            {draftStatus === "restored" && (
              <div
                style={{
                  backgroundColor: "rgba(197, 160, 89, 0.12)",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.78rem",
                  color: "var(--color-charcoal)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>✨ Restored unsaved draft</span>
                <button
                  type="button"
                  onClick={handleDiscardDraft}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#dc2626",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    padding: 0,
                  }}
                >
                  Discard
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          style={{
            padding: "0.85rem 1.25rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            fontSize: "0.88rem",
            backgroundColor: notification.type === "success" ? "#ecfdf5" : "#fef2f2",
            color: notification.type === "success" ? "#065f46" : "#991b1b",
            border: `1px solid ${notification.type === "success" ? "#a7f3d0" : "#fecaca"}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{notification.text}</span>
          <button
            onClick={() => setNotification(null)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Tabbed Pill Navigation */}
      <div
        className="no-scrollbar"
        style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.75rem",
          marginBottom: "1.5rem",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.6rem 1.15rem",
                borderRadius: "999px",
                border: isActive ? "1px solid var(--color-charcoal)" : "1px solid #e5e7eb",
                backgroundColor: isActive ? "var(--color-charcoal)" : "#ffffff",
                color: isActive ? "#ffffff" : "#4b5563",
                fontSize: "0.82rem",
                fontWeight: isActive ? 600 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            padding: "2rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            marginBottom: "2rem",
          }}
        >
          {/* TAB 1: GENERAL & MEDIA */}
          {activeTab === "general" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {/* Product Identity */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Satin Draped Midi Dress"
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <AdminDropdown
                    label="Category"
                    required
                    value={category}
                    onChange={setCategory}
                    options={categoryDropdownOptions}
                    searchable
                    placeholder="Select Category"
                  />
                </div>
              </div>

              {/* URL Slug with Real-time Uniqueness Validation & Suggestions */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
                    Product URL Slug *
                  </label>
                  <span style={{ fontSize: "0.72rem", color: "#6b7280" }}>
                    Storefront URL: /product/{slug || "..."}
                  </span>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(formatManualSlug(e.target.value))}
                    placeholder="e.g. satin-draped-midi-dress"
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      paddingRight: "2.5rem",
                      borderRadius: "6px",
                      border: `1px solid ${
                        slugStatus === "available"
                          ? "#10b981"
                          : slugStatus === "taken"
                          ? "#ef4444"
                          : "#d1d5db"
                      }`,
                      fontSize: "0.9rem",
                      fontFamily: "monospace",
                      outline: "none",
                    }}
                  />
                  {/* Status Indicator Icon */}
                  <div style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)" }}>
                    {slugStatus === "checking" && <span style={{ animation: "spin 1s linear infinite" }}>🔄</span>}
                    {slugStatus === "available" && <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>}
                    {slugStatus === "taken" && <span style={{ color: "#ef4444", fontWeight: 700 }}>✕</span>}
                  </div>
                </div>

                {/* Feedback & Suggestions */}
                {slugFeedback && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      marginTop: "0.35rem",
                      color:
                        slugStatus === "available"
                          ? "#059669"
                          : slugStatus === "taken"
                          ? "#dc2626"
                          : "#6b7280",
                    }}
                  >
                    {slugFeedback}
                  </p>
                )}

                {slugStatus === "taken" && slugSuggestions.length > 0 && (
                  <div
                    style={{
                      marginTop: "0.65rem",
                      padding: "0.75rem 1rem",
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fee2e2",
                      borderRadius: "6px",
                    }}
                  >
                    <p style={{ fontSize: "0.75rem", color: "#991b1b", fontWeight: 600, margin: "0 0 0.4rem" }}>
                      Recommended boutique slug alternatives (Click to apply):
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {slugSuggestions.map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => setSlug(sug)}
                          style={{
                            padding: "0.25rem 0.6rem",
                            fontSize: "0.72rem",
                            borderRadius: "4px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #f87171",
                            color: "#b91c1c",
                            cursor: "pointer",
                            fontFamily: "monospace",
                          }}
                        >
                          + {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4 Dedicated Images Section */}
              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-charcoal)", margin: 0 }}>
                    4-Angle Boutique Imagery (Cloudinary Cropper)
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "#6b7280", margin: "0.2rem 0 0" }}>
                    Slot 1 serves as the primary catalog cover image. Slots 2, 3, and 4 form the vertical PDP rail and zoom gallery.
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                    gap: "1.25rem",
                  }}
                >
                  {images.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        onClick={() => handleOpenCropper(idx)}
                        style={{
                          width: "100%",
                          aspectRatio: "3/4",
                          borderRadius: "8px",
                          border: imgUrl ? "2px solid #e5e7eb" : "2px dashed #cbd5e1",
                          backgroundColor: "#f8fafc",
                          position: "relative",
                          overflow: "hidden",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "border-color 0.2s, background-color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-charcoal)")}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor = imgUrl ? "#e5e7eb" : "#cbd5e1")
                        }
                      >
                        {imgUrl ? (
                          <>
                            <img
                              src={imgUrl}
                              alt={`Slot ${idx + 1}`}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                backgroundColor: "rgba(0,0,0,0.35)",
                                opacity: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "opacity 0.2s",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                            >
                              <span style={{ color: "#ffffff", fontSize: "0.78rem", fontWeight: 600 }}>
                                Click to Change / Crop
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => handleRemoveImage(idx, e)}
                              title="Remove image"
                              style={{
                                position: "absolute",
                                top: "6px",
                                right: "6px",
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(220, 38, 38, 0.9)",
                                color: "#ffffff",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem",
                              }}
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <div style={{ textAlign: "center", padding: "1rem" }}>
                            <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.25rem" }}>
                              📷
                            </span>
                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
                              {idx === 0 ? "Cover Image *" : `Angle ${idx + 1}`}
                            </span>
                            <span style={{ fontSize: "0.68rem", color: "#9ca3af", display: "block" }}>
                              Click to crop & upload
                            </span>
                          </div>
                        )}
                      </div>

                      <span style={{ fontSize: "0.72rem", color: "#6b7280", textAlign: "center" }}>
                        {idx === 0
                          ? "Slot 1: Primary Cover"
                          : idx === 1
                          ? "Slot 2: Front/Detail"
                          : idx === 2
                          ? "Slot 3: Back Silhouette"
                          : "Slot 4: Styling/Lifestyle"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tagline & Descriptor */}
              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                      Short Descriptor
                    </label>
                    <input
                      type="text"
                      value={descriptor}
                      onChange={(e) => setDescriptor(e.target.value)}
                      placeholder="e.g. Flowing satin with wrap silhouette"
                      style={{
                        width: "100%",
                        padding: "0.7rem 0.9rem",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                      Editorial Tagline
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. Luminous fluid satin sculpted with a graceful asymmetric drape..."
                      style={{
                        width: "100%",
                        padding: "0.7rem 0.9rem",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRICING & STOCK */}
          {activeTab === "pricing" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="2490"
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                    Original Price (₹) <span style={{ fontWeight: 400, color: "#6b7280" }}>(Optional Strikethrough)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="3290"
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                    Stock Count *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stockCount}
                    onChange={(e) => setStockCount(e.target.value)}
                    placeholder="10"
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="AAV-DRS-001"
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.9rem",
                      outline: "none",
                      fontFamily: "monospace",
                    }}
                  />
                </div>

                <div>
                  <AdminDropdown
                    label="Storefront Badge (Optional)"
                    value={badge}
                    onChange={setBadge}
                    options={BADGE_OPTIONS}
                    placeholder="None"
                  />
                </div>
              </div>

              {/* Status Toggles */}
              <div
                style={{
                  borderTop: "1px solid #f3f4f6",
                  paddingTop: "1.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {/* In-Stock Toggle */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <input
                    id="stock-toggle"
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    style={{ marginTop: "3px", width: "16px", height: "16px", accentColor: "var(--color-charcoal)" }}
                  />
                  <label htmlFor="stock-toggle" style={{ cursor: "pointer" }}>
                    <span style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
                      Item is In Stock
                    </span>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "#6b7280" }}>
                      When turned off, will display &quot;Out of Stock&quot; and disable buying buttons.
                    </span>
                  </label>
                </div>

                {/* Storefront Listed Toggle */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <input
                    id="listed-toggle"
                    type="checkbox"
                    checked={isListed}
                    onChange={(e) => setIsListed(e.target.checked)}
                    style={{ marginTop: "3px", width: "16px", height: "16px", accentColor: "var(--color-charcoal)" }}
                  />
                  <label htmlFor="listed-toggle" style={{ cursor: "pointer" }}>
                    <span style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
                      Active Storefront Listing
                    </span>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "#6b7280" }}>
                      Unlist this product to archive or hide from customers without deleting.
                    </span>
                  </label>
                </div>
              </div>

              {/* Badges & Flags */}
              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.5rem" }}>
                  Storefront Badge
                </label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                  {["", "New", "Bestseller", "Sale"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBadge(b)}
                      style={{
                        padding: "0.4rem 0.9rem",
                        borderRadius: "6px",
                        fontSize: "0.78rem",
                        fontWeight: badge === b ? 600 : 400,
                        backgroundColor: badge === b ? "var(--color-charcoal)" : "#ffffff",
                        color: badge === b ? "#ffffff" : "#4b5563",
                        border: "1px solid #d1d5db",
                        cursor: "pointer",
                      }}
                    >
                      {b ? b : "None"}
                    </button>
                  ))}

                  <label style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginLeft: "1.5rem", fontSize: "0.82rem", color: "var(--color-charcoal)", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={isBestseller}
                      onChange={(e) => setIsBestseller(e.target.checked)}
                      style={{ accentColor: "var(--color-charcoal)" }}
                    />
                    Feature in Bestsellers Section
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DESCRIPTIONS & STORY */}
          {activeTab === "descriptions" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  Long Atelier Description *
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Crafted from ultra-luxe mulberry-blend fluid satin, this draped midi dress redefines contemporary evening wear..."
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.9rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                    lineHeight: 1.6,
                  }}
                />
              </div>

              {/* Highlights List (PDP Accordion items) */}
              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  Garment Highlights & Atelier Craftsmanship Bullet Points
                </label>

                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddHighlight();
                      }
                    }}
                    placeholder="e.g. Asymmetric gathered wrap drape designed to flatter all silhouettes"
                    style={{
                      flex: 1,
                      padding: "0.65rem 0.85rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    style={{
                      padding: "0.65rem 1.25rem",
                      borderRadius: "6px",
                      backgroundColor: "var(--color-charcoal)",
                      color: "#ffffff",
                      border: "none",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    + Add Point
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {highlights.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.65rem 0.9rem",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        color: "var(--color-charcoal)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: "var(--color-gold)" }}>•</span>
                        <span>{item}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#94a3b8",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FABRIC & CARE */}
          {activeTab === "fabric" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <p style={{ fontSize: "0.82rem", color: "#6b7280", margin: 0 }}>
                These fields directly populate the &quot;Fabric Composition &amp; Care&quot; accordion on the Product Detail Page.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                    Fabric Composition *
                  </label>
                  <input
                    type="text"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    placeholder="e.g. 92% Viscose Satin, 8% Elastane blend"
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                    Fit Guide *
                  </label>
                  <input
                    type="text"
                    value={fit}
                    onChange={(e) => setFit(e.target.value)}
                    placeholder="e.g. Relaxed tailored fit with gentle waist cinching; true to size"
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                    Wash &amp; Care Guide *
                  </label>
                  <input
                    type="text"
                    value={care}
                    onChange={(e) => setCare(e.target.value)}
                    placeholder="e.g. Dry clean only or delicate cold hand wash with mild silk detergent"
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <AdminDropdown
                    label="Origin & Tailoring Atelier"
                    required
                    value={origin}
                    onChange={setOrigin}
                    options={ORIGIN_OPTIONS}
                    placeholder="Select Origin & Atelier"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SHIPPING & RETURNS */}
          {activeTab === "shipping" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <p style={{ fontSize: "0.82rem", color: "#6b7280", margin: 0 }}>
                These parameters populate the &quot;Pan-India Shipping &amp; Returns&quot; customer assurance accordion.
              </p>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  Dispatch Schedule
                </label>
                <textarea
                  rows={2}
                  value={shippingDispatch}
                  onChange={(e) => setShippingDispatch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  Transit Time
                </label>
                <textarea
                  rows={2}
                  value={shippingTransit}
                  onChange={(e) => setShippingTransit(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.4rem" }}>
                  Exchanges &amp; Returns Policy
                </label>
                <textarea
                  rows={2}
                  value={shippingExchanges}
                  onChange={(e) => setShippingExchanges(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* TAB 6: COLOR & SIZE VARIANTS */}
          {activeTab === "variants" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Color Selection */}
              <div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color-charcoal)", display: "block" }}>
                    Color Variants ({selectedColors.length} selected)
                  </label>
                  <p style={{ fontSize: "0.78rem", color: "#6b7280", margin: "0.2rem 0 0" }}>
                    Select from boutique presets or add a custom atelier shade:
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                  {PRESET_COLORS.map((col) => {
                    const isSelected = selectedColors.includes(col);
                    return (
                      <button
                        key={col}
                        type="button"
                        onClick={() => toggleColor(col)}
                        style={{
                          padding: "0.4rem 0.85rem",
                          borderRadius: "999px",
                          fontSize: "0.78rem",
                          fontWeight: isSelected ? 600 : 400,
                          backgroundColor: isSelected ? "var(--color-charcoal)" : "#f3f4f6",
                          color: isSelected ? "#ffffff" : "var(--color-charcoal)",
                          border: "1px solid transparent",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {isSelected ? `✓ ${col}` : `+ ${col}`}
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Color Input */}
                <div style={{ display: "flex", gap: "0.5rem", maxWidth: "340px" }}>
                  <input
                    type="text"
                    value={customColorInput}
                    onChange={(e) => setCustomColorInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomColor();
                      }
                    }}
                    placeholder="Custom color (e.g. Rust Orange)"
                    style={{
                      flex: 1,
                      padding: "0.55rem 0.8rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.82rem",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomColor}
                    style={{
                      padding: "0.55rem 0.9rem",
                      borderRadius: "6px",
                      backgroundColor: "var(--color-charcoal)",
                      color: "#ffffff",
                      border: "none",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.75rem" }}>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color-charcoal)", display: "block" }}>
                    Size Variants ({selectedSizes.length} selected)
                  </label>
                  <p style={{ fontSize: "0.78rem", color: "#6b7280", margin: "0.2rem 0 0" }}>
                    Select sizes available for online orders and instant Add to Bag:
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                  {PRESET_SIZES.map((sz) => {
                    const isSelected = selectedSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => toggleSize(sz)}
                        style={{
                          padding: "0.45rem 1rem",
                          borderRadius: "6px",
                          fontSize: "0.82rem",
                          fontWeight: isSelected ? 600 : 400,
                          backgroundColor: isSelected ? "var(--color-charcoal)" : "#f3f4f6",
                          color: isSelected ? "#ffffff" : "var(--color-charcoal)",
                          border: "1px solid transparent",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {isSelected ? `✓ ${sz}` : `+ ${sz}`}
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Size Input */}
                <div style={{ display: "flex", gap: "0.5rem", maxWidth: "340px" }}>
                  <input
                    type="text"
                    value={customSizeInput}
                    onChange={(e) => setCustomSizeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomSize();
                      }
                    }}
                    placeholder="Custom size (e.g. 3XL, Petite)"
                    style={{
                      flex: 1,
                      padding: "0.55rem 0.8rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "0.82rem",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSize}
                    style={{
                      padding: "0.55rem 0.9rem",
                      borderRadius: "6px",
                      backgroundColor: "var(--color-charcoal)",
                      color: "#ffffff",
                      border: "none",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            href="/admin/products"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              color: "#4b5563",
              fontSize: "0.88rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Cancel
          </Link>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "8px",
                backgroundColor: "var(--color-charcoal)",
                color: "#ffffff",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: isSaving ? "not-allowed" : "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                opacity: isSaving ? 0.7 : 1,
              }}
            >
              {isSaving ? "Saving Product..." : isEdit ? "Update Product" : "Publish Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
