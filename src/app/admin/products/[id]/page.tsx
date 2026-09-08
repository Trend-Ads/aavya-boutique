import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductRecord } from "@/types/product";
import AdminProductDetailView from "@/components/admin/AdminProductDetailView";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Product Details (${id}) | Aavya Boutique Admin`,
  };
}

export default async function AdminProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  let product: ProductRecord | null = null;

  try {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        id
      );

    let query = supabase.from("products").select("*");
    if (isUuid) {
      query = query.or(`id.eq.${id},slug.eq.${id}`);
    } else {
      query = query.eq("slug", id);
    }

    const { data, error } = await query.maybeSingle();

    if (!error && data) {
      product = {
        ...data,
        originalPrice: data.original_price,
        stockCount: data.stock_count,
        inStock: data.in_stock,
        isBestseller: data.is_bestseller,
        is_listed: data.is_listed !== false,
      };
    }
  } catch {
    // Supabase query error
  }

  if (!product) {
    notFound();
  }

  return <AdminProductDetailView product={product} />;
}
