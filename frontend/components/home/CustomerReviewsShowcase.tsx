"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  MessageCircle,
  ZoomIn,
  X,
  ChevronRight,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { getReviews, ApiReviewItem } from "@/lib/api";

const FALLBACK_REVIEWS: ApiReviewItem[] = [
  {
    id: 1,
    customer_name: "Muhammad Ali",
    city: "Karachi",
    rating: 5,
    image_url:
      "https://ik.imagekit.io/ridaoptical/2026/07/Screenshot_20260723-110035.png",
    product_name: "Maybach Premium Rimless Frame",
    comment:
      "Assalam o Alaikum! Frame receive ho gaya hay, quality bohot zabardast hay aur prescription lenses bilkul accurate hain. Shukriya!",
    created_at: "2026-07-23T11:00:35Z",
  },
  {
    id: 2,
    customer_name: "Zeeshan Ahmed",
    city: "Lahore",
    rating: 5,
    image_url:
      "https://ik.imagekit.io/ridaoptical/2026/07/Screenshot_20260723-1831262.jpg",
    product_name: "Fashion Eye Glasses (Balenciaga Style)",
    comment:
      "Parcel received safely via Leopard Courier with COD. Blue cut lenses are awesome for laptop work. 5 stars!",
    created_at: "2026-07-23T18:31:26Z",
  },
  {
    id: 3,
    customer_name: "Hassan Raza",
    city: "Islamabad",
    rating: 5,
    image_url:
      "https://ik.imagekit.io/ridaoptical/2026/08/img-20260805-wa00033522339616512041341.jpg",
    product_name: "Cartier Wooden Frame",
    comment:
      "Fitting is perfect and lightweight. Very happy with the packaging and prompt WhatsApp support.",
    created_at: "2026-08-05T14:22:10Z",
  },
];

export default function CustomerReviewsShowcase() {
  const [reviews, setReviews] = useState<ApiReviewItem[]>(FALLBACK_REVIEWS);
  const [selectedReview, setSelectedReview] = useState<ApiReviewItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    getReviews()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch((err) => {
        // Fallback reviews stay in place
        console.warn("Could not fetch remote reviews, using presets:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50/50 to-white border-t border-gray-100">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                Verified WhatsApp Reviews
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
              Real Customer Feedback & Unboxings
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
              Authentic WhatsApp chats and parcel unboxing photos from our customers across Karachi, Lahore, Islamabad, and nationwide.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/review-gallery"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-brand-primary bg-blue-50/80 hover:bg-blue-100/80 rounded-lg transition-colors border border-blue-100"
            >
              <span>View All Reviews</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
            >
              {/* Screenshot Image Container */}
              <div
                onClick={() => setSelectedReview(rev)}
                className="relative w-full h-72 sm:h-80 bg-gray-100 overflow-hidden cursor-pointer flex items-center justify-center"
              >
                <Image
                  src={rev.image_url}
                  alt={`${rev.customer_name} review screenshot`}
                  fill
                  className="object-contain sm:object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold backdrop-blur-xs">
                  <ZoomIn className="w-5 h-5" />
                  <span>Click to view WhatsApp Chat</span>
                </div>
                {/* Badge top right */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Purchase</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900 text-sm">
                        {rev.customer_name}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    {rev.city && (
                      <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {rev.city}
                      </span>
                    )}
                  </div>

                  {rev.product_name && (
                    <div className="text-[11px] font-bold text-brand-primary mb-2 line-clamp-1">
                      Frame: {rev.product_name}
                    </div>
                  )}

                  {rev.comment && (
                    <div className="relative pl-3 text-xs text-gray-600 leading-relaxed italic border-l-2 border-brand-primary/40">
                      &ldquo;{rev.comment}&rdquo;
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedReview(rev)}
                    className="text-[11px] font-bold text-brand-primary hover:underline flex items-center gap-1"
                  >
                    <span>View screenshot</span>
                    <ZoomIn className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-gray-900">
                Received your glasses? Send us your unboxing picture!
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Share your WhatsApp unboxing or feedback and get an instant 10% voucher for your next order.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/923212318001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Feedback (+92 321 2318001)</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900">
                    {selectedReview.customer_name}
                  </h3>
                  {selectedReview.city && (
                    <span className="text-[11px] text-gray-500">
                      • {selectedReview.city}
                    </span>
                  )}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    Verified Order
                  </span>
                </div>
                {selectedReview.product_name && (
                  <p className="text-xs text-brand-primary font-medium mt-0.5">
                    {selectedReview.product_name}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative w-full flex-1 min-h-[350px] max-h-[60vh] bg-neutral-900 flex items-center justify-center p-2">
              <Image
                src={selectedReview.image_url}
                alt={`${selectedReview.customer_name} review screenshot`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            {/* Modal Footer */}
            {selectedReview.comment && (
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(selectedReview.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 italic">
                  &ldquo;{selectedReview.comment}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
