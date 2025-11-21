"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Powr?: {
      reload: () => void;
    };
  }
}

export default function PowrSocialFeed() {
  useEffect(() => {
    // Load POWR script (only once)
    if (!document.getElementById("powr-script")) {
      const script = document.createElement("script");
      script.id = "powr-script";
      script.src = "https://www.powr.io/powr.js?platform=html";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.Powr?.reload) {
      // If script already loaded, re-init POWR widgets
      window.Powr.reload();
    }
  }, []);

  return (
    <section className="w-full">
      <div>
        {/* POWR container */}
        <div
          id="b700f064_1763752460"
          className="
            powr-social-feed 
            overflow-y-hidden 
            w-full 
            h-[1550px] 
            sm:h-[650px] 
            md:h-[750px] 
            lg:h-[850px]
          "
          style={{ maxWidth: "100%" }}
        />
      </div>
    </section>
  );
}
