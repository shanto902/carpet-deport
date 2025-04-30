import { fetchPages } from "@/helper/fetchFromDirectus";
import { TBlog, TLocation, TProduct } from "@/interfaces";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { MetadataRoute } from "next";
import { cache } from "react";

export const fetchProductPages = cache(async (): Promise<TProduct[]> => {
  try {
    const result = await directus.request(
      readItems("products", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["id", "date_updated", "date_created"],
      })
    );

    return result as TProduct[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to fetch project pages for sitemaps.");
  }
});

export const fetchBlogPages = cache(async (): Promise<TBlog[]> => {
  try {
    const result = await directus.request(
      readItems("blogs", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug", "date_created", "date_updated"],
      })
    );
    return result as TBlog[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to fetch blog pages for sitemaps.");
  }
});

export const fetchLocationPages = cache(async (): Promise<TLocation[]> => {
  try {
    const result = await directus.request(
      readItems("locations", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug", "date_created", "date_updated"],
      })
    );
    return result as TLocation[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to fetch location pages for sitemaps.");
  }
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await fetchPages();

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${page.permalink}`,
    lastModified: page.date_updated ? page.date_updated : page.date_created,
  }));

  const projects = await fetchProductPages();
  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}see-room/${project.id}`,
    lastModified: project.date_updated
      ? project.date_updated
      : project.date_created,
  }));

  const blogs = await fetchBlogPages();
  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}blog/${blog.slug}`,
    lastModified: blog.date_updated ? blog.date_updated : blog.date_created,
  }));

  const locations = await fetchLocationPages();
  const locationEntries: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}locations/${location.slug}`,
    lastModified: location.date_updated
      ? location.date_updated
      : location.date_created,
  }));

  // Manually add extra static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}blog`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}categories`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}locations`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}consultation`,
      lastModified: new Date().toISOString(),
    },
  ];

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    },
    ...staticPages,
    ...pageEntries,
    ...projectEntries,
    ...blogEntries,
    ...locationEntries,
  ];
}
