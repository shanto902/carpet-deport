/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/api/directus-holidays/route.ts
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
    const holidays = await directus.request(
      readItems("holidays", {
        fields: ["name", "date", "status", "stores.locations_id.slug"],
        sort: ["date"],
      })
    );

    // Filter holidays where any store slug matches
    const filtered = holidays.filter((holiday: any) =>
      holiday.stores.some(
        (s: any) => s.locations_id?.slug?.toLowerCase() === slug.toLowerCase()
      )
    );

    return new Response(JSON.stringify(filtered), { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching holidays:", err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
