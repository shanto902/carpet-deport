"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCityName } from "../layout/header/BottomNavbar";
import { TLocation } from "@/interfaces";
import { fetchEnrichedStoreHours } from "@/helper/fetchEnrichedStoreHours";

interface StoreDay {
  day: string;
  time: string;
  holidayName?: string | null;
}

const dayOrder = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function normalizeDay(day: string) {
  return dayOrder.find((d) => d.toLowerCase() === day.toLowerCase()) || day;
}

function groupStoreHours(storeHours: StoreDay[]) {
  const groups: Record<string, string[]> = {};

  storeHours.forEach((entry) => {
    const normalizedDay = normalizeDay(entry.day);
    const time =
      entry.holidayName || entry.time.trim().toLowerCase() === "closed"
        ? "Closed"
        : entry.time;

    if (!groups[time]) groups[time] = [];
    groups[time].push(normalizedDay);
  });

  return Object.entries(groups).map(([time, days]) => {
    const sortedDays = days.sort(
      (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
    );

    return {
      time,
      days: sortedDays,
    };
  });
}

function formatGroupedLabel(days: string[]) {
  const ranges: string[] = [];
  let start = days[0];
  let prevIdx = dayOrder.indexOf(start);

  for (let i = 1; i < days.length; i++) {
    const currentIdx = dayOrder.indexOf(days[i]);
    if (currentIdx !== prevIdx + 1) {
      ranges.push(start === days[i - 1] ? start : `${start}–${days[i - 1]}`);
      start = days[i];
    }
    prevIdx = currentIdx;
  }

  ranges.push(
    start === days[days.length - 1]
      ? start
      : `${start}–${days[days.length - 1]}`
  );

  return ranges.join(", ");
}

const StoreLocationLi = ({ location }: { location: TLocation }) => {
  const [storeHours, setStoreHours] = useState<StoreDay[]>([]);

  useEffect(() => {
    fetchEnrichedStoreHours(location.place_id, location.slug).then(
      setStoreHours
    );
  }, [location.place_id, location.slug]);

  const grouped = groupStoreHours(storeHours);

  return (
    <li key={location.id} className="relative group">
      <Link
        className="hover:text-primary hover:underline"
        href={`/locations/${location.slug}`}
      >
        {getCityName(location.name)}
      </Link>

      {/* Tooltip */}
      {location.store_status === "live" && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-start bg-white text-gray-800 text-xs p-4 rounded-md shadow-lg whitespace-pre-line min-w-[280px] text-left z-20">
          {grouped.length === 0 ? (
            <div className="text-gray-400 italic">Loading...</div>
          ) : (
            grouped.map(({ days, time }, idx) => (
              <div key={idx} className="mb-1 last:mb-0">
                <span className="font-medium">{formatGroupedLabel(days)}:</span>{" "}
                <span
                  className={
                    time.toLowerCase() === "closed" ? "text-red-600" : ""
                  }
                >
                  {time}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </li>
  );
};

export default StoreLocationLi;
