import PaddingContainer from "@/components/layout/PaddingContainer";
import { getYouTubeVideoID } from "@/helper/getYoutubeVideo";
import { TVideoBlock } from "@/interfaces";

export const VideoBlock = ({ block }: { block: TVideoBlock }) => {
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

        {/* YouTube Video */}
        <div className="flex justify-center">
          <div className="w-full max-w-[1000px] aspect-[16/7] rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${getYouTubeVideoID(
                block.item.youtube_video_link
              )}`}
              title="Carpet Depot Flashback Ads | Working Hard"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </PaddingContainer>
    </section>
  );
};

export default VideoBlock;
