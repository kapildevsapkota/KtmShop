import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              Kathmandu Shop
            </h3>
            <p className="mb-4">
              Bringing authentic Nepalese crafts and products to your doorstep
              since 2010. We work directly with artisans to ensure fair trade
              and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/?category=Clothing"
                  className="transition-colors hover:text-white"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Handicrafts"
                  className="transition-colors hover:text-white"
                >
                  Handicrafts
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Home Decor"
                  className="transition-colors hover:text-white"
                >
                  Home Decor
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Jewelry"
                  className="transition-colors hover:text-white"
                >
                  Jewelry
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Food"
                  className="transition-colors hover:text-white"
                >
                  Food & Spices
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Art"
                  className="transition-colors hover:text-white"
                >
                  Art & Paintings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-white"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="transition-colors hover:text-white"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-gray-400" />
                <span>Thamel, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 shrink-0 text-gray-400" />
                <span>+977 1 234 5678</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 shrink-0 text-gray-400" />
                <span>info@kathmanduShop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">
                Subscribe to our newsletter
              </h3>
              <div className="flex max-w-md">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-r-none bg-gray-800 text-white"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
            <div className="flex items-center justify-start md:justify-end">
              <div className="flex space-x-4"></div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Kathmandu Shop. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
