"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiMapPin, FiPhone } from "react-icons/fi";
import CustomButton from "@/components/common/CustomButton";
import { TLocation } from "@/interfaces";
import PaddingContainer from "@/components/layout/PaddingContainer";

const LOCAL_STORAGE_KEY = "cached_location";

type Props = {
  locations: TLocation[];
};

// Format to 12-hour time
function to12Hour(time: string) {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const formatted = `${((hour + 11) % 12) + 1}:${m} ${suffix}`;
  return formatted;
}

// Days in order
const DAY_ORDER = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

// Full day labels
const DAY_LABELS: Record<string, string> = {
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
};

// Format store hours in grouped ranges
function formatStoreHours(store_status: TLocation["store_status"]) {
  const ordered = DAY_ORDER.map((day) =>
    store_status.find((d) => d.day === day)
  );

  const groups: { days: string[]; time: string }[] = [];

  ordered.forEach((dayData) => {
    if (!dayData) return;

    const time = dayData.is_closed
      ? "Closed"
      : `${to12Hour(dayData.opening_hour!)} – ${to12Hour(
          dayData.closing_hour!
        )}`;

    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.time === time) {
      lastGroup.days.push(dayData.day);
    } else {
      groups.push({ time, days: [dayData.day] });
    }
  });

  return groups.map(({ time, days }) => {
    const labels = days.map((d) => DAY_LABELS[d]);
    const label =
      labels.length === 1
        ? labels[0]
        : `${labels[0]}–${labels[labels.length - 1]}`;
    return `${label}: ${time}`;
  });
}

// Haversine distance
function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const SortedLocations = ({ locations }: Props) => {
  const [locationDistances, setLocationDistances] = useState<
    Record<string, number>
  >({});
  const [displayLocations, setDisplayLocations] =
    useState<TLocation[]>(locations);

  const loadDistances = (lat: number, lon: number) => {
    const distanceMap: Record<string, number> = {};
    const updated = locations.map((loc) => {
      const [lng, lat2] = loc.google_map.geometry.coordinates.map(Number);
      const distance = getDistance(lat, lon, lat2, lng);
      distanceMap[loc.id] = distance;
      return { ...loc, __distance: distance };
    });

    const sorted = updated.sort(
      (a, b) => (a.__distance ?? Infinity) - (b.__distance ?? Infinity)
    );
    setDisplayLocations(sorted);
    setLocationDistances(distanceMap);
  };

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ lat, lon }));
        loadDistances(lat, lon);
      },
      () => {}
    );
  };

  useEffect(() => {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      const { lat, lon } = JSON.parse(cached);
      loadDistances(lat, lon);
    } else {
      requestLocation();
    }
  }, [locations]);

  return (
    <>
      {displayLocations.map((location) => {
        const { id, name, image, contact_no, google_map, store_status } =
          location;

        const address = google_map.properties.formated;
        const distance = locationDistances[id];

        const storeHourLines = formatStoreHours(store_status);

        return (
          <PaddingContainer
            key={id}
            className="bg-white my-10 rounded-lg drop-shadow-xl p-6 md:flex items-center gap-6 mb-6"
          >
            <Image
              width={300}
              height={300}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${image}`}
              alt={name}
              className="aspect-square object-cover rounded mb-4 md:mb-0"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{name}</h3>
              <p className="flex items-center text-base text-gray-600 mb-1">
                <FiMapPin className="mr-2" /> {address}
              </p>
              <p className="flex items-center text-base text-gray-600 mb-2">
                <FiPhone className="mr-2" /> {contact_no}
              </p>
              <div className="text-base text-gray-600 space-y-2">
                {storeHourLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
                <p className="text-base text-gray-600 ">
                  Distance:{" "}
                  {distance !== undefined ? (
                    <span>{distance.toFixed(2)} km away</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-400">
                      loading...
                      <span className="animate-spin inline-block w-3 h-3 border-2 border-primary border-t-transparent rounded-full"></span>
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-start md:items-end gap-2 mt-4 md:mt-0">
              <CustomButton
                href={`/locations/${location.slug}`}
                button_type="question"
              >
                More Info
              </CustomButton>
              <CustomButton href={`/locations/${location.slug}#map`} inverted>
                Get Directions
              </CustomButton>
            </div>
          </PaddingContainer>
        );
      })}
    </>
  );
};

export default SortedLocations;
