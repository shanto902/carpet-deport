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
  holidayName: string;
  status?: "open" | "closed";
}

// Group same-time days into ranges (excluding holidays)
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
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
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
        holidayName: entry.holidayName,
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
  const { id, name, thumbnail_image, contact_no, google_map, place_id } =
    location;

  const address = google_map.properties.formated;
  const [storeHours, setStoreHours] = useState<StoreDay[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, holidaysRes] = await Promise.all([
          fetch(`/api/places/${place_id}/reviews`),
          fetch(`/api/directus-holidays`),
        ]);

        const data = await res.json();
        const holidays = await holidaysRes.json();
        const weekdayText: string[] = data?.opening_hours?.weekday_text || [];

        const timezone = "America/New_York";
        const today = DateTime.now().setZone(timezone);
        const days: StoreDay[] = [];

        for (let i = 1; i <= 7; i++) {
          const date = today.plus({ days: i });
          const formattedDate = date.toISODate();
          const luxonDayName = date.setZone(timezone).toFormat("cccc"); // e.g. "Wednesday"
          const match = weekdayText.find((text) =>
            text.startsWith(luxonDayName)
          );
          const [dayName, gmbTime] = match?.split(": ") || [
            luxonDayName,
            "Closed",
          ];

          const holiday = holidays.find(
            (h: any) => DateTime.fromISO(h.date).toISODate() === formattedDate
          );

          const holidayName = holiday?.name || null;
          const status = holiday?.status || "open";

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
    <div key={id}>
      <div className="bg-white my-10 rounded-lg drop-shadow-xl p-6 flex justify-between xl:flex-row flex-col xl:items-center gap-6">
        <div className="md:flex gap-6 md:gap-10 items-center">
          <Image
            width={1000}
            height={1000}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${thumbnail_image}`}
            alt={name}
            className="md:aspect-[3/4] md:max-w-[200px] object-cover rounded mb-4 md:mb-0"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="flex items-center text-base text-gray-600 mb-1">
              <FiMapPin className="mr-2" /> {address}
            </p>
            <p className="flex items-center text-base text-gray-600 mb-2">
              <FiPhone className="mr-2" />
              <a
                href={`tel:+1${contact_no.replace(/[^0-9]/g, "")}`}
                className="hover:underline"
              >
                {contact_no}
              </a>
            </p>

            {store_status === "live" ? (
              <div className="text-base text-gray-600 space-y-2">
                {groupStoreHours(storeHours).map(
                  ({ days, time, holidayName }, idx) => {
                    const dayLabel =
                      days.length === 1
                        ? days[0]
                        : `${days[0]}–${days[days.length - 1]}`;
                    const isClosed = time.trim().toLowerCase() === "closed";

                    return (
                      <div key={idx} className="space-y-1">
                        <p className="font-bold">
                          {dayLabel}
                          {holidayName && (
                            <span className="block text-sm font-normal text-gray-500">
                              {holidayName}
                            </span>
                          )}
                        </p>
                        <p
                          className={isClosed ? "text-red-600 font-medium" : ""}
                        >
                          {isClosed ? "Closed" : time}
                        </p>
                        {holidayName && (
                          <p
                            className={`text-sm font-medium ${
                              isClosed ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {isClosed ? "Closed for holiday" : "Holiday hours"}
                          </p>
                        )}
                      </div>
                    );
                  }
                )}

                <p className="text-base text-gray-600">
                  Distance:{" "}
                  {distance !== undefined ? (
                    <span>{distance.toFixed(2)} miles away</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-400">
                      loading...
                      <span className="animate-spin inline-block w-3 h-3 border-2 border-primary border-t-transparent rounded-full"></span>
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <p className="text-base text-red-600 font-medium">Opening Soon</p>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col md:flex-row justify-end md:items-end gap-2 mt-4 md:mt-0">
          <CustomButton
            href={`/locations/${location.slug}`}
            button_type="question"
            className="inline-flex text-nowrap"
          >
            More Info
          </CustomButton>
          {store_status === "live" && (
            <CustomButton
              className="inline-flex text-nowrap"
              href={`/locations/${location.slug}#map`}
              inverted
            >
              Get Directions
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
};
