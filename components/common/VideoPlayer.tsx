"use client";
import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export const VideoPlayer = ({ video }: { video: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full group mix-blend-multiply">
      <video
        ref={videoRef}
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${video}`}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Play/Pause Button Overlay */}
      <button
        onClick={togglePlay}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
      >
        {isPlaying ? (
          <FaPause className="w-4 h-4" />
        ) : (
          <FaPlay className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};
