/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from "luxon";

interface StoreDay {
  day: string;
  time: string;
  holidayName?: string | null;
  status?: "open" | "closed";
}

export async function fetchEnrichedStoreHours(
  placeId: string
): Promise<StoreDay[]> {
  try {
    const [res, holidaysRes] = await Promise.all([
      fetch(`/api/places/${placeId}/reviews`),
      fetch(`/api/directus-holidays`), // NEW: hits your own Directus API route
    ]);

    const data = await res.json();
    const holidays = await holidaysRes.json(); // format: { name, date, status }
    const weekdayText: string[] = data?.opening_hours?.weekday_text || [];

    const timezone = "America/New_York";
    const today = DateTime.now().setZone(timezone);

    const days: StoreDay[] = [];

    for (let i = 1; i <= 7; i++) {
      const date = today.plus({ days: i });
      const formattedDate = date.toISODate();

      const weekdayIndex = (date.weekday + 6) % 7;
      const [dayName, time] = weekdayText[weekdayIndex]?.split(": ") || [
        date.weekdayLong,
        "Closed",
      ];

      const holiday = holidays.find((h: any) => h.date === formattedDate);
      const holidayName = holiday?.name || null;
      const status = holiday?.status || "open";

      days.push({ day: dayName, time, holidayName, status });
    }

    return days;
  } catch (err) {
    console.error("Store hours fetch failed for", placeId, err);
    return [];
  }
}
