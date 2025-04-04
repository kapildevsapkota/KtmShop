"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import { getProductsByIds } from "@/lib/data";
import type { Product } from "@/lib/types";

export default function RecentlyViewed() {
  const [products, setProducts] = useState<Product[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // In a real app, get recently viewed product IDs from localStorage
    const recentlyViewedIds = [1, 2, 3, 4, 5, 6];
    const recentProducts = getProductsByIds(recentlyViewedIds);
    setProducts(recentProducts);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("recently-viewed-container");
    if (!container) return;

    const scrollAmount = 300;
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          id="recently-viewed-container"
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {products.map((product) => (
            <div key={product.id} className="w-[220px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
