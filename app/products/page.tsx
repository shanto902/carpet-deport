import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import ProductFeatureSection from "@/components/pages/products/ProductFeatureSection";
import Image from "next/image";

const steps = [
  {
    title: "Step 1",
    text: "Browse or talk to the in-store consultant to help you explore ideas, materials, colors, and budget.",
    image: "/images/step.png",
  },
  {
    title: "Step 2",
    text: "Take a few photos of the area, and we’ll provide personalized recommendations.",
    image: "/images/step.png",
  },
  {
    title: "Step 3",
    text: "We’ll send a consultant to visit your home for free measurements and product match.",
    image: "/images/step.png",
  },
  {
    title: "Step 4",
    text: "We’ll set up an install date after confirming your order. Done!",
    image: "/images/step.png",
  },
];

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbBanner
        title="Great Flooring. Great Brands. Great Prices."
        background="/breadcrumb-products.jpg"
        breadcrumb={["Products"]}
      />
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Our Best Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Carpet Depot offers a wide selection of flooring options to fit your
            needs, no matter the room, budget, or size of your project.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="text-center space-y-3">
              <Image
                src={step.image}
                alt={step.title}
                width={300}
                height={200}
                className="w-full h-32 object-cover rounded"
              />
              <h4 className="font-bold">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Product Sections */}
        <ProductFeatureSection
          title="Carpet"
          description="There are so many options! From budget, mid-tier, to luxury styles, our in-store flooring consultants can help you choose the best fit for your project."
          image="/images/carpet1.png"
        />
        <ProductFeatureSection
          title="Hardwood"
          description="If you want the feel and look of real wood, elegant and timeless, Carpet Depot’s hardwood flooring makes a great option."
          image="/images/carpet1.png"
          reverse
        />
        <ProductFeatureSection
          title="Luxury Vinyl"
          description="Modern vinyl flooring is engineered to mimic the look and texture of natural wood or stone. It’s waterproof, durable, and affordable."
          image="/images/carpet1.png"
        />
        <ProductFeatureSection
          title="Rugs & Carpet Remnants"
          description="For a temporary fix or small space, choose from a huge selection of carpet remnants and roll ends for unbeatable value."
          image="/images/carpet1.png"
          reverse
        />
      </div>
    </>
  );
}
