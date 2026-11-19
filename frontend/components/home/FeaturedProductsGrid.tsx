import React from "react";
import Link from "next/link";
import { ArrowRight, Glasses } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/data";

export default function FeaturedProductsGrid() {
  // Show 8 featured products on homepage
  const featured = PRODUCTS.slice(0, 8);

  return (
    <section className="py-16 bg-brand-surface/60 border-y border-gray-100">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-primary uppercase tracking-wider">
              <Glasses className="w-4 h-4" />
              <span>Catalog Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-1">
              Featured Eyewear & Optical Frames
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Hand-picked bestsellers ready for single vision, bifocal, and progressive prescription lenses.
            </p>
          </div>

          <Link
            href="/store"
            className="flex items-center gap-2 text-xs font-bold text-brand-primary hover:text-brand-hover bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-all"
          >
            <span>View All ({PRODUCTS.length}) Frames</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-column product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-brand-navy hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Browse Complete Optical Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
