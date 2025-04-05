import { FaMapMarkerAlt } from "react-icons/fa";

export default function OnARollSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
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

          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
            Fine Your Store
            <span className="bg-red-500 p-1 rounded-full text-white">
              <FaMapMarkerAlt className="text-sm" />
            </span>
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src="/images/roll.png" // Replace with actual image path
            alt="Carpet Depot Rolls"
            className="rounded-xl w-full max-w-md md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
}
