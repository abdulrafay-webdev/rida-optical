import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Glasses, Award, ShieldCheck, HeartHandshake, MapPin } from "lucide-react";
import { STORE_ADDRESS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us — Rida Optical Vision Care Karachi",
  description:
    "Learn about Rida Optical, our mission for high quality vision care in Pakistan, our Karachi store, and our optical lens fitting standards.",
};

export default function AboutPage() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
              Our Vision & Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-black">
              About Rida Optical
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Bringing high precision optical care, premium designer spectacle frames, and modern prescription lens technology to customers across Pakistan.
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-gray-700 space-y-6 pt-6 border-t border-gray-100">
            <p>
              Founded in Karachi, <strong>Rida Optical</strong> was established with a singular objective: to make crystal-clear vision, certified optical coatings, and designer eyewear frames affordable and easily accessible to every individual in Pakistan without exorbitant markups.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 not-prose">
              <div className="p-6 rounded-2xl bg-brand-surface border border-gray-200">
                <Award className="w-8 h-8 text-brand-primary mb-3" />
                <h3 className="text-base font-bold text-gray-900">Certified Optical Craft</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Every pair of single vision, bifocal, and progressive lenses is accurately edged and mounted by experienced opticians following precise pupillary distance (PD) measurements.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-surface border border-gray-200">
                <ShieldCheck className="w-8 h-8 text-brand-primary mb-3" />
                <h3 className="text-base font-bold text-gray-900">Advanced Coating Tech</h3>
                <p className="text-xs text-gray-600 mt-1">
                  We specialize in blue-cut anti-glare screen lenses for computer users, fast-reaction transition photochromic lenses for outdoor sun protection, and digital driver coatings.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 pt-4">Visit Our Physical Flagship Store</h2>
            <p>
              Customers in Karachi are warmly welcome to visit our retail store for in-person frame fittings, computerized vision check-ups, and prescription adjustments.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 not-prose flex items-start gap-4">
              <MapPin className="w-6 h-6 text-brand-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-gray-900">Karachi Retail Store:</h4>
                <p className="text-xs text-gray-600 mt-1">{STORE_ADDRESS}</p>
                <p className="text-xs text-brand-primary font-bold mt-2">
                  Customer Helpline / WhatsApp: +92 321 2318001
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brand-hover shadow-md transition-all"
            >
              <Glasses className="w-4 h-4" />
              <span>Browse Optical Collection</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
