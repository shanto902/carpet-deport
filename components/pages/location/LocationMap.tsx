"use client";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const LocationMap = ({ coordinate }: { coordinate: number[] }) => {
  const storeLatLng = { lat: coordinate[1], lng: coordinate[0] };

  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  useEffect(() => {
    if (!isLoaded) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const origin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setUserLocation(origin);

      try {
        const response = await fetch("/api/directions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origin, destination: storeLatLng }),
        });

        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const directionsResult = {
            geocoded_waypoints: [],
            routes: data.routes,
            request: {},
          } as unknown as google.maps.DirectionsResult;

          setDirections(directionsResult);
        } else {
          toast.error("No routes found between your location and the store.");
        }
      } catch (err) {
        toast.error("Failed to fetch directions. Please try again.");
        console.error("Directions error:", err);
      }
    });
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading map...</div>;

  const storeMarkerIcon = {
    url:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#D32F2F" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="12" cy="9" r="2.5" fill="#FFFFFF"/>
      </svg>
    `),
    scaledSize: new google.maps.Size(48, 48),
    anchor: new google.maps.Point(24, 48),
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={storeLatLng}
      zoom={10}
    >
      <Marker position={storeLatLng} icon={storeMarkerIcon} zIndex={100} />
      {userLocation && <Marker position={userLocation} label="You" />}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default LocationMap;
