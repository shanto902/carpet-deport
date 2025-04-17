import AllProducts from "@/components/pages/home/AllProducts";
import BlogSection from "@/components/pages/home/BlogSection";
import FlooringCategories from "@/components/pages/home/FlooringCategories";
import InspirationGallery from "@/components/pages/home/InspirationGallery";
import InstallationSection from "@/components/pages/home/InstallationSection";
import OnARollSection from "@/components/pages/home/OnARollSection";
import PromoSection from "@/components/pages/home/PromoSection";
import StatsSection from "@/components/pages/home/StatsSection";
import TestimonialSection from "@/components/pages/home/TestimonialSection";
import VideoSection from "@/components/pages/home/VideoSection";
import React from "react";

const page = () => {
  return (
    <div>
      <PromoSection />
      <FlooringCategories />
      <AllProducts />
      <VideoSection />
      <StatsSection />
      <OnARollSection />
      <InstallationSection />
      <InspirationGallery />
      <TestimonialSection />
      <BlogSection />
    </div>
  );
};

export default page;
