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
  category: "Dresses" | "Co-ords" | "Kurtis" | "Ethnic" | "Tops" | "Party Wear";
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

export const PRODUCTS: ProductItem[] = [
  {
    id: "na-1",
    slug: "satin-draped-midi-dress",
    name: "Satin Draped Midi Dress",
    descriptor: "Flowing satin with wrap silhouette",
    tagline: "Luminous fluid satin sculpted with a graceful asymmetric drape for unforgettable evenings.",
    price: 2490,
    originalPrice: 3290,
    image: "/images/product-1.jpg",
    images: [
      "/images/product-1.jpg",
      "/images/cat-dresses.jpg",
      "/images/featured-large.jpg",
      "/images/product-6.jpg",
    ],
    category: "Dresses",
    colors: ["Dusty Rose", "Ivory", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New",
    isBestseller: true,
    inStock: true,
    stockCount: 6,
    sku: "AAV-DRS-001",
    description:
      "Crafted from ultra-luxe mulberry-blend fluid satin, this draped midi dress redefines contemporary evening wear. Featuring a softened cowl neckline, gentle gathered waist pleats that flatter every silhouette, and a cascading asymmetric hem that moves fluidly with every step. Perfect for intimate cocktail gatherings, festive soirées, or romantic dinners in Fort Kochi.",
    highlights: [
      "Ultra-soft fluid satin with subtle pearl sheen",
      "Asymmetric gathered wrap drape designed to flatter all body types",
      "Concealed side zip with delicate self-fabric covered buttons",
      "Fully lined with breathable viscose for all-day comfort",
      "Handcrafted at the Aavya Atelier, Panampilly Nagar, Kochi",
    ],
    details: {
      fabric: "92% Viscose Satin, 8% Elastane blend",
      fit: "Relaxed tailored fit with gentle waist cinching; true to size",
      care: "Dry clean only or delicate cold hand wash with mild silk detergent",
      origin: "Crafted in Kochi, Kerala, India",
    },
    reviews: {
      rating: 4.9,
      count: 28,
      items: [
        {
          id: "rev-1",
          author: "Ananya Menon",
          location: "Kochi, Kerala",
          rating: 5,
          date: "3 days ago",
          title: "The fabric drape is pure poetry!",
          comment:
            "I wore this to an evening gala at Bolgatty Palace. The dusty rose hue is so understated yet luxurious, and the satin doesn't wrinkle easily. Got compliments all night!",
          verified: true,
        },
        {
          id: "rev-2",
          author: "Rhea Shenoy",
          location: "Bangalore, Karnataka",
          rating: 5,
          date: "1 week ago",
          title: "Flattering cut & impeccable stitching",
          comment:
            "Ordered via WhatsApp and the team was so helpful in confirming my size. The packaging was exquisite with eco-friendly cloth pouches. Fits like a dream.",
          verified: true,
        },
        {
          id: "rev-3",
          author: "Priya Varma",
          location: "Mumbai, Maharashtra",
          rating: 4.8,
          date: "2 weeks ago",
          title: "Luxury feel at a thoughtful price",
          comment:
            "The satin has a lovely weight to it without being heavy. Looks just like the photos. Highly recommended boutique find!",
          verified: true,
        },
      ],
    },
  },
  {
    id: "na-2",
    slug: "linen-coord-set",
    name: "Linen Co-ord Set",
    descriptor: "Relaxed blazer & wide-leg trousers",
    tagline: "Breathable European flax tailored for effortless daytime elegance and warm tropical afternoons.",
    price: 3290,
    originalPrice: 4190,
    image: "/images/product-2.jpg",
    images: [
      "/images/product-2.jpg",
      "/images/cat-coords.jpg",
      "/images/product-7.jpg",
      "/images/featured-small.jpg",
    ],
    category: "Co-ords",
    colors: ["Sage Green", "Sand", "Cream"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New",
    isBestseller: true,
    inStock: true,
    stockCount: 8,
    sku: "AAV-CRD-002",
    description:
      "A testament to relaxed tailoring, our signature Linen Co-ord Set combines an unlined slouchy single-breasted blazer with high-waisted, wide-leg trousers. Pre-washed for a buttery soft handfeel, it effortlessly navigates boardroom meetings to coastal weekend brunches.",
    highlights: [
      "100% pure organic pre-washed flax linen",
      "Tailored notch lapel with horn-effect sustainable buttons",
      "High-rise relaxed trousers with partially elasticated back waistband",
      "Deep functional side pockets on both blazer and trousers",
      "Includes spare button and custom garment hanger",
    ],
    details: {
      fabric: "100% Certified European Flax Linen",
      fit: "Relaxed tailored fit. Take your normal size for an editorial oversized look",
      care: "Machine wash cold on gentle cycle or hand wash; line dry in shade",
      origin: "Ethically woven & crafted in Kochi, Kerala",
    },
    reviews: {
      rating: 4.8,
      count: 19,
      items: [
        {
          id: "rev-4",
          author: "Malavika Nair",
          location: "Trivandrum, Kerala",
          rating: 5,
          date: "5 days ago",
          title: "Best linen purchase in years",
          comment:
            "The Sage Green color is gorgeous and calm. It breathes so well in Kerala humidity. Extremely comfortable yet looks instantly put together.",
          verified: true,
        },
        {
          id: "rev-5",
          author: "Devika Rao",
          location: "Chennai, Tamil Nadu",
          rating: 5,
          date: "2 weeks ago",
          title: "Staple work-to-vacation outfit",
          comment:
            "Wore the blazer separately with denim and the trousers with a crop top. Versatile and high quality linen that softens further with every wash.",
          verified: true,
        },
      ],
    },
  },
  {
    id: "na-3",
    slug: "block-print-kurta",
    name: "Block Print Kurta",
    descriptor: "Handcrafted cotton with border motifs",
    tagline: "Hand-carved wooden blocks pressed onto artisanal cotton with natural herbal dyes.",
    price: 1890,
    originalPrice: 2490,
    image: "/images/product-3.jpg",
    images: [
      "/images/product-3.jpg",
      "/images/cat-kurtis.jpg",
      "/images/cat-ethnic.jpg",
      "/images/product-8.jpg",
    ],
    category: "Kurtis",
    colors: ["Terracotta", "Navy", "Blush"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: undefined,
    isBestseller: true,
    inStock: true,
    stockCount: 12,
    sku: "AAV-KRT-003",
    description:
      "Rooted in centuries-old Indian textile heritage, this A-line kurti is hand block-printed by master craftspeople using AZO-free dyes. Framed with intricate contrast piping at the keyhole neckline and side slits, it pairs seamlessly with palazzos, culottes, or classic churidars.",
    highlights: [
      "100% breathable organic cambric cotton",
      "Authentic artisanal hand block print; slight irregularities celebrate its craft",
      "Side slits designed for graceful stride and layering",
      "Intricate thread piping details along neck and cuffs",
      "Pre-shrunk fabric to prevent post-wash shrinkage",
    ],
    details: {
      fabric: "100% Handloom Cambric Cotton",
      fit: "Straight regular fit; comfortable daily silhouette",
      care: "Cold hand wash with mild liquid soap; wash dark colors separately",
      origin: "Handcrafted in Bagru & tailored at Kochi Atelier",
    },
    reviews: {
      rating: 4.9,
      count: 34,
      items: [
        {
          id: "rev-6",
          author: "Gayathri Pillai",
          location: "Kochi, Kerala",
          rating: 5,
          date: "1 week ago",
          title: "Authentic block print feel",
          comment:
            "You can immediately tell this is genuine block print, not machine printed. Soft cotton that doesn't bleed color. Highly recommend!",
          verified: true,
        },
      ],
    },
  },
  {
    id: "na-4",
    slug: "gold-embroidered-anarkali",
    name: "Gold Embroidered Anarkali",
    descriptor: "Silk with zari border & dupatta",
    tagline: "Regal chanderi silk embellished with delicate hand-stitched zardozi and antique gold zari.",
    price: 4990,
    originalPrice: 6490,
    image: "/images/product-4.jpg",
    images: [
      "/images/product-4.jpg",
      "/images/cat-ethnic.jpg",
      "/images/featured-large.jpg",
      "/images/cat-partywear.jpg",
    ],
    category: "Ethnic",
    colors: ["Teal", "Burgundy", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Sale",
    isBestseller: true,
    inStock: true,
    stockCount: 4,
    sku: "AAV-ANK-004",
    description:
      "A grand celebratory silhouette tailored from rich Chanderi silk. The anarkali features an 18-kali flair that sweeps the floor with graceful drama, adorned with hand-embroidered gota patti work along the neckline and hem. Accompanied by an organza dupatta finished with scalloped zari embroidery.",
    highlights: [
      "Lustrous Chanderi silk blend with santoon inner lining",
      "18-kali voluminous flare creating dramatic festive movement",
      "Handcrafted zardozi and antique tilla threadwork",
      "Includes pure organza dupatta with hand-scalloped borders and matching churidar",
      "Generous inner seam allowances for custom tailoring adjustments",
    ],
    details: {
      fabric: "Chanderi Silk with Santoon Lining & Organza Dupatta",
      fit: "Fitted bodice with flared floor-length skirt",
      care: "Strictly dry clean only; store wrapped in muslin cloth",
      origin: "Master artisans in Kochi & Lucknow",
    },
    reviews: {
      rating: 5.0,
      count: 15,
      items: [
        {
          id: "rev-7",
          author: "Sneha Kurian",
          location: "Kottayam, Kerala",
          rating: 5,
          date: "4 days ago",
          title: "Wore this for my cousin's sangeet!",
          comment:
            "The teal shade is stunning in real life under evening lights. The flair is so grand and the organza dupatta is weightless. Received so many compliments!",
          verified: true,
        },
      ],
    },
  },
  {
    id: "na-5",
    slug: "off-shoulder-linen-top",
    name: "Off-Shoulder Linen Top",
    descriptor: "Effortless summer essential",
    tagline: "Romantic ruffled silhouette designed for warm coastal breezes and sunlit holidays.",
    price: 1290,
    originalPrice: 1790,
    image: "/images/product-5.jpg",
    images: [
      "/images/product-5.jpg",
      "/images/cat-tops.jpg",
      "/images/product-2.jpg",
      "/images/cat-coords.jpg",
    ],
    category: "Tops",
    colors: ["Sand", "Cream", "Lavender"],
    sizes: ["XS", "S", "M", "L"],
    badge: "New",
    isBestseller: true,
    inStock: true,
    stockCount: 10,
    sku: "AAV-TOP-005",
    description:
      "The epitome of easy luxury, our off-shoulder top features a gentle elasticated neckline that stays securely in place without digging into the shoulders. Cut from lightweight slub linen with balloon sleeves and a relaxed flutter bodice.",
    highlights: [
      "100% lightweight pure linen with natural slub texture",
      "Soft stretch smocking along neckline for secure off-shoulder wear",
      "Balloon sleeves with delicate elasticated cuffs",
      "Easy tuck-in length compatible with high-waisted bottoms",
    ],
    details: {
      fabric: "100% Slub Linen",
      fit: "Relaxed easy fit; smocked upper bust",
      care: "Machine wash cold; warm iron or steam while slightly damp",
      origin: "Crafted in Kochi, Kerala",
    },
    reviews: {
      rating: 4.7,
      count: 12,
      items: [
        {
          id: "rev-8",
          author: "Tara Cherian",
          location: "Alappuzha, Kerala",
          rating: 5,
          date: "1 week ago",
          title: "Doesn't ride up!",
          comment:
            "Usually off-shoulder tops ride up when moving arms, but this one stays put comfortably. Fabric is super breathable.",
          verified: true,
        },
      ],
    },
  },
  {
    id: "na-6",
    slug: "floral-wrap-maxi",
    name: "Floral Wrap Maxi",
    descriptor: "Flowy print with tie-front waist",
    tagline: "Vintage botanical prints on breezy georgette tailored for daytime celebrations.",
    price: 2190,
    originalPrice: 2890,
    image: "/images/product-1.jpg",
    images: [
      "/images/product-1.jpg",
      "/images/cat-dresses.jpg",
      "/images/cat-partywear.jpg",
      "/images/product-4.jpg",
    ],
    category: "Dresses",
    colors: ["Dusty Rose", "Teal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: undefined,
    isBestseller: false,
    inStock: true,
    stockCount: 7,
    sku: "AAV-DRS-006",
    description:
      "Featuring a timeless wrap silhouette that ties neatly at the natural waist, this floral maxi dress cascades down in soft tiers. The romantic flutter sleeves and deep V-neckline create an elongated silhouette ideal for outdoor brunches and garden weddings.",
    highlights: [
      "Airy poly-georgette with delicate floral watercolor motifs",
      "True functional wrap design with adjustable waist sash",
      "Flutter cap sleeves and tiered ruffled hemline",
      "Includes an opaque inner slip for complete modesty",
    ],
    details: {
      fabric: "100% Crepe Georgette with Viscose Lining",
      fit: "Adjustable wrap fit for tailored silhouette",
      care: "Delicate machine wash in mesh laundry bag or gentle hand wash",
      origin: "Tailored at Kochi Atelier",
    },
    reviews: {
      rating: 4.8,
      count: 14,
      items: [
        {
          id: "rev-9",
          author: "Aiswarya Raj",
          location: "Calicut, Kerala",
          rating: 5,
          date: "2 weeks ago",
          title: "Lovely watercolor print",
          comment: "The print is even more delicate in person. The wrap waist is very forgiving and looks super flattering.",
          verified: true,
        },
      ],
    },
  },
  {
    id: "na-7",
    slug: "minimal-silk-kurta",
    name: "Minimal Silk Kurta",
    descriptor: "Understated luxury in pure silk",
    tagline: "Clean architectural lines in raw silk designed for the modern minimalist.",
    price: 3490,
    originalPrice: 4290,
    image: "/images/product-2.jpg",
    images: [
      "/images/product-2.jpg",
      "/images/cat-kurtis.jpg",
      "/images/cat-ethnic.jpg",
      "/images/featured-small.jpg",
    ],
    category: "Kurtis",
    colors: ["Ivory", "Charcoal", "Terracotta"],
    sizes: ["S", "M", "L", "XL"],
    badge: undefined,
    isBestseller: true,
    inStock: true,
    stockCount: 5,
    sku: "AAV-KRT-007",
    description:
      "Crafted from raw mulberry silk with a rich textured weave, this minimalist kurta highlights pure form and unpretentious elegance. Featuring a mandarin collar, concealed front placket, and side vents lined with contrasting silk.",
    highlights: [
      "100% Handwoven Raw Tussar/Mulberry Silk",
      "Concealed mother-of-pearl buttons along front placket",
      "Tailored mandarin collar and 3/4 sleeves with slit cuffs",
      "Clean French seams throughout interior construction",
    ],
    details: {
      fabric: "100% Pure Raw Silk",
      fit: "Straight tailored cut with clean architectural lines",
      care: "Dry clean only to maintain silk lustre",
      origin: "Woven in Bhagalpur, crafted in Kochi Atelier",
    },
    reviews: {
      rating: 5.0,
      count: 22,
      items: [
        {
          id: "rev-10",
          author: "Meera Isaac",
          location: "Kochi, Kerala",
          rating: 5,
          date: "3 weeks ago",
          title: "Pure understated luxury",
          comment: "I love that there is zero loud bling. Just pure, exquisite raw silk that drapes cleanly. Fits perfectly.",
          verified: true,
        },
      ],
    },
  },
  {
    id: "na-8",
    slug: "print-palazzos",
    name: "Print Palazzos",
    descriptor: "Relaxed co-ord with bold print",
    tagline: "Wide-leg volume with artisanal block motifs for fluid, effortless comfort.",
    price: 1690,
    originalPrice: 2190,
    image: "/images/product-3.jpg",
    images: [
      "/images/product-3.jpg",
      "/images/cat-coords.jpg",
      "/images/cat-ethnic.jpg",
      "/images/product-7.jpg",
    ],
    category: "Co-ords",
    colors: ["Navy", "Sage Green"],
    sizes: ["S", "M", "L", "XL"],
    badge: undefined,
    isBestseller: false,
    inStock: true,
    stockCount: 9,
    sku: "AAV-PLZ-008",
    description:
      "Voluminous palazzo trousers engineered for all-day ease. Cut from soft modal cotton, these pants offer breezy drape, an elasticated waistband with adjustable drawstring, and deep concealed pockets.",
    highlights: [
      "Ultra-soft breathable modal cotton blend",
      "Wide fluid leg with dramatic flared hem",
      "Comfortable elasticated waistband with tasseled drawstring",
      "Generous side slip pockets",
    ],
    details: {
      fabric: "60% Cotton, 40% Modal",
      fit: "Wide-leg relaxed fit; mid-to-high rise",
      care: "Cold machine wash with gentle spin; line dry",
      origin: "Crafted in Kochi Atelier",
    },
    reviews: {
      rating: 4.8,
      count: 11,
      items: [
        {
          id: "rev-11",
          author: "Reshma Thomas",
          location: "Kottayam, Kerala",
          rating: 5,
          date: "1 month ago",
          title: "So comfortable!",
          comment: "Pockets are deep enough for my phone, and the fabric is so soft it feels like second skin.",
          verified: true,
        },
      ],
    },
  },
];

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
