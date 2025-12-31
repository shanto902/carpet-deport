/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { readItems } from "@directus/sdk";
import directus from "@/lib/directus";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), {
      status: 400,
    });
  }

  try {
    const adjustments = await directus.request(
      readItems("time_adjustment", {
        fields: [
          "date",
          "start_time",
          "end_time",
          "shop.locations_id.slug", // ✨ just like holidays query
        ],
        filter: {
          shop: {
            locations_id: {
              slug: {
                _eq: slug,
              },
            },
          },
        },
        sort: ["date"],
      })
    );

    console.log(
      "✅ Adjustments fetched with shop.locations_id.slug:",
      adjustments
    );

    return new Response(JSON.stringify(adjustments), { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching time adjustments:", err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
