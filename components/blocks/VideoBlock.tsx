"use client";

import React, { useState } from "react";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { getYouTubeVideoID } from "@/helper/getYoutubeVideo";
import { TVideoBlock } from "@/interfaces";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export const VideoBlock = ({ block }: { block: TVideoBlock }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 20,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const totalSlides = block?.item?.youtube_video_links?.length || 0;

  return (
    <section className="py-10 bg-[#F7F9FA] text-center">
      <PaddingContainer className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
          Lower Prices Better <br />
          <span className="inline-block mt-1">
            Services Expert Installation
          </span>
        </h2>

        {/* Video Slider */}
        <div className="keen-slider" ref={sliderRef}>
          {block?.item?.youtube_video_links?.map((video, index) => (
            <div
              key={index}
              className="keen-slider__slide flex justify-center px-4"
            >
              <div className="w-full max-w-[1000px] aspect-[16/7] rounded-xl overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoID(
                    video.link
                  )}`}
                  title={`Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === i
                  ? "bg-primary scale-110"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </PaddingContainer>
    </section>
  );
};

export default VideoBlock;
