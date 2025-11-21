import Link from "next/link";

const SmartLink = ({
  href,
  children,
  className,
  onClick,
  newTab,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  newTab?: boolean;
}) => {
  const isExternal = /^https?:\/\//i.test(href);
  const isCatalog = href.startsWith("/catalog");

  if (isExternal || isCatalog) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : "_self"}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      target={newTab ? "_blank" : "_self"}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default SmartLink;
