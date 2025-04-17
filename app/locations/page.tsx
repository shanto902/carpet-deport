import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import Image from "next/image";
import React from "react";
import { FiMapPin, FiPhone } from "react-icons/fi";

const locations = [
  {
    city: "Decatur, GA",
    address: "5974 Snapfinger Woods Dr, Decatur, GA 30035",
    phone: "+8801629394828",
    hours: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 3:00 PM",
    sunday: "Closed",
  },
  {
    city: "Douglasville, GA",
    address: "12398 Hallbar Dr, Douglasville, GA",
    phone: "(770) 942 - 7600",
    hours: "10:00 AM - 6:00 PM",
    saturday: "9:30 AM - 5:30 PM",
    sunday: "Closed",
  },
  {
    city: "Jonesboro, GA",
    address: "123 Address Rd, Jonesboro, GA 30236",
    phone: "(678) 555 - 4321",
    hours: "10:00 AM - 6:00 PM",
    saturday: "9:30 AM - 5:30 PM",
    sunday: "Closed",
  },
  {
    city: "Mableton, GA",
    address: "456 Some St, Mableton, GA 30126",
    phone: "(404) 123 - 9876",
    hours: "10:00 AM - 6:00 PM",
    saturday: "9:30 AM - 5:30 PM",
    sunday: "Closed",
  },
  {
    city: "Roswell, GA",
    address: "789 Main Ave, Roswell, GA 30075",
    phone: "(770) 111 - 2222",
    hours: "10:00 AM - 6:00 PM",
    saturday: "9:30 AM - 5:30 PM",
    sunday: "Closed",
  },
  {
    city: "Snellville, GA",
    address: "890 Lane Rd, Snellville, GA 30039",
    phone: "(470) 333 - 5555",
    hours: "10:00 AM - 6:00 PM",
    saturday: "9:30 AM - 5:30 PM",
    sunday: "Closed",
  },
  {
    city: "Woodstock, GA",
    address: "1010 Elm Springs Ln, Woodstock, GA 30188",
    phone: "(678) 999 - 9999",
    hours: "10:00 AM - 6:00 PM",
    saturday: "9:30 AM - 5:30 PM",
    sunday: "Closed",
  },
];

const LocationsListPage = () => {
  return (
    <>
      <BreadcrumbBanner
        title="Locations"
        background="/breadcrumb-products.jpg"
        breadcrumb={["Locations"]}
      />
      <PaddingContainer className=" py-10 space-y-6">
        {locations.map((location, i) => (
          <div
            key={i}
            className="bg-white rounded-lg drop-shadow-md p-4 md:flex items-center gap-6"
          >
            <Image
              width={300}
              height={300}
              src="/images/location.png"
              alt="floor install"
              className=" aspect-square object-cover rounded mb-4 md:mb-0"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{location.city}</h3>
              <p className="flex items-center text-sm text-gray-600 mb-1">
                <FiMapPin className="mr-2" /> {location.address}
              </p>
              <p className="flex items-center text-sm text-gray-600 mb-1">
                <FiPhone className="mr-2" /> {location.phone}
              </p>
              <div className="text-sm text-gray-600">
                <p>Store Hours: {location.hours}</p>
                <p>Saturday: {location.saturday}</p>
                <p>Sunday: {location.sunday}</p>
              </div>
            </div>
            <div className="flex  items-start md:items-end gap-2 mt-4 md:mt-0">
              <CustomButton question>More Info</CustomButton>
              <CustomButton inverted>Get Directions</CustomButton>
            </div>
          </div>
        ))}
      </PaddingContainer>
    </>
  );
};

export default LocationsListPage;
