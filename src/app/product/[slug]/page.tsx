import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import ProductDetailView from "@/components/ProductDetailView";
import { getProductBySlug, getAllProducts, getRelatedProducts } from "@/data/products";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aavyaboutique.in";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Garment Not Found | Aavya Boutique",
      description: "Explore the contemporary fashion collection at Aavya Boutique, Kochi.",
    };
  }

  const title = `${product.name} — Designer ${product.category}`;
  const description = `${product.tagline} Handcrafted at Aavya Boutique Kochi. 100% artisanal fabrics with Pan-India express delivery & WhatsApp shopping.`;
  const canonicalUrl = `${baseUrl}/product/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Aavya Boutique Kochi`,
      description,
      url: canonicalUrl,
      siteName: "Aavya Boutique",
      images: [
        {
          url: product.image,
          width: 1000,
          height: 1250,
          alt: `${product.name} — Aavya Boutique`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Aavya Boutique`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    const fallbackRelated = getAllProducts().slice(0, 4);

    return (
      <>
        <AnnouncementBar />
        <Header />
        <main
          style={{
            backgroundColor: "var(--color-ivory)",
            minHeight: "75vh",
            paddingTop: "9rem",
            paddingBottom: "5rem",
            textAlign: "center",
          }}
        >
          <div className="container-brand" style={{ maxWidth: "580px", margin: "0 auto" }}>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>
              Collection Archive
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 400,
                color: "var(--color-charcoal)",
                marginBottom: "1rem",
              }}
            >
              Silhouette Not Found
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--color-taupe)",
                lineHeight: 1.6,
                marginBottom: "2rem",
              }}
            >
              The garment you are looking for may have been retired to our archive or belongs to a limited seasonal edition. Discover our ongoing collection below.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <Link href="/" className="btn-primary">
                Return to Home
              </Link>
              <Link href="/#shop" className="btn-outline">
                Browse Collection
              </Link>
            </div>
          </div>
        </main>
        <CartDrawer />
        <SearchOverlay />
      </>
    );
  }

  const relatedProducts = getRelatedProducts(product.category, product.slug, 4);

  // Schema.org Product structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => `${baseUrl}${img}`),
    description: product.description,
    sku: product.sku,
    mpn: product.sku,
    brand: {
      "@type": "Brand",
      name: "Aavya Boutique",
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Aavya Boutique",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.reviews.rating,
      reviewCount: product.reviews.count,
    },
    review: product.reviews.items.map((rev) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: rev.rating,
      },
      author: {
        "@type": "Person",
        name: rev.author,
      },
      datePublished: "2026-03-01",
      reviewBody: rev.comment,
    })),
  };

  return (
    <>
      {/* Schema.org Product Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fixed UI Layers */}
      <AnnouncementBar />
      <Header />

      {/* Main Interactive Product Detail */}
      <main id="main-content" aria-label={`${product.name} Details — Aavya Boutique`}>
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </main>

      {/* Global Drawers & Mobile Nav */}
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}
