import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Clothing",
    image: "/image.png",
    href: "/?category=Clothing",
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "Handicrafts",
    image: "/placeholder.svg?height=300&width=300",
    href: "/?category=Handicrafts",
    color: "from-amber-500 to-yellow-500",
  },
  {
    name: "Home Decor",
    image: "/placeholder.svg?height=300&width=300",
    href: "/?category=Home Decor",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Jewelry",
    image: "/placeholder.svg?height=300&width=300",
    href: "/?category=Jewelry",
    color: "from-purple-500 to-violet-500",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            Shop by Category
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Explore our curated collection of authentic Nepalese treasures
            across various categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-square overflow-hidden">
                <div className="h-full w-full flex items-center justify-center">
                  <i className={`icon-${category.name.toLowerCase()}`}></i>
                </div>
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-80",
                    category.color
                  )}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-center text-xl font-bold text-white md:text-2xl">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
