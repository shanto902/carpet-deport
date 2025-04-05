"use client";

import { useEffect, useState } from "react";

type Comment = {
  name: string;
  comment: string;
};

export default function CommentList({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Simulate fetch (replace with real API call)
    setComments([
      { name: "John", comment: "Great article!" },
      { name: "Sophia", comment: "Very helpful, thank you!" },
    ]);
  }, [slug]);

  return (
    <div className="pt-6 space-y-3">
      <h3 className="text-xl font-semibold">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((c, i) => (
          <div key={i} className="border rounded-md p-3">
            <p className="font-semibold">{c.name}</p>
            <p>{c.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
