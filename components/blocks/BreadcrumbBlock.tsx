import Image from "next/image";
import Link from "next/link";
import PaddingContainer from "../layout/PaddingContainer";
import { TBreadcrumbBlock } from "@/interfaces";
import HeaderText from "../common/Header";

export default function BreadcrumbBlock({
  block,
}: {
  block: TBreadcrumbBlock;
}) {
  return (
    <div className="relative h-[250px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.image}`}
        alt={block.item.title}
        fill
        objectFit="cover w-full"
        className="z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-center">
        <PaddingContainer>
          <HeaderText className="text-white">{block.item.title}</HeaderText>
          <nav className="text-white text-xs md:text-sm flex items-center gap-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            {block.item.breadcrumb.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span>&gt;</span>
                <span className="text-white/80 ">{item.label}</span>
              </div>
            ))}
          </nav>
        </PaddingContainer>
      </div>
    </div>
  );
}
