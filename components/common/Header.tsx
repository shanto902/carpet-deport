import React from "react";
import parser from "html-react-parser";
import { twMerge } from "tailwind-merge";

const HeaderText = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return <div className={twMerge("header", className)}>{parser(children)}</div>;
};

export default HeaderText;
