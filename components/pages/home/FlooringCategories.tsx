import Image from "next/image";

export default function FlooringCategories() {
  const categories = [
    {
      name: "Carpet",
      image: "/images/carpet.png", // replace with actual image path
    },
    {
      name: "Hardwood",
      image: "/images/hardwood.png", // replace with actual image path
    },
    {
      name: "Luxury Vinyl",
      image: "/images/vinyl.png", // replace with actual image path
    },
    {
      name: "Rugs & Remnants",
      image: "/images/rug.png", // replace with actual image path
    },
  ];

  return (
    <section className="bg-[#F7F9FA] py-16 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-2">
          Your Source For Discount
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold text-black mb-12">
          Flooring In The Atlanta Metropolitan Area
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm overflow-hidden p-4 flex flex-col items-center"
            >
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg"
                height={300}
                width={400}
              />
              <button className="mt-4 bg-red-500 text-white font-semibold py-2 px-6 rounded-full">
                {item.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
