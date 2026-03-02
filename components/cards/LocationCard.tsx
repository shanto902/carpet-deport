/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from "luxon";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMapPin, FiPhone } from "react-icons/fi";
import CustomButton from "../common/CustomButton";
import { TLocation } from "@/interfaces";

interface StoreDay {
  day: string;
  time: string;
  holidayName: string | null;
  status?: "open" | "closed";
}

function groupStoreHours(storeHours: StoreDay[]) {
  const dayOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const sortedHours = [...storeHours].sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day),
  );

  const groups: { days: string[]; time: string; holidayName?: string }[] = [];

  sortedHours.forEach((entry) => {
    const time =
      entry.status === "closed" || entry.time.trim().toLowerCase() === "closed"
        ? "Closed"
        : entry.time;

    const last = groups[groups.length - 1];
    const lastDayIdx = last
      ? dayOrder.indexOf(last.days[last.days.length - 1])
      : -2;
    const currentDayIdx = dayOrder.indexOf(entry.day);

    const isConsecutive = currentDayIdx === lastDayIdx + 1;

    if (last && last.time === time && isConsecutive) {
      last.days.push(entry.day);
    } else {
      groups.push({
        days: [entry.day],
        time,
        holidayName: entry.holidayName ?? undefined,
      });
    }
  });

  return groups;
}

export const LocationCard = ({
  location,
  distance,
  store_status,
}: {
  location: TLocation;
  distance: number | undefined;
  store_status: string;
}) => {
  const { id, name, thumbnail_image, image, contact_no, google_map, place_id } =
    location;

  const address = google_map.properties.formated;
  const [storeHours, setStoreHours] = useState<StoreDay[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, holidaysRes] = await Promise.all([
          fetch(`/api/places/${place_id}/reviews`),
          fetch(`/api/directus-holidays?slug=${location.slug}`),
        ]);

        const data = await res.json();
        const holidays = await holidaysRes.json();
        const weekdayText: string[] = data?.opening_hours?.weekday_text || [];

        const timezone = "America/New_York";
        const today = DateTime.now().setZone(timezone);
        const monday = today.startOf("week").plus({ days: 1 }); // ensure week starts from Monday

        const days: StoreDay[] = [];

        for (let i = 0; i < 7; i++) {
          const date = monday.plus({ days: i });
          const formattedDate = date.toISODate();
          const weekdayIndex = (date.weekday + 6) % 7;

          const [dayName, baseTime] = weekdayText[weekdayIndex]?.split(
            ": ",
          ) || [date.weekdayLong ?? "Unknown", "Closed"];

          const holiday = Array.isArray(holidays)
            ? holidays.find(
                (h: any) =>
                  DateTime.fromISO(h.date).toISODate() === formattedDate,
              )
            : null;

          const holidayName = holiday?.name || null;
          const status: "open" | "closed" = holiday?.status || "open";

          let time = baseTime;
          if (status === "closed") {
            time = "Closed";
          }

          days.push({ day: dayName, time, holidayName, status });
        }

        setStoreHours(days);
      } catch (err) {
        console.error("❌ Error loading store hours:", err);
      }
    };

    fetchData();
  }, [place_id]);

  return (
    <div key={id} className="my-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
        {/* FULL WIDTH IMAGE */}
        <div className="w-full bg-gray-100 flex justify-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${image}`}
            alt={name}
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
            sizes="100vw"
          />
        </div>

        <div className="bg-white p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* LEFT CONTENT */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-bold text-gray-800">{name}</h3>

                {store_status === "live" && (
                  <span className="md:hidden px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                    Open
                  </span>
                )}
              </div>

              <div className="space-y-2 text-gray-700 mt-3">
                <p className="flex items-start">
                  <FiMapPin className="mr-2 mt-1" />
                  {address}
                </p>

                <p className="flex items-center">
                  <FiPhone className="mr-2" />
                  <a
                    href={`tel:+1${contact_no.replace(/[^0-9]/g, "")}`}
                    className="hover:text-primary transition-colors"
                  >
                    {contact_no}
                  </a>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE AREA */}
            <div className="flex flex-col items-start md:items-end gap-4 min-w-[220px]">
              {store_status === "live" ? (
                <span className="hidden md:inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                  Open
                </span>
              ) : (
                <span className="hidden md:inline-block px-3 py-1 text-sm font-medium bg-red-100 text-red-600 rounded-full">
                  Opening Soon
                </span>
              )}

              <div className="flex gap-4">
                <CustomButton
                  href={`/locations/${location.slug}`}
                  button_type="question"
                >
                  More Info
                </CustomButton>

                {store_status === "live" && (
                  <CustomButton
                    href={`/locations/${location.slug}#map`}
                    inverted
                  >
                    Get Directions
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
