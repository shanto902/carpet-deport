import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import BlogList from "@/components/pages/blog/BlogList";

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
