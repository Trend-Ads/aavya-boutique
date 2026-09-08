export interface ProductDetailsData {
  fabric: string;
  fit: string;
  care: string;
  origin: string;
}

export interface ProductShippingData {
  dispatch: string;
  transit: string;
  exchanges: string;
}

export interface ProductReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductReviewsData {
  rating: number;
  count: number;
  items: ProductReviewItem[];
}

export interface ProductRecord {
  id: string;
  slug: string;
  name: string;
  descriptor: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  colors: string[];
  sizes: string[];
  badge?: "New" | "Bestseller" | "Sale";
  isBestseller?: boolean;
  inStock: boolean;
  stockCount: number;
  sku: string;
  description: string;
  highlights: string[];
  details: ProductDetailsData;
  shipping: ProductShippingData;
  reviews?: ProductReviewsData;
  is_listed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductDraftData {
  name: string;
  slug: string;
  descriptor: string;
  tagline: string;
  category: string;
  image: string;
  images: string[];
  price: string | number;
  originalPrice: string | number;
  stockCount: string | number;
  sku: string;
  badge: string;
  isBestseller: boolean;
  inStock: boolean;
  is_listed: boolean;
  description: string;
  highlights: string[];
  fabric: string;
  fit: string;
  care: string;
  origin: string;
  shippingDispatch: string;
  shippingTransit: string;
  shippingExchanges: string;
  colors: string[];
  sizes: string[];
}
