import BlogCard from "@/components/cards/BlogCard";
import Pagination from "@/components/common/Pagination";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { getAllBlogs } from "@/helper/fetchFromDirectus";
import Link from "next/link";

interface BlogListProps {
  currentPage: number;
}

export default async function BlogList({ currentPage }: BlogListProps) {
  const limit = 9;

  try {
    // ✅ Fetch blog posts from Directus (SSG + ISR)
    const { results, totalPages } = await getAllBlogs(currentPage, limit);

    // ✅ If no blogs are found, redirect to `/blog`
    if (results.length === 0 && currentPage !== 1) {
      return <meta httpEquiv="refresh" content="0; url=/blog" />;
    }

    return (
      <PaddingContainer>
        <div className="w-full  mb-10 flex flex-col">
          <section className="text-center mt-5 text-gray-500">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {results.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>

          {/* ✅ Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </PaddingContainer>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return (
      <div className="h-[60vh] flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold text-primary">
          Something went wrong!
        </h2>
        <p className="text-gray-500">
          We could not load the blogs. Please try again later.
        </p>
        <Link
          href="/blog"
          className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-red-800"
        >
          Go Back to Blog
        </Link>
      </div>
    );
  }
}
