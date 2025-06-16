import React from "react";
import logo from "@/assets/svg/logo.svg";

import Image from "next/image";
import PaddingContainer from "../PaddingContainer";
import { TLocation, TSettings } from "@/interfaces";

import Link from "next/link";
import { fetchCategories } from "@/helper/fetchFromDirectus";
import { DynamicFaIcon } from "@/components/common/DynamicFaIcon";

import StoreLocationLi from "@/components/common/StoreLocationLi";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="">
            <Image src={logo} alt="Carpet Depot" className="h-20 mb-2" />
            <p className="text-sm">
              Your Trusted Source for Quality Carpets, Expert Installation, and
              Unbeatable Prices.
            </p>

            <h2 className="text-lg font-bold mb-4 mt-5">Follow us on</h2>
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
            <h4 className="font-bold mb-3">Locations & Store Hours</h4>
            <ul className="space-y-2 text-sm">
              {locations.map((location) => (
                <StoreLocationLi key={location.id} location={location} />
              ))}
            </ul>
          </div>
        </div>
      </PaddingContainer>

      <hr className="my-6 border-gray-300" />
      <p className="text-center text-sm">{settings.copyright_text}</p>
    </footer>
  );
};

export default Footer;
