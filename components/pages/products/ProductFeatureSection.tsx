import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

type ProductFeatureProps = {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  buttonText?: string;
};

export default function ProductFeatureSection({
  title,
  description,
  image,
  reverse = false,
  buttonText = "View Your Store",
}: ProductFeatureProps) {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-8 py-8`}
    >
      <div className="flex-1">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="rounded-lg w-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <Link
          href="#"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800"
        >
          {buttonText} <FaArrowRight className="text-red-500" />
        </Link>
      </div>
    </div>
  );
}
