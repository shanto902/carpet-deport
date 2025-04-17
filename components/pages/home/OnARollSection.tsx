import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import Image from "next/image";

export default function OnARollSection() {
  return (
    <section className="py-16 bg-white">
      <PaddingContainer className=" max-w-[1200px] px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-[28px] font-bold leading-tight mb-4 text-[#1E1E1E]">
            WE’RE ON A ROLL!
          </h2>
          <p className="text-[18px] text-[#E53030] font-semibold mb-4 leading-snug">
            With 7 Convenient Locations, <br />
            Carpet Depot Serves The Entire Atlanta Area.
          </p>
          <p className="text-[#505050] text-[14px] leading-relaxed mb-6">
            We offer an unmatched selection of high quality flooring from top
            brands, such as: Dreamweaver, Tuftex, Southwind, Phenix, Lexmark,
            and more! Our flooring comes direct from the manufacturer, and we
            pass those savings directly to you.
          </p>

          <CustomButton location>Find Your Store</CustomButton>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <Image
            src="/images/roll.png"
            alt="Carpet Depot Rolls"
            className="rounded-xl w-full"
            height={390}
            width={590}
          />
        </div>
      </PaddingContainer>
    </section>
  );
}
