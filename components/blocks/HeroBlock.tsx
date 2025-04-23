import InStoreConsultationForm from "@/components/form/InStoreConsultationForm";

import PaddingContainer from "@/components/layout/PaddingContainer";
import { THeroBlock } from "@/interfaces";
import parser from "html-react-parser";

import CustomButton from "../common/CustomButton";
export const HeroBlock = ({ block }: { block: THeroBlock }) => {
  return (
    <div
      id={block.id}
      className="relative bg-cover bg-center min-h-[650px] flex items-center justify-center"
      style={{
        backgroundImage: `url('${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.background_image}')`,
      }}
    >
      <div className="bg-black/50 absolute inset-0 z-0" />

      <PaddingContainer className="relative  z-10 container mx-auto p-8 flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* Left Text Section */}
        <div className="text-white ">
          <div className="mb-5 hero-text">{parser(block.item.body)}</div>

          <CustomButton
            button_type="location"
            href={block.item.button_link}
            className="n w-fit border-none drop-shadow-lg hover:drop-shadow-2xl text-lg p-3  bg-white text-black font-medium  "
          >
            {block.item.button_text}
          </CustomButton>
        </div>

        {/* Right Form Section */}
        <InStoreConsultationForm />
      </PaddingContainer>
    </div>
  );
};
export default HeroBlock;
