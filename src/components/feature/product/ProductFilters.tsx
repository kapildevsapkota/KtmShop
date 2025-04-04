"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getAllCategories } from "@/lib/data";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Get current filter values from URL
  const categoryParam = searchParams.get("category") || "all";
  const sortParam = searchParams.get("sort") || "featured";
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 1000);

  // Local state for filter values in mobile sheet
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    // In a real app, this would be an API call
    const allCategories = getAllCategories();
    setCategories(allCategories);
  }, []);

  // Update URL with filter parameters
  const updateFilters = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.push(`/?${newParams.toString()}`);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    updateFilters({ sort: value });
  };

  // Handle category change
  const handleCategoryChange = (value: string) => {
    updateFilters({ category: value === "all" ? "" : value });
  };

  // Apply filters from mobile sheet
  const applyMobileFilters = () => {
    updateFilters({
      category: selectedCategory === "all" ? "" : selectedCategory,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    });
    setMobileFiltersOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Category dropdown - desktop */}
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Category: {categoryParam === "all" ? "All" : categoryParam}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleCategoryChange("all")}>
                All Categories
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile filters button */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Narrow down products by category and price
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="mb-4 font-medium">Category</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Checkbox
                      id="all-categories"
                      checked={selectedCategory === "all"}
                      onCheckedChange={() => setSelectedCategory("all")}
                    />
                    <Label htmlFor="all-categories" className="ml-2">
                      All Categories
                    </Label>
                  </div>

                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="ml-2">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-medium">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={(value) => setPriceRange(value as number[])}
                />
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <SheetFooter className="mt-6">
              <Button onClick={applyMobileFilters}>Apply Filters</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Sort dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Sort:{" "}
            {sortParam === "featured"
              ? "Featured"
              : sortParam === "price-low"
              ? "Price: Low to High"
              : sortParam === "price-high"
              ? "Price: High to Low"
              : "Newest"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleSortChange("featured")}>
            Featured
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("price-low")}>
            Price: Low to High
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("price-high")}>
            Price: High to Low
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("newest")}>
            Newest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
