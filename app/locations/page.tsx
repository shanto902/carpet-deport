import React from "react";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import SortedLocations from "@/components/pages/location/SortedLocation";

import { fetchLocations } from "@/helper/fetchFromDirectus";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { Metadata } from "next";
import { readSingleton } from "@directus/sdk";
import directus from "@/lib/directus";
export const metadata: Metadata = {
  title: "Locations | Carpet Depot",
  description: "All locations of Carpet Depot",
};
const LocationsListPage = async () => {
  const locationData = await fetchLocations();
  const settings = await directus.request(readSingleton("settings"));

  // const testimonials = await getTestimonials();
  return (
    <>
      <BreadcrumbBanner
        image={settings.locations}
        title="Locations"
        breadcrumb={["Locations"]}
      />
      <PaddingContainer className="pb-10">
        <SortedLocations locations={locationData} />
      </PaddingContainer>
    </>
  );
};

export default LocationsListPage;
