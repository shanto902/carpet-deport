import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const CustomButton = ({
  children,
  className,
  href = "#",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex items-center gap-2 bg-[#181919] rounded-full p-2 text-white  w-fit h-fit cursor-pointer",
        className
      )}
    >
      <div className="px-2 text-sm font-medium">{children}</div>
      <ArrowUpRight className="size-8 p-1 bg-primary text-white  rounded-full" />
    </Link>
  );
};

export default CustomButton;
