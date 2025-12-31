/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from "luxon";

interface StoreDay {
  day: string;
  time: string;
  holidayName?: string | null;
  status?: "open" | "closed";
}

export async function fetchEnrichedStoreHours(
  placeId: string,
  slug: string
): Promise<StoreDay[]> {
  try {
    const [res, holidaysRes, adjustmentsRes] = await Promise.all([
      fetch(`/api/places/${placeId}/reviews`),
      fetch(`/api/directus-holidays?slug=${slug}`),
      fetch(`/api/directus-adjustments?slug=${slug}`),
    ]);

    const gmbData = await res.json();
    const holidays = await holidaysRes.json(); // [{ name, date, status }]
    const adjustments = await adjustmentsRes.json(); // [{ date, start_time, end_time }]

    const weekdayText: string[] = gmbData?.opening_hours?.weekday_text || [];
    const timezone = "America/New_York";

    const today = DateTime.now().setZone(timezone);
    const monday = today.startOf("week").plus({ days: 1 }); // Force Monday (Luxon: Sunday = 7)

    const days: StoreDay[] = [];

    for (let i = 0; i < 7; i++) {
      const date = monday.plus({ days: i });
      const formattedDate = date.toISODate(); // YYYY-MM-DD

      const luxonDayName = date.setZone(timezone).toFormat("cccc"); // e.g. "Wednesday"
      const match = weekdayText.find((text) => text.startsWith(luxonDayName));
      const [dayName, gmbTime] = match?.split(": ") || [luxonDayName, "Closed"];

      // Check holiday
      const holiday = holidays.find(
        (h: any) => DateTime.fromISO(h.date).toISODate() === formattedDate
      );
      const holidayName = holiday?.name || null;
      let status: "open" | "closed" = holiday?.status || "open";

      // Check adjustment
      const adjustment = adjustments.find(
        (a: any) => DateTime.fromISO(a.date).toISODate() === formattedDate
      );

      let time = gmbTime;

      if (adjustment) {
        console.log(`🕐 Adjustment for ${formattedDate}`, adjustment);

        if (!adjustment.start_time || !adjustment.end_time) {
          time = "Closed";
          status = "closed";
        } else {
          const start = DateTime.fromISO(adjustment.start_time, {
            zone: timezone,
          });
          const end = DateTime.fromISO(adjustment.end_time, { zone: timezone });

          if (start.isValid && end.isValid) {
            time = `${start.toFormat("h:mm a")} – ${end.toFormat("h:mm a")}`;
            status = "open";
          } else {
            time = "Closed";
            status = "closed";
          }
        }
      }

      days.push({
        day: dayName,
        time,
        holidayName,
        status,
      });
    }

    console.log("✅ Final weekly schedule from Monday:", days);
    return days;
  } catch (err) {
    console.error("❌ Store hours fetch failed for", placeId, err);
    return [];
  }
}
