/* eslint-disable @typescript-eslint/no-unused-vars */
// /app/api/holidays/route.ts
import { NextRequest } from "next/server";
import { createItem, readItems, updateItem } from "@directus/sdk";
import directus from "@/lib/directus";

export async function GET(req: NextRequest) {
  const year = new Date().getFullYear();
  const countryCode = "US";

  try {
    const res = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
    );
    const holidays = await res.json();

    for (const holiday of holidays) {
      const existing = await directus.request(
        readItems("holidays", {
          filter: { name: { _eq: holiday.localName } },
          limit: 1,
        })
      );

      if (existing.length === 0) {
        // Insert new holiday
        await directus.request(
          createItem("holidays", {
            name: holiday.localName,
            date: holiday.date,
          })
        );
      } else {
        // Optional: Update date or country if needed
        const existingId = existing[0].id;
        await directus.request(
          updateItem("holidays", existingId, {
            date: holiday.date,
          })
        );
      }
    }

    return new Response(JSON.stringify({ message: "Holidays synced" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error syncing holidays:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch holidays" }), {
      status: 500,
    });
  }
}
