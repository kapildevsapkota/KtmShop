"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { getAllProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import ProductFilters from "./ProductFilters";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const categoryParam = searchParams.get("category");
  const sortParam = searchParams.get("sort") || "featured";
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    // In a real app, this would be an API call
    const allProducts = getAllProducts();
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (categoryParam && categoryParam !== "all") {
      result = result.filter((product) => product.category === categoryParam);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.description &&
            product.description.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortParam) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        case "featured":
        default:
          return b.featured ? 1 : -1;
      }
    });

    setFilteredProducts(result);
  }, [products, categoryParam, sortParam, searchQuery]);

  return (
    <div>
      <ProductFilters />

      {filteredProducts.length === 0 ? (
        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            No products found
          </h3>
          <p className="mt-1 text-gray-500">
            Try changing your filters or search query
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
