"use client";

import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center">
            <ShoppingBag className="mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium">Your cart is empty</h3>
            <p className="mb-6 text-center text-gray-500">
              Looks like you havent added any products to your cart yet.
            </p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="max-h-[calc(100vh-250px)] overflow-y-auto py-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || "default"}`}
                  className="mb-4 flex border-b border-gray-100 pb-4"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={onClose}
                        >
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="ml-4">${item.product.price.toFixed(2)}</p>
                    </div>
                    {item.selectedSize && (
                      <p className="mt-1 text-sm text-gray-500">
                        Size: {item.selectedSize.toUpperCase()}
                      </p>
                    )}
                    <div className="mt-2 flex flex-1 items-end justify-between">
                      <div className="flex items-center border border-gray-200">
                        <button
                          className="flex h-8 w-8 items-center justify-center border-r border-gray-200 text-gray-600 hover:bg-gray-50"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          -
                        </button>
                        <span className="flex h-8 w-10 items-center justify-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          className="flex h-8 w-8 items-center justify-center border-l border-gray-200 text-gray-600 hover:bg-gray-50"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-sm font-medium text-primary hover:text-primary/80"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Button className="w-full" asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
              <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
                <button
                  type="button"
                  className="font-medium text-primary hover:text-primary/80"
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
