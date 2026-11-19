"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Star,
  Youtube,
  CheckCircle2,
  MessageCircle,
  ZoomIn,
  X,
  ShieldCheck,
  Glasses,
} from "lucide-react";
import { getReviews, ApiReviewItem } from "@/lib/api";

const INITIAL_REVIEWS: ApiReviewItem[] = [
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

const TEXT_REVIEWS = [
  {
    name: "Dr. Ayesha Siddiqui",
    city: "Karachi",
    rating: 5,
    date: "Verified Optical Customer",
    product: "Fashion Eye Glasses with Progressive Lenses",
    comment:
      "I was skeptical about ordering progressive glasses online, but Rida Optical's optician called to verify my corridor and pupillary distance. The lenses are crystal clear from reading to distance.",
  },
  {
    name: "Hamza Tariq",
    city: "Lahore",
    rating: 5,
    date: "Verified Optical Customer",
    product: "Maybach Rimless Optical Frame",
    comment:
      "Received my Maybach rimless glasses in Lahore within 3 days. The blue-cut screen coating is exceptional quality. No headache after 8 hours of laptop screen time. Highly recommended!",
  },
  {
    name: "Zubair Ahmed",
    city: "Islamabad",
    rating: 5,
    date: "Verified Optical Customer",
    product: "Transition Glasses (Photochromic)",
    comment:
      "Lenses turn dark black in the sun in seconds and clear up instantly when I enter the office. Excellent value for money. 10/10.",
  },
  {
    name: "Bilal Khan",
    city: "Peshawar",
    rating: 5,
    date: "Verified Optical Customer",
    product: "Fashion Eye Glasses - Green",
    comment:
      "The Balenciaga-style frame feels sturdy and premium. Delivery was smooth with Cash on Delivery through Leopard Courier. Will order again for my brother.",
  },
];

export default function ReviewGalleryClient() {
  const [reviews, setReviews] = useState<ApiReviewItem[]>(INITIAL_REVIEWS);
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
        console.warn("Could not fetch remote reviews:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-brand-surface/40 min-h-screen py-12 sm:py-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
            Verified Customer Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-black mt-1">
            Customer Reviews & Experiences
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Real WhatsApp chats, parcel unboxing photos, and verified reviews from optical customers across Pakistan.
          </p>
        </div>

        {/* Video Reviews CTA Box */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl p-8 text-white mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-200">
              Video Showcase
            </span>
            <h2 className="text-xl sm:text-2xl font-black">
              Watch Real Customer Unboxings on YouTube
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
              Check out detailed frame durability tests, transition lens reaction videos, and customer reactions on our official channel.
            </p>
          </div>
          <a
            href="https://youtube.com/@ridaoptical?si=z2HpB9PH-HEePPMe"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-white text-red-600 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-md flex items-center gap-2 shrink-0"
          >
            <Youtube className="w-4 h-4" />
            <span>Visit @ridaoptical</span>
          </a>
        </div>

        {/* Visual Review Screenshots Section */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                WhatsApp Unboxings & Photo Reviews
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Click on any screenshot to view full-resolution chats and parcel pictures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                {/* Image */}
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
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold backdrop-blur-xs">
                    <ZoomIn className="w-5 h-5" />
                    <span>Click to view full picture</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Purchase</span>
                  </div>
                </div>

                {/* Details */}
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
                      <span>Enlarge image</span>
                      <ZoomIn className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Written Customer Reviews Grid */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">
            Detailed Customer Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEXT_REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    </h3>
                    <span className="text-[11px] text-gray-400">
                      {rev.city}, Pakistan • {rev.date}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-brand-primary">
                    Verified Buyer
                  </span>
                </div>

                <div className="text-xs text-brand-primary font-semibold">
                  Product: {rev.product}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Review Invitation */}
        <div className="mt-14 text-center p-8 bg-white rounded-2xl border border-gray-200 text-xs text-gray-600 shadow-xs">
          <p className="font-bold text-gray-900 text-base">
            Recently received your glasses?
          </p>
          <p className="mt-1 text-gray-500 text-xs max-w-lg mx-auto">
            Share your unboxing photo or feedback on WhatsApp to receive a 10% coupon on your next pair.
          </p>
          <a
            href="https://wa.me/923212318001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send WhatsApp Feedback (+92 321 2318001)</span>
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
    </div>
  );
}
