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

    console.log("📅 Starting date:", today.toISODate());
    console.log("📋 GMB Weekday Text:", weekdayText);

    const days: StoreDay[] = [];

    for (let i = 1; i <= 7; i++) {
      const date = today.plus({ days: i });
      const formattedDate = date.toISODate(); // YYYY-MM-DD

      // Luxon weekday: 1 (Monday) to 7 (Sunday)
      // GMB: 0 (Monday) to 6 (Sunday)
      const weekdayIndex = (date.weekday + 6) % 7;

      const [dayName, gmbTime] = weekdayText[weekdayIndex]?.split(": ") || [
        date.weekdayLong,
        "Closed",
      ];

      console.log(`📅 ${dayName} (${formattedDate}) → ${gmbTime}`);

      // Check holiday match
      const holiday = holidays.find(
        (h: any) => DateTime.fromISO(h.date).toISODate() === formattedDate
      );
      const holidayName = holiday?.name || null;
      let status: "open" | "closed" = holiday?.status || "open";

      // Check for time adjustment
      const adjustment = adjustments.find(
        (a: any) => DateTime.fromISO(a.date).toISODate() === formattedDate
      );

      let time = gmbTime;

      if (adjustment) {
        console.log(`🕐 Adjustment found for ${formattedDate}:`, adjustment);

        try {
          if (!adjustment.start_time || !adjustment.end_time) {
            time = "Closed";
            status = "closed";
          } else {
            const start = DateTime.fromISO(adjustment.start_time, {
              zone: timezone,
            });
            const end = DateTime.fromISO(adjustment.end_time, {
              zone: timezone,
            });

            if (!start.isValid || !end.isValid) {
              console.warn(
                "⚠️ Invalid time format for adjustment:",
                adjustment
              );
              time = "Closed";
              status = "closed";
            } else {
              time = `${start.toFormat("h:mm a")} – ${end.toFormat("h:mm a")}`;
              status = "open"; // override holiday closure
            }
          }
        } catch (e) {
          console.error("❌ Error parsing adjustment time:", e);
          time = "Closed";
          status = "closed";
        }
      }

      days.push({
        day: dayName,
        time,
        holidayName,
        status,
      });
    }

    console.log("✅ Final enriched hours:", days);
    return days;
  } catch (err) {
    console.error("❌ Store hours fetch failed for", placeId, err);
    return [];
  }
}
