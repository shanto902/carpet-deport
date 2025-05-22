"use client";

import { useEffect, useState } from "react";

import { TLocation } from "@/interfaces";

import { LocationCard } from "@/components/cards/LocationCard";

const LOCAL_STORAGE_KEY = "cached_location";

type Props = {
  locations: TLocation[];
};

function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3958.8;
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
      {displayLocations.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
          distance={locationDistances[location.id]}
        />
      ))}
    </>
  );
};

export default SortedLocations;
