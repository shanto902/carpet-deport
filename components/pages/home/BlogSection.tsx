import CustomButton from "@/components/common/CustomButton";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

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
          <h2 className="text-4xl font-bold text-[#1E1E1E]">
            Flooring Tips & Trends
          </h2>
          <CustomButton href={"/blog"}>View All Blog</CustomButton>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 drop-shadow-sm hover:drop-shadow-md transition flex flex-col"
            >
              <Image
                src={post.image}
                alt={post.title}
                className=" object-cover w-full h-[200px] rounded-xl mb-4"
                height={200}
                width={350}
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
