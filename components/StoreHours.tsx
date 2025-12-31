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
        const [res, holidaysRes, adjustmentsRes] = await Promise.all([
          fetch(`/api/places/${placeId}/reviews`),
          fetch(`/api/directus-holidays?slug=${location.slug}`),
          fetch(`/api/directus-adjustments?slug=${location.slug}`),
        ]);

        const data = await res.json();
        const allHolidays = await holidaysRes.json(); // [{ name, date, status, stores }]
        const adjustments = await adjustmentsRes.json(); // [{ date, start_time, end_time }]

        const weekdayText: string[] = data?.opening_hours?.weekday_text || [];
        const timezone = "America/New_York";

        // Filter holidays for this location
        const locationHolidays = (allHolidays || []).filter((h: any) =>
          (h.stores || []).some(
            (s: any) => s?.locations_id?.slug === location.slug
          )
        );

        const holidaysByDate: Record<
          string,
          { name: string; status: "open" | "closed" }
        > = {};
        for (const h of locationHolidays) {
          const key = DateTime.fromISO(h.date).toFormat("yyyy-MM-dd");
          holidaysByDate[key] = { name: h.name, status: h.status };
        }

        // Create adjustment map
        const adjustmentsByDate: Record<
          string,
          { start_time: string; end_time: string }
        > = {};
        for (const a of adjustments || []) {
          const key = DateTime.fromISO(a.date).toFormat("yyyy-MM-dd");
          adjustmentsByDate[key] = {
            start_time: a.start_time,
            end_time: a.end_time,
          };
        }

        // Start from Monday this week
        const today = DateTime.now().setZone(timezone);
        const monday = today.startOf("week").plus({ days: 1 });

        const days: StoreDay[] = [];

        for (let i = 0; i < 7; i++) {
          const date = monday.plus({ days: i });
          const dateKey = date.toFormat("yyyy-MM-dd");

          const weekdayIndex = (i + 0) % 7;
          const [dayName, gmbTime] = weekdayText[weekdayIndex]?.split(": ") || [
            date.weekdayLong,
            "Closed",
          ];

          // Holiday
          const holiday = holidaysByDate[dateKey];
          const holidayName = holiday
            ? normalizeHolidayName(holiday.name)
            : null;

          // Adjustment
          const adj = adjustmentsByDate[dateKey];
          let time = gmbTime;
          let status: "open" | "closed" =
            holiday?.status ??
            (gmbTime.trim().toLowerCase() === "closed" ? "closed" : "open");

          if (adj) {
            if (!adj.start_time || !adj.end_time) {
              time = "Closed";
              status = "closed";
            } else {
              const start = DateTime.fromFormat(adj.start_time, "HH:mm:ss", {
                zone: timezone,
              });
              const end = DateTime.fromFormat(adj.end_time, "HH:mm:ss", {
                zone: timezone,
              });
              time = `${start.toFormat("h:mm a")} – ${end.toFormat("h:mm a")}`;
              status = "open";
            }
          }

          days.push({ day: dayName, time, holidayName, status });
        }

        const sorted = days.sort(
          (a, b) => orderedDays.indexOf(a.day) - orderedDays.indexOf(b.day)
        );

        setStoreHours(sorted);
      } catch (error) {
        console.error(
          "❌ Error fetching store hours/holidays/adjustments:",
          error
        );
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
            const isClosed = status === "closed";

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
