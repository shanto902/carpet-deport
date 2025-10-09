import { ArrowUpRight } from "lucide-react";
import React, { ReactNode } from "react";
import { BiQuestionMark } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import SmartLink from "./SmartLink";

const CustomButton = ({
  children,
  className,
  href = "#",
  button_type = "arrow",
  inverted = false,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  inverted?: boolean;
  button_type?: "arrow" | "location" | "question";
  onClick?: () => void;
}) => {
  return (
    <SmartLink
      href={href}
      onClick={onClick}
      className={twMerge(
        ` drop-shadow-none hover:drop-shadow-lg active:drop-shadow-none flex items-center justify-between group transition-all duration-300  ${
          inverted
            ? " border-primary  bg-primary "
            : " bg-[#181919] border-[#181919] "
        }hover:text-primary hover:border-primary border-2 gap-2  rounded-full p-2 text-white  w-fit h-fit cursor-pointer hover:bg-white text-sm font-medium`,
        className
      )}
    >
      <div className="px-2 ">{children}</div>
      {button_type == "location" ? (
        <FaMapMarkerAlt
          className={`group-hover:animate-pulse size-7 p-[5px] ${
            inverted ? " text-primary bg-white " : " bg-primary text-white "
          }rounded-full`}
        />
      ) : button_type === "question" ? (
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
    </SmartLink>
  );
};

export default CustomButton;
