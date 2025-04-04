"use client";

import HeroSection from "@/components/feature/home/HeroSection";
import FeaturedCategories from "@/components/feature/home/FeaturedCategories";
import ProductGrid from "@/components/feature/product/ProductGrid";
import Newsletter from "@/components/feature/home/Newsletter";
import RecentlyViewed from "@/components/feature/product/RecentlyViewed";
import Testimonials from "@/components/feature/home/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturedCategories />
      <div className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
          Our Products
        </h2>
        <ProductGrid />
      </div>
      <RecentlyViewed />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
