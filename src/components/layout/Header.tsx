"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, Heart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartSidebar from "@/components/feature/cart/CartSidebar";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import AuthModal from "@/components/feature/auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import SearchBar from "@/components/feature/search/SearchBar";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isAuthenticated } = useAuth();

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "Clothing", href: "/?category=Clothing" },
    { name: "Handicrafts", href: "/?category=Handicrafts" },
    { name: "Home Decor", href: "/?category=Home Decor" },
    { name: "Jewelry", href: "/?category=Jewelry" },
    { name: "Food", href: "/?category=Food" },
    { name: "Art", href: "/?category=Art" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
        )}
      >
        {/* Top bar with announcement */}
        <div className="bg-primary px-4 py-2 text-center text-sm font-medium text-white">
          Free shipping on orders over $100 | Use code NEPAL10 for 10% off
        </div>

        <div className="container mx-auto px-4">
          {/* Main header */}
          <div className="flex h-16 items-center justify-between md:h-20">
            <div className="flex items-center">
              <button
                className="mr-2 block md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-primary">
                  Kathmandu Shop
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <Link
                    href="/"
                    className={cn(
                      "font-medium transition-colors hover:text-primary",
                      pathname === "/" ? "text-primary" : "text-gray-800"
                    )}
                  >
                    Home
                  </Link>
                </li>
                <li className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center font-medium text-gray-800 transition-colors hover:text-primary">
                      Shop
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {categories.map((category) => (
                        <DropdownMenuItem key={category.name} asChild>
                          <Link href={category.href}>{category.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <Link
                    href="/"
                    className={cn(
                      "font-medium transition-colors hover:text-primary",
                      pathname === "/about" ? "text-primary" : "text-gray-800"
                    )}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className={cn(
                      "font-medium transition-colors hover:text-primary",
                      pathname === "/contact" ? "text-primary" : "text-gray-800"
                    )}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Search, Cart, Wishlist, Account */}
            <div className="flex items-center space-x-4">
              <SearchBar />

              <Link href="/">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAuthModalOpen(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 md:hidden">
            <div className="container mx-auto px-4 py-4">
              <nav>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/"
                      className="block font-medium text-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <button className="flex w-full items-center justify-between font-medium text-gray-800">
                      Shop
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <ul className="mt-2 space-y-2 pl-4">
                      {categories.map((category) => (
                        <li key={category.name}>
                          <Link
                            href={category.href}
                            className="block text-gray-600"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="block font-medium text-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="block font-medium text-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </header>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
