import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { BiQuestionMark } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const CustomButton = ({
  children,
  className,
  href = "#",
  location = false,
  question = false,
  inverted = false,
}: {
  children: ReactNode;
  className?: string;
  location?: boolean;
  href?: string;
  question?: boolean;
  inverted?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        ` flex items-center group transition-all duration-300  ${
          inverted
            ? " border-primary  bg-primary "
            : " bg-[#181919] border-[#181919]"
        }hover:text-primary hover:border-primary border-2 gap-2  rounded-full p-2 text-white  w-fit h-fit cursor-pointer hover:bg-white`,
        className
      )}
    >
      <div className="px-2 text-sm font-medium">{children}</div>
      {location ? (
        <FaMapMarkerAlt
          className={`group-hover:animate-pulse size-7 p-[5px] ${
            inverted ? " text-primary bg-white " : " bg-primary text-white "
          }rounded-full`}
        />
      ) : question ? (
        <BiQuestionMark
          className={`group-hover:animate-pulse size-8 p-1 ${
            inverted ? "text-primary bg-white " : " bg-primary text-white"
          } rounded-full`}
        />
      ) : (
        <ArrowUpRight
          className={`group-hover:animate-pulse size-8 p-1 ${
            inverted ? "text-primary bg-white " : " bg-primary text-white"
          } rounded-full`}
        />
      )}
    </Link>
  );
};

export default CustomButton;
