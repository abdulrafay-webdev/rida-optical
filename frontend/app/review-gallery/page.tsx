import React from "react";
import type { Metadata } from "next";
import { Star, Youtube, CheckCircle2, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Reviews & Unboxing Showcase — Rida Optical",
  description:
    "See what customers across Pakistan say about Rida Optical glasses, custom prescription accuracy, and nationwide delivery.",
};

const REVIEWS = [
  {
    name: "Hamza Tariq",
    city: "Lahore",
    rating: 5,
    date: "November 2026",
    product: "Maybach Rimless Optical Frame",
    comment:
      "Received my Maybach rimless glasses in Lahore within 3 days. The blue-cut screen coating is exceptional quality. No headache after 8 hours of laptop screen time. Highly recommended!",
  },
  {
    name: "Dr. Ayesha Siddiqui",
    city: "Karachi",
    rating: 5,
    date: "October 2026",
    product: "Fashion Eye Glasses with Progressive Lenses",
    comment:
      "I was skeptical about ordering progressive glasses online, but Rida Optical's optician called to verify my corridor and pupillary distance. The lenses are crystal clear from reading to distance.",
  },
  {
    name: "Zubair Ahmed",
    city: "Islamabad",
    rating: 5,
    date: "October 2026",
    product: "Transition Glasses (Photochromic)",
    comment:
      "Lenses turn dark black in the sun in seconds and clear up instantly when I enter the office. Excellent value for money. 10/10.",
  },
  {
    name: "Bilal Khan",
    city: "Peshawar",
    rating: 5,
    date: "September 2026",
    product: "Fashion Eye Glasses - Green",
    comment:
      "The Balenciaga-style frame feels sturdy and premium. Delivery was smooth with Cash on Delivery through Leopard Courier. Will order again for my brother.",
  },
];

export default function ReviewGalleryPage() {
  return (
    <div className="bg-brand-surface/40 min-h-screen py-12 sm:py-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
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
            Real feedback from Pakistani optical customers who ordered prescription glasses and designer frames from Rida Optical.
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

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev, idx) => (
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

        {/* WhatsApp Review Invitation */}
        <div className="mt-12 text-center p-8 bg-white rounded-2xl border border-gray-200 text-xs text-gray-600">
          <p className="font-semibold text-gray-800 text-sm">Recently received your glasses?</p>
          <p className="mt-1 text-gray-500">
            Share your unboxing photo or feedback on WhatsApp to receive a 10% coupon on your next pair.
          </p>
          <a
            href="https://wa.me/923212318001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send WhatsApp Feedback</span>
          </a>
        </div>
      </div>
    </div>
  );
}
