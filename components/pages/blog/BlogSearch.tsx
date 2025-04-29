"use client";

import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

const BlogSearch = () => {
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `/api/blog-search?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleSearch(query);
    }, 300);
  }, [query]);

  const handleSelect = (slug: string) => {
    setQuery("");
    setSuggestions([]);
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="relative overflow-visible bg-white p-6 rounded-lg drop-shadow-[#E1E1E140] drop-shadow-2xl z-30">
      <h3 className="text-xl font-semibold mb-2">Search Here</h3>
      <input
        type="text"
        placeholder="Search here..."
        className="w-full p-3 border accent-primary border-gray-300 rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && suggestions.length > 0 && (
        <ul className="absolute left-6 right-6 top-[100%] bg-white mt-2 z-40  rounded-md max-h-60 overflow-y-auto shadow-md">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-primary"
              onClick={() => handleSelect(item.slug)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}

      {loading && (
        <div className="absolute left-6 right-6 top-[100%] bg-white mt-2  rounded-md px-4 py-2 z-10">
          Loading...
        </div>
      )}
    </div>
  );
};

export default BlogSearch;
