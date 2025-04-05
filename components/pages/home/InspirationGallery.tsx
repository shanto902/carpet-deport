export default function InspirationGallery() {
  const images = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
  ]; // Replace with actual paths

  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-10">
          Get Inspired For Your Next Project
        </h2>

        <div className=" h-[70vh] grid grid-cols-1 sm:grid-cols-6 grid-rows-6 gap-4">
          {/* First Image (top-left large box) */}
          <div className="sm:col-span-2 sm:row-span-3">
            <img
              src={images[0]}
              alt="Inspiration 1"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>

          {/* Second Image (middle top) */}
          <div className="sm:col-span-2 sm:row-span-3 sm:col-start-3">
            <img
              src={images[1]}
              alt="Inspiration 2"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>

          {/* Third Image (long wide bottom section) */}
          <div className="sm:col-span-4 sm:row-span-3 sm:col-start-1 sm:row-start-4">
            <img
              src={images[3]}
              alt="Inspiration 3"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>

          {/* Fourth Image (right tall) */}
          <div className="sm:col-span-2 sm:row-span-6 sm:col-start-5 sm:row-start-1">
            <img
              src={images[2]}
              alt="Inspiration 4"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
