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
        className={` flex flex-col ${
          block.item.layout === "right" ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-10`}
      >
        {/* Text Content */}
        <div className="md:w-1/2">
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
              <VideoPlayer video={block.item.video as string} />
            </div>
          )}
        </div>
      </PaddingContainer>
    </section>
  );
};
export default TwoColumnBlock;
