import mapPin from "@/assets/svg/map-pin.svg";
import InStoreConsultationForm from "@/components/form/InStoreConsultationForm";

import PaddingContainer from "@/components/layout/PaddingContainer";
import { THeroBlock } from "@/interfaces";
import parser from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
export const HeroBlock = ({ block }: { block: THeroBlock }) => {
  return (
    <div
      id={block.id}
      className="relative bg-cover bg-center min-h-[650px] flex items-center justify-center"
      style={{ backgroundImage: `url('/images/promo-bg.jpg')` }}
    >
      <div className="bg-black/50 absolute inset-0 z-0" />

      <PaddingContainer className="relative  z-10 container mx-auto p-8 flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* Left Text Section */}
        <div className="text-white ">
          <div className="mb-5">{parser(block.item.body)}</div>
          <Link
            href={block.item.button_link}
            className="flex justify-between w-fit items-center bg-white text-black font-medium p-2 rounded-full shadow-md"
          >
            <span className="px-5">{block.item.button_text}</span>
            <span className="ml-2 text-red-600 text-xl">
              <Image src={mapPin} alt="Map Pin" />
            </span>
          </Link>
        </div>

        {/* Right Form Section */}
        <InStoreConsultationForm />
      </PaddingContainer>
    </div>
  );
};
export default HeroBlock;
