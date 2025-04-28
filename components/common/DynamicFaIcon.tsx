"use client";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
const allIcons: Record<string, React.ElementType> = {
  ...FaIcons,
  ...RiIcons,
  ...GrIcons,
  ...MdIcons,
  ...GiIcons,
};

export const DynamicFaIcon = ({
  iconName,
  size = 32,
  className = "",
}: {
  iconName: string;
  size?: number;
  className?: string;
}) => {
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(
    null
  );

  useEffect(() => {
    if (iconName in allIcons) {
      setIconComponent(() => allIcons[iconName]); // Set as function reference to avoid JSX errors
    } else {
      setIconComponent(null);
    }
  }, [iconName]);

  if (!IconComponent) return null;

  return <IconComponent size={size} className={className} />;
};
