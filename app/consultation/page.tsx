import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import ConsultationForm from "@/components/pages/consultaion/ConsultationForm";
import React from "react";

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
