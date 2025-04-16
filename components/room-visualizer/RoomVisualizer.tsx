"use client";
import { useState } from "react";
import PhotoUploader from "./PhotoUploader";
import RoomSelector from "./RoomSelector";
import TexturePicker from "./TexturePicker";

export default function Home() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [room, setRoom] = useState("Bedroom");
  const [texture, setTexture] = useState("");
  const [angle, setAngle] = useState(0);

  const roomImages = {
    Bedroom: "/assets/templates/bedroom.jpg",
    "Living Room": "/assets/templates/livingroom.jpg",
    Kitchen: "/assets/templates/kitchen.jpg",
  };

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      <div className="col-span-1 space-y-4">
        <PhotoUploader onUpload={(url) => setPhoto(url)} />
        <RoomSelector selected={room} onSelect={setRoom} />
      </div>

      <div className="col-span-3 space-y-4">
        <div className="relative w-full h-[400px] bg-gray-100 rounded overflow-hidden">
          <img
            src={photo || roomImages[room]}
            alt="Room"
            className="w-full h-full object-cover"
          />
          {texture && (
            <img
              src={texture}
              alt="Texture"
              style={{ transform: `rotate(${angle}deg)` }}
              className="absolute top-0 left-0 w-full h-full object-cover mix-blend-multiply opacity-80"
            />
          )}
        </div>

        <TexturePicker selected={texture} onSelect={setTexture} />

        <button
          onClick={() => setAngle((prev) => (prev + 90) % 360)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Rotate Floor
        </button>
      </div>
    </div>
  );
}
