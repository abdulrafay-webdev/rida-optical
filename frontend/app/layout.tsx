import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import FloatingReviewButton from "@/components/layout/FloatingReviewButton";
import CartDrawer from "@/components/layout/CartDrawer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rida Optical — Premium Eyeglass Frames, Lenses & Sunglasses in Pakistan",
  description:
    "Buy prescription glasses, blue-cut screen lenses, photochromic transition glasses, and sunglasses in Pakistan with flat rate delivery PKR 349 nationwide and Cash on Delivery.",
  keywords: [
    "glasses Pakistan",
    "prescription lenses Karachi",
    "blue cut glasses",
    "transition lenses",
    "Maybach frames",
    "optical frames Pakistan",
    "Rida Optical",
  ],
  openGraph: {
    title: "Rida Optical — Premium Eyewear & Prescription Lenses",
    description:
      "High quality prescription eyeglass frames, blue-cut lenses, and designer sunglasses delivered nationwide across Pakistan.",
    url: "https://ridaoptical.com",
    siteName: "Rida Optical",
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.variable}>
      <body className="min-h-screen flex flex-col font-sans text-brand-body bg-white antialiased">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <FloatingReviewButton />
        <CartDrawer />
      </body>
    </html>
  );
}
