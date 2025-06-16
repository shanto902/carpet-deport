/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

interface StoreDay {
  day: string;
  time: string;
  holidayName?: string | null;
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
          const holidayName = holiday?.localName || null;

          days.push({
            day: dayName,
            time,
            holidayName,
          });
        }

        setStoreHours(days);
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
                    <span className=" font-medium">{time}</span>
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
