import React from "react";
import Link from "next/link";
import { Glasses, Sun, Monitor, RefreshCw, Eye, Sparkles } from "lucide-react";

const CATEGORY_CARDS = [
  {
    title: "Transition Glasses",
    slug: "transition-glass",
    description: "Adaptive photochromic lenses that darken in sunlight and clear indoors.",
    icon: RefreshCw,
    tag: "Trending",
    color: "from-amber-500/10 to-orange-500/5",
    accent: "text-amber-600",
  },
  {
    title: "Eye Glasses",
    slug: "eye-glasses",
    description: "Designer rimless, metal, and acetate prescription frames for daily vision.",
    icon: Glasses,
    tag: "16+ Models",
    color: "from-blue-500/10 to-brand-primary/5",
    accent: "text-brand-primary",
  },
  {
    title: "Screen Glasses",
    slug: "screen-glass",
    description: "Certified blue-cut anti-glare protection for monitor, laptop & mobile users.",
    icon: Monitor,
    tag: "Blue-Cut",
    color: "from-cyan-500/10 to-blue-500/5",
    accent: "text-cyan-600",
  },
  {
    title: "Sunglasses",
    slug: "sunglasses",
    description: "Polarized UV400 sunglasses in classic aviator, square & luxury styles.",
    icon: Sun,
    tag: "UV400",
    color: "from-rose-500/10 to-pink-500/5",
    accent: "text-rose-600",
  },
  {
    title: "Contact Lenses",
    slug: "contatc-lenses",
    description: "Comfort-fit cosmetic & power contact lenses for sharp unobstructed sight.",
    icon: Eye,
    tag: "Cosmetic & Power",
    color: "from-emerald-500/10 to-teal-500/5",
    accent: "text-emerald-600",
  },
  {
    title: "Lenses For Glasses",
    slug: "lenses-for-glasses",
    description: "Custom replacement lenses fitted to your existing frame with your prescription.",
    icon: Sparkles,
    tag: "Custom Fitting",
    color: "from-purple-500/10 to-indigo-500/5",
    accent: "text-purple-600",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
            Explore Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-1">
            Specialized Vision & Eyewear Solutions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Choose from our specialized optical categories tailored to your daily lifestyle, screen time, and vision needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group relative rounded-2xl border border-gray-200/80 p-6 hover:border-brand-primary hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center ${cat.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/80 shadow-xs text-gray-700">
                      {cat.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-4 mt-4 border-t border-gray-100/80 flex items-center text-xs font-bold text-brand-primary group-hover:translate-x-1 transition-transform">
                  <span>Explore Products &rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
