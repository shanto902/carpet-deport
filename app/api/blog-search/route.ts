import { NextRequest, NextResponse } from "next/server";
import { readItems } from "@directus/sdk";
import directus from "@/lib/directus";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const blogs = await directus.request(
      readItems("blogs", {
        filter: {
          title: {
            _icontains: query,
          },
          status: {
            _eq: "published",
          },
        },
        fields: ["id", "title", "slug"],
        limit: 5,
      })
    );

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
}
