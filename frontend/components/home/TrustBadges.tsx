import React from "react";
import { Truck, ShieldCheck, BadgePercent, Banknote } from "lucide-react";

const BADGES = [
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "Flat rate PKR 349 shipping across Karachi, Lahore, Islamabad & all Pakistan cities.",
  },
  {
    icon: ShieldCheck,
    title: "Optical Grade Lenses",
    description: "Anti-reflective, blue-cut, and transition coatings crafted to your doctor's prescription.",
  },
  {
    icon: BadgePercent,
    title: "Best Value Offers",
    description: "High-grade optical frames and prescription lenses at genuine factory-direct prices.",
  },
  {
    icon: Banknote,
    title: "Cash on Delivery",
    description: "Inspect your glasses upon arrival and pay safely at your doorstep nationwide.",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-xl bg-brand-surface/70 border border-gray-200/60 hover:border-brand-primary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-gray-200 flex items-center justify-center text-brand-primary shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{badge.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
