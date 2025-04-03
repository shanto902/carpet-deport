import React from "react";

const BottomNavbar = () => {
  const navLinks = [
    {
      label: "Decatur",
      path: "/locations/decatur",
    },
    {
      label: "Douglasville",
      path: "/locations/douglasville",
    },
    {
      label: "Jonesboro",
      path: "/locations/jonesboro",
    },
    {
      label: "Mableton",
      path: "/locations/mableton",
    },
    {
      label: "Roswell",
      path: "/locations/roswell",
    },
    {
      label: "Snellville",
      path: "/locations/snellville",
    },
    {
      label: "Woodstock",
      path: "/locations/woodstock",
    },
  ];
  return (
    <nav className="bg-paragraph container mx-auto flex justify-center py-3">
      <ul className=" max-w-[1200px] gap-10 flex justify-around items-center text-white text-lg uppercase py-2">
        {navLinks.map((item, index) => (
          <li key={index}>{item.label}</li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
