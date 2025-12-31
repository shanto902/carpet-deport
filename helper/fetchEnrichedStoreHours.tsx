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

    const days: StoreDay[] = [];

    for (let i = 1; i <= 7; i++) {
      const date = today.plus({ days: i });
      const formattedDate = date.toISODate(); // YYYY-MM-DD
      const weekdayIndex = (date.weekday + 6) % 7;

      const [dayName, gmbTime] = weekdayText[weekdayIndex]?.split(": ") || [
        date.weekdayLong,
        "Closed",
      ];

      const holiday = holidays.find(
        (h: any) => DateTime.fromISO(h.date).toISODate() === formattedDate
      );
      const holidayName = holiday?.name || null;
      const status = holiday?.status || "open";

      const adjustment = adjustments.find(
        (a: any) => DateTime.fromISO(a.date).toISODate() === formattedDate
      );

      let time = gmbTime;

      if (adjustment) {
        console.log(`🕐 Adjustment for ${formattedDate}`, adjustment);
        if (!adjustment.start_time || !adjustment.end_time) {
          time = "Closed";
        } else {
          const start = DateTime.fromFormat(adjustment.start_time, "HH:mm:ss", {
            zone: timezone,
          });
          const end = DateTime.fromFormat(adjustment.end_time, "HH:mm:ss", {
            zone: timezone,
          });
          time = `${start.toFormat("h:mm a")} – ${end.toFormat("h:mm a")}`;
        }
      }

      days.push({ day: dayName, time, holidayName, status });
    }

    return days;
  } catch (err) {
    console.error("❌ Store hours fetch failed for", placeId, err);
    return [];
  }
}
