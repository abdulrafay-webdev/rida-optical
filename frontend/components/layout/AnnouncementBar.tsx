import React from "react";
import { Truck, Phone, MessageSquare } from "lucide-react";
import { STORE_PHONE_DISPLAY } from "@/lib/utils";

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-navy text-white text-xs sm:text-sm py-2 px-4 select-none">
      <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2 font-medium">
          <Truck className="w-4 h-4 text-brand-sky shrink-0" />
          <span>
            Flat Rate Delivery <strong className="text-brand-sky">PKR 349</strong> Nationwide across Pakistan
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://wa.me/923212318001"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-brand-sky transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-green-400" />
            <span>Order on WhatsApp: <strong>{STORE_PHONE_DISPLAY}</strong></span>
          </a>
        </div>
      </div>
    </div>
  );
}
