import React from "react";
import logo from "@/assets/svg/logo.svg";

import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import PaddingContainer from "../PaddingContainer";
import { TLocation, TSettings } from "@/interfaces";
import { getCityName } from "../header/BottomNavbar";
import Link from "next/link";
import { fetchCategories } from "@/helper/fetchFromDirectus";
import { DynamicFaIcon } from "@/components/common/DynamicFaIcon";

const Footer = async ({
  locations,
  settings,
}: {
  locations: TLocation[];
  settings: TSettings;
}) => {
  const categories = await fetchCategories();

  return (
    <footer className="bg-[#f8f9fa] text-[#2d2d2d] py-10 border-t border-gray-200">
      <PaddingContainer>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="">
            <Image src={logo} alt="Carpet Depot" className="h-20 mb-3" />
            <p className="text-sm">
              Our Trusted Source for Quality Carpets, Expert Installation, and
              Unbeatable Prices.
            </p>
          </div>

          {/* Shop By Category */}
          <div>
            <h4 className="font-bold mb-3">Shop By Category</h4>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    className="hover:text-primary hover:underline"
                    href={`/categories?category=${category.id}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="font-bold mb-3">About Us</h4>
            <ul className="space-y-2 text-sm">
              {settings?.footer_links?.map((item, index) => (
                <li key={index}>
                  <Link
                    className="hover:text-primary hover:underline"
                    href={`${item.link}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className=" row-span-1 md:row-span-2">
            <h4 className="font-bold mb-3">Locations</h4>
            <ul className="space-y-2 text-sm">
              {locations.map((location) => (
                <li key={location.id}>
                  <Link
                    className="hover:text-primary hover:underline"
                    href={`/locations/${location.slug}`}
                  >
                    {getCityName(location.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {" "}
            <h2 className="text-lg font-bold mb-4">Follow us on</h2>
            <div className="flex mt-4 space-x-3">
              {
                /* Social Media Icons */
                settings?.social_links?.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    className="text-white bg-red-600 p-2 rounded-full"
                  >
                    <DynamicFaIcon size={20} iconName={item.icon} />
                  </a>
                ))
              }
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3">Store Hours</h4>
            <p className="text-sm">Monday - Friday: 9:00 AM - 8:00 PM</p>
            <p className="text-sm">Saturday: 10:00 AM - 5:00 PM</p>
            <p className="text-sm mb-4">Sunday: Closed</p>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="font-bold mb-3">Contact Information</h4>
            <p className="flex items-center text-sm mb-1">
              <FiPhone className="mr-2" /> +8801629394828
            </p>
            <p className="flex items-center text-sm mb-1">
              <FiMail className="mr-2" /> contact.eleyas@gmail.com
            </p>
            <p className="flex items-center text-sm">
              <FiMapPin className="mr-2" /> 6391 Elgin St. Celina, 10299
            </p>
          </div>
        </div>
      </PaddingContainer>

      <hr className="my-6 border-gray-300" />
      <p className="text-center text-sm">
        Copyright Carpet Depot. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
