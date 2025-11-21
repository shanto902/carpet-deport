import PowrSocialFeed from "@/components/PowrSocialFeed";

import { TFacebookbBlock } from "@/interfaces";
import PaddingContainer from "../layout/PaddingContainer";
import CustomButton from "../common/CustomButton";

export default function FacebookBlock({ block }: { block: TFacebookbBlock }) {
  return (
    <section className="bg-[#F7F9FA]">
      <div className="mx-auto py-10">
        <PaddingContainer>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Straight From Our Social</h2>
            <CustomButton
              button_type="arrow"
              newTab
              href="https://www.facebook.com/carpetdepotatlanta"
            >
              Follow Us on Facebook
            </CustomButton>
          </div>
        </PaddingContainer>

        <PowrSocialFeed />
      </div>
    </section>
  );
}
