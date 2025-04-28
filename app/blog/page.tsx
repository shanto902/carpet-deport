import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import BlogList from "@/components/pages/blog/BlogList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blogs | Carpet Depot",
  description: "Latest news and updates from Carpet Depot",
};
export default async function BlogPage() {
  return (
    <>
      <BreadcrumbBanner
        title="Great Flooring. Great Brands. Great Prices."
        breadcrumb={["Products"]}
      />
      <BlogList currentPage={1} />
    </>
  );
}
