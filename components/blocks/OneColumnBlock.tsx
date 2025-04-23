import Image from "next/image";
import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import { Body } from "../common/Body";
import { TOneColumnBlock } from "@/interfaces";

const OneColumnBlock = ({ block }: { block: TOneColumnBlock }) => {
  return (
    <div
      className={`space-y-5  py-10 ${
        block.sort % 2 === 0 ? "bg-white" : " bg-[#F8FAFB]"
      }`}
    >
      <PaddingContainer>
        <Body>{block.item.body}</Body>
        <div
          className={`grid grid-cols-1 sm:grid-cols-${block.item.images.length} gap-4 pt-4`}
        >
          {block.item.images.map((item, index) => (
            <div key={index} className="relative w-full h-[300px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${item.directus_files_id}`}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </PaddingContainer>
    </div>
  );
};

export default OneColumnBlock;
