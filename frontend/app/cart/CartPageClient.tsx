"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { formatPricePKR, generateWhatsAppOrderMessage } from "@/lib/utils";
import { getOptimizedImageUrl } from "@/lib/imagekit";
import { validateCoupon } from "@/lib/api";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Truck,
  Tag,
  Check,
} from "lucide-react";

export default function CartPageClient() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getShippingFee,
    getTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getDiscount,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponMsg(null);
    try {
      const res = await validateCoupon(couponCode, subtotal);
      if (res.valid) {
        applyCoupon({
          code: res.code,
          discountPercent: res.discount_percent,
          discountAmount: res.discount_amount_pkr,
        });
        setCouponMsg({ text: res.message, isError: false });
        setCouponCode("");
      } else {
        setCouponMsg({ text: res.message, isError: true });
      }
    } catch (err: any) {
      setCouponMsg({
        text: err.message || "Failed to validate coupon code.",
        isError: true,
      });
    } finally {
      setCouponLoading(false);
    }
  };

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

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-gray-900">Your Cart is Empty</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm">
          You haven&apos;t added any optical frames or lenses to your bag yet.
        </p>
        <Link
          href="/store"
          className="mt-6 px-8 py-3 rounded-xl bg-brand-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-hover shadow-md transition-all"
        >
          Explore Eyewear Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-surface/40 min-h-screen py-10 sm:py-16">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-black">
              Shopping Cart
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Review your selected frames, color variants, and optical lens specifications.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/80 shadow-xs divide-y divide-gray-100 overflow-hidden">
            {items.map((item) => {
              const imageUrl = getOptimizedImageUrl(
                item.selectedVariation?.image?.url || item.product.primary_image.url,
                { width: 160, height: 160 }
              );

              return (
                <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 rounded-xl bg-gray-50 border border-gray-200 overflow-hidden shrink-0 mx-auto sm:mx-0">
                    <Image
                      src={imageUrl}
                      alt={item.product.title}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="text-sm sm:text-base font-bold text-gray-900 hover:text-brand-primary transition-colors"
                          >
                            {item.product.title}
                          </Link>
                          {item.selectedVariation && (
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                              <span>Color:</span>
                              {item.selectedVariation.color.hex_code && (
                                <span
                                  className="w-3 h-3 rounded-full border border-gray-300"
                                  style={{
                                    backgroundColor: item.selectedVariation.color.hex_code,
                                  }}
                                />
                              )}
                              <strong className="text-gray-900">
                                {item.selectedVariation.color.name}
                              </strong>
                              <span className="text-gray-400">•</span>
                              <span className="font-mono text-[11px] text-gray-500">
                                {item.selectedVariation.sku}
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Optical Configuration Details */}
                      {item.opticalSelection && (
                        <div className="mt-3 p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 space-y-1">
                          <div className="font-bold text-brand-primary flex items-center justify-between">
                            <span>
                              {item.opticalSelection.type === "prescription"
                                ? "Prescription Lenses Included"
                                : "Frame Only"}
                            </span>
                            {item.opticalSelection.coating && (
                              <span>
                                +{formatPricePKR(item.opticalSelection.coating.price_pkr)}
                              </span>
                            )}
                          </div>
                          {item.opticalSelection.usage && (
                            <div className="text-[11px] text-gray-700">
                              Usage: <strong>{item.opticalSelection.usage.label}</strong>
                            </div>
                          )}
                          {item.opticalSelection.coating && (
                            <div className="text-[11px] text-gray-700">
                              Coating: <strong>{item.opticalSelection.coating.label}</strong>
                            </div>
                          )}
                          {item.opticalSelection.prescriptionDetails?.prescriptionText && (
                            <div className="text-[11px] text-gray-600 bg-white/70 p-1.5 rounded mt-1 font-mono">
                              Rx: {item.opticalSelection.prescriptionDetails.prescriptionText}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quantity & Item Total */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-600 hover:text-black font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-600 hover:text-black font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 block">Item Total</span>
                        <span className="text-base font-black text-gray-900">
                          {formatPricePKR(item.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Sticky Card */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-5 sticky top-28">
            <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">{formatPricePKR(subtotal)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-green-700 font-bold bg-green-50 p-2 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-green-600" />
                    <span>Coupon ({appliedCoupon.code})</span>
                    <button
                      onClick={removeCoupon}
                      className="text-[10px] text-gray-400 hover:text-red-500 underline ml-1 font-normal"
                    >
                      Remove
                    </button>
                  </div>
                  <span>-{formatPricePKR(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-bold text-gray-900">{formatPricePKR(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-brand-primary">{formatPricePKR(total)}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-gray-100">
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Have a coupon code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. OFF10 or RIDA10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg uppercase tracking-wider focus:outline-none focus:border-brand-primary"
                />
                <button
                  type="submit"
                  disabled={couponLoading || !couponCode.trim()}
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg disabled:opacity-50 transition-colors"
                >
                  {couponLoading ? "Applying..." : "Apply"}
                </button>
              </div>
              {couponMsg && (
                <p
                  className={`text-[11px] mt-1.5 font-medium ${
                    couponMsg.isError ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {couponMsg.text}
                </p>
              )}
            </form>

            <div className="space-y-2 pt-2">
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold tracking-wider uppercase shadow-md transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-bold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100 text-[11px] text-gray-500">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>Flat rate delivery PKR 349 nationwide across Pakistan.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>Cash on delivery accepted at your doorstep.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
