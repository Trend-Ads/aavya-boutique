import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aavyaboutique.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Aavya Boutique — Designer Women's Fashion & Ethnic Wear, Kochi",
    template: "%s | Aavya Boutique",
  },
  description:
    "Discover contemporary women's fashion and artisanal ethnic wear at Aavya Boutique, Kochi. Shop designer kurtis, handcrafted co-ord sets, elegant dresses, and festive fusion wear. Fast delivery across India with seamless WhatsApp checkout.",
  applicationName: "Aavya Boutique",
  keywords: [
    // Brand & Local
    "Aavya Boutique",
    "Aavya Boutique Kochi",
    "Aavya Boutique Kerala",
    "boutiques in Kochi",
    "women's boutique Kochi",
    "best clothing boutique Kochi",
    "designer boutique Panampilly Nagar Kochi",
    "Kerala fashion boutique",
    // Products & Styles
    "designer kurtis online India",
    "contemporary ethnic wear for women",
    "co-ord sets for women",
    "linen co-ord sets",
    "satin midi dress",
    "block print kurta sets",
    "anarkali suits online India",
    "festive wear kurtis",
    "handcrafted Indian dresses",
    "wedding guest outfits India",
    "festive fusion wear",
    "contemporary sarees and tunics",
    "cotton kurtis for women",
    "chanderi silk kurta set",
    "resort wear women India",
    "office wear kurtis",
    "party wear dresses Kochi",
    // Shopping & Intent
    "buy women's clothes online India",
    "WhatsApp shopping boutique India",
    "order boutique clothes WhatsApp",
    "online boutique shopping India",
    "free shipping boutique India",
    "sustainable fashion India",
    "Aavya Boutique online",
    "aavyaboutique.in",
  ],
  authors: [{ name: "Aavya Boutique", url: baseUrl }],
  creator: "Aavya Boutique",
  publisher: "Aavya Boutique",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Aavya Boutique — Designer Women's Fashion & Ethnic Wear, Kochi",
    description:
      "Contemporary women's fashion curated for the modern Indian woman. Shop designer kurtis, handcrafted co-ord sets, dresses, and festive wear. Free shipping across India.",
    url: baseUrl,
    siteName: "Aavya Boutique",
    images: [
      {
        url: "/hero/hero1.png",
        width: 1200,
        height: 630,
        alt: "Aavya Boutique Kochi — Contemporary Indian Fashion Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aavya Boutique — Designer Women's Fashion & Ethnic Wear, Kochi",
    description:
      "Contemporary styles curated for the modern Indian woman. Shop designer kurtis, co-ords & dresses. Delivered across India.",
    images: ["/hero/hero1.png"],
    creator: "@aavyaboutique.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "fashion",
  classification: "Clothing Boutique",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F8F5F0",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ClothingStore", "OnlineStore"],
      "@id": `${baseUrl}/#organization`,
      name: "Aavya Boutique",
      alternateName: ["Aavya Boutique Kochi", "Aavya Fashion"],
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/hero/hero1.png`,
        caption: "Aavya Boutique Logo",
      },
      image: `${baseUrl}/hero/hero1.png`,
      description:
        "Aavya Boutique is a premier contemporary women's fashion and ethnic wear boutique based in Kochi, Kerala. Specializing in designer kurtis, handcrafted co-ord sets, dresses, and festive fusion wear with pan-India delivery and direct WhatsApp shopping.",
      telephone: "+91-8594031993",
      email: "contact@aavyaboutique.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kochi",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 9.9312,
        longitude: 76.2673,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "20:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/aavyaboutique.in",
        "https://wa.me/918594031993",
      ],
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash on Delivery, UPI, Credit Card, Debit Card, Net Banking, Razorpay",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Aavya Boutique",
      description: "Contemporary Women's Fashion & Designer Ethnic Wear, Kochi",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body style={{ backgroundColor: "var(--color-ivory)", color: "var(--color-charcoal)", overflowX: "hidden" }}>
        <div style={{ overflowX: "hidden", width: "100%", position: "relative" }}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
