import React from "react";
import logo from "@/assets/svg/logo.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fa] text-[#2d2d2d] px-6 py-10 md:px-20 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo & Description */}
        <div className="md:col-span-1">
          <Image src={logo} alt="Carpet Depot" className="h-20 mb-3" />
          <p className="text-sm">
            Our Trusted Source for Quality Carpets, Expert Installation, and
            Unbeatable Prices.
          </p>
          <div className="flex mt-4 space-x-3">
            <a href="#" className="text-white bg-red-600 p-2 rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white bg-red-600 p-2 rounded-full">
              <FaInstagram />
            </a>
            <a href="#" className="text-white bg-red-600 p-2 rounded-full">
              <FaPinterestP />
            </a>
            <a href="#" className="text-white bg-red-600 p-2 rounded-full">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Shop By Category */}
        <div>
          <h4 className="font-bold mb-3">Shop By Category</h4>
          <ul className="space-y-2 text-sm">
            <li>Carpets & Rugs</li>
            <li>Hardwood Flooring</li>
            <li>Laminate & Vinyl</li>
            <li>Tile Flooring</li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h4 className="font-bold mb-3">About Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Installation</li>
            <li>Financing</li>
            <li>Locations</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="font-bold mb-3">Locations</h4>
          <ul className="space-y-2 text-sm">
            <li>Decatur</li>
            <li>Douglasville</li>
            <li>Jonesboro</li>
            <li>Mableton</li>
            <li>Roswell</li>
            <li>Snellville</li>
            <li>Snellville</li>
          </ul>
        </div>

        {/* Contact & Hours */}
        <div>
          <h4 className="font-bold mb-3">Store Hours</h4>
          <p className="text-sm">Monday - Friday: 9:00 AM - 8:00 PM</p>
          <p className="text-sm">Saturday: 10:00 AM - 5:00 PM</p>
          <p className="text-sm mb-4">Sunday: Closed</p>

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

      <hr className="my-6 border-gray-300" />
      <p className="text-center text-sm">
        Copyright Carpet Depot. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
