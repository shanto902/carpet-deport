// page component remains server-side

import ProductCategoryClient from "@/components/pages/categories/ProductCategoryPage";
import { fetchProducts } from "@/helper/fetchFromDirectus";
import { TSettings } from "@/interfaces";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Categories | Carpet Depot",
  description: "All categories of Carpet Depot",
};
const ProductCategoryPage = async () => {
  const productsData = await fetchProducts();
  const settings = await directus.request(readSingleton("settings"));

  return (
    <Suspense>
      <ProductCategoryClient
        productsData={productsData}
        settings={settings as TSettings}
      />
    </Suspense>
  );
};

export default ProductCategoryPage;
