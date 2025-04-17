"use client";
import React from "react";

const JotformEmbed = ({ isMain = true }: { isMain?: boolean }) => {
  return (
    <div className="">
      <iframe
        title="JotForm"
        src="https://form.jotform.com/250145363798060"
        width="100%"
        height={isMain ? "450px" : "1400px"}
        style={{ border: "none" }}
        allowFullScreen
        className="rounded-md shadow-md"
      ></iframe>
    </div>
  );
};

export default JotformEmbed;
