import React from "react";
import type { Metadata } from "next";
import CheckoutPageClient from "./CheckoutPageClient";

export const metadata: Metadata = {
  title: "Checkout — Cash on Delivery | Rida Optical Pakistan",
  description:
    "Fast and secure Cash on Delivery checkout for prescription eyewear and frames in Pakistan.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
