"use client";
import Link from "next/link";
import React from "react";
import { getCityName } from "../layout/header/BottomNavbar";
import { formatStoreHours } from "../pages/location/SortedLocation";
import { TLocation } from "@/interfaces";

const StoreLocationLi = ({ location }: { location: TLocation }) => {
  return (
    <li key={location.id} className="relative group">
      <Link
        className="hover:text-primary hover:underline"
        href={`/locations/${location.slug}`}
      >
        {getCityName(location.name)}
      </Link>

      {/* Beautiful Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-start bg-white text-gray-800 text-xs p-4 rounded-md shadow-lg whitespace-pre-line min-w-[280px] text-left z-20">
        {formatStoreHours(location.store_status).map((line, idx) => (
          <div key={idx} className="mb-1 last:mb-0">
            {line}
          </div>
        ))}
      </div>
    </li>
  );
};

export default StoreLocationLi;
