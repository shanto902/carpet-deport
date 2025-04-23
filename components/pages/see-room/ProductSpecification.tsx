"use client";

import React from "react";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { TProduct } from "@/interfaces";

type Props = {
  product: TProduct;
};

const ProductSpecification = ({ product }: Props) => {
  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category.name },
    { label: "Application", value: product.application },
    { label: "Color Tones", value: product.color_tones },
    { label: "Installation Method", value: product.installation_method },
    { label: "Water Protection", value: product.water_protection },
    { label: "Look", value: product.look },
    { label: "Material", value: product.material },
    { label: "Fiber Brand", value: product.fiber_brand },
    { label: "SKU", value: product.sku },
  ];

  return (
    <section className="bg-[#F8FAFC] pb-10">
      <PaddingContainer>
        <h2 className="text-2xl md:text-2xl font-semibold mb-6">
          Specifications
        </h2>
        <div className="grid gap-3">
          {specs.map((item, index) => (
            <div
              key={index}
              className="bg-white px-4 py-3 rounded-md   md:grid grid-cols-4 flex justify-between items-center  text-sm md:text-base"
            >
              <p className=" col-span-1 font-medium  text-paragraph">
                {item.label}
              </p>
              <p className="text-gray-900 col-span-3 text-left">{item.value}</p>
            </div>
          ))}
        </div>
      </PaddingContainer>
    </section>
  );
};
export default ProductSpecification;
