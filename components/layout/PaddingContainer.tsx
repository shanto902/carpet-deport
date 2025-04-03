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
    <main className={twMerge("container px-5 mx-auto", className)}>
      {children}
    </main>
  );
};

export default PaddingContainer;
