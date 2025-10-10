import PaddingContainer from "@/components/layout/PaddingContainer";
import { TCatalogCategoryBlock } from "@/interfaces";
import Image from "next/image";

import HeaderText from "../common/Header";
import SmartLink from "../common/SmartLink";

const CatalogCategoriesBlock = ({
  block,
}: {
  block: TCatalogCategoryBlock;
}) => {
  return (
    <section className="bg-[#F7F9FA] py-16 text-center">
      <PaddingContainer className=" mx-auto px-4">
        <HeaderText>{block.item.header}</HeaderText>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {block.item.categories.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl drop-shadow overflow-hidden p-4 flex flex-col items-center"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${item.catalog_categories_id.image}`}
                alt={item.catalog_categories_id.name}
                className="w-full h-40 object-cover rounded-lg"
                height={300}
                width={400}
              />
              <SmartLink
                href={item.catalog_categories_id.link}
                className="mt-4 bg-red-500 text-white text-lg hover:drop-shadow-lg active:drop-shadow-none drop-shadow-none transition-all duration-300 cursor-pointer w-full py-3 px-6 rounded-full"
              >
                {item.catalog_categories_id.name}
              </SmartLink>
            </div>
          ))}
        </div>
      </PaddingContainer>
    </section>
  );
};
export default CatalogCategoriesBlock;
