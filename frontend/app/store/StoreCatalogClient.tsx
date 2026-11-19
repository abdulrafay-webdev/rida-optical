"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Product, Category } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import { Search, SlidersHorizontal, Glasses, X } from "lucide-react";

interface StoreCatalogClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function StoreCatalogClient({
  initialProducts,
  categories,
}: StoreCatalogClientProps) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc">("featured");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.variations.some((v) => v.color.name.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) =>
          p.primary_category?.slug === selectedCategory ||
          p.all_categories?.some((c) => c.slug === selectedCategory)
      );
    }

    // Sort
    if (sortBy === "price_asc") {
      result.sort((a, b) => a.base_price_pkr - b.base_price_pkr);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.base_price_pkr - a.base_price_pkr);
    }

    return result;
  }, [initialProducts, searchQuery, selectedCategory, sortBy]);

  // Optical primary categories for chips
  const relevantCategories = categories.filter(
    (c) => [133, 132, 176, 177, 131, 167].includes(c.id) || (c.product_count ?? 0) > 0
  );

  return (
    <div className="bg-brand-surface/40 min-h-screen py-10">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">
            <Glasses className="w-4 h-4" />
            <span>Complete Optical Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-black">
            Eyeglass Frames & Sunglasses
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
            Browse our full catalog of {initialProducts.length} designer eyewear frames. All frames support custom optical single vision, bifocal, or progressive prescription lenses.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by model name, color, or SKU (RO-...)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto text-xs">
              <span className="text-gray-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-3 border border-gray-300 rounded-lg bg-white text-gray-800 font-medium focus:outline-none focus:border-brand-primary"
              >
                <option value="featured">Featured / Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-brand-primary text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Glasses ({initialProducts.length})
            </button>
            {relevantCategories.map((c) => {
              const isSelected = selectedCategory === c.slug;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-brand-primary text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
          <span>
            Showing <strong>{filteredProducts.length}</strong> of {initialProducts.length} products
          </span>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-brand-primary hover:underline font-semibold"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto">
            <Glasses className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">No matching frames found</h3>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your search terms or clearing the selected filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-hover"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
