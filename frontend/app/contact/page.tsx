import React from "react";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { STORE_ADDRESS, STORE_PHONE_DISPLAY } from "@/lib/utils";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Rida Optical Store & Customer Support",
  description:
    "Get in touch with Rida Optical for frame orders, custom prescription inquiries, or visit our retail store in Karachi.",
};

export default function ContactPage() {
  return (
    <div className="bg-brand-surface/40 min-h-screen py-12 sm:py-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
            Customer Support & Store
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-black mt-1">
            Contact Rida Optical
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Have questions about your prescription power, lens types, or order status? We are here to assist you daily.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-900">WhatsApp Support</h3>
                <p className="text-xs text-gray-500">
                  Direct chat with our lead optician for prescription quotes & fast orders.
                </p>
                <a
                  href="https://wa.me/923212318001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-1 text-xs font-bold text-green-600 hover:underline"
                >
                  Chat Now: {STORE_PHONE_DISPLAY} &rarr;
                </a>
              </div>
            </div>

            {/* Retail Store Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-900">Retail Store Location</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {STORE_ADDRESS}
                </p>
              </div>
            </div>

            {/* Email & Phone Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="text-sm font-bold text-gray-900">Email & Hours</h3>
                <p className="text-gray-600">
                  Email: <a href="mailto:ridaoptical@gmail.com" className="text-brand-primary">ridaoptical@gmail.com</a>
                </p>
                <p className="text-gray-500 pt-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Mon - Sat: 11:00 AM - 10:00 PM (PKT)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">
              Send an Optical Inquiry
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
