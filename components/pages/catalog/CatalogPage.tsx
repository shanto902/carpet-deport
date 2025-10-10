"use client";

import { useEffect } from "react";

export default function CatalogPage() {
  useEffect(() => {
    // Listen for Roomvo estimate request messages
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.action === "roomvoRequestEstimate") {
        window.open("https://carpetdepotatlanta.com/consultation", "_self");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      // Cleanup listener on unmount
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <a id="catalog" />
      <div id="roomvoCatalog" style={{ minHeight: 640 }} />
    </>
  );
}
