import Image from "next/image";
import { notFound } from "next/navigation";

import Link from "next/link";
import CommentList from "@/components/comment/CommentList";

import { BiSolidShareAlt } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

// MOCK DATA - Replace these with CMS/API calls
const getPostBySlug = async (slug: string) => {
  if (slug !== "choose-flooring") return null;

  return {
    title: "Choose The Right Flooring For Your Home",
    author: "Emily R",
    date: "2 April, 2024",
    image: "/your-image.jpg",
    content: [
      {
        heading: "1. Understanding Carpet Materials",
        text: "The material of your carpet plays a significant role in its look, feel, and longevity...",
      },
      {
        heading: "2. Pile Types: What's the Difference?",
        text: "Carpets come in a wide range of prices, so it’s important to set a budget...",
      },
      {
        heading: "3. Color and Pattern Selection",
        text: "Investing in a high-quality carpet can save you money in the long run...",
      },
    ],
  };
};

const getCategories = async () => {
  return [
    { name: "Carpet", count: 2 },
    { name: "Hardwood", count: 0 },
    { name: "Luxury Vinyl Flooring", count: 12 },
    { name: "Area Rugs & Remnants", count: 7 },
  ];
};

const getRelatedPosts = async (slug: string) => {
  return [
    {
      title: "Choose The Right Flooring For Your Home",
      date: "2 April, 2024",
      slug: "choose-flooring",
    },
    {
      title: "Top 5 Flooring Tips for Modern Homes",
      date: "28 March, 2024",
      slug: "top-flooring-tips",
    },
    {
      title: "The Ultimate Guide to Carpet Types",
      date: "15 March, 2024",
      slug: "carpet-guide",
    },
  ].filter((post) => post.slug !== slug);
};

export default async function BlogPage() {
  const post = await getPostBySlug("choose-flooring");
  const categories = await getCategories();
  const relatedPosts = await getRelatedPosts("choose-flooring");

  if (!post) return notFound();

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-6">
        <Image
          src={post.image}
          alt={post.title}
          width={1000}
          height={500}
          className="rounded-lg w-full object-cover"
        />

        <h1 className="text-3xl font-bold">{post.title}</h1>

        <div className="text-gray-700 space-y-6">
          {post.content.map((block, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold">{block.heading}</h2>
              <p>{block.text}</p>
            </div>
          ))}
        </div>
        {/* Share Icons */}
        <div className="flex items-center gap-4 pt-10">
          <BiSolidShareAlt className="text-red-500 text-2xl" />
          <div className="flex gap-3">
            <button className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center">
              <FaFacebookF />
            </button>
            <button className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center">
              <FaPinterestP />
            </button>
            <button className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center">
              <FaLinkedinIn />
            </button>
            <button className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center">
              <RxCross2 />
            </button>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-start gap-4 pt-10">
          <Image
            src="/author.jpg"
            alt="Author"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-sm text-gray-500">{post.date}</p>
            <p className="text-sm text-gray-600 mt-1">
              Ready to transform your home? Explore our carpet collection or
              contact our experts for personalized advice!
            </p>
          </div>
        </div>

        {/* Comments */}
        <CommentList slug={"choose-flooring"} />

        {/* Comment Form */}
        <form className="space-y-5 pt-10">
          <h3 className="text-2xl font-bold">Leave a Comment</h3>
          <p className="text-sm text-gray-500">
            Your email address will not be published. Required fields are marked
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 bg-gray-100 rounded-md focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 bg-gray-100 rounded-md focus:outline-none"
              required
            />
          </div>
          <textarea
            placeholder="Comment"
            className="w-full p-4 bg-gray-100 rounded-md focus:outline-none"
            rows={5}
            required
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-900"
          >
            Submit Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <aside className="space-y-10">
        {/* Search */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Search Here</h3>
          <input
            type="text"
            placeholder="Search here..."
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-2">All Categories</h3>
          <ul className="space-y-2 text-gray-700">
            {categories.map((cat, i) => (
              <li key={i}>
                🟠 {cat.name} ({cat.count})
              </li>
            ))}
          </ul>
        </div>

        {/* Related Posts */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Related Post</h3>
          <ul className="space-y-4 text-sm text-gray-800">
            {relatedPosts.map((post, i) => (
              <li key={i}>
                <p className="font-medium">{post.date}</p>
                <Link href={`/blog/${post.slug}`}>
                  <p className="hover:text-red-600 cursor-pointer">
                    {post.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
