import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function InstallationSection() {
  return (
    <section className="py-16 bg-[#F7F9FA]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Image block with mobile overlay */}
        <div className="relative md:w-1/2 w-full">
          <img
            src="/images/install1.png" // Replace with your background image path
            alt="Wood Panel"
            className="rounded-xl w-full"
          />
          <img
            src="/images/mobile.png" // Replace with transparent phone image
            alt="Phone"
            className="absolute top-1/2 left-1/2 w-[120px] md:w-[160px] -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 w-full text-center md:text-left">
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

          <button className="flex items-center gap-2 bg-black text-white text-sm px-5 py-2 rounded-full font-medium">
            Installation
            <span className="bg-red-500 p-1 rounded-full">
              <FaArrowUpRightFromSquare className="text-xs" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
