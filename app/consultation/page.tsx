import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import ConsultancyFrom from "@/components/embedded-form/ConsultancyFrom";

import { TSettings } from "@/interfaces";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consultation | Carpet Depot",
  description: "Book a free consultation with Carpet Depot",
};
const page = async () => {
  const settings = (await directus.request(
    readSingleton("settings")
  )) as TSettings;
  return (
    <div>
      <BreadcrumbBanner
        title="Book A Free Consultation"
        breadcrumb={["Book a Free Consultation"]}
        image={settings.consultation}
      />
      {/* <ConsultationForm /> */}
      <ConsultancyFrom />
    </div>
  );
};

export default page;
