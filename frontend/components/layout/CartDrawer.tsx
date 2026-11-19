"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPricePKR, generateWhatsAppOrderMessage } from "@/lib/utils";
import { getOptimizedImageUrl } from "@/lib/imagekit";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getShippingFee,
    getTotal,
  } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const total = getTotal();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handleWhatsAppOrder = () => {
    const waUrl = generateWhatsAppOrderMessage({
      items: items.map((item) => ({
        title: item.product.title,
        variation: item.selectedVariation?.color.name,
        opticalType: item.opticalSelection?.usage?.label,
        coating: item.opticalSelection?.coating?.label,
        quantity: item.quantity,
        price: item.unitPrice,
      })),
      subtotal,
      shipping,
      total,
    });
    window.open(waUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-primary" />
              <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">Your cart is empty</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Browse our catalog of prescription glasses and sunglasses to find your perfect frame.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-6 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-hover transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const imageUrl = getOptimizedImageUrl(
                  item.selectedVariation?.image?.url || item.product.primary_image.url,
                  { width: 120, height: 120 }
                );

                return (
                  <div key={item.id} className="py-4 flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 relative rounded-lg bg-gray-50 border border-gray-200 overflow-hidden shrink-0">
                      <Image
                        src={imageUrl}
                        alt={item.product.title}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Selected variation color */}
                        {item.selectedVariation && (
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-600">
                            <span>Color:</span>
                            {item.selectedVariation.color.hex_code && (
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-gray-300"
                                style={{ backgroundColor: item.selectedVariation.color.hex_code }}
                              />
                            )}
                            <strong className="text-gray-900">{item.selectedVariation.color.name}</strong>
                          </div>
                        )}

                        {/* Optical prescription info */}
                        {item.opticalSelection && (
                          <div className="mt-1.5 text-[11px] bg-blue-50/60 p-2 rounded border border-blue-100 text-blue-900 space-y-0.5">
                            <div className="font-semibold text-brand-primary">
                              {item.opticalSelection.type === "prescription"
                                ? "Prescription Lenses Included"
                                : "Frame Only"}
                            </div>
                            {item.opticalSelection.usage && (
                              <div>• {item.opticalSelection.usage.label}</div>
                            )}
                            {item.opticalSelection.coating && (
                              <div>
                                • {item.opticalSelection.coating.label} (+{formatPricePKR(item.opticalSelection.coating.price_pkr)})
                              </div>
                            )}
                            {item.opticalSelection.prescriptionDetails?.prescriptionText && (
                              <div className="text-[10px] text-gray-600 truncate">
                                Rx: {item.opticalSelection.prescriptionDetails.prescriptionText}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-gray-900">
                          {formatPricePKR(item.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatPricePKR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-gray-900">{formatPricePKR(shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-brand-primary">{formatPricePKR(total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-brand-primary text-white text-sm font-bold hover:bg-brand-hover transition-colors shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp (Instant Checkout)</span>
                </button>
              </div>

              <p className="text-[11px] text-gray-500 text-center">
                🔒 Safe & Secure Cash on Delivery nationwide
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
