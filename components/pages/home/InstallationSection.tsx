import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";

export default function InstallationSection() {
  return (
    <section className="py-16 bg-[#F7F9FA]">
      <PaddingContainer className="   px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Image block with mobile overlay */}
        <div className="relative   w-full mix-blend-multiply">
          <video
            className=""
            src="/video/installation.mp4" // 👈 replace with your video path
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Text Content */}
        <div className=" w-full text-center md:text-left">
          <h2 className="text-2xl md:text-[26px] font-bold text-[#1E1E1E] mb-4">
            Get It Installed FAST!
          </h2>
          <p className="text-[#505050] text-sm md:text-base leading-relaxed mb-2">
            We offer fast, professional installation from our trusted group of
            installers who have years of experience installing all types of
            flooring.
          </p>
          <p className="text-[#505050] text-sm md:text-base leading-relaxed mb-6">
            We’ll even move your furniture for you!
          </p>

          <CustomButton>Installation</CustomButton>
        </div>
      </PaddingContainer>
    </section>
  );
}
