import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CATEGORIES,
  getCategoryBySlug,
  getProductsByCategory,
  PRODUCTS,
} from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import { Glasses, ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category — Rida Optical",
    };
  }

  return {
    title: `${category.name} — Buy Online in Pakistan | Rida Optical`,
    description: `Shop genuine ${category.name} at Rida Optical. Custom optical prescription lenses, blue-cut coatings, and nationwide Cash on Delivery across Pakistan.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Get products assigned to this category, or fallback to all if zero
  let products = getProductsByCategory(slug);
  const isFallback = products.length === 0;
  if (isFallback) {
    // Show top optical glasses with a helpful note
    products = PRODUCTS.slice(0, 8);
  }

  return (
    <div className="bg-brand-surface/40 min-h-screen py-10 sm:py-14">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/store" className="hover:text-brand-primary">
            Categories
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">{category.name}</span>
        </nav>

        {/* Category Header Banner */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">
                <Glasses className="w-4 h-4" />
                <span>Eyewear Category</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-black">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-2xl">
                Explore our selection of {category.name.toLowerCase()}. All frames can be fitted with single vision, bifocal, or progressive prescription lenses.
              </p>
            </div>

            <Link
              href="/store"
              className="inline-flex items-center gap-1.5 self-start sm:self-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Frames</span>
            </Link>
          </div>
        </div>

        {/* If category had 0 items, show notice */}
        {isFallback && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 mb-8 flex items-center justify-between">
            <span>
              ℹ️ We are currently updating specific catalog listings for <strong>{category.name}</strong>. In the meantime, browse our compatible bestseller frames below:
            </span>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
