/* eslint-disable @typescript-eslint/no-explicit-any */
import parse from "html-react-parser";

import Image from "next/image";

interface PostBodyProps {
  body: string;
}

const PostBody = ({ body }: PostBodyProps) => {
  // Fetch blurData for each image asynchronously
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;

        return (
          <Image
            className="w-full  md:pb-0 object-cover rounded-lg object-center h-auto"
            src={src}
            alt={alt}
            width={1200}
            height={700}
          />
        );
      }
    },
  };

  const getParsedHtml = (body: string) => {
    return parse(body, options);
  };

  return (
    <article className="richtext h-full mx-auto">{getParsedHtml(body)}</article>
  );
};

export default PostBody;
