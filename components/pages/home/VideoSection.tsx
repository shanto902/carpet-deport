export default function VideoSection() {
  return (
    <section className="py-16 bg-[#F7F9FA] text-center">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
          Lower Prices Better <br />
          <span className="inline-block mt-1">
            Services Expert Installation
          </span>
        </h2>

        {/* YouTube Video */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Carpet Depot Flashback Ads | Working Hard"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
