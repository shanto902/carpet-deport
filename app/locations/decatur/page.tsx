"use client";

import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import { FiMapPin, FiPhone } from "react-icons/fi";
import Image from "next/image";

const storeHours = [
  { day: "Sunday", hours: "Closed" },
  { day: "Monday", hours: "9:00 AM - 5:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
  { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
  { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
  { day: "Friday", hours: "9:00 AM - 5:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 3:00 PM" },
];

const serviceAreas = [
  "Atlanta",
  "Avondale Estates",
  "Brookhaven",
  "Buckhead",
  "Chamblee",
  "Decatur",
  "Dunwoody",
  "East Atlanta",
  "East Point",
  "Mechanicsville",
  "North Decatur",
  "North Druid Hills",
  "Panthersville",
  "Redan",
  "Stone Mountain",
  "Tucker",
];

export default function LocationPage() {
  return (
    <>
      <BreadcrumbBanner
        title="Decatur, GA"
        background="/breadcrumb-products.jpg"
        breadcrumb={["Locations", "Decatur, GA"]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        {/* Top section - Location info and image */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-bold">Decatur, GA</h2>
              <p className="flex items-center text-sm text-gray-700">
                <FiMapPin className="mr-2" /> 5974 Snapfinger Woods Dr Decatur,
                GA 30035
              </p>
              <p className="flex items-center text-sm text-gray-700">
                <FiPhone className="mr-2" /> +8801629394828
              </p>
              <button className="bg-red-500 text-white px-5 py-2 rounded-full text-sm flex items-center gap-2 mt-3">
                Get Directions <span className="text-white">▶</span>
              </button>
            </div>
            <div className="mt-6">
              <Image
                src="/images/location-base.png"
                alt="Store Photo"
                width={600}
                height={400}
                className="rounded-lg w-full object-cover"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.7344178802736!2d-84.25934768478296!3d33.7418398406168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a2fdcf53c6df%3A0x63a682a2a0d2ed6f!2sDecatur%2C%20GA!5e0!3m2!1sen!2sus!4v1615163567736!5m2!1sen!2sus"
              className="w-full h-[300px] rounded-lg border-none"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Store Hours & Service Areas */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Store Hours */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4 text-base">
              Store Open & Closed Hours
            </h3>
            <ul className="text-sm space-y-2 text-gray-700">
              {storeHours.map((item, i) => (
                <li key={i} className="flex justify-between border-b pb-1">
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Area */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4 text-base">Services Area</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
              {serviceAreas.map((area, i) => (
                <span key={i} className="bg-gray-100 rounded px-2 py-1">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
