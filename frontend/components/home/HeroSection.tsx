import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Eye } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-brand-surface via-white to-blue-50/60 overflow-hidden border-b border-gray-100">
      {/* Decorative background optical blur shapes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-sky/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UpTo 10% Off On All Products</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-[1.15]">
              Discover the <span className="text-brand-primary">Perfect Frame</span> for Every Face!
            </h1>

            <p className="text-base sm:text-lg text-brand-body/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Premium designer spectacle frames paired with custom-crafted optical prescription lenses,
              blue-cut screen protection, and fast transition technology. Delivered nationwide in Pakistan.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/store"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-brand-primary hover:bg-brand-hover text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Find More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/category/eye-glasses"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-bold text-sm transition-colors flex items-center justify-center"
              >
                <span>Shop Now</span>
              </Link>
            </div>

            {/* Quick trust bullet points */}
            <div className="pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span>100% Optical Grade Lenses</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-brand-primary" />
                <span>Free Prescription Fitting</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-brand-primary">PKR 349</span>
                <span>Nationwide COD Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Banner Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-navy text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-xl tracking-wider">
                FEATURED
              </div>

              <div className="relative w-full aspect-4/3 min-h-[260px] bg-gray-50 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
                <img
                  src="https://ridaoptical.com/wp-content/uploads/2025/07/1000424554-scaled.jpg"
                  alt="Maybach & Balenciaga Optical Eyewear"
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
                    Optical Eyeglasses
                  </span>
                  <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                    In Stock
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-gray-900">
                  Maybach Premium Rimless & Designer Frames
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  Precision engineered optical frames with anti-reflective coating, titanium accents, and single-vision or progressive lens compatibility.
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Starting From</span>
                    <span className="text-xl font-black text-gray-900">Rs. 2,199</span>
                  </div>
                  <Link
                    href="/product/maybach-2"
                    className="px-4 py-2 bg-brand-navy hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Configure Lenses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
