export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "New In",
    slug: "new-in",
    description: "Latest fresh arrivals and contemporary boutique drops",
    image_url: "/images/cat-newin.jpg",
    display_order: 1,
    is_active: true,
  },
  {
    id: "cat-2",
    name: "Dresses",
    slug: "dresses",
    description: "Designer midi, wrap, and flowing silhouette dresses",
    image_url: "/images/cat-dresses.jpg",
    display_order: 2,
    is_active: true,
  },
  {
    id: "cat-3",
    name: "Kurtis",
    slug: "kurtis",
    description: "Artisanal hand-block and festive embroidered kurtis",
    image_url: "/images/cat-kurtis.jpg",
    display_order: 3,
    is_active: true,
  },
  {
    id: "cat-4",
    name: "Co-ords",
    slug: "co-ords",
    description: "Effortlessly matching luxury linen and silk sets",
    image_url: "/images/cat-coords.jpg",
    display_order: 4,
    is_active: true,
  },
  {
    id: "cat-5",
    name: "Tops",
    slug: "tops",
    description: "Contemporary tunics, blouses, and elegant tops",
    image_url: "/images/cat-tops.jpg",
    display_order: 5,
    is_active: true,
  },
  {
    id: "cat-6",
    name: "Ethnic",
    slug: "ethnic",
    description: "Timeless traditional silhouettes, sarees, and heritage wear",
    image_url: "/images/cat-ethnic.jpg",
    display_order: 6,
    is_active: true,
  },
  {
    id: "cat-7",
    name: "Party Wear",
    slug: "party-wear",
    description: "Luminous evening gowns and celebratory glam wear",
    image_url: "/images/cat-partywear.jpg",
    display_order: 7,
    is_active: true,
  },
];
