"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { toast } from "sonner";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ReactCompareSlider } from "react-compare-slider";
import PaddingContainer from "../../layout/PaddingContainer";
import { FaGear, FaX, FaCamera } from "react-icons/fa6";
import { TProduct } from "@/interfaces";
import { FaPaintBrush } from "react-icons/fa";

const LOCAL_STORAGE_KEY = "seeInRoomSettings";

const DEFAULT_IMAGE = "/rooms/bedroom.jpg";

const ROOM_IMAGES = [
  { label: "Bedroom", src: "/rooms/bedroom.jpg" },
  { label: "Bathroom", src: "/rooms/bathroom.jpg" },
  { label: "Kitchen", src: "/rooms/kitchen.jpg" },
  { label: "Corridor", src: "/rooms/corridor.png" },
];

export function getTextureUrl(id: string) {
  return `${process.env.NEXT_PUBLIC_ASSETS_URL}${id}?width=200&height=200`;
}

const COLOR_SWATCHES = ["#ffcccb", "#c1f0f6", "#d0f0c0", "#f9f6c2", "#e0d4f7"];

const SeeInRoomSegmented = ({ product }: { product: TProduct }) => {
  const TILE_OPTIONS =
    product?.textures?.map((t) => ({
      id: t.directus_files_id.id, // fallback if no title
      url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${t.directus_files_id.id}?width=200&height=200`,
    })) || [];

  const searchParams = useSearchParams();
  const tileFromQuery = searchParams.get("tile");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [skew, setSkew] = useState(0);

  const [showRotationSlider, setShowRotationSlider] = useState(false);
  const [showPaintSwatches, setShowPaintSwatches] = useState(false);

  const [baseImageUrl, setBaseImageUrl] = useState<string | null>(null);
  const [floorPoints, setFloorPoints] = useState<
    { x: number; y: number }[] | null
  >(null);
  const [wallPoints, setWallPoints] = useState<
    { x: number; y: number }[] | null
  >(null);
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [wallColor, setWallColor] = useState<string>("transparent");

  // Load from localstorage OR fetch default
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setBaseImageUrl(data.baseImageUrl);
      setFloorPoints(data.floorPoints);
      setWallPoints(data.wallPoints);
      setSelectedTile(data.selectedTile);
      setRotation(data.rotation);
      setScale(data.scale);
      setSkew(data.skew);
      setWallColor(data.wallColor);
      setReady(true);
    } else {
      fetchAndProcessImage(DEFAULT_IMAGE);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!selectedTile && tileFromQuery) {
      setSelectedTile(decodeURIComponent(tileFromQuery));
    } else if (!selectedTile && TILE_OPTIONS.length > 0) {
      setSelectedTile(TILE_OPTIONS[0].url);
    }
  }, [tileFromQuery, TILE_OPTIONS]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selectedTile) {
        const url = new URL(window.location.href);
        url.searchParams.set("tile", encodeURIComponent(selectedTile));
        window.history.replaceState({}, "", url.toString());
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [selectedTile]);

  useEffect(() => {
    if (baseImageUrl && floorPoints && selectedTile && ready) {
      drawScene(baseImageUrl, floorPoints, wallPoints);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          baseImageUrl,
          floorPoints,
          wallPoints,
          selectedTile,
          rotation,
          scale,
          skew,
          wallColor,
        })
      );
    }
  }, [
    rotation,
    scale,
    skew,
    selectedTile,
    wallColor,
    baseImageUrl,
    floorPoints,
    wallPoints,
    ready,
  ]);

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => resolve(img);
    });

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
    });

  const fetchAndProcessImage = async (src: string) => {
    try {
      setLoading(true);

      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = reject;
      });

      let { width, height } = img;
      const maxWidth = 1920;
      const maxHeight = 1080;
      const scaleResize = Math.min(maxWidth / width, maxHeight / height, 1);
      width *= scaleResize;
      height *= scaleResize;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);

      const compressedBlob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => b && resolve(b), "image/jpeg", 0.6)
      );

      const file = new File([compressedBlob], "room.jpg", {
        type: "image/jpeg",
      });
      const base64 = await fileToBase64(file);
      const localUrl = URL.createObjectURL(file);

      const response = await axios.post("/api/roboflow", {
        base64,
      });

      const predictions = response.data.predictions;

      if (!predictions || predictions.length <= 0) {
        toast.error(
          "Failed to process image. Please upload a clear, well-lit photo showing both wall and floor — avoid floor-only photos."
        );
        return;
      }
      const floor = predictions.find((p: any) => p.class === "floor");
      const wall = predictions.find((p: any) => p.class === "wall");

      setBaseImageUrl(localUrl);
      setFloorPoints(floor?.points || null);
      setWallPoints(wall?.points || null);

      setTimeout(() => {
        if (localUrl && floor?.points && selectedTile) {
          drawScene(localUrl, floor.points, wall?.points || null);
          setReady(true);
        }
      }, 100);
    } catch (err) {
      console.error("Image processing failed:", err);

      toast.error("Image processing failed try different image.");
    } finally {
      setLoading(false);
    }
  };

  const drawScene = async (
    baseImgUrl: string,
    floor: { x: number; y: number }[],
    wall: { x: number; y: number }[] | null
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !selectedTile) return;

    const baseImg = await loadImage(baseImgUrl);
    const texture = await loadImage(getTextureUrl(selectedTile));

    const skewRadians = (skew * Math.PI) / 180;
    canvas.width = baseImg.width;
    canvas.height = baseImg.height;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(baseImg, 0, 0);

    if (floor.length > 2) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(floor[0].x, floor[0].y);
      floor.forEach((p, i) => i > 0 && ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.clip();

      const safeScale = Math.max(0.1, scale || 1);
      const patternSize = Math.ceil(200 * safeScale);
      const patternCanvas = document.createElement("canvas");
      const patternCtx = patternCanvas.getContext("2d");

      patternCanvas.width = patternSize;
      patternCanvas.height = patternSize;
      if (patternCtx) {
        patternCtx.drawImage(texture, 0, 0, patternSize, patternSize);
      }

      const pattern = ctx.createPattern(patternCanvas, "repeat");
      if (pattern) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.transform(1, Math.tan(skewRadians), 0, 1, 0, 0);
        ctx.transform(1, 0, 0.4, 1, 0, 0); // perspective
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = pattern;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
      }
      ctx.restore();
    }

    if (wall && wall.length > 2) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(wall[0].x, wall[0].y);
      wall.forEach((p, i) => i > 0 && ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = wallColor;
      ctx.fill();
      ctx.restore();
    }
  };

  return (
    <div className="bg-[#F8FAFB]">
      <PaddingContainer className="py-16">
        <div className=" text-left mb-10 space-y-2">
          <h2 className="text-3xl font-bold">See In My Room</h2>
          <p>Transform your room in real-time by uploading a photo now</p>
          <p>
            Upload a clear, well-lit photo of the entire room, taken
            straight-on, to get the most accurate visualization.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[996px] h-[520px]">
              {ready ? (
                <ReactCompareSlider
                  itemOne={
                    <div className="bg-transparent w-full h-full flex justify-center items-center overflow-hidden">
                      <img
                        src={baseImageUrl ?? "/rooms/bedroom.jpg"}
                        alt="Choose a photo from the sidebar or upload your own to preview textures on your room."
                        className="max-h-full max-w-full object-contain rounded-2xl"
                      />
                    </div>
                  }
                  itemTwo={
                    <div className="bg-transparent w-full h-full flex justify-center items-center overflow-hidden">
                      <canvas
                        ref={canvasRef}
                        width={996}
                        height={520}
                        className="max-h-full max-w-full object-contain rounded-2xl"
                      />
                    </div>
                  }
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <div className="bg-transparent w-full h-full flex justify-center items-center overflow-hidden" />
              )}
              {loading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-30">
                  <div className="flex flex-col items-center space-y-2">
                    <svg
                      className="animate-spin h-10 w-10 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 font-medium">
                      Processing image...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-72 space-y-4">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) fetchAndProcessImage(URL.createObjectURL(file));
              }}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-primary hover:bg-red-50 transition cursor-pointer"
              onClick={() => document.getElementById("hidden-upload")?.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16v-4a4 4 0 014-4h1a4 4 0 014 4v4m-6 4h6M16 12h2m-2 0a2 2 0 012-2m-2 0a2 2 0 00-2-2"
                />
              </svg>
              <p className="text-sm text-center">
                <strong>Click to upload</strong> or drag and drop an image here
                <br />
                <span className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, JPEG, WEBP
                </span>
              </p>

              <input
                type="file"
                accept="image/*"
                id="hidden-upload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) fetchAndProcessImage(URL.createObjectURL(file));
                }}
              />
            </div>

            <div className=" rounded-lg overflow-y-scroll h-[380px] space-y-4 ">
              {ROOM_IMAGES.map((room, i) => (
                <button
                  key={i}
                  className="flex relative items-center gap-2 drop-shadow-md rounded-lg w-full hover:bg-gray-100"
                  onClick={() => fetchAndProcessImage(room.src)}
                >
                  <img
                    src={room.src}
                    alt="room"
                    className="aspect-video object-cover rounded-lg"
                  />
                  <span className="absolute bottom-2  left-1/2 -translate-x-1/2 bg-white text-primary px-3 py-1 rounded-full">
                    {room.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 flex flex-col  gap-6 items-start">
          <div className="flex bg-white p-4 w-full flex-wrap  justify-start gap-3 rounded-xl">
            {TILE_OPTIONS.map((tile, i) => (
              <img
                key={i}
                src={tile.url}
                onClick={() => setSelectedTile(tile.id)}
                className={`w-12 h-12 rounded border cursor-pointer ${
                  selectedTile === tile.id ? "ring-2 ring-red-500" : ""
                }`}
                alt="tile"
              />
            ))}
          </div>

          {showRotationSlider && (
            <div className=" flex md:flex-row flex-col gap-10">
              <div className="flex flex-col items-start w-full max-w-xs mx-auto">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Rotate Floor:{" "}
                  <span className="text-primary">{rotation}°</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary 
                 [&::-webkit-slider-thumb]:appearance-none 
                 [&::-webkit-slider-thumb]:h-4 
                 [&::-webkit-slider-thumb]:w-4 
                 [&::-webkit-slider-thumb]:rounded-full 
                 [&::-webkit-slider-thumb]:bg-primary 
                 [&::-webkit-slider-thumb]:shadow-md 
                 [&::-moz-range-thumb]:h-4 
                 [&::-moz-range-thumb]:w-4 
                 [&::-moz-range-thumb]:rounded-full 
                 [&::-moz-range-thumb]:bg-primary"
                />
              </div>

              <div className="flex flex-col items-start w-full max-w-xs mx-auto">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Tile Size:{" "}
                  <span className="text-primary">{scale.toFixed(1)}×</span>
                </label>
                <input
                  type="range"
                  min={0.2}
                  max={3}
                  step={0.1}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary
     [&::-webkit-slider-thumb]:appearance-none 
     [&::-webkit-slider-thumb]:h-4 
     [&::-webkit-slider-thumb]:w-4 
     [&::-webkit-slider-thumb]:rounded-full 
     [&::-webkit-slider-thumb]:bg-primary 
     [&::-webkit-slider-thumb]:shadow-md 
     [&::-moz-range-thumb]:h-4 
     [&::-moz-range-thumb]:w-4 
     [&::-moz-range-thumb]:rounded-full 
     [&::-moz-range-thumb]:bg-primary"
                />
              </div>
            </div>
          )}

          {showPaintSwatches && (
            <div className="flex flex-wrap justify-center gap-2">
              {/* Invisible / transparent option */}
              <button
                onClick={() => setWallColor("transparent")}
                className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                  wallColor === "transparent" ? "ring-2 ring-red-500" : ""
                }`}
                title="No wall color"
              >
                <FaX />
              </button>

              {/* Colored swatches */}
              {COLOR_SWATCHES.map((color, idx) => (
                <button
                  key={idx}
                  className={`w-8 h-8 rounded-full border ${
                    wallColor === `${color}80` ? "ring-2 ring-red-500" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setWallColor(`${color}80`)}
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="px-4 flex gap-2 items-center  py-2 bg-primary  cursor-pointer text-white rounded-full"
              onClick={() => {
                const canvas = canvasRef.current;
                if (canvas) {
                  const link = document.createElement("a");
                  link.download = "see-in-my-room.png";
                  link.href = canvas.toDataURL("image/png");
                  link.click();
                }
              }}
            >
              <FaCamera /> Snapshot
            </button>

            <button
              className="px-4 flex gap-2 items-center py-2 bg-primary cursor-pointer text-white rounded-full"
              onClick={() => setShowRotationSlider(!showRotationSlider)}
            >
              <FaGear /> Texture Settings
            </button>

            <button
              className="px-4 py-2 flex gap-2 items-center  bg-primary  cursor-pointer text-white rounded-full"
              onClick={() => setShowPaintSwatches(!showPaintSwatches)}
            >
              <FaPaintBrush /> Paint
            </button>

            {/* <div className="flex flex-col items-center">
            <label>Skew ({skew.toFixed(1)}°)</label>
            <input
              type="range"
              min={-45}
              max={45}
              step={1}
              value={skew}
              onChange={(e) => setSkew(Number(e.target.value))}
            />
          </div> */}

            {/* <button
            className="px-4 py-2 bg-gray-700 text-white rounded"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button> */}
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default SeeInRoomSegmented;
