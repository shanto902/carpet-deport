import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  background: string; // image path from /public
  breadcrumb?: string[];
};

export default function BreadcrumbBanner({
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  background,
  breadcrumb = [],
}: Props) {
  return (
    <div className="relative h-[250px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={"/images/breadcrumb.jpg"}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-center px-8 sm:px-16">
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">
          {title}
        </h1>
        <nav className="text-white text-sm flex items-center gap-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {breadcrumb.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span>&gt;</span>
              <span className="text-white/80">{item}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
