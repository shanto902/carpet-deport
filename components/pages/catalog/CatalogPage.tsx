"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function CatalogPage() {
  useEffect(() => {
    // 1️⃣ Roomvo message listener
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.action === "roomvoRequestEstimate") {
        window.open("https://carpetdepotatlanta.com/consultation", "_self");
      }
    };

    window.addEventListener("message", handleMessage);

    // 2️⃣ Fallback: intercept "Contact us" button click if Roomvo triggers it manually
    const handleButtonClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === "BUTTON" &&
        target.getAttribute("aria-label") === "Contact us"
      ) {
        window.open("https://carpetdepotatlanta.com/consultation", "_self");
      }
    };

    document.addEventListener("click", handleButtonClick);

    // Cleanup both listeners
    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("click", handleButtonClick);
    };
  }, []);

  return (
    <>
      <Script
        async
        id="roomvoAssistant"
        src="https://www.roomvo.com/static/scripts/b2b/common/assistant.js"
        strategy="afterInteractive"
        data-locale="en-us"
        data-position="bottom-right"
      />

      <a id="catalog" />
      <div id="roomvoCatalog" style={{ minHeight: 640 }} />
    </>
  );
}
