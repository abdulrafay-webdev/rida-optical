import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Rida Optical Pakistan",
  description: "Rida Optical customer data and optical prescription privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <h1 className="text-2xl sm:text-4xl font-black text-black">
          Privacy Policy
        </h1>
        <p className="text-gray-500">Last updated: November 2026</p>

        <section className="space-y-3 pt-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">1. Information We Collect</h2>
          <p>
            When you place an order on Rida Optical, we collect necessary customer details to fulfill your delivery: your name, shipping address, mobile contact phone number, and doctor&apos;s optical prescription details (SPH, CYL, AXIS measurements or doctor slip attachments).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-gray-900">2. Optical Prescription Confidentiality</h2>
          <p>
            Any optical prescription files, slips, or refractive numbers uploaded or sent via WhatsApp are strictly used by licensed optical technicians to manufacture your customized lenses. We never share or sell customer optical records to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-gray-900">3. Shipping & Courier Sharing</h2>
          <p>
            Your delivery address and phone number are securely shared with authorized courier partners (e.g. TCS, Leopards Courier) solely for package delivery and Cash on Delivery cash collection.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-gray-900">4. Contact & Inquiries</h2>
          <p>
            If you have questions regarding your data, contact us at <strong>ridaoptical@gmail.com</strong> or WhatsApp <strong>+92 321 2318001</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
