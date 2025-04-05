"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const stores = [
  "Decatur",
  "Douglasville",
  "Jonesboro",
  "Marietta",
  "Roswell",
  "Snellville",
  "Woodstock",
];

const topics = [
  "Carpet",
  "Vinyl",
  "Luxury Vinyl",
  "Hardwood",
  "Laminate",
  "Stain Resistant",
  "Undecided",
  "Other",
];

export default function ConsultationPage() {
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can send this data to an API
    console.log({ selectedStore, selectedTopics });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-xl space-y-8 shadow-sm"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Request An In-store Consultation
          </h2>
          <p className="text-sm text-gray-500">
            Meet One-On-One With One Of Our Flooring Specialists For Design
            Assistance & A FREE Estimate
          </p>
        </div>

        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="bg-white w-full p-3 rounded-md border border-gray-200"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="bg-white w-full p-3 rounded-md border border-gray-200"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-white w-full p-3 rounded-md border border-gray-200"
          />
          <input
            type="tel"
            placeholder="Number"
            className="bg-white w-full p-3 rounded-md border border-gray-200"
          />
        </div>

        {/* Store Selection */}
        <div>
          <h3 className="text-sm font-medium mb-4">Please Select Your Store</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stores.map((store) => (
              <button
                key={store}
                type="button"
                onClick={() => setSelectedStore(store)}
                className={`px-4 py-2 rounded-full border text-sm font-medium ${
                  selectedStore === store
                    ? "bg-red-100 text-red-600 border-red-500"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                {store}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Selection */}
        <div>
          <h3 className="text-sm font-medium mb-4">
            Have Questions? Ask Us Anything
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => toggleTopic(topic)}
                className={`px-4 py-2 rounded-full border text-sm font-medium ${
                  selectedTopics.includes(topic)
                    ? "bg-red-100 text-red-600 border-red-500"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <h3 className="text-sm font-medium mb-2">
            What Type Of Products Are You Interested In ?
          </h3>
          <textarea
            placeholder="Typing..."
            className="w-full p-4 bg-white border border-gray-200 rounded-md"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-black text-white flex items-center gap-2 hover:bg-gray-800 mx-auto"
          >
            Submit Now
            <FaArrowRight className="text-red-500" size={14} />
          </button>
        </div>
      </form>
    </div>
  );
}
