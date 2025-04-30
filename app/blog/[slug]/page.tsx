import Image from "next/image";
import { redirect } from "next/navigation";

import Link from "next/link";
import { BiSolidShareAlt } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { readItems } from "@directus/sdk";
import { stripHtml } from "string-strip-html"; // install this package if you don't have it

import directus from "@/lib/directus";
import {
  fetchCategories,
  getBlogData,
  getRelatedBlogs,
} from "@/helper/fetchFromDirectus";
import PostBody from "@/components/pages/blog/PostBody";
import moment from "moment";
import { Square, SquareCheck } from "lucide-react";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { Metadata, ResolvingMetadata } from "next";
import BlogSearch from "@/components/pages/blog/BlogSearch";
import { FaX } from "react-icons/fa6";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const blog = await getBlogData(slug);
    const previousImages = (await parent).openGraph?.images || [];

    if (blog !== null) {
      return {
        title:
          `${blog.title} | Blogs | Carpet Depot` ||
          "Blog not found | Carpet Depot",
        description: `${stripHtml(blog.body).result}` || "Blog not found ",
        openGraph: {
          images: blog.image
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${blog.image}`,
                },
              ]
            : [...previousImages],
        },
      };
    }

    // Default metadata if the page is not found
    return {
      title: "Blog not Found",
      description: "This page does not exist.",
    };
  } catch (error) {
    console.error("Error fetching page metadata:", error);

    // Return default metadata in case of error
    return {
      title: "Error",
      description: "Failed to fetch page metadata.",
    };
  }
}
export const generateStaticParams = async () => {
  try {
    const result = await directus.request(
      readItems("blogs", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug"],
      })
    );

    const allParams =
      (
        result as {
          slug: string;
        }[]
      ).map((item) => ({
        slug: item.slug,
        permalink: "blog",
      })) || [];

    return allParams;
  } catch (error) {
    console.error("Error fetching career:", error);
    throw new Error("Error fetching Career");
  }
};

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;

  const blogData = await getBlogData(slug);

  if (!blogData) {
    console.error(`Blog not found for slug: ${slug}`);
    redirect("/blog");
  }
  const categories = await fetchCategories();

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}blog/${slug}`;
  const pinterestShare = `https://pinterest.com/pin/create/button/?url=${process.env.NEXT_PUBLIC_SITE_URL}blog/${slug}}`;
  const linkedinShare = `https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_SITE_URL}blog/${slug}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_SITE_URL}blog/${slug}`;

  const relatedPosts = await getRelatedBlogs(blogData.category.id);

  return (
    <PaddingContainer className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-6 mt-10">
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${blogData.image}`}
          alt={blogData.title}
          width={1000}
          height={500}
          className="rounded-lg w-full object-cover"
        />

        <h1 className="text-3xl font-bold">{blogData.title}</h1>

        <div className="text-gray-700 space-y-5">
          <PostBody body={blogData.body} />
        </div>
        {/* Share Icons */}
        <div className="flex items-center gap-4">
          <BiSolidShareAlt className="text-red-500 text-2xl" />
          <div className="flex gap-3">
            <a
              href={facebookShare}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center"
            >
              <FaFacebookF />
            </a>
            <a
              href={pinterestShare}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center"
            >
              <FaPinterestP />
            </a>
            <a
              href={linkedinShare}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={twitterShare}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center"
            >
              <FaX />
            </a>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-start gap-4 pt-10 mb-10">
          <Image
            src={
              `${process.env.NEXT_PUBLIC_ASSETS_URL}${blogData.author.photo}` ||
              "/images/img_avatar.png"
            }
            alt="Author"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{blogData.author.name}</p>
            <p className="text-sm text-gray-500">
              {`${moment(blogData.date_updated || blogData.date_created).format(
                "MMM DD, YYYY"
              )}`}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Ready to transform your home? Explore our carpet collection or
              contact our experts for personalized advice!
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-10 mt-5 lg:mt-10">
        {/* Search */}
        <BlogSearch />

        {/* Categories */}
        <div className="bg-white p-6 rounded-lg drop-shadow-[#E1E1E140] drop-shadow-2xl">
          <h3 className="text-xl font-semibold mb-2">All Categories</h3>
          <ul className="space-y-2  text-gray-700">
            {categories.map((cat, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer"
              >
                {blogData.category.id === cat.id ? (
                  <>
                    <SquareCheck /> {cat.name} ({cat.blogs.length})
                  </>
                ) : (
                  <>
                    <Square /> {cat.name} ({cat.blogs.length})
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Related Posts */}
        <div className="bg-white p-6 rounded-lg drop-shadow-[#E1E1E140] drop-shadow-2xl">
          <h3 className="text-xl font-semibold mb-5">Related Blogs</h3>
          <ul className="space-y-4 text-sm text-gray-800">
            {relatedPosts.results.map((post, i) => (
              <li key={i} className="flex items-start gap-4  pb-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`}
                  alt={post.title}
                  width={100}
                  height={100}
                  className="rounded-lg w-20 h-20 object-cover"
                />
                <div className="text-base space-y-1">
                  <p className="font-medium">
                    {`${moment(post.date_updated || post.date_created).format(
                      "MMM DD, YYYY"
                    )} `}
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <p className="hover:text-red-600 cursor-pointer">
                      {post.title}
                    </p>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </PaddingContainer>
  );
}
