"use client";

import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export default function FloatingReviewButton() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden sm:block">
      <Link
        href="/review-gallery"
        aria-label="View Customer Reviews"
        className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-bold py-3 px-1.5 rounded-r-md shadow-md flex flex-col items-center gap-1 writing-mode-vertical transition-transform hover:translate-x-1 duration-150 uppercase tracking-widest cursor-pointer select-none"
      >
        <div className="flex items-center gap-1 text-[11px] font-extrabold tracking-normal">
          <span>⭐</span>
          <span>REVIEWS</span>
          <span>⭐</span>
        </div>
      </Link>
    </div>
  );
}
