"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const ROBOFLOW_PROJECT = "wall-floor-inylg-rc21q";
const ROBOFLOW_VERSION = "2";
const ROBOFLOW_API_KEY = "VL1oLunXvkJfYp4ZdPWb";

const SeeInRoomSegmented = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [baseImageUrl, setBaseImageUrl] = useState<string | null>(null);
  const [floorPoints, setFloorPoints] = useState<
    { x: number; y: number }[] | null
  >(null);
  const [wallPoints, setWallPoints] = useState<
    { x: number; y: number }[] | null
  >(null);

  useEffect(() => {
    if (baseImageUrl && floorPoints) {
      drawScene(baseImageUrl, floorPoints, wallPoints);
    }
  }, [rotation, scale, baseImageUrl, floorPoints, wallPoints]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => resolve(img);
    });
  };

  const drawScene = async (
    baseImgUrl: string,
    floor: { x: number; y: number }[],
    wall: { x: number; y: number }[] | null
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const baseImg = await loadImage(baseImgUrl);
    const texture = await loadImage("/textures/2.jpg");

    canvas.width = baseImg.width;
    canvas.height = baseImg.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImg, 0, 0);

    // 🧶 Draw floor texture
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(floor[0].x, floor[0].y);
    for (let i = 1; i < floor.length; i++) {
      ctx.lineTo(floor[i].x, floor[i].y);
    }
    ctx.closePath();
    ctx.clip();

    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d");
    const patternSize = 200 * scale;
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    patternCtx?.drawImage(texture, 0, 0, patternSize, patternSize);

    const pattern = ctx.createPattern(patternCanvas, "repeat");
    if (pattern) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = pattern;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    ctx.restore();

    // 🧱 Draw wall overlay
    if (wall && wall.length > 2) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(wall[0].x, wall[0].y);
      for (let i = 1; i < wall.length; i++) {
        ctx.lineTo(wall[i].x, wall[i].y);
      }
      ctx.closePath();
      ctx.clip();

      ctx.fillStyle = "rgba(255, 200, 0, 0.3)";
      ctx.fill();
      ctx.restore();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const base64 = await fileToBase64(file);
    const localUrl = URL.createObjectURL(file);

    try {
      const res = await axios.post(
        `https://detect.roboflow.com/${ROBOFLOW_PROJECT}/${ROBOFLOW_VERSION}`,
        base64,
        {
          params: { api_key: ROBOFLOW_API_KEY },
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const predictions = res.data.predictions;
      const floor = predictions.find(
        (p: any) => p.class === "floor" && p.points
      );
      const wall = predictions.find((p: any) => p.class === "wall" && p.points);

      if (!floor) {
        alert("Floor not found");
        return;
      }

      setBaseImageUrl(localUrl);
      setFloorPoints(floor.points);
      setWallPoints(wall?.points ?? null);
    } catch (error) {
      console.error("Segmentation error:", error);
      alert("Error processing the image. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 text-center space-y-6">
      <h2 className="text-2xl font-bold">See In My Room (Floor + Wall)</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />

      {loading && <p className="text-gray-600">Processing image...</p>}

      <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
        <label className="flex flex-col items-center">
          <span className="mb-1 font-medium">Tile Rotation ({rotation}°)</span>
          <input
            type="range"
            min={0}
            max={360}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
          />
        </label>

        <label className="flex flex-col items-center">
          <span className="mb-1 font-medium">
            Tile Scale ({scale.toFixed(1)}×)
          </span>
          <input
            type="range"
            min={0.2}
            max={3}
            step={0.1}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </label>
      </div>

      <canvas ref={canvasRef} className="border w-full max-w-4xl mx-auto" />
    </div>
  );
};

export default SeeInRoomSegmented;
