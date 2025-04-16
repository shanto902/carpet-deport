import Link from "next/link";
import React from "react";

const BottomNavbar = () => {
  const navLinks = [
    {
      label: "Decatur",
      path: "/locations/decatur",
    },
    {
      label: "Douglasville",
      path: "/locations/decatur",
    },
    {
      label: "Jonesboro",
      path: "/locations/decatur",
    },
    {
      label: "Mableton",
      path: "/locations/decatur",
    },
    {
      label: "Roswell",
      path: "/locations/decatur",
    },
    {
      label: "Snellville",
      path: "/locations/decatur",
    },
    {
      label: "Woodstock",
      path: "/locations/decatur",
    },
  ];
  return (
    <nav className="bg-paragraph w-full hidden   mx-auto md:flex justify-center py-3">
      <ul className=" max-w-[1200px] gap-10 flex px-10 flex-wrap justify-around items-center text-white text-base uppercase py-2">
        {navLinks.map((item, index) => (
          <Link href={item.path} key={index}>
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
