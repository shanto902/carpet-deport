"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Masonry from "react-masonry-css";
const Reviews = ({ placeId }: { placeId: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);

  // Reviews.tsx
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/places/${placeId}/reviews`);
        const data = await res.json();

        // 🚀 keep only perfect-score reviews
        const fiveStarOnly = data.filter(
          (review: { rating: number }) => review.rating === 5
        );

        setReviews(fiveStarOnly);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  const handleToggleExpand = (idx: number) => {
    if (expandedReview === idx) {
      setExpandedReview(null); // Collapse
    } else {
      setExpandedReview(idx); // Expand
    }
  };

  const SkeletonCard = () => (
    <div className=" w-full animate-pulse flex flex-col break-inside-avoid mb-6">
      <div className="drop-shadow-lg drop-shadow-[#E9E9E940] rounded-xl p-6 bg-white flex flex-col h-full justify-between">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
          ))}
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-300 rounded w-5/6" />
          <div className="h-4 bg-gray-300 rounded w-4/6" />
          <div className="h-4 bg-gray-300 rounded w-2/6" />
        </div>
        <div className="flex items-center gap-3 mt-auto">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div className="space-y-1">
            <div className="h-3 w-24 bg-gray-300 rounded" />
            <div className="h-2 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 h-full">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Our Customers Are Saying
      </h2>

      {/* Columns Layout */}
      <Masonry
        breakpointCols={{ default: 3, 1024: 2, 640: 1 }}
        className="flex w-auto gap-6"
        columnClassName="flex flex-col gap-6"
      >
        {loading
          ? [...Array(5)].map((_, idx) => <SkeletonCard key={idx} />)
          : reviews.map((review, idx) => (
              <div
                key={review.author_name + review.time}
                className=" w-full flex flex-col break-inside-avoid mb-6"
              >
                <div className="drop-shadow-lg drop-shadow-[#E9E9E940] rounded-xl p-6 bg-white flex flex-col h-full justify-between transition-all duration-300 ease-in-out">
                  {/* Stars */}
                  <div className="flex gap-1 text-yellow-500 mb-4">
                    {[...Array(Math.round(review.rating))].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  {/* Message */}
                  <p
                    className={`text-[#505050] text-sm md:text-base leading-relaxed mb-4 ${
                      expandedReview === idx ? "" : "line-clamp-4"
                    }`}
                  >
                    {review.text || "No review text provided."}
                  </p>

                  {/* Read More / Show Less Button */}
                  {review.text && review.text.length > 150 && (
                    <button
                      onClick={() => handleToggleExpand(idx)}
                      className="text-primary text-xs font-semibold mb-4 self-start"
                    >
                      {expandedReview === idx ? "Show less" : "Read more"}
                    </button>
                  )}

                  {/* Person Info */}
                  <div className="flex items-center gap-3 mt-auto">
                    <Image
                      src={
                        review.profile_photo_url?.startsWith("http")
                          ? review.profile_photo_url
                          : `https:${review.profile_photo_url}`
                      }
                      alt={review.author_name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#1E1E1E] text-sm">
                        {review.author_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {review.relative_time_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </Masonry>
      <a
        href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary text-sm font-semibold block mt-4 text-center"
      >
        View all reviews on Google
      </a>
    </div>
  );
};

export default Reviews;
