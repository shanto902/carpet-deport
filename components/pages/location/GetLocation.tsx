"use client"; // Important for Next.js App Router

import { useState } from "react";

const DESTINATION = {
  lat: 33.7085252,
  lon: -84.1661846,
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const GetLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });

        const dist = getDistanceFromLatLonInKm(
          lat,
          lon,
          DESTINATION.lat,
          DESTINATION.lon
        );
        setDistance(dist);
      },
      () => {
        setError("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div className="p-4">
      <button
        onClick={handleGetLocation}
        className="text-blue-600 underline cursor-pointer"
      >
        📍 Get My Location
      </button>

      {location && (
        <div className="mt-4">
          <p>
            Your Location: {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
          </p>
          {distance !== null && (
            <p>
              Distance to 5974 Snapfinger Woods Dr: {distance.toFixed(2)} km
            </p>
          )}
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default GetLocation;
