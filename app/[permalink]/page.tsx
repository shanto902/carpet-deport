import React from "react";

interface PageProps {
  params: Promise<{
    permalink: string;
  }>;
}
const page = async ({ params }: PageProps) => {
  const { permalink } = await params;
  console.log(permalink);
  return <div>page</div>;
};

export default page;
