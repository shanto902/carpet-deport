"use client";
import React from "react";

const JotformEmbed = () => {
  return (
    <div className="jotform-wrapper">
      <iframe
        title="JotForm"
        src="https://form.jotform.com/250145363798060"
        width="100%"
        height="450"
        style={{ border: "none" }}
        allowFullScreen
        className="rounded-md shadow-md"
      ></iframe>
    </div>
  );
};

export default JotformEmbed;
