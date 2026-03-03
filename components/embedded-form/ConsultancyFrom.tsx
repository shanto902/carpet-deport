"use client";

import React from "react";

const ConsultancyFrom = () => {
  return (
    <div className="w-full">
      <iframe
        id="JotFormIFrame-250145363798060"
        title="Consultancy Form"
        onLoad={() => {
          window.parent.scrollTo(0, 0);
        }}
        allowTransparency={true}
        allowFullScreen={true}
        allow="geolocation; microphone; camera; fullscreen"
        src="https://form.jotform.com/250145363798060"
        frameBorder="0"
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          height: "1350px",
          border: "none",
        }}
        scrolling="no"
      />
    </div>
  );
};

export default ConsultancyFrom;
