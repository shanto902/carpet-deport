import { FaHeart, FaStar, FaArrowUpRightFromSquare } from "react-icons/fa6";

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
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Our All Products</h2>
          <button className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800">
            View All Products
            <span className="bg-red-500 text-white p-1 rounded-full">
              <FaArrowUpRightFromSquare className="w-3 h-3" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition"
            >
              <div className="relative ">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button className="absolute  top-2 right-2 bg-white p-1 rounded-full shadow">
                  <FaHeart className="text-gray-500 hover:text-red-500" />
                </button>
              </div>

              {/* Color Options */}
              <div className="flex items-center gap-2 mt-4">
                <div className="w-5 h-5 border-2 border-red-500 rounded-full"></div>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 bg-gray-400 rounded-full"
                  ></div>
                ))}
                <span className="text-gray-500 text-sm">+6</span>
              </div>

              {/* Category and Title */}
              <p className="mt-2 text-sm text-gray-600">{product.category}</p>
              <h3 className="font-medium text-base">{product.title}</h3>

              {/* Ratings */}
              <div className="flex items-center gap-1 text-yellow-500 mt-2">
                {[...Array(product.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span className="text-gray-600 text-sm ml-1">
                  ({product.reviews})
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button className="bg-red-500 text-white text-sm px-4 py-1 rounded-full">
                  Find In Store
                </button>
                <button className="border border-red-500 text-red-500 text-sm px-4 py-1 rounded-full">
                  See In My Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
