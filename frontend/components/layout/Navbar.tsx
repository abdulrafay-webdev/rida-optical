"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Glasses,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "All Glasses", href: "/store" },
  { label: "Eye Glasses", href: "/category/eye-glasses" },
  { label: "Sunglasses", href: "/category/sunglasses" },
  { label: "Screen Glasses", href: "/category/screen-glass" },
  { label: "Transition Glasses", href: "/category/transition-glass" },
  { label: "Reviews", href: "/review-gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.getItemCount());

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/store?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-gray-700 hover:text-brand-primary"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <Glasses className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-black">
                  RIDA <span className="text-brand-primary">OPTICAL</span>
                </span>
                <span className="text-[10px] tracking-widest text-gray-500 uppercase font-semibold -mt-1">
                  Vision Care & Fashion
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors py-1 relative",
                    isActive
                      ? "text-brand-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-primary"
                      : "text-gray-700 hover:text-brand-primary"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-brand-primary transition-colors rounded-full hover:bg-gray-100"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/923212318001"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 hover:bg-green-100 transition-colors border border-green-200"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-brand-primary transition-colors rounded-full hover:bg-gray-100"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Input */}
        {searchOpen && (
          <div className="py-3 px-2 border-t border-gray-100">
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search frame models, colors (e.g. Maybach, Silver, Blue-cut)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-24 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-sky/50"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 text-xs font-semibold bg-brand-primary text-white rounded-full hover:bg-brand-hover transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-3 py-2.5 rounded-lg text-base font-medium transition-colors",
                pathname === item.href
                  ? "bg-brand-primary/10 text-brand-primary font-bold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-brand-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <a
              href="https://wa.me/923212318001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Order (+92 321 2318001)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
