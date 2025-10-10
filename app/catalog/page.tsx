import CatalogPage from "@/components/pages/catalog/CatalogPage";
import { Metadata } from "next";
import Script from "next/script";
import React from "react";
export const metadata: Metadata = {
  title: "Categories | Carpet Depot",
  description: "All categories of Carpet Depot",
};
const page = () => {
  return (
    <>
      <Script
        async
        id="roomvoAssistant"
        src="https://www.roomvo.com/static/scripts/b2b/common/assistant.js"
        strategy="afterInteractive"
        data-locale="en-us"
        data-position="bottom-right"
      />
      <CatalogPage />
    </>
  );
};

export default page;
