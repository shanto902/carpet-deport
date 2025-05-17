import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import BlogList from "@/components/pages/blog/BlogList";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blogs | Carpet Depot",
  description: "Latest news and updates from Carpet Depot",
};
export default async function BlogPage() {
  const settings = await directus.request(readSingleton("settings"));
  return (
    <>
      <BreadcrumbBanner
        title="Great Flooring. Great Brands. Great Prices."
        breadcrumb={["Products"]}
        image={settings.blog}
      />
      <BlogList currentPage={1} />
    </>
  );
}
