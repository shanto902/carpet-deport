import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import InstallInfoBlock from "@/components/pages/installation/InstallInfoBlock";
import Image from "next/image";

export default function InstallationPage() {
  return (
    <>
      <BreadcrumbBanner
        title="Great Flooring. Professional Installation"
        background="/breadcrumb-products.jpg"
        breadcrumb={["Installation"]}
      />
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <InstallInfoBlock
          title="Get Your Flooring Professionally Installed Fast!"
          content="Carpet Depot offers professional installation from our trusted group of expert installers. They are licensed and insured, and have experience working with many floors. We’ll schedule every step of the installation process, match the quote area, and ensure it’s professionally installed right and on time."
          image="/images/install2.png"
        />

        <InstallInfoBlock
          title="Fast Turnaround Time!"
          content="Unlike other competitors who charge more or only offer final installation weeks after the order, we offer fast, responsive and professional installation year-round. You can have your new flooring installed in as little as 48 hours! We even move your furniture for you!"
          image="/images/install2.png"
          reverse
        />

        <InstallInfoBlock
          title="Refinishing"
          content="We also offer refinishing, sanding, and restoration services for your hardwood flooring. Let us help make your hardwood look like new again with our trusted group of contractors."
          image="/images/install2.png"
        />

        {/* Last section */}
        <div className="space-y-5">
          <h2 className="text-xl font-semibold">
            Poor Installation = Serious Problems
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Poor installation can cause serious problems with your flooring from
            shortening their lifespan to damaging the floors. Avoid all of these
            potential problems by having your floors installed by trained
            professionals.
            <br />
            <br />
            At Carpet Depot, you can be certain that your installation will be
            handled with the utmost care. We have years of experience installing
            all types of flooring.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 pt-4">
            <Image
              src="/images/badinstall.png"
              alt="Bad Install 1"
              width={400}
              height={250}
              className="rounded-lg w-full object-cover"
            />
            <Image
              src="/images/badinstall.png"
              alt="Bad Install 2"
              width={400}
              height={250}
              className="rounded-lg w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
