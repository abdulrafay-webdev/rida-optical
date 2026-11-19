"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import {
  formatPricePKR,
  generateWhatsAppOrderMessage,
  STORE_PHONE_DISPLAY,
} from "@/lib/utils";
import { CheckoutFormData } from "@/types";
import { createOrder, ApiOrderCreatePayload } from "@/lib/api";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  MessageCircle,
  Banknote,
  ArrowRight,
  ShoppingBag,
  Tag,
} from "lucide-react";

export default function CheckoutPageClient() {
  const {
    items,
    getSubtotal,
    getShippingFee,
    getTotal,
    getDiscount,
    appliedCoupon,
    clearCart,
  } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    phone: "",
    alternatePhone: "",
    email: "",
    address: "",
    city: "Karachi",
    postalCode: "",
    orderNotes: "",
    paymentMethod: "cod",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    waUrl: string;
    total: number;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please fill in your name, mobile number, and complete delivery address.");
      return;
    }

    setIsSubmitting(true);

    const fallbackOrderId = `RO-${Math.floor(10000 + Math.random() * 90000)}`;

    const payload: ApiOrderCreatePayload = {
      customer: {
        full_name: formData.fullName,
        phone: formData.phone,
        alternate_phone: formData.alternatePhone || undefined,
        email: formData.email || undefined,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode || undefined,
        order_notes: formData.orderNotes || undefined,
      },
      items: items.map((it) => ({
        product_id: it.product.id,
        variation_id: it.selectedVariation?.variation_id,
        quantity: it.quantity,
        optical_selection: it.opticalSelection
          ? {
              type: it.opticalSelection.type,
              usage_id: it.opticalSelection.usage?.id,
              coating_id: it.opticalSelection.coating?.id,
              prescription: it.opticalSelection.prescriptionDetails
                ? {
                    prescription_text: it.opticalSelection.prescriptionDetails.prescriptionText,
                    prescription_file_url: it.opticalSelection.prescriptionDetails.prescriptionFileName,
                    sph_od: it.opticalSelection.prescriptionDetails.rightEye?.sph,
                    cyl_od: it.opticalSelection.prescriptionDetails.rightEye?.cyl,
                    axis_od: it.opticalSelection.prescriptionDetails.rightEye?.axis,
                    sph_os: it.opticalSelection.prescriptionDetails.leftEye?.sph,
                    cyl_os: it.opticalSelection.prescriptionDetails.leftEye?.cyl,
                    axis_os: it.opticalSelection.prescriptionDetails.leftEye?.axis,
                  }
                : undefined,
            }
          : undefined,
      })),
      payment_method: "cod",
      coupon_code: appliedCoupon?.code,
    };

    let finalOrderId = fallbackOrderId;
    let finalWaUrl = "";
    let finalTotal = total;

    try {
      const res = await createOrder(payload);
      finalOrderId = res.order_id;
      finalWaUrl = res.whatsapp_url;
      finalTotal = res.total_amount_pkr;
    } catch (apiErr) {
      console.warn("Backend API not reachable directly, fallback to client-side WhatsApp generation:", apiErr);
      finalWaUrl = generateWhatsAppOrderMessage({
        orderId: fallbackOrderId,
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
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        },
      });
    }

    setCompletedOrder({
      orderId: finalOrderId,
      waUrl: finalWaUrl,
      total: finalTotal,
    });
    clearCart();
    setIsSubmitting(false);
  };

  if (completedOrder) {
    return (
      <div className="min-h-[70vh] bg-brand-surface/30 flex items-center justify-center py-16 px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-gray-200/80 p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Order Number: <strong className="text-black font-mono">{completedOrder.orderId}</strong>
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 text-xs text-left space-y-2 border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount (COD):</span>
              <strong className="text-brand-primary font-bold">
                {formatPricePKR(completedOrder.total)}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Status:</span>
              <span className="font-semibold text-gray-800">Processing Dispatch</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Customer Support:</span>
              <span className="font-semibold text-gray-800">{STORE_PHONE_DISPLAY}</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Our optician team is preparing your optical frames. For fastest order processing or to attach your prescription picture directly, click below to confirm on WhatsApp:
          </p>

          <div className="space-y-2">
            <a
              href={completedOrder.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Confirm Order on WhatsApp</span>
            </a>

            <Link
              href="/"
              className="w-full block py-2.5 text-xs font-bold text-gray-600 hover:text-black transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">No Items to Checkout</h2>
        <p className="text-xs text-gray-500 mt-1">
          Please add a frame or lenses to your cart first.
        </p>
        <Link
          href="/store"
          className="mt-4 px-6 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-hover"
        >
          Browse Frames
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-surface/40 min-h-screen py-10 sm:py-16">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-black">
            Cash on Delivery Checkout
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Enter your shipping details below. Pay upon receiving your eyewear at your doorstep.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 space-y-6">
              {/* Shipping Address Section */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
                  1. Shipping Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Muhammad Ali"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 0321 1234567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Alternative Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      name="alternatePhone"
                      placeholder="e.g. 0300 7654321"
                      value={formData.alternatePhone}
                      onChange={handleChange}
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. ali@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Street Address & House / Flat No. <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    placeholder="House / Flat #, Building name, Street, Nearest landmark..."
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-brand-primary"
                    >
                      <option value="Karachi">Karachi (Same/Next Day)</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Other">Other City (All Pakistan)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="e.g. 74700"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Order Notes & Prescription Details (Optional)
                  </label>
                  <textarea
                    name="orderNotes"
                    rows={2}
                    placeholder="Any special fitting requests, PD measurement, or delivery time preferences..."
                    value={formData.orderNotes}
                    onChange={handleChange}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
                  2. Payment Method
                </h2>

                <div className="p-4 rounded-xl border-2 border-brand-primary bg-brand-primary/5 flex items-start gap-3">
                  <Banknote className="w-6 h-6 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">
                      Cash on Delivery (COD) — Nationwide
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                      Pay in cash to the delivery courier when your package arrives at your home.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Review */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-5 sticky top-28">
              <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                Order Review ({items.length} {items.length === 1 ? "Item" : "Items"})
              </h2>

              {/* Item Summary List */}
              <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-2.5 flex justify-between items-start gap-2">
                    <div className="text-xs">
                      <strong className="text-gray-900 line-clamp-1">{item.product.title}</strong>
                      <div className="text-[11px] text-gray-500">
                        {item.selectedVariation?.color.name} × {item.quantity}
                      </div>
                      {item.opticalSelection?.coating && (
                        <div className="text-[10px] text-brand-primary">
                          {item.opticalSelection.coating.label}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-gray-900 whitespace-nowrap">
                      {formatPricePKR(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-gray-200 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPricePKR(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-700 font-bold bg-green-50 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-green-600" />
                      <span>Coupon Applied ({appliedCoupon.code})</span>
                    </div>
                    <span>-{formatPricePKR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Flat Rate Shipping</span>
                  <span className="font-bold text-gray-900">{formatPricePKR(shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total Due (COD)</span>
                  <span className="text-brand-primary">{formatPricePKR(total)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Placing Order...</span>
                ) : (
                  <>
                    <span>Place Order (Cash on Delivery)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="space-y-1.5 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span>Dispatched via verified courier (TCS / Leopards)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span>100% money-back lens accuracy guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
