/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/api/directus-holidays/route.ts
import { NextRequest } from "next/server";
import { readItems } from "@directus/sdk";
import directus from "@/lib/directus";

import { syncHolidays } from "@/lib/syncHolidays";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), {
      status: 400,
    });
  }

  const year = new Date().getFullYear();

  try {
    // Lazy Sync: Check if we have holidays for this year, if not, sync.
    const existingCount = await directus.request(
        readItems("holidays", {
            filter: {
                date: {
                  _between: [`${year}-01-01`, `${year}-12-31`],
                },
            },
            limit: 0, 
            aggregate: { count: "*" }
        })
    );
     // @ts-ignore
    const count = existingCount[0]?.count;

    if (!count || parseInt(count) === 0) {
        console.log("No holidays found for this year, triggering auto-sync...");
        await syncHolidays();
    }

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
