import { TLocation } from "@/interfaces";
import Link from "next/link";
import React from "react";

const BottomNavbar = ({ locations }: { locations: TLocation[] }) => {
  return (
    <nav className="bg-paragraph w-full hidden   mx-auto md:flex justify-center py-3">
      <ul className=" max-w-[1200px] gap-10 flex px-10 flex-wrap justify-around items-center text-white text-base uppercase py-2">
        {locations?.map((item, index) => (
          <Link href={`/locations/${item.slug}`} key={index}>
            {item.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
