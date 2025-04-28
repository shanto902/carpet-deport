// page component remains server-side

import ProductCategoryClient from "@/components/pages/categories/ProductCategoryPage";
import { fetchProducts } from "@/helper/fetchFromDirectus";
import { Suspense } from "react";

const ProductCategoryPage = async () => {
  const productsData = await fetchProducts();

  return (
    <Suspense>
      <ProductCategoryClient productsData={productsData} />
    </Suspense>
  );
};

export default ProductCategoryPage;
