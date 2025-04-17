import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { TiHeartOutline } from "react-icons/ti";

const products = [
  {
    category: "Hardwood",
    title: "Floorever Patplus - Cardigan",
    image: "/images/product2.jpeg", //
    rating: 5,
    reviews: 99,
  },
  {
    category: "Carpet",
    title: "Microban® Polyester - Dolce",
    image: "/images/product2.jpeg", //
    rating: 5,
    reviews: 99,
  },
  {
    category: "Luxury Vinyl",
    title: "Floorever™ Petplus - Big Sur",
    image: "/images/product2.jpeg", //
    rating: 5,
    reviews: 99,
  },
  {
    category: "Rugs & Remnants",
    title: "Microban® Polyester - Mesh",
    image: "/images/product2.jpeg", //
    rating: 5,
    reviews: 99,
  },
];

export default function AllProducts() {
  return (
    <section className="py-16 bg-white">
      <PaddingContainer className=" mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Our All Products</h2>
          <CustomButton>View All Products</CustomButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white  rounded-2xl p-4 drop-shadow-sm hover:drop-shadow-lg transition"
            >
              <div className="relative ">
                <Image
                  src={product.image}
                  height={300}
                  width={400}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button className="absolute  top-2 right-2 bg-white p-2 rounded-full shadow">
                  <TiHeartOutline className="text-gray-500 hover:text-red-500 h-5 w-5" />
                </button>
              </div>

              {/* Color Options */}
              <div className="flex items-center gap-2 mt-4">
                <div className="w-8 h-8 border-2 border-red-500 rounded-full"></div>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gray-400 rounded-full"
                  ></div>
                ))}
                <span className="text-gray-500 text-sm">+6</span>
              </div>

              {/* Category and Title */}
              <p className=" text-sm text-gray-600 my-3">{product.category}</p>
              <h3 className="font-medium text-lg ">{product.title}</h3>

              {/* Ratings */}
              <div className="flex items-center my-3 gap-1 text-yellow-500 ">
                {[...Array(product.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span className="text-gray-600 text-sm ml-1">
                  ({product.reviews})
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 flex-wrap">
                <button className="bg-red-500 text-nowrap text-white text-sm px-3 py-1 rounded-full">
                  Find In Store
                </button>
                <button className="border  text-nowrap border-red-500 text-red-500 text-sm px-4 py-1 rounded-full">
                  See In My Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </PaddingContainer>
    </section>
  );
}
