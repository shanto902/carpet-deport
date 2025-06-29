/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

interface StoreDay {
  day: string;
  time: string;
  holidayName?: string | null;
}

const orderedDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Normalize certain long holiday names to match Google-style naming
function normalizeHolidayName(name: string): string {
  const map: Record<string, string> = {
    "Juneteenth National Independence Day": "Juneteenth",
    "Washington's Birthday": "Presidents’ Day",
    "Birthday of Martin Luther King, Jr.": "MLK Day",
    "Independence Day": "4th of July",
    "Labor Day": "Labor Day",
    "Veterans Day": "Veterans Day",
    "Thanksgiving Day": "Thanksgiving",
    "Christmas Day": "Christmas",
    "New Year's Day": "New Year’s Day",
  };

  return map[name] || name;
}

const StoreHours = ({ placeId }: { placeId: string }) => {
  const [storeHours, setStoreHours] = useState<StoreDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreHours = async () => {
      try {
        const [res, holidaysRes] = await Promise.all([
          fetch(`/api/places/${placeId}/reviews`),
          fetch(`/api/holidays`),
        ]);

        const data = await res.json();
        const holidays = await holidaysRes.json(); // from Nager.Date
        const weekdayText: string[] = data?.opening_hours?.weekday_text || [];

        const days: StoreDay[] = [];
        const timezone = "America/New_York";
        const today = DateTime.now().setZone(timezone);

        for (let i = 1; i <= 7; i++) {
          const date = today.plus({ days: i });
          const formattedDate = date.toISODate(); // YYYY-MM-DD

          const weekdayIndex = (date.weekday + 6) % 7;
          const [dayName, time] = weekdayText[weekdayIndex].split(": ");

          const holiday = holidays.find((h: any) => h.date === formattedDate);
          const rawHolidayName = holiday?.localName || null;
          const holidayName = rawHolidayName
            ? normalizeHolidayName(rawHolidayName)
            : null;

          days.push({
            day: dayName,
            time,
            holidayName,
          });
        }

        // Sort days with Monday as the first
        const sorted = days.sort(
          (a, b) => orderedDays.indexOf(a.day) - orderedDays.indexOf(b.day)
        );

        setStoreHours(sorted);
      } catch (error) {
        console.error("❌ Error fetching store hours or holidays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreHours();
  }, [placeId]);

  return (
    <div className="bg-secondary p-6 rounded-2xl">
      <h3 className="font-semibold my-10 text-xl">Store Open & Closed Hours</h3>
      {loading ? (
        <p className="text-gray-600">Loading store hours...</p>
      ) : (
        <ul className="text-base space-y-4 text-gray-700">
          {storeHours.map(({ day, time, holidayName }, index) => (
            <li
              key={index}
              className="flex justify-between bg-white rounded-xl p-2 capitalize"
            >
              <span className="font-bold flex flex-col">
                <span>{day}</span>
                {holidayName && (
                  <span className="text-sm font-normal">{holidayName}</span>
                )}
              </span>
              <span className="text-right font-medium flex flex-col items-end">
                {holidayName ? (
                  <>
                    <span className=" font-medium">Closed</span>
                  </>
                ) : (
                  <span>{time}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoreHours;
