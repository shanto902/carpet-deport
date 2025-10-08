// app/catalog/page.tsx
"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

export default function CatalogPage() {
  useEffect(() => {
    console.log("[Roomvo] anchor:", !!document.getElementById("catalog"));
    console.log("[Roomvo] mount:", !!document.getElementById("roomvoCatalog"));
  }, []);

  return (
    <>
      {/* Step 1: Assistant script (async is critical) */}
      <Script
        id="roomvoAssistant"
        src="https://www.roomvo.com/static/scripts/b2b/common/assistant.js"
        strategy="afterInteractive"
        data-locale="en-us"
        data-position="bottom-right"
        onLoad={() => console.log("[Roomvo] assistant.js loaded")}
        onError={(e) => console.error("[Roomvo] load error", e)}
      />

      {/* Step 2: Required mount points (in body) */}
      <a id="catalog" />
      <div id="roomvoCatalog" style={{ minHeight: 640 }} />

      {/* Minimal prefilter test links */}
      <div style={{ padding: 16 }}>
        <Link href="/catalog?product_type=1" style={{ marginRight: 12 }}>
          Flooring
        </Link>
        <a
          href={
            "/catalog?product_type=1&prefilter=" +
            encodeURIComponent(JSON.stringify({ productSubtypes: [1] }))
          }
        >
          Hardwood
        </a>
      </div>
    </>
  );
}
