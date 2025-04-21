import PaddingContainer from "@/components/layout/PaddingContainer";
import { TCategoriesShowcaseBlock } from "@/interfaces";
import Image from "next/image";

import HeaderText from "../common/Header";
import Link from "next/link";
export const CategoriesShowcaseBlock = ({
  block,
}: {
  block: TCategoriesShowcaseBlock;
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
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${item.categories_id.image}`}
                alt={item.categories_id.name}
                className="w-full h-40 object-cover rounded-lg"
                height={300}
                width={400}
              />
              <Link
                href={`/categories?category=${item.categories_id.id}`}
                className="mt-4 bg-red-500 text-white text-lg hover:drop-shadow-lg active:drop-shadow-none drop-shadow-none transition-all duration-300 cursor-pointer w-full py-3 px-6 rounded-full"
              >
                {item.categories_id.name}
              </Link>
            </div>
          ))}
        </div>
      </PaddingContainer>
    </section>
  );
};
export default CategoriesShowcaseBlock;
