import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const PaddingContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={twMerge(
        "container  px-8 sm:px-16 max-w-[1280px]   mx-auto",
        className
      )}
    >
      {children}
    </main>
  );
};

export default PaddingContainer;
