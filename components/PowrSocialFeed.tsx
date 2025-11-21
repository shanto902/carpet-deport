"use client";

import { useEffect } from "react";
import CustomButton from "./common/CustomButton";

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
      <>
        <div
          className="powr-social-feed overflow-y-hidden"
          id="b700f064_1763752460"
          style={{ width: "1280px", height: "850px" }}
        />

        {/* Follow Button */}
        <div className="flex justify-center mt-6">
          <CustomButton
            button_type="arrow"
            newTab
            href="https://www.facebook.com/carpetdepotatlanta"
          >
            Follow Us on Facebook
          </CustomButton>
        </div>
      </>
    </section>
  );
}
