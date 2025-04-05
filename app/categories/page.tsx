import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";

const filters = [
  "Brand",
  "Fiber Blend",
  "Application",
  "Color Tones",
  "Installation Method",
  "Water Protection",
  "Look",
  "Material",
];

const ratings = [5, 4, 3, 2, 1];

const products = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  name: `Product ${i + 1}`,
  image: "/images/product2.jpeg",
  type: "Type",
  blend: "Blend",
  tags: ["Best Seller", "Carpet Type"],
  rating: 4.5,
}));

const ProductCategoryPage = () => {
  return (
    <>
      <BreadcrumbBanner
        title="Product Categories"
        background="/breadcrumb-products.jpg"
        breadcrumb={["Product Categories"]}
      />
      <div className="flex flex-col md:flex-row px-4 md:px-10 py-6 gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-4 text-lg">Product Categories</h3>
            <div className="space-y-2 mb-6">
              <label className="block">
                <input type="checkbox" /> Carpet
              </label>
              <label className="block">
                <input type="checkbox" /> Hardwood
              </label>
              <label className="block">
                <input type="checkbox" /> Laminate
              </label>
              <label className="block">
                <input type="checkbox" /> Luxury Vinyl
              </label>
            </div>

            {filters.map((f, idx) => (
              <details key={idx} className="mb-4">
                <summary className="cursor-pointer font-medium">{f}</summary>
                <div className="mt-2 pl-2 space-y-1 text-sm">
                  <label>
                    <input type="checkbox" /> Option 1
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" /> Option 2
                  </label>
                </div>
              </details>
            ))}

            <div className="mt-4">
              <h4 className="font-medium mb-2">Rating</h4>
              {ratings.map((r) => (
                <label key={r} className="flex items-center space-x-1 text-sm">
                  <input type="checkbox" />
                  <span className="flex text-yellow-500">
                    {Array.from({ length: r }).map((_, i) => (
                      <FaStar key={i} size={12} />
                    ))}
                  </span>
                </label>
              ))}
            </div>

            <button className="w-full bg-red-500 text-white py-2 mt-6 rounded">
              FILTER
            </button>
            <button className="w-full mt-2 text-sm underline text-red-600">
              RESET
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <p>Showing 1–12 of 60 results</p>
            <select className="border p-1 rounded">
              <option>Default Sorting</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-3 rounded shadow relative hover:shadow-lg"
              >
                <button className="absolute top-2 right-2 text-gray-500">
                  <FaHeart />
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-28 object-cover mb-2 rounded"
                />
                <p className="text-sm text-gray-700">{product.name}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex text-yellow-500 mt-2 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            <button className="px-3 py-1 border rounded">1</button>
            <button className="px-3 py-1 border rounded bg-red-500 text-white">
              2
            </button>
            <button className="px-3 py-1 border rounded">3</button>
            <span className="px-3 py-1">...</span>
            <button className="px-3 py-1 border rounded">9</button>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductCategoryPage;
