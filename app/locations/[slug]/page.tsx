import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import { FiMapPin, FiPhone } from "react-icons/fi";
import Image from "next/image";
import LocationMap from "@/components/pages/location/LocationMap";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { fetchLocation } from "@/helper/fetchFromDirectus";
import { TLocation } from "@/interfaces";
import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { Suspense } from "react";
import Reviews from "@/components/pages/location/Reviews";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    permalink: string;
    slug: string;
  }>;
}
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const location = await fetchLocation(slug);
    const previousImages = (await parent).openGraph?.images || [];
    if (location !== null) {
      return {
        title:
          location.seo.title ||
          `${location.name} | Carpet Depot` ||
          "Location not found | Carpet Depot",
        description:
          location.seo.meta_description ||
          location.google_map.properties.formated ||
          "",
        openGraph: {
          images: location.seo.og_image
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${location.seo.og_image}`,
                },
              ]
            : location.image
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${location.image}`,
                },
              ]
            : [...previousImages],
        },
      };
    }

    // Default metadata if the page is not found
    return {
      title: "Location not found",
      description: "This page does not exist.",
    };
  } catch (error) {
    console.error("Error fetching page metadata:", error);

    // Return default metadata in case of error
    return {
      title: "Error",
      description: "Failed to fetch page metadata.",
    };
  }
}

export const generateStaticParams = async () => {
  try {
    const result = await directus.request(
      readItems("locations", {
        filter: { status: { _eq: "published" } },
        fields: ["slug"],
      })
    );

    return (result as { slug: string }[]).map((item) => ({
      slug: item.slug,
      permalink: "locations",
    }));
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw new Error("Error generating static params");
  }
};

// Time formatter (24h to 12h)
const formatTime = (time: string | undefined) => {
  if (!time) return "";
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

const LocationPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const location: TLocation = await fetchLocation(slug);

  if (!location) {
    notFound();
  }
  return (
    <>
      <BreadcrumbBanner
        title={location.name}
        breadcrumb={["Locations", location.name]}
        image={location.breadcrumb_image}
      />

      <PaddingContainer className="md:max-w-7xl mx-auto py-12 space-y-10">
        {/* Top section */}
        <div className="items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10">
          <div className="space-y-2 col-span-1 bg-secondary h-full w-full rounded-2xl flex justify-center flex-col p-10">
            <h2 className="text-xl font-bold">{location.name}</h2>
            <p className="flex items-center  text-pretty gap-4 text-base text-gray-700">
              <FiMapPin className=" text-primary size-7" />
              {location.google_map.properties.formated}
            </p>
            <p className="flex items-center  text-pretty gap-4 text-base text-gray-700">
              <FiPhone className=" text-primary size-7" />
              {location.contact_no}
            </p>
            <CustomButton
              href="#map"
              inverted
              button_type="location"
              className="bg-red-500 text-white px-5 py-2 rounded-full text-sm flex items-center gap-2 mt-3 w-full"
            >
              Get Directions
            </CustomButton>
          </div>

          <div className=" lg:col-span-2 rounded-2xl overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${location.image}`}
              alt="Store Photo"
              width={1200}
              height={600}
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Store Hours & Map & Service Areas */}
        <div id="map" className="grid md:grid-cols-2 gap-10">
          {/* Store Hours */}
          <div className="bg-secondary p-6 rounded-2xl">
            <h3 className="font-semibold my-10 text-xl">
              Store Open & Closed Hours
            </h3>
            <ul className="text-base space-y-4 text-gray-700">
              {location.store_status.map((item, i) => {
                const formattedDay =
                  item.day.charAt(0).toUpperCase() + item.day.slice(1);
                const time = item.is_closed
                  ? "Closed"
                  : `${formatTime(item.opening_hour)} - ${formatTime(
                      item.closing_hour
                    )}`;
                return (
                  <li
                    key={i}
                    className="flex bg-white justify-between rounded-xl p-2 capitalize"
                  >
                    <span className="font-bold">{formattedDay}</span>
                    <span>{time}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Map */}
          <div className="bg-secondary aspect-square rounded-2xl overflow-hidden">
            <Suspense>
              <LocationMap
                coordinate={location.google_map.geometry.coordinates}
              />
            </Suspense>
          </div>

          {/* Services Area */}
          <div className="bg-secondary p-6 rounded-2xl md:col-span-2">
            <h3 className="font-semibold my-10 text-2xl ">Services Area</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-base text-paragraph ">
              {location?.service_areas?.map((area, i) => (
                <span key={i} className="bg-white rounded-lg p-2 py-1">
                  {area.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </PaddingContainer>
      <div className="bg-secondary py-10 ">
        <PaddingContainer>
          <Reviews placeId={location.place_id} />
        </PaddingContainer>
      </div>
    </>
  );
};

export default LocationPage;
