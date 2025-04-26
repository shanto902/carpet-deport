// components/CardSection.tsx

import Image from "next/image";

const steps = [
  {
    step: "Step 1",
    text: "Measure (or walk off) the lengths and widths of any area you are wanting new floors and make a note of it. When it comes to stairs, just count them.",
    img: "/path-to-your-image.jpg",
  },
  {
    step: "Step 2",
    text: "Take a few pictures of the areas and include special interest areas like steps, platforms, and angled areas.",
    img: "/path-to-your-image.jpg",
  },
  {
    step: "Step 3",
    text: "Visit your most convenient locally owned Carpet Depot.",
    img: "/path-to-your-image.jpg",
  },
  {
    step: "Step 4",
    text: "We will be your trusted advisor and assistant with regards to product selection, measuring, installation, and follow up.",
    img: "/path-to-your-image.jpg",
  },
];

export default function CardSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-xl shadow-md hover:shadow-lg transition-all bg-white overflow-hidden"
            >
              <div className="h-32 w-full relative">
                <Image
                  src={step.img}
                  alt={step.step}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{step.step}</h3>
                <p className="text-sm text-gray-600">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
