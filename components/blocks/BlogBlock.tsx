import CustomButton from "@/components/common/CustomButton";
import { getAllBlogs } from "@/helper/fetchFromDirectus";
import { TBlogBlogs } from "@/interfaces";

import BlogCard from "../cards/BlogCard";

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
          {blogs.results.map((post) => (
            <BlogCard blog={post} key={post.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogBlock;
