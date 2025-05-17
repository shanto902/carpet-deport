import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { TTwoColumnBlock } from "@/interfaces";
import Image from "next/image";
import { Body } from "../common/Body";
import { VideoPlayer } from "../common/VideoPlayer";

const TwoColumnBlock = ({ block }: { block: TTwoColumnBlock }) => {
  return (
    <section
      className={`py-10 ${block.sort % 2 === 0 ? "bg-white" : " bg-[#F8FAFB]"}`}
    >
      <PaddingContainer
        className={`grid md:min-h-[400px] grid-cols-1 md:grid-cols-2 gap-10 items-stretch ${
          block.item.layout === "right" ? "" : "md:[direction:rtl]"
        }`}
      >
        {/* Text Content */}
        <div className=" order-2 md:order-none h-full place-content-center [direction:ltr]">
          <Body>{block.item.body}</Body>

          {block.item.button === "yes" && (
            <CustomButton
              href={block.item.button_link}
              className="mt-5"
              button_type={block.item.button_type}
            >
              {block.item.button_text}
            </CustomButton>
          )}
        </div>

        {/* Image or Video */}
        <div className="h-full order-1 md:order-none">
          {block.item.media_type === "image" ? (
            <div
              className={`
    relative w-full overflow-hidden rounded-lg 
    aspect-[4/3] md:aspect-auto h-auto md:h-full
  `}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.image}`}
                alt="Two Column Block Image"
                fill
                priority
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative w-full h-full mix-blend-multiply">
              <VideoPlayer video={block.item.video as string} />
            </div>
          )}
        </div>
      </PaddingContainer>
    </section>
  );
};
export default TwoColumnBlock;
