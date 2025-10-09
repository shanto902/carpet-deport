import Script from "next/script";

export default function CatalogPage() {
  return (
    <>
      {/* Step 1: Assistant script (async is critical) */}
      <Script
        async
        id="roomvoAssistant"
        src="https://www.roomvo.com/static/scripts/b2b/common/assistant.js"
        strategy="afterInteractive"
        data-locale="en-us"
        data-position="bottom-right"
      />

      {/* Step 2: Required mount points (in body) */}
      <a id="catalog" />
      <div id="roomvoCatalog" style={{ minHeight: 640 }} />

      {/* Minimal prefilter test links */}
      {/* <div style={{ padding: 16 }}>
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
      </div> */}
    </>
  );
}
