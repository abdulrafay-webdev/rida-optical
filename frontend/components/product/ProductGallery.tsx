"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProductImage } from "@/types";
import { getOptimizedImageUrl } from "@/lib/imagekit";

interface ProductGalleryProps {
  primaryImage: ProductImage;
  galleryImages: ProductImage[];
  activeVariationImage?: ProductImage;
  title: string;
}

export default function ProductGallery({
  primaryImage,
  galleryImages,
  activeVariationImage,
  title,
}: ProductGalleryProps) {
  // Combine all images into a unified array without duplicates
  const allImages: ProductImage[] = [primaryImage, ...galleryImages];
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    activeVariationImage || primaryImage
  );

  // When active variation image changes, switch main view to that variant
  useEffect(() => {
    if (activeVariationImage) {
      setSelectedImage(activeVariationImage);
    }
  }, [activeVariationImage]);

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative w-full aspect-4/3 bg-gray-50 rounded-2xl border border-gray-200/80 overflow-hidden flex items-center justify-center shadow-xs">
        <Image
          src={getOptimizedImageUrl(selectedImage.url, { width: 800, height: 600 })}
          alt={selectedImage.alt_text || title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6 transition-all duration-300"
        />
      </div>

      {/* Thumbnail Carousel / Grid */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {allImages.map((img, idx) => {
            const isSelected = selectedImage.url === img.url;
            return (
              <button
                key={`${img.id}-${idx}`}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded-xl bg-gray-50 border-2 overflow-hidden shrink-0 transition-all ${
                  isSelected
                    ? "border-brand-primary ring-2 ring-brand-primary/20 scale-105"
                    : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={getOptimizedImageUrl(img.url, { width: 120, height: 120 })}
                  alt={img.alt_text || `${title} angle ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1.5"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
