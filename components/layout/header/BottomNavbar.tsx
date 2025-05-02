import { TLocation } from "@/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const getCityName = (fullName: string) => {
  return fullName.split(",")[0].trim();
};

const BottomNavbar = ({ locations }: { locations: TLocation[] }) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean); // removes empty strings

  return (
    <nav className="bg-paragraph w-full hidden mx-auto md:flex justify-center py-3">
      <ul className="max-w-[1200px] gap-10 flex px-10 flex-wrap justify-around items-center text-white text-base uppercase py-2">
        {locations?.map((item, index) => {
          const isActive =
            pathParts[0] === "locations" && pathParts[1] === item.slug;

          return (
            <Link
              key={index}
              href={`/locations/${item.slug}`}
              className={`${
                isActive ? "font-bold" : "font-normal"
              } hover:underline underline-offset-4`}
            >
              {getCityName(item.name)}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
