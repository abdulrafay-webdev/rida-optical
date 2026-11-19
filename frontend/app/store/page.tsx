import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import StoreCatalogClient from "./StoreCatalogClient";

export const metadata: Metadata = {
  title: "Shop All Optical Glasses & Frames — Rida Optical Pakistan",
  description:
    "Explore our complete range of high-quality eyeglass frames, blue-cut computer glasses, transition lenses, and sunglasses with Cash on Delivery in Pakistan.",
};

export default function StorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-20 text-center">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-gray-500">Loading Optical Collection...</p>
        </div>
      }
    >
      <StoreCatalogClient
        initialProducts={PRODUCTS}
        categories={CATEGORIES}
      />
    </Suspense>
  );
}
