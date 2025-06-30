/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { TLocation } from "@/interfaces";

interface StoreDay {
  day: string;
  time: string;
  holidayName?: string | null;
  status?: "open" | "closed";
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

// Optional: Normalize names for display
function normalizeHolidayName(name: string): string {
  const map: Record<string, string> = {
    "Juneteenth National Independence Day": "Juneteenth",
    "Washington's Birthday": "Presidents’ Day",
    "Birthday of Martin Luther King, Jr.": "MLK Day",
    "New Year's Day": "New Year’s Day",
  };
  return map[name] || name;
}

const StoreHours = ({
  placeId,
  location,
}: {
  placeId: string;
  location: TLocation;
}) => {
  const [storeHours, setStoreHours] = useState<StoreDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreHours = async () => {
      try {
        const [res, holidaysRes] = await Promise.all([
          fetch(`/api/places/${placeId}/reviews`),
          fetch(`/api/directus-holidays?slug=${location.slug}`),
        ]);

        const data = await res.json();
        const holidays = await holidaysRes.json(); // [{ name, date, status }]
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

          const holiday = holidays.find(
            (h: any) => DateTime.fromISO(h.date).toISODate() === formattedDate
          );

          const rawHolidayName = holiday?.name || null;
          const holidayName = rawHolidayName
            ? normalizeHolidayName(rawHolidayName)
            : null;
          const status = holiday?.status || "open";

          days.push({
            day: dayName,
            time,
            holidayName,
            status,
          });
        }

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

    if (placeId && location?.slug) {
      fetchStoreHours();
    }
  }, [placeId, location]);

  return (
    <div className="bg-secondary p-6 rounded-2xl">
      <h3 className="font-semibold my-10 text-xl">Store Open & Closed Hours</h3>
      {loading ? (
        <p className="text-gray-600">Loading store hours...</p>
      ) : (
        <ul className="text-base space-y-4 text-gray-700">
          {storeHours.map(({ day, time, holidayName, status }, index) => {
            const isClosed =
              status === "closed" || time.trim().toLowerCase() === "closed";

            return (
              <li
                key={index}
                className="flex justify-between bg-white rounded-xl p-2 capitalize"
              >
                <span className="font-bold flex flex-col">
                  <span>{day}</span>
                  {holidayName && (
                    <span className="text-sm font-normal text-gray-500">
                      {holidayName}
                    </span>
                  )}
                </span>
                <span className="text-right font-medium flex flex-col items-end">
                  {isClosed ? (
                    <span className="text-red-600">Closed</span>
                  ) : (
                    <span>{time}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StoreHours;
