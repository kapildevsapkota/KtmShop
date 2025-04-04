"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/lib/types";
import { getProductById } from "@/lib/data";
import WishlistButton from "@/components/feature/wishlist/WishlistButton";
import Breadcrumb from "@/components/ui/breadcrumb";
import ProductReviews from "@/components/feature/product/ProductReviews";
import RelatedProducts from "@/components/feature/product/RelatedProducts";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("m");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      const productData = getProductById(Number(id));
      if (productData) {
        setProduct(productData);
      } else {
        router.push("/");
      }
    }
  }, [id, router]);

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });
  };

  const productImages = [
    product.image,
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: product.category, href: `/?category=${product.category}` },
            { label: product.name, href: `/product/${product.id}` },
          ]}
        />

        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Product Images */}
          <div className="lg:col-span-3">
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-lg border bg-white">
                <Image
                  src={productImages[activeImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="h-[400px] w-full object-cover object-center md:h-[500px]"
                />
              </div>
              <div className="flex space-x-4 overflow-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 overflow-hidden rounded-md border-2 ${
                      activeImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2">
            <div className="mb-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                4.0 (24 reviews)
              </span>
            </div>

            <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              {product.name}
            </h1>

            <p className="mb-6 text-gray-600">{product.description}</p>

            <div className="mb-6">
              <div className="mb-1 text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </div>
              {product.comparePrice && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 line-through">
                    ${product.comparePrice.toFixed(2)}
                  </span>
                  <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                    Save ${(product.comparePrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="mb-2 font-medium text-gray-900">Size</h3>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-3"
              >
                {["xs", "s", "m", "l", "xl"].map((size) => (
                  <div key={size} className="flex items-center">
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium uppercase text-gray-900 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 font-medium text-gray-900">Quantity</h3>
              <div className="flex h-10 w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex w-10 items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100"
                >
                  -
                </button>
                <div className="flex w-12 items-center justify-center border-y border-gray-300 text-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex w-10 items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-6 flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90"
                size="lg"
              >
                Add to Cart
              </Button>
              <WishlistButton productId={product.id} variant="outline" />
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center">
                <Truck className="mr-2 h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Free shipping on orders over $100
                </span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  2-year warranty on all products
                </span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="mr-2 h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  30-day return policy
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <div className="prose max-w-none text-gray-600">
                <p>
                  Introducing our authentic {product.name}, a perfect blend of
                  traditional craftsmanship and modern design. Each piece is
                  handcrafted by skilled artisans in Kathmandu, Nepal, using
                  time-honored techniques passed down through generations.
                </p>
                <p className="mt-4">
                  The intricate details and high-quality materials make this
                  product not just a purchase, but an investment in authentic
                  Nepalese culture and craftsmanship. Whether as a gift or a
                  personal treasure, this item brings a piece of the Himalayas
                  into your home.
                </p>
                <p className="mt-4">
                  By purchasing this product, youre supporting fair trade
                  practices and helping to preserve traditional Nepalese
                  craftsmanship. Each item comes with a certificate of
                  authenticity and a story about the artisans who created it.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <div className="grid gap-4 text-sm text-gray-600 sm:grid-cols-2">
                <div>
                  <h4 className="font-medium text-gray-900">Materials</h4>
                  <p>Handcrafted with premium materials</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Dimensions</h4>
                  <p>Varies by product</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Origin</h4>
                  <p>Kathmandu, Nepal</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Care</h4>
                  <p>See product-specific care instructions</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <ProductReviews productId={product.id} />
            </TabsContent>
          </Tabs>
        </div>

        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
