"use client";
import PaddingContainer from "@/components/layout/PaddingContainer";
import CountUp from "react-countup";

const stats = [
  { value: 15, suffix: "+", label: "Business Years" },
  { value: 1.5, suffix: "k+", label: "Projects Completed" },
  { value: 1.2, suffix: "k+", label: "Happy Customers" },
  { value: 7, suffix: "", label: "Our Locations" },
];

export default function StatsSection() {
  return (
    <section className="bg-[#434A54] text-white py-16">
      <PaddingContainer className=" mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                <CountUp
                  end={stat.value}
                  duration={2}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
                {stat.suffix}
              </h3>
              <p className="text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </PaddingContainer>
    </section>
  );
}
