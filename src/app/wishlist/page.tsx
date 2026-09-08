import { Metadata } from "next";
import WishlistView from "@/components/WishlistView";

export const metadata: Metadata = {
  title: "My Wishlist | Curated Luxury & Festive Couture | Aavya Boutique",
  description:
    "View your saved handcrafted silhouettes, artisanal ensembles, and bespoke festive wear at Aavya Boutique Kochi.",
};

export default function WishlistPage() {
  return <WishlistView />;
}
