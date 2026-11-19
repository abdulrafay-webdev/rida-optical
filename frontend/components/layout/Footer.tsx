import React from "react";
import Link from "next/link";
import {
  Glasses,
  MapPin,
  Phone,
  Mail,
  Youtube,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { STORE_ADDRESS, STORE_PHONE_DISPLAY } from "@/lib/utils";

// Custom TikTok icon since Lucide doesn't have native tiktok
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.96-4.52V8.04a8.16 8.16 0 0 0 4.81 1.56V6.15a4.83 4.83 0 0 1-1-.02v.56Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Contact Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Glasses className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">
                RIDA <span className="text-brand-primary">OPTICAL</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your trusted partner for high-precision optical prescription lenses,
              designer spectacle frames, and sunglasses in Pakistan.
            </p>
            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span>{STORE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <a href="tel:+923212318001" className="hover:text-white transition-colors">
                  {STORE_PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <a href="mailto:ridaoptical@gmail.com" className="hover:text-white transition-colors">
                  ridaoptical@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-brand-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-brand-primary transition-colors">
                  Shop All Glasses
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-brand-primary transition-colors">
                  View Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-brand-primary transition-colors">
                  Checkout (Cash on Delivery)
                </Link>
              </li>
              <li>
                <Link href="/review-gallery" className="hover:text-brand-primary transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Glass Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/category/eye-glasses" className="hover:text-brand-primary transition-colors">
                  Optical Eye Glasses
                </Link>
              </li>
              <li>
                <Link href="/category/sunglasses" className="hover:text-brand-primary transition-colors">
                  Fashion Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/category/screen-glass" className="hover:text-brand-primary transition-colors">
                  Blue-Cut Screen Glasses
                </Link>
              </li>
              <li>
                <Link href="/category/transition-glass" className="hover:text-brand-primary transition-colors">
                  Photochromic Transition Lenses
                </Link>
              </li>
              <li>
                <Link href="/category/contatc-lenses" className="hover:text-brand-primary transition-colors">
                  Contact Lenses
                </Link>
              </li>
              <li>
                <Link href="/category/lenses-for-glasses" className="hover:text-brand-primary transition-colors">
                  Custom Replacement Lenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Social Presence */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Follow Us
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Watch customer frame showcases, video unboxings, and optical care tutorials.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://youtube.com/@ridaoptical?si=z2HpB9PH-HEePPMe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@ridaoptical?_t=ZS-8yGUWwSVMPZ&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Account"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-black flex items-center justify-center text-white transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/message/QSJGKOLYQZCMC1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/15wBP14ayt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=287js48"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Page"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-6 p-3 rounded-lg bg-gray-800/60 border border-gray-700/60">
              <span className="block text-[11px] font-semibold text-white">🚚 Fast Delivery Guarantee</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">
                Dispatch via TCS / Leopards with live tracking. Pay upon delivery.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Rida Optical. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Powered by Next.js & Neon PostgreSQL</span>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
