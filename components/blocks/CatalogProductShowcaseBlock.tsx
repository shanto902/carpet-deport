"use client";

import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { TCatalogProductBlock } from "@/interfaces";

import CatalogProductCard from "../cards/CatalogProductCard";

export const CatalogProductShowcaseBlock = ({
  block,
}: {
  block: TCatalogProductBlock;
}) => {
  return (
    <section className="py-16 bg-white">
      <PaddingContainer className="mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Our All Products</h2>
          <CustomButton href="/catalog">View All Products</CustomButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {block?.item?.catalog_products?.map((product) => {
            const productData = product.catalog_product_id;

            return (
              <CatalogProductCard key={productData.id} product={productData} />
            );
          })}
        </div>
      </PaddingContainer>
    </section>
  );
};
