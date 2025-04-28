import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import BlogList from "@/components/pages/blog/BlogList";
import { getAllBlogs } from "@/helper/fetchFromDirectus";
import { Metadata } from "next";

import Link from "next/link";
interface PageProps {
  params: Promise<{
    page: string;
  }>;
}
export const metadata: Metadata = {
  title: "Blogs | Carpet Depot",
  description: "Latest news and updates from Carpet Depot",
};
export default async function BlogPage({ params }: PageProps) {
  const { page } = await params;
  const currentPage = Number(page) || 1;

  try {
    return (
      <>
        {" "}
        <BreadcrumbBanner title="Latest Blog" breadcrumb={["blogs"]} />
        <BlogList currentPage={currentPage} />
      </>
    );
  } catch (error) {
    console.error(`Error rendering BlogPage ${currentPage}:`, error);
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong!
        </h2>
        <p className="text-gray-500">
          We couldn&apos;t load this blog page. Please try again later.
        </p>
        <Link
          href="/blog"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back to Blog
        </Link>
      </div>
    );
  }
}

// ✅ Pre-generate paginated pages with error handling
export async function generateStaticParams() {
  try {
    const { totalPages } = await getAllBlogs(1, 9);
    return Array.from({ length: totalPages }, (_, i) => ({
      page: (i + 1).toString(),
    }));
  } catch (error) {
    console.error("Error generating static params for pagination:", error);
    return [];
  }
}
