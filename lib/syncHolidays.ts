import { createItem, readItems, deleteItems } from "@directus/sdk";
import directus from "@/lib/directus";

export async function syncHolidays() {
  const year = new Date().getFullYear();
  const countryCode = "US";

  console.log(`[Sync] Starting holiday sync for ${year}...`);

  try {
    // 1. Fetch official holidays
    const res = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
    );
    
    if (!res.ok) {
        throw new Error(`Failed to fetch from nager.at: ${res.statusText}`);
    }

    const holidays = await res.json();
    console.log(`[Sync] Fetched ${holidays.length} holidays from API.`);

    // 2. Clear ALL existing holidays
    const existing = await directus.request(
      readItems("holidays", {
        limit: -1,
      })
    );

    if (existing.length > 0) {
      const ids = existing.map((h: any) => h.id);
      await directus.request(deleteItems("holidays", ids));
      console.log(`[Sync] Deleted ${ids.length} existing holidays.`);
    }

    // 3. Insert new holidays
    for (const holiday of holidays) {
      await directus.request(
        createItem("holidays", {
          name: holiday.localName,
          date: holiday.date,
        })
      );
    }
    
    console.log(`[Sync] Successfully inserted new holidays.`);
    return true;
  } catch (err) {
    console.error("[Sync] Error syncing holidays:", err);
    return false;
  }
}
