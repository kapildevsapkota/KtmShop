"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import WishlistButton from "@/components/feature/wishlist/WishlistButton";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {product.isNew && (
            <Badge className="absolute left-3 top-3 bg-primary">New</Badge>
          )}

          {product.comparePrice && (
            <Badge className="absolute left-3 top-3 bg-red-600">
              {Math.round((1 - product.price / product.comparePrice) * 100)}%
              OFF
            </Badge>
          )}

          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Button
              variant="secondary"
              size="sm"
              className="mx-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-1 text-sm text-gray-500">{product.category}</div>
          <h3 className="mb-2 text-base font-medium text-gray-900 transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              {product.comparePrice ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.comparePrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <WishlistButton productId={product.id} size="sm" />
          </div>
        </div>
      </Link>
    </div>
  );
}
