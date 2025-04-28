import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import ConsultationForm from "@/components/pages/consultaion/ConsultationForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consultation | Carpet Depot",
  description: "Book a free consultation with Carpet Depot",
};
const page = () => {
  return (
    <div>
      <BreadcrumbBanner
        title="Book A Free Consultation"
        breadcrumb={["Book a Free Consultation"]}
      />
      <ConsultationForm />
    </div>
  );
};

export default page;
