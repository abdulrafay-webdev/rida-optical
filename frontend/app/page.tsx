import HeroSection from "@/components/home/HeroSection";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProductsGrid from "@/components/home/FeaturedProductsGrid";
import CustomerReviewsShowcase from "@/components/home/CustomerReviewsShowcase";
import PromoBanner from "@/components/home/PromoBanner";
import TrustBadges from "@/components/home/TrustBadges";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProductsGrid />
      <CustomerReviewsShowcase />
      <PromoBanner />
      <TrustBadges />
    </>
  );
}
