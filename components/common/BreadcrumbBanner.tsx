import Image from "next/image";
import Link from "next/link";
import PaddingContainer from "../layout/PaddingContainer";

type Props = {
  title: string;
  image?: string;
  breadcrumb: string[];
};

export default function BreadcrumbBanner({
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  image,
  breadcrumb = [],
}: Props) {
  return (
    <div className="relative h-[250px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={
          image
            ? `${process.env.NEXT_PUBLIC_ASSETS_URL}${image}`
            : "/images/hero.jpg"
        }
        alt={title}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-center ">
        <PaddingContainer>
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5">
            {title}
          </h1>
          <nav className="text-white text-xs md:text-sm flex items-center gap-2">
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
        </PaddingContainer>
      </div>
    </div>
  );
}
