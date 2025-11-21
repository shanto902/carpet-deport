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
    if (!document.getElementById("powr-script")) {
      const script = document.createElement("script");
      script.id = "powr-script";
      script.src = "https://www.powr.io/powr.js?platform=html";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.Powr?.reload) {
      window.Powr.reload();
    }
  }, []);

  return (
    <section className="w-full">
      <div className="relative w-full">
        {/* POWR Social Feed */}
        <div
          id="b700f064_1763752460"
          className="
            powr-social-feed 
            overflow-y-hidden 
            w-full 
            h-full 
            
          "
        />

        {/* Bottom overlay to hide watermark */}
        <div className="absolute bottom-2 left-0 w-full h-30 md:h-20 bg-[#F7F9FA]" />
      </div>
    </section>
  );
}
