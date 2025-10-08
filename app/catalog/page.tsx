import CatalogPage from "@/components/pages/catalog/CatalogPage";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Categories | Carpet Depot",
  description: "All categories of Carpet Depot",
};
const page = () => {
  return <CatalogPage />;
};

export default page;
