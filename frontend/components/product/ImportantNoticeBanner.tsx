import React from "react";
import { AlertCircle, MessageCircle } from "lucide-react";

export default function ImportantNoticeBanner() {
  return (
    <div className="bg-notice-bg border border-notice-border rounded-xl p-4 text-notice-text text-xs leading-relaxed shadow-xs">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-notice-text shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-[#725401]">Important Note:</h4>
          <p>
            If your prescription has a high cylinder (above ±2.00) or requires bifocal/progressive lenses,
            please contact us via WhatsApp for a customized optical quote. For single vision glasses, simply
            follow the lens selection steps below.
          </p>
          <div className="pt-1">
            <a
              href="https://wa.me/923212318001?text=Hi%20Rida%20Optical,%20I%20have%20a%20high-cylinder/bifocal%20prescription%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-brand-navy hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5 text-green-700 inline" />
              <span>Inquire on WhatsApp (+92 321 2318001) &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
