import React from "react";
import type { Metadata } from "next";
import ReviewGalleryClient from "./ReviewGalleryClient";

export const metadata: Metadata = {
  title: "Customer Reviews & Unboxing Showcase — Rida Optical",
  description:
    "Real WhatsApp chats, customer unboxing photos, and verified reviews from optical customers across Karachi, Lahore, Islamabad, and Pakistan.",
};

export default function ReviewGalleryPage() {
  return <ReviewGalleryClient />;
}
