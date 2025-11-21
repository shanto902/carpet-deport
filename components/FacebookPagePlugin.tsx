"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    FB?: {
      XFBML?: {
        parse: () => void;
      };
    };
  }
}

interface FacebookPagePluginProps {
  pageUrl: string;
  width?: string | number;
  height?: string | number;
}

export default function FacebookPagePlugin({
  pageUrl,
  width = "100%",
  height = 800,
}: FacebookPagePluginProps) {
  useEffect(() => {
    if (!document.getElementById("fb-root")) {
      const fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.prepend(fbRoot);
    }

    if (document.getElementById("facebook-jssdk")) {
      if (window.FB?.XFBML?.parse) {
        window.FB.XFBML.parse();
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";

    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="fb-page"
      data-href={pageUrl}
      data-tabs="timeline"
      data-width={String(width)}
      data-height={String(height)}
      data-hide-cover="false"
      data-show-facepile="true"
    />
  );
}
