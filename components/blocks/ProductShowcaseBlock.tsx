"use client";

import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { TProductShowCaseBlock } from "@/interfaces";

import { useState } from "react";
import ProductCard from "../cards/ProductCard";

export default function ProductShowcaseBlock({
  block,
}: {
  block: TProductShowCaseBlock;
}) {
  const [activeImages, setActiveImages] = useState<{ [key: string]: string }>(
    {}
  );

  return (
    <section className="py-16 bg-white">
      <PaddingContainer className="mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Our All Products</h2>
          <CustomButton href="/categories">View All Products</CustomButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {block?.item?.products?.map((product) => {
            const productData = product.products_id;

            return (
              <ProductCard
                key={productData.id}
                product={productData}
                currentImage={
                  activeImages[productData.id] ||
                  productData.textures?.[0]?.directus_files_id?.id
                }
                onTextureClick={(textureId: string) =>
                  setActiveImages((prev) => ({
                    ...prev,
                    [productData.id]: textureId,
                  }))
                }
              />
            );
          })}
        </div>
      </PaddingContainer>
    </section>
  );
}
