"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchBoxProps {
  initialQuery: string;
}

export default function SearchBox({ initialQuery }: SearchBoxProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const normalizedTerm = searchTerm.trim();
    const currentTerm = initialQuery.trim();

    if (normalizedTerm === currentTerm) return;

    const timeoutId = window.setTimeout(() => {
      const searchParams = new URLSearchParams();

      if (normalizedTerm) searchParams.set("q", normalizedTerm);

      const queryString = searchParams.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [initialQuery, pathname, router, searchTerm]);

  return (
    <div className="relative mt-8 flex mx-auto max-w-4xl items-center">
      <label htmlFor="site-search" className="sr-only">
        Search the site
      </label>
      <input
        id="site-search"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-800  text-2xl shadow-sm focus:border-[#70169c] focus:outline-none focus:ring-2 focus:ring-[#70169c]/30"
        placeholder="Search the site"
        autoComplete="off"
      />
      <Search
        size={25}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 text-gray-500"
      />
    </div>
  );
}
