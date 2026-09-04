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

export const metadata: Metadata = {
  title: "Aavya Boutique — Modern Women's Fashion, Kochi",
  description:
    "Discover contemporary women's fashion curated for the modern Indian woman. Shop kurtis, dresses, co-ord sets, ethnic wear & more. Based in Kochi, delivering across India.",
  keywords:
    "women's fashion, Indian boutique, kurtis, dresses, co-ord sets, ethnic wear, Kochi boutique, online shopping India, Aavya Boutique",
  authors: [{ name: "Aavya Boutique" }],
  openGraph: {
    title: "Aavya Boutique — Modern Women's Fashion",
    description:
      "Contemporary styles curated for the modern Indian woman. Free shipping across India.",
    type: "website",
    locale: "en_IN",
    siteName: "Aavya Boutique",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aavya Boutique",
    description: "Modern women's fashion. Curated in Kochi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F8F5F0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body style={{ backgroundColor: "var(--color-ivory)", color: "var(--color-charcoal)", overflowX: "hidden" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
