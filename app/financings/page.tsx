import InstallInfoBlock from "@/components/pages/installation/InstallInfoBlock";

export default function FinancingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <InstallInfoBlock
        title="Get The Flooring You Want With Great Financing."
        content="In addition to accepting all major credit cards, Carpet Depot has multiple instant credit financing options available to you. We also always offer special no-interest financing. Credit offers are subject to approval. Give us a call or stop in to the store today to find out all of the details of our current options.

Save time by filling out the application before you head into the store!"
        image="/images/finance.png"
        buttonText="Apply Now"
        buttonLink="#"
      />
    </div>
  );
}
