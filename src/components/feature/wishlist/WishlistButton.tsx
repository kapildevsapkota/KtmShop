"use client";

import type React from "react";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { ButtonProps } from "react-day-picker";

interface WishlistButtonProps extends Omit<ButtonProps, "onClick"> {
  productId: number;
}

export default function WishlistButton({
  productId,
  className,
  variant = "ghost",
  size = "icon",
  ...props
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the product from somewhere (this is a simplified example)
    // In a real app, you might need to fetch the product data
    const product = {
      id: productId,
      name: "Product",
      price: 0,
      image: "",
      category: "",
    };

    toggleWishlist(product);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      <Heart
        className={cn(
          "h-5 w-5",
          inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
        )}
      />
      <span className="sr-only">
        {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      </span>
    </Button>
  );
}
