"use client";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

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

    navigator.geolocation.getCurrentPosition((position) => {
      const origin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setUserLocation(origin);

      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination: storeLatLng,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Error fetching directions", result);
          }
        }
      );
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
