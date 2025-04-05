import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const posts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "How to Choose the Right Flooring for Your Home",
  category: "Tile Flooring",
  image: "/images/blog1.png", // Replace with actual image path
  date: "February 3, 2025",
  author: "Red Market",
  slug: `post-${i + 1}`,
}));

export default function BlogPage() {
  return (
    <>
      <BreadcrumbBanner
        title="Great Flooring. Great Brands. Great Prices."
        background="/breadcrumb-products.jpg"
        breadcrumb={["Products"]}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-sm rounded-lg overflow-hidden border hover:shadow-md transition"
            >
              <Link href={`/blog/choose-flooring`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <p className="text-sm text-red-500 font-medium">
                    {post.category}
                  </p>
                  <h3 className="font-semibold text-gray-800 leading-snug hover:text-red-600 transition line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-gray-500 pt-2">
                    <span>{post.date}</span>
                    <span className="text-red-500 font-semibold flex items-center gap-1">
                      {post.author} <FaArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
            1
          </button>
          <button className="w-8 h-8 rounded-full bg-red-500 text-white font-semibold">
            2
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
            3
          </button>
          <span className="px-2">...</span>
          <button className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
            9
          </button>
        </div>
      </div>
    </>
  );
}
