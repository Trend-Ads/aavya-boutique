export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductDetails {
  fabric: string;
  fit: string;
  care: string;
  origin: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  descriptor: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: "Dresses" | "Co-ords" | "Kurtis" | "Ethnic" | "Tops" | "Party Wear" | string;
  colors: string[];
  sizes: string[];
  badge?: "New" | "Bestseller" | "Sale";
  isBestseller?: boolean;
  inStock: boolean;
  stockCount: number;
  sku: string;
  description: string;
  highlights: string[];
  details: ProductDetails;
  reviews: {
    rating: number;
    count: number;
    items: ProductReview[];
  };
}

// Strictly empty array - all products are loaded live from the Supabase database
export const PRODUCTS: ProductItem[] = [];

export function getProductBySlug(slug: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProducts(): ProductItem[] {
  return PRODUCTS;
}

export function getRelatedProducts(category: string, currentSlug: string, limit = 4): ProductItem[] {
  const sameCat = PRODUCTS.filter((p) => p.category === category && p.slug !== currentSlug);
  if (sameCat.length >= limit) {
    return sameCat.slice(0, limit);
  }
  const others = PRODUCTS.filter((p) => p.slug !== currentSlug && !sameCat.includes(p));
  return [...sameCat, ...others].slice(0, limit);
}
