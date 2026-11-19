import React from "react";
import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Shopping Cart — Rida Optical Pakistan",
  description: "View and review your optical frames and lenses in your shopping bag.",
};

export default function CartPage() {
  return <CartPageClient />;
}
