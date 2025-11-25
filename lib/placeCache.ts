/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/placeCache.ts
import path from "path";
import fs from "fs/promises";

const CACHE_DIR = path.resolve("./.cache");

export function getPlaceCachePath(placeId: string) {
  return path.join(CACHE_DIR, `place-${placeId}.json`);
}

export async function readPlaceCache(placeId: string) {
  const cachePath = getPlaceCachePath(placeId);
  const content = await fs.readFile(cachePath, "utf-8");
  return { ...JSON.parse(content), cachePath };
}

export async function writePlaceCache(placeId: string, data: any) {
  const cachePath = getPlaceCachePath(placeId);
  await fs.mkdir(path.dirname(cachePath), { recursive: true });
  await fs.writeFile(
    cachePath,
    JSON.stringify({ data, timestamp: Date.now() }),
    "utf-8"
  );
}

export async function clearAllPlaceCaches() {
  try {
    const files = await fs.readdir(CACHE_DIR);

    await Promise.all(
      files
        .filter((file) => file.startsWith("place-") && file.endsWith(".json"))
        .map((file) => fs.unlink(path.join(CACHE_DIR, file)))
    );
  } catch {
    // directory might not exist. ignore
  }
}
