"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tag, Check, Copy, ArrowRight, Sparkles } from "lucide-react";

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);
  const coupon = "OFF10";

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-navy via-blue-900 to-brand-primary text-white p-8 sm:p-12 overflow-hidden shadow-xl">
          {/* Decorative blur */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-sky text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Optical Promotion</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                Buy Any Transition Glasses At{" "}
                <span className="text-yellow-300">10% Discount</span>
              </h2>

              <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto lg:mx-0">
                Experience crystal clarity indoors and automatic sunglasses protection outdoors with our
                certified photochromic transition lenses. Use coupon code at checkout or on WhatsApp.
              </p>

              {/* Coupon chip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white/15 border border-white/20 px-3.5 py-1.5 rounded-lg backdrop-blur-xs">
                  <Tag className="w-4 h-4 text-yellow-300" />
                  <span className="text-xs text-gray-200 font-medium">Coupon Code:</span>
                  <span className="font-mono font-black text-sm text-white tracking-widest">
                    {coupon}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white text-brand-navy hover:bg-gray-100 transition-colors shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Action */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                href="/category/transition-glass"
                className="px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-sm transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group"
              >
                <span>Shop Transition Glasses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
