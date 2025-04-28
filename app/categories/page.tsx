// page component remains server-side

import ProductCategoryClient from "@/components/pages/categories/ProductCategoryPage";
import { fetchProducts } from "@/helper/fetchFromDirectus";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Categories | Carpet Depot",
  description: "All categories of Carpet Depot",
};
const ProductCategoryPage = async () => {
  const productsData = await fetchProducts();

  return (
    <Suspense>
      <ProductCategoryClient productsData={productsData} />
    </Suspense>
  );
};

export default ProductCategoryPage;
