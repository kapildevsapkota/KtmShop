import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-rose-50 to-amber-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Authentic Nepalese <span className="text-primary">Treasures</span>
            </h1>
            <p className="mb-8 text-lg text-gray-600 md:text-xl">
              Discover handcrafted products from the heart of Kathmandu. Each
              item tells a story of tradition, craftsmanship, and cultural
              heritage.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start">
              <Button size="lg" asChild>
                <Link href="/?category=all">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 transform rounded-full  md:h-[350px] md:w-[350px] lg:h-[450px] lg:w-[450px]"></div>
            <img
              src="/hero.png"
              alt="Featured Product"
              className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform object-cover md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px]"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-white p-4 text-center shadow-sm">
            <div className="mb-2 text-lg font-bold text-primary">100%</div>
            <div className="text-sm text-gray-600">Authentic Products</div>
          </div>
          <div className="rounded-lg bg-white p-4 text-center shadow-sm">
            <div className="mb-2 text-lg font-bold text-primary">50+</div>
            <div className="text-sm text-gray-600">Artisan Partners</div>
          </div>
          <div className="rounded-lg bg-white p-4 text-center shadow-sm">
            <div className="mb-2 text-lg font-bold text-primary">10k+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="rounded-lg bg-white p-4 text-center shadow-sm">
            <div className="mb-2 text-lg font-bold text-primary">5★</div>
            <div className="text-sm text-gray-600">Customer Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
