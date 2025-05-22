/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from "luxon";

interface StoreDay {
  day: string;
  time: string;
  holidayName?: string | null;
}

export async function fetchEnrichedStoreHours(
  placeId: string
): Promise<StoreDay[]> {
  try {
    const [res, holidaysRes] = await Promise.all([
      fetch(`/api/places/${placeId}/reviews`),
      fetch(`/api/holidays`),
    ]);

    const data = await res.json();
    const holidays = await holidaysRes.json(); // from Nager.Date
    const weekdayText: string[] = data?.opening_hours?.weekday_text || [];

    const timezone = "America/New_York";
    const today = DateTime.now().setZone(timezone);

    const days: StoreDay[] = [];

    for (let i = 1; i <= 7; i++) {
      const date = today.plus({ days: i });
      const formattedDate = date.toISODate();

      const weekdayIndex = (date.weekday + 6) % 7;
      const [dayName, time] = weekdayText[weekdayIndex].split(": ");

      const holiday = holidays.find((h: any) => h.date === formattedDate);
      const holidayName = holiday?.localName || null;

      days.push({ day: dayName, time, holidayName });
    }

    return days;
  } catch (err) {
    console.error("Store hours fetch failed for", placeId, err);
    return [];
  }
}
