"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";
import PaddingContainer from "@/components/layout/PaddingContainer";
import CustomButton from "@/components/common/CustomButton";
import { TTestimonialBlock } from "@/interfaces";

const TestimonialBlock = ({ block }: { block: TTestimonialBlock }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
    },
    slides: { perView: 1, spacing: 15 },
  });

  return (
    <section className="py-20 bg-white">
      <PaddingContainer className="flex flex-col md:flex-row items-start gap-10">
        {/* Left Content */}
        <div className="md:w-1/3 text-center md:text-left">
          <p className="text-sm text-red-500 font-semibold uppercase tracking-wider mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] leading-snug mb-6">
            What Our Clients <br /> Have To Say
          </h2>
          <CustomButton>Get Started</CustomButton>
        </div>

        {/* Right Content (Slider) */}
        <div className="md:w-2/3 ">
          <div ref={sliderRef} className="keen-slider p-4 mx-2">
            {block.item.testimonials.map((testimonial) => (
              <div
                key={testimonial.testimonials_id.id}
                className="keen-slider__slide bg-white rounded-xl shadow-md p-4"
              >
                {/* Stars */}
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(testimonial.testimonials_id.rating)].map(
                    (_, idx) => (
                      <FaStar key={idx} />
                    )
                  )}
                </div>

                {/* Message */}
                <p className="text-[#505050] text-sm md:text-base leading-relaxed mb-4">
                  {testimonial.testimonials_id.review}
                </p>

                {/* Person Info */}
                <div className="flex items-center gap-3">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${testimonial.testimonials_id.photo}`}
                    alt={testimonial.testimonials_id.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-[#1E1E1E] text-sm">
                      {testimonial.testimonials_id.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.testimonials_id.designation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
