"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { useState, useEffect } from "react";
import PaddingContainer from "@/components/layout/PaddingContainer";
import CustomButton from "@/components/common/CustomButton";
import { TTestimonialBlock } from "@/interfaces";

const TestimonialBlock = ({ block }: { block: TTestimonialBlock }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pause, setPause] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
    slides: { perView: 1, spacing: 15 },
  });

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      const isExpanding = newState[id];
      setPause(isExpanding); // If expanding, pause autoplay
      return newState;
    });
  };

  useEffect(() => {
    if (!instanceRef.current) return;

    if (pause) return; // <-- Add this line to pause autoplay when needed

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 2000);

    return () => clearInterval(interval);
  }, [instanceRef, pause]);

  return (
    <section className="py-20 bg-white">
      <PaddingContainer className="flex flex-col md:flex-row items-start gap-10">
        {/* Left Content */}
        <div className="md:w-1/3 w-full text-center md:text-left">
          <p className="text-sm text-red-500 font-semibold uppercase tracking-wider mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl font-semibold mb-6">
            What Our Clients <br /> Have To Say
          </h2>
          <CustomButton href="/consultation" className="w-full md:w-fit">
            Get Started
          </CustomButton>
        </div>

        {/* Right Content (Slider) */}
        <div className="md:w-2/3 w-full overflow-hidden">
          <div ref={sliderRef} className="keen-slider">
            {block.item.testimonials.map((testimonial) => {
              const { id, name, designation, review, rating, photo } =
                testimonial.testimonials_id;
              const isExpanded = expanded[id];

              return (
                <div key={id} className="keen-slider__slide bg-white w-full">
                  <div className="drop-shadow-lg drop-shadow-[#E9E9E940] m-4 rounded-xl p-4 bg-white">
                    {/* Stars */}
                    <div className="flex gap-1 text-yellow-500 mb-4">
                      {[...Array(rating)].map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                    </div>

                    {/* Message */}
                    <p
                      className={`text-[#505050] text-sm md:text-base leading-relaxed mb-2 ${
                        !isExpanded ? "line-clamp-3" : ""
                      }`}
                    >
                      {review}
                    </p>

                    {/* See More / See Less Button */}
                    {review.length > 150 && (
                      <button
                        onClick={() => toggleExpand(id)}
                        className="text-red-500 text-xs mt-1 font-semibold"
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}

                    {/* Person Info */}
                    <div className="flex items-center gap-3 mt-4">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${photo}`}
                        alt={name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-[#1E1E1E] text-sm">
                          {name}
                        </p>
                        <p className="text-xs text-gray-500">{designation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({
              length: Math.ceil(block.item.testimonials.length),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => instanceRef.current?.moveToIdx(index)}
                className={`w-3 h-3 rounded-full transition ${
                  currentSlide === index ? "bg-red-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </PaddingContainer>
    </section>
  );
};

export default TestimonialBlock;
