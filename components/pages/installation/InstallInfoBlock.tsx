import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  content: string;
  image: string;
  reverse?: boolean;
  buttonText?: string;
  buttonLink?: string;
};

export default function InstallInfoBlock({
  title,
  content,
  image,
  reverse = false,
  buttonText,
  buttonLink,
}: Props) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-8 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{content}</p>

        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800"
          >
            {buttonText}
            <svg
              className="w-4 h-4 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        )}
      </div>

      <div className="w-full md:w-1/2">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="rounded-lg w-full object-cover"
        />
      </div>
    </div>
  );
}
