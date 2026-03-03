"use client";

export default function ContactForm() {
  return (
    <div className="w-full bg-black/30 h-[500px] overflow-hidden rounded-[20px]">
      <iframe
        id="JotFormIFrame-251464251620146"
        title="Contact Form"
        onLoad={() => {
          window.parent.scrollTo(0, 0);
        }}
        allowTransparency={true}
        allowFullScreen={true}
        allow="geolocation; microphone; camera; fullscreen"
        src="https://form.jotform.com/251464251620146"
        frameBorder="0"
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          height: "500px",
          border: "none",
        }}
        scrolling="no"
      />
    </div>
  );
}
