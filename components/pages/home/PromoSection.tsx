import mapPin from "@/assets/svg/map-pin.svg";
import JotformEmbed from "@/components/form/InStoreConsultationForm";
import PaddingContainer from "@/components/layout/PaddingContainer";
import Image from "next/image";
export default function PromoSection() {
  return (
    <div
      className="relative bg-cover bg-center min-h-[650px] flex items-center justify-center"
      style={{ backgroundImage: `url('/images/promo-bg.jpg')` }}
    >
      <div className="bg-black/50 absolute inset-0 z-0" />

      <PaddingContainer className="relative  z-10 container mx-auto p-8 flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* Left Text Section */}
        <div className="text-white ">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Save Big On Carpet
            <br /> Hardwood Laminate
            <br /> And More!
          </h1>
          <p className="text-lg mb-6">
            Our Trusted Source for Quality Carpets, Expert Installation, and
            Unbeatable Prices – Transforming Homes One Floor at a Time!
          </p>
          <button className="flex justify-between items-center bg-white text-black font-medium p-2 rounded-full shadow-md">
            <span className="px-5">Find Your Store</span>
            <span className="ml-2 text-red-600 text-xl">
              <Image src={mapPin} alt="Map Pin" />
            </span>
          </button>
        </div>

        {/* Right Form Section */}
        <div className="bg-black/30 backdrop-blur-md p-8 rounded-2xl w-full max-w-xl text-white  ">
          <JotformEmbed />

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="p-3 rounded-full bg-white text-black"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-3 rounded-full bg-white text-black"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 rounded-full bg-white text-black sm:col-span-1"
            />
            <input
              type="text"
              placeholder="Number"
              className="p-3 rounded-full bg-white text-black sm:col-span-1"
            />
          </div>

          <div className="mb-4">
            <p className="font-semibold">Please Select Your Store</p>
           
            <select className="w-full mt-2 p-3 rounded-full bg-white text-black">
              <option>Select Store</option>
              <option>Store 1</option>
              <option>Store 2</option>
            </select>
          </div>

          <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold text-lg">
            SUBMIT NOW
          </button> */}
        </div>
      </PaddingContainer>
    </div>
  );
}
