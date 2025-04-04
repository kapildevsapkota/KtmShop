"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsExpanded(false);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className={cn(
          "flex items-center transition-all duration-300",
          isExpanded ? "w-full md:w-[300px]" : "w-10"
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "absolute left-0 z-10",
            isExpanded ? "text-gray-500" : "text-gray-700"
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        <Input
          ref={inputRef}
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            "pl-10 transition-all duration-300",
            isExpanded
              ? "w-full opacity-100"
              : "w-0 border-transparent p-0 opacity-0"
          )}
        />

        {isExpanded && searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 text-gray-500"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </form>
    </div>
  );
}
