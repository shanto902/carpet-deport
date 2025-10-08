import Link from "next/link";

const SmartLink = ({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const isExternal = /^https?:\/\//i.test(href);
  const isCatalog = href.startsWith("/catalog");

  if (isExternal || isCatalog) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default SmartLink;
