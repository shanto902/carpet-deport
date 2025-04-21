// page component remains server-side

import ProductCategoryClient from "@/components/pages/categories/ProductCategoryPage";
import { fetchProducts } from "@/helper/fetchFromDirectus";

const ProductCategoryPage = async () => {
  const productsData = await fetchProducts();
  return <ProductCategoryClient productsData={productsData} />;
};

export default ProductCategoryPage;
