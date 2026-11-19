"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      <div className="hidden md:flex items-center bg-white text-gray-800 text-xs font-semibold py-1.5 px-3 rounded-full shadow-lg border border-gray-200 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with Optometrist
      </div>
      <a
        href="https://wa.me/923212318001?text=Hi%20Rida%20Optical,%20I%20have%20an%20inquiry%20regarding%20optical%20frames%20and%20lenses."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-white"></span>
        </span>
      </a>
    </div>
  );
}
