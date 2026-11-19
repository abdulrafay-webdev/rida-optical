import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found — Rida Optical",
    };
  }

  return {
    title: `${product.title} — Rida Optical Pakistan`,
    description:
      product.description?.slice(0, 160) ||
      `Buy ${product.title} online with prescription lenses, blue-cut coating, and nationwide Cash on Delivery in Pakistan.`,
    openGraph: {
      title: `${product.title} — Rida Optical`,
      description: `Buy ${product.title} online with custom prescription lenses in Pakistan.`,
      images: [
        {
          url: product.primary_image.url,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, product.primary_category?.slug, 4);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
