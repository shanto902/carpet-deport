import { TBlog, TPageBlock, TProduct } from "@/interfaces";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { getPlaceholderImage } from "./getBlurData";
import { cache } from "react";

export const fetchPage = async (
  permalink: string
): Promise<TPageBlock | null> => {
  try {
    const result = await directus.request(
      readItems("pages", {
        filter: {
          permalink: {
            _eq: permalink,
          },
        },
        sort: ["blocks.sort"],
        fields: [
          {
            blocks: [
              "*",
              {
                item: {
                  block_hero: ["*"],

                  block_categories_showcase: [
                    "*",
                    "categories.categories_id.*",
                  ],
                  block_video: ["*"],
                  block_statstics: ["*"],
                  block_two_columns: ["*"],
                  block_partners: ["*", "partners.partners_id.*"],
                  block_inspired_gallery: ["*"],
                  block_testimonial: ["*", "testimonials.testimonials_id.*"],
                  block_blogs: ["*"],
                  block_product_showcase: [
                    "*",
                    "products.products_id.*",
                    "products.products_id.textures.*",
                    "products.products_id.category.name",
                  ],
                },
              },
            ],
          },
        ],
      })
    );

    return result[0] as TPageBlock; // Changed from `TPageBlock[]`
  } catch (error) {
    console.error("Failed to fetch about page data:", error);
    return null;
  }
};

export const fetchPages = async (): Promise<TPageBlock[]> => {
  try {
    const result = await directus.request(
      readItems("pages", {
        fields: ["permalink", "date_updated", "date_created"],
      })
    );
    return result as TPageBlock[];
  } catch (error) {
    console.error("Error generating sitemaps:", error);
    throw new Error("Failed to fetch all pages for sitemaps.");
  }
};

export const fetchProducts = async (): Promise<TProduct[]> => {
  try {
    const result = await directus.request(
      readItems("products", {
        fields: ["*", "category.name", "category.id", "textures.*"],
      })
    );
    return result as TProduct[];
  } catch (error) {
    console.error("Error fetch Product", error);
    throw new Error("Failed to fetch all products");
  }
};

export const getAllBlogs = cache(
  async (
    page: number,
    limit: number
  ): Promise<{
    results: TBlog[];
    totalPages: number;
  }> => {
    try {
      const results = (await directus.request(
        readItems("blogs", {
          filter: {
            status: {
              _eq: "published",
            },
          },
          page: page,
          limit: limit,
          sort: ["sort"],
          fields: [
            "id",
            "date_created",
            "date_updated",
            "title",
            "slug",
            "image",
            "category.name",
          ],
        })
      )) as TBlog[];

      // ✅ Fetch total count for pagination
      const totalCount = await directus.request(
        readItems("blogs", {
          aggregate: { count: ["id"] },
          filter: { status: { _eq: "published" } },
        })
      );

      const totalPages = Math.ceil(totalCount[0].count.id / limit);

      // ✅ Generate blur placeholders for all blog images
      const blogsWithBlur = await Promise.all(
        results.map(async (blog) => ({
          ...blog,
          blurDataURL: await getPlaceholderImage(
            `${process.env.NEXT_PUBLIC_ASSETS_URL}${blog.image}`
          ), // ✅ Ensure blur is fetched
        }))
      );

      return { results: blogsWithBlur, totalPages };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw new Error("Error fetching blogs");
    }
  }
);
