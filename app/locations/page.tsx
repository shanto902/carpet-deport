import React from "react";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import SortedLocations from "@/components/pages/location/SortedLocation";

import { fetchLocations } from "@/helper/fetchFromDirectus";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Locations | Carpet Depot",
  description: "All locations of Carpet Depot",
};
const LocationsListPage = async () => {
  const locationData = await fetchLocations();
  // const testimonials = await getTestimonials();
  return (
    <>
      <BreadcrumbBanner title="Locations" breadcrumb={["Locations"]} />
      <PaddingContainer>
        <SortedLocations locations={locationData} />
      </PaddingContainer>
    </>
  );
};

export default LocationsListPage;
