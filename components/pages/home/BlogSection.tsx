import Link from "next/link";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";

const blogPosts = [
  {
    image: "/images/blog1.png",
    title: "How to Choose the Right Flooring for Your Home",
    category: "Tile Flooring",
    date: "February 16, 2025",
  },
  {
    image: "/images/blog1.png",
    title: "How to Choose the Right Flooring for Your Home",
    category: "Tile Flooring",
    date: "February 16, 2025",
  },
  {
    image: "/images/blog1.png",
    title: "How to Choose the Right Flooring for Your Home",
    category: "Tile Flooring",
    date: "February 16, 2025",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 bg-[#F7F9FA]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[26px] font-bold text-[#1E1E1E]">
            Flooring Tips & Trends
          </h2>
          <Link
            href={"/blog"}
            className="flex items-center gap-2 bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800"
          >
            View All Blog
            <span className="bg-red-500 text-white p-1 rounded-full">
              <FaArrowUpRightFromSquare className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[200px] object-cover rounded-xl mb-4"
              />

              {/* Category and Date */}
              <div className="flex justify-between text-sm text-gray-500 font-medium mb-2">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-[16px] text-[#1E1E1E] font-semibold mb-4 leading-snug">
                {post.title}
              </h3>

              {/* Read More */}
              <Link
                href="/blog/choose-flooring"
                className="text-red-500 text-sm font-medium flex items-center mt-auto"
              >
                Read More <FaArrowRight className="ml-1 text-xs" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
