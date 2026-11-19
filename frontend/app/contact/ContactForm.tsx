"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center space-y-2">
        <h3 className="text-sm font-bold text-green-800">Message Sent Successfully!</h3>
        <p className="text-xs text-green-700">
          Thank you for reaching out. Our optician team will review your inquiry and contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700">Your Name</label>
          <input
            type="text"
            required
            placeholder="Muhammad Ali"
            className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700">Phone / WhatsApp</label>
          <input
            type="tel"
            required
            placeholder="0321 1234567"
            className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-700">Subject</label>
        <input
          type="text"
          placeholder="Inquiry regarding High Cylinder / Progressive Lenses"
          className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-700">Message</label>
        <textarea
          rows={4}
          required
          placeholder="Describe your prescription, desired frame, or questions..."
          className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
        />
      </div>

      <button
        type="submit"
        className="px-8 py-3 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all"
      >
        Send Message
      </button>
    </form>
  );
}
