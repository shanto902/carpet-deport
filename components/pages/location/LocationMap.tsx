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

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={storeLatLng}
      zoom={10}
    >
      <Marker position={storeLatLng} label="Store" />
      {userLocation && <Marker position={userLocation} label="You" />}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default LocationMap;
