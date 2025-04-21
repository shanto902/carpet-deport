import CustomButton from "@/components/common/CustomButton";
import { getAllBlogs } from "@/helper/fetchFromDirectus";
import { TBlogBlogs } from "@/interfaces";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BlogBlock = async ({ block }: { block: TBlogBlogs }) => {
  const blogs = await getAllBlogs(1, 3);

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
          {blogs.results.map((post, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 drop-shadow-sm hover:drop-shadow-md transition flex flex-col"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`}
                alt={post.title}
                className=" object-cover w-full h-[200px] rounded-xl mb-4"
                height={200}
                width={350}
              />

              {/* Category and Date */}
              <div className="flex justify-between text-sm text-gray-500 font-medium mb-2">
                <span>{post.category.name}</span>
                <span>{`${moment(post.date_updated || post.date_created).format(
                  "MMM DD, YYYY"
                )} `}</span>
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
};

export default BlogBlock;
