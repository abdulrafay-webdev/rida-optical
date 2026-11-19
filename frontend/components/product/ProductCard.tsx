"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPricePKR } from "@/lib/utils";
import { getOptimizedImageUrl } from "@/lib/imagekit";
import { Glasses, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariationIndex, setSelectedVariationIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentVariation = product.variations[selectedVariationIndex];
  
  // Decide which image to show:
  // If variation is selected, show its image; else fallback to primary_image
  const displayImage =
    currentVariation?.image?.url ||
    (isHovered && product.gallery_images[0]?.url) ||
    product.primary_image.url;

  const currentPrice = currentVariation?.price_pkr ?? product.base_price_pkr;
  const regularPrice = currentVariation?.regular_price_pkr ?? product.regular_price_pkr;
  const hasDiscount = regularPrice && regularPrice > currentPrice;

  return (
    <div
      className="group relative bg-white rounded-xl border border-gray-200/80 hover:border-brand-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount / Category Badge */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {hasDiscount && (
          <span className="bg-red-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
            Sale
          </span>
        )}
        {product.has_prescription_support && (
          <span className="bg-brand-navy/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-xs">
            <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
            Rx Ready
          </span>
        )}
      </div>

      {/* Frame Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block w-full aspect-4/3 bg-gray-50 overflow-hidden cursor-pointer"
      >
        <Image
          src={getOptimizedImageUrl(displayImage, { width: 450, height: 350 })}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
            {product.primary_category?.name || "Eyewear"}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-1 mb-1.5">
              {product.title}
            </h3>
          </Link>

          {/* Color Swatch Dots */}
          {product.variations.length > 0 && (
            <div className="flex items-center gap-1.5 my-2">
              <span className="text-[10px] text-gray-400 font-medium mr-1">Colors:</span>
              {product.variations.slice(0, 6).map((v, idx) => {
                const isSelected = selectedVariationIndex === idx;
                const hex = v.color.hex_code || "#333333";
                return (
                  <button
                    key={v.variation_id}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedVariationIndex(idx);
                    }}
                    title={v.color.name}
                    aria-label={`Select ${v.color.name} color`}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      isSelected
                        ? "ring-2 ring-brand-primary ring-offset-1 scale-110 border-white"
                        : "border-gray-300 hover:scale-105"
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                );
              })}
              {product.variations.length > 6 && (
                <span className="text-[10px] text-gray-400">+{product.variations.length - 6}</span>
              )}
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-gray-900">
              {formatPricePKR(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatPricePKR(regularPrice!)}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="px-3 py-1.5 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white rounded text-xs font-bold transition-colors"
          >
            Options
          </Link>
        </div>
      </div>
    </div>
  );
}
