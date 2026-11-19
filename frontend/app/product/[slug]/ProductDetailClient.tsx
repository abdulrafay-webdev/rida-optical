"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, OpticalSelection } from "@/types";
import { formatPricePKR, generateWhatsAppOrderMessage } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import ProductGallery from "@/components/product/ProductGallery";
import ColorSwatchPicker from "@/components/product/ColorSwatchPicker";
import OpticalPrescriptionBuilder from "@/components/product/OpticalPrescriptionBuilder";
import ImportantNoticeBanner from "@/components/product/ImportantNoticeBanner";
import ProductCard from "@/components/product/ProductCard";
import {
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  // Selected variation index (default to first)
  const [selectedVarIndex, setSelectedVarIndex] = useState<number>(0);
  const activeVariation = product.variations[selectedVarIndex];

  // Optical lens configuration state
  const [opticalSelection, setOpticalSelection] = useState<OpticalSelection>({
    type: "frame_only",
    totalOpticalSurcharge: 0,
  });

  const [quantity, setQuantity] = useState<number>(1);

  // Price calculations
  const baseFramePrice = activeVariation?.price_pkr ?? product.base_price_pkr;
  const regularPrice = activeVariation?.regular_price_pkr ?? product.regular_price_pkr;
  const lensSurcharge = opticalSelection.totalOpticalSurcharge;
  const unitTotal = baseFramePrice + lensSurcharge;
  const grandTotal = unitTotal * quantity;

  const handleAddToCart = () => {
    addItem({
      product,
      selectedVariation: activeVariation,
      opticalSelection:
        opticalSelection.type === "prescription" ? opticalSelection : undefined,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleWhatsAppOrder = () => {
    const waUrl = generateWhatsAppOrderMessage({
      items: [
        {
          title: product.title,
          variation: activeVariation?.color.name,
          opticalType: opticalSelection.usage?.label,
          coating: opticalSelection.coating?.label,
          quantity,
          price: unitTotal,
        },
      ],
      subtotal: grandTotal,
      shipping: 349,
      total: grandTotal + 349,
    });
    window.open(waUrl, "_blank");
  };

  return (
    <div className="bg-white py-10 sm:py-16">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <a href="/" className="hover:text-brand-primary">
            Home
          </a>
          <span>/</span>
          <a href="/store" className="hover:text-brand-primary">
            Store
          </a>
          <span>/</span>
          <a
            href={`/category/${product.primary_category?.slug || "eye-glasses"}`}
            className="hover:text-brand-primary"
          >
            {product.primary_category?.name || "Eyewear"}
          </a>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-xs">
            {product.title}
          </span>
        </nav>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery
              primaryImage={product.primary_image}
              galleryImages={product.gallery_images}
              activeVariationImage={activeVariation?.image}
              title={product.title}
            />
          </div>

          {/* Right Column: Frame Configurator */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header / Title / Pricing */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                  {product.primary_category?.name || "Optical Eyewear"}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-green-50 text-green-700">
                  {activeVariation?.stock_status === "instock" ? "In Stock" : "Available"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                {product.title}
              </h1>

              {/* Price display with optical breakdown */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl sm:text-3xl font-black text-brand-primary">
                  {formatPricePKR(unitTotal)}
                </span>
                {regularPrice && regularPrice > baseFramePrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPricePKR(regularPrice + lensSurcharge)}
                  </span>
                )}
                {lensSurcharge > 0 && (
                  <span className="text-xs text-gray-500 font-medium">
                    (Frame: {formatPricePKR(baseFramePrice)} + Lenses:{" "}
                    {formatPricePKR(lensSurcharge)})
                  </span>
                )}
              </div>
            </div>

            {/* Important Optical Notice Banner */}
            <ImportantNoticeBanner />

            {/* Color Swatch Picker */}
            {product.variations.length > 0 && (
              <ColorSwatchPicker
                variations={product.variations}
                selectedIndex={selectedVarIndex}
                onSelect={(idx) => setSelectedVarIndex(idx)}
              />
            )}

            {/* Optical Prescription Lens Configurator */}
            {product.has_prescription_support && (
              <OpticalPrescriptionBuilder
                selection={opticalSelection}
                onChange={(newSel) => setOpticalSelection(newSel)}
              />
            )}

            {/* Quantity Selector & Grand Total */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:text-black font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-gray-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:text-black font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-gray-500 block">Total</span>
                <span className="text-lg font-black text-gray-900">
                  {formatPricePKR(grandTotal)}
                </span>
              </div>
            </div>

            {/* Primary CTA Trio */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-navy hover:bg-black text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Order via WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp (+92 321 2318001)</span>
              </button>
            </div>

            {/* Trust Assurance */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-[11px] text-gray-500 text-center">
              <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
                <Truck className="w-4 h-4 text-brand-primary" />
                <span className="font-semibold text-gray-800">PKR 349 Delivery</span>
                <span>All Cities in PK</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span className="font-semibold text-gray-800">100% Quality</span>
                <span>Certified Opticians</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
                <RotateCcw className="w-4 h-4 text-brand-primary" />
                <span className="font-semibold text-gray-800">COD Available</span>
                <span>Pay Upon Arrival</span>
              </div>
            </div>

            {/* Description & Technical Specs */}
            {product.description && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Product Overview & Specifications
                </h3>
                <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line space-y-2">
                  {product.description}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
