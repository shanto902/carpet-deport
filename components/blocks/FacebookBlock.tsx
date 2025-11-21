import PowrSocialFeed from "@/components/PowrSocialFeed";

import PaddingContainer from "../layout/PaddingContainer";
import CustomButton from "../common/CustomButton";
import { TFacebookbBlock } from "@/interfaces";

export default function FacebookBlock({ block }: { block: TFacebookbBlock }) {
  return (
    <section className="bg-[#F7F9FA]">
      <PaddingContainer className="mx-auto  py-10">
        <>
          <div className="flex flex-col md:flex-row justify-between w-full gap-4 items-center mb-4">
            <h2 className="text-3xl text-center md:text-left font-semibold">
              {block.item.title}
            </h2>
            <CustomButton
              button_type="arrow"
              newTab
              className="w-full md:w-fit"
              href="https://www.facebook.com/carpetdepotatlanta"
            >
              {block.item.button_text}
            </CustomButton>
          </div>
        </>

        <PowrSocialFeed />
      </PaddingContainer>
    </section>
  );
}
