/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaStar } from "react-icons/fa";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import PaddingContainer from "@/components/layout/PaddingContainer";
import ProductCard from "@/components/cards/ProductCard";
import { TProduct } from "@/interfaces";

const filterFields = [
  "category.name",
  "brand",
  "fiber_brand",
  "application",
  "color_tones",
  "installation_method",
  "water_protection",
  "look",
  "material",
] as const;

type Props = {
  productsData: TProduct[];
};

const ProductCategoryClient = ({ productsData }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const PRODUCTS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeImages, setActiveImages] = useState<{ [key: string]: string }>(
    {}
  );

  const clearAllFilters = () => {
    const current = new URLSearchParams(window.location.search);
    current.delete("category");
    router.replace(`?${current.toString()}`);
    setFilters({});
  };

  const filterOptions: Record<string, string[]> = {};
  for (const key of filterFields) {
    filterOptions[key] = Array.from(
      new Set(
        productsData
          .map((p) => {
            if (key === "category.name") return p.category?.name;
            const value = p[key as keyof TProduct];
            return typeof value === "string" ? value : null;
          })
          .filter((v): v is string => Boolean(v))
      )
    );
  }

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const currentFilters: Record<string, string[]> = {};

    if (categoryParam) {
      const categoryIds = categoryParam.split(",").map((id) => parseInt(id));
      const matchedCategories = productsData
        .filter((p) => categoryIds.includes(p.category?.id || 0))
        .map((p) => p.category?.name)
        .filter((name): name is string => Boolean(name));

      currentFilters["category.name"] = matchedCategories;
    }

    setFilters(currentFilters);
  }, [searchParams, productsData]);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const baseProducts = productsData;

      const activeFilters = Object.entries(filters).filter(
        ([_, values]) => values.length > 0
      );

      if (activeFilters.length === 0) {
        setFilteredProducts(baseProducts);
        setCurrentPage(1);
        setLoading(false);
        return;
      }

      const result = baseProducts.filter((product) =>
        activeFilters.every(([key, selected]) => {
          const value =
            key === "category.name"
              ? product.category?.name
              : key === "rating"
              ? product.rating?.toString()
              : product[key as keyof TProduct];
          return selected.includes(value as string);
        })
      );

      setFilteredProducts(result);
      setCurrentPage(1);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters, productsData]);

  const toggleFilter = (field: string, value: string) => {
    const current = filters[field] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const newFilters = { ...filters, [field]: updated };
    setFilters(newFilters);

    if (field === "category.name") {
      const categoryIds = newFilters["category.name"]
        .map(
          (name) =>
            productsData.find((p) => p.category?.name === name)?.category?.id
        )
        .filter((id): id is number => Boolean(id));

      const params = new URLSearchParams(window.location.search);
      if (categoryIds.length > 0) {
        params.set("category", categoryIds.join(","));
      } else {
        params.delete("category");
      }

      router.replace(`?${params.toString()}`);
    }
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <>
      <BreadcrumbBanner
        title="Product Categories"
        breadcrumb={["Product Categories"]}
      />
      <PaddingContainer className="flex flex-col md:flex-row py-6 gap-6">
        <aside className="w-full md:w-1/5">
          <div className="bg-white p-4 rounded shadow space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg pb-2">Product Filters</h3>
            </div>

            {filterFields.map((field) => (
              <details
                key={field}
                className="group"
                open={field === "category.name"}
              >
                <summary
                  className={`cursor-pointer flex justify-between capitalize items-center font-medium py-2 ${
                    field === "category.name" ? "text-primary" : ""
                  }`}
                >
                  <span>
                    {field.replace(/_/g, " ").replace("category.name", "Type")}
                  </span>
                  <span className="text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>

                <div className="mt-2 space-y-2 text-sm">
                  {field === "color_tones" ? (
                    <div className="flex flex-wrap gap-2">
                      {filterOptions[field].map((option) => {
                        const selected = filters[field]?.includes(option);
                        return (
                          <div
                            key={option}
                            onClick={() => toggleFilter(field, option)}
                            title={option}
                            className={`w-6 h-6 rounded-full border cursor-pointer ${
                              selected
                                ? "border-2 border-primary"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: option }}
                          ></div>
                        );
                      })}
                    </div>
                  ) : (
                    filterOptions[field].map((option) => (
                      <label
                        key={option}
                        className="flex justify-between items-center cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="accent-primary"
                            checked={filters[field]?.includes(option) || false}
                            onChange={() => toggleFilter(field, option)}
                          />
                          <span>{option}</span>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </details>
            ))}

            <details className="group">
              <summary className="cursor-pointer flex justify-between items-center font-medium py-2">
                <span>Rating</span>
                <span className="text-xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="mt-2 space-y-2 text-sm">
                {[5, 4, 3, 2, 1].map((starCount) => (
                  <label key={starCount} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="accent-primary"
                      checked={
                        filters["rating"]?.includes(starCount.toString()) ||
                        false
                      }
                      onChange={() =>
                        toggleFilter("rating", starCount.toString())
                      }
                    />
                    <span className="flex text-yellow-500">
                      {Array.from({ length: starCount }).map((_, i) => (
                        <FaStar key={i} size={14} />
                      ))}
                    </span>
                    <span className="ml-1 text-gray-500">
                      ({starCount} Star)
                    </span>
                  </label>
                ))}
              </div>
            </details>

            <button
              className="bg-slate-200 rounded-full w-full py-2 px-4"
              onClick={clearAllFilters}
            >
              RESET
            </button>
          </div>
        </aside>

        <main className="w-full md:w-4/5">
          <div className="flex justify-between items-center mb-4">
            <p>Showing {filteredProducts.length} results</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 animate-pulse rounded p-3 h-44"
                  ></div>
                ))
              : paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currentImage={
                      activeImages[product.id] ||
                      product.textures?.[0]?.directus_files_id
                    }
                    onTextureClick={(textureId: string) =>
                      setActiveImages((prev) => ({
                        ...prev,
                        [product.id]: textureId,
                      }))
                    }
                  />
                ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({
              length: Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
            }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded-full cursor-pointer ${
                    page === currentPage ? "bg-red-500 text-white" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </main>
      </PaddingContainer>
    </>
  );
};

export default ProductCategoryClient;
