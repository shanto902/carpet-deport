"use client";

import { useState } from "react";

export default function CommentForm({ slug }: { slug: string }) {
  const [form, setForm] = useState({ name: "", comment: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Submit comment for ${slug}`, form);
    // Post to API route (e.g. /api/comments)
    setForm({ name: "", comment: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-6">
      <h3 className="text-xl font-semibold">Leave a Comment</h3>
      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-3 border border-gray-300 rounded-md"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <textarea
        placeholder="Comment"
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-md"
        value={form.comment}
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
        required
      />
      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded-md"
      >
        Submit Now
      </button>
    </form>
  );
}
