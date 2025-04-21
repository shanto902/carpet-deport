import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { TTwoColumnBlock } from "@/interfaces";
import Image from "next/image";
import { Body } from "../common/Body";

const TwoColumnBlock = ({ block }: { block: TTwoColumnBlock }) => {
  return (
    <section className="py-10 bg-white">
      <PaddingContainer
        className={` max-w-[1200px] px-4 flex flex-col ${
          block.item.layout === "left" ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-10`}
      >
        {/* Text Content */}
        <div className="md:w-1/2">
          <Body>{block.item.body}</Body>

          <CustomButton className="mt-5" button_type={block.item.button_type}>
            {block.item.button_text}
          </CustomButton>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          {block.item.media_type === "image" ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.image}`}
              alt="Two Column Block Image"
              width={500}
              height={500}
              className="w-full h-auto max-h-[390px] object-cover rounded-lg"
            />
          ) : (
            <div className="relative   w-full mix-blend-multiply">
              <video
                className=""
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.video}`}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          )}
        </div>
      </PaddingContainer>
    </section>
  );
};
export default TwoColumnBlock;
