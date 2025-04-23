import { TBlog } from "@/interfaces";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const BlogCard = ({ blog }: { blog: TBlog }) => {
  return (
    <div
      key={blog.id}
      className="bg-white rounded-2xl p-4 drop-shadow-sm hover:drop-shadow-md transition flex flex-col"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${blog.image}`}
        alt={blog.title}
        className=" object-cover w-full h-[200px] rounded-xl mb-4"
        height={200}
        width={350}
      />

      {/* Category and Date */}
      <div className="flex justify-between text-sm text-primary font-medium mb-2">
        <span>{blog.category.name}</span>
        <span>{`${moment(blog.date_updated || blog.date_created).format(
          "MMM DD, YYYY"
        )} `}</span>
      </div>

      {/* Title */}
      <h3 className="text-[16px] text-left text-[#1E1E1E] font-semibold mb-4 leading-snug">
        {blog.title}
      </h3>

      {/* Read More */}
      <Link
        href={`/blog/${blog.slug}`}
        className="text-primary hover:underline underline-offset-4 text-sm font-medium flex items-center mt-auto"
      >
        Read More <FaArrowRight className="ml-1 text-xs" />
      </Link>
    </div>
  );
};

export default BlogCard;
