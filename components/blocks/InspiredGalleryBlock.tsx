import PaddingContainer from "@/components/layout/PaddingContainer";
import { TInspiredGalleryBlock } from "@/interfaces";
import Image from "next/image";
const InspiredGalleryBlock = ({ block }: { block: TInspiredGalleryBlock }) => {
  return (
    <section className="py-16 bg-white text-center">
      <PaddingContainer className=" mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-10">
          Get Inspired For Your Next Project
        </h2>

        <div className=" grid grid-cols-1 sm:grid-cols-6  gap-4">
          {/* First Image (top-left large box) */}
          <div className="sm:col-span-2 sm:row-span-3">
            <Image
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.image_1}`}
              alt="Inspiration 1"
              className="w-full h-full rounded-xl object-cover"
              width={390}
              height={280}
            />
          </div>

          {/* Second Image (middle top) */}
          <div className="sm:col-span-2 sm:row-span-3 sm:col-start-3">
            <Image
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.image_2}`}
              alt="Inspiration 2"
              className="w-full h-full rounded-xl object-cover"
              width={390}
              height={280}
            />
          </div>
          {/* Fourth Image (right tall) */}

          {/* Third Image (long wide bottom section) */}
          <div className="sm:col-span-4 sm:row-span-3 sm:col-start-1 sm:row-start-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.image_4}`}
              alt="Inspiration 4"
              className="w-full h-full rounded-xl object-cover"
              width={800}
              height={280}
            />
          </div>
          <div className="sm:col-span-2 sm:row-span-6 sm:col-start-5 sm:row-start-1">
            <Image
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.image_3}`}
              alt="Inspiration 3"
              className="w-full h-full rounded-xl object-cover"
              width={390}
              height={590}
            />
          </div>
        </div>
      </PaddingContainer>
    </section>
  );
};

export default InspiredGalleryBlock;
