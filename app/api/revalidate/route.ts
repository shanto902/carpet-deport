// /app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getCachePath } from "../places/[placeId]/reviews/route";

// optional helper to clear all place caches
async function clearAllPlaceCaches() {
  const cacheDir = path.resolve("./.cache");

  try {
    const files = await fs.readdir(cacheDir);
    await Promise.all(
      files
        .filter((file) => file.startsWith("place-") && file.endsWith(".json"))
        .map((file) => fs.unlink(path.join(cacheDir, file)))
    );
  } catch {
    // directory may not exist etc. ignore
  }
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const placeId = request.nextUrl.searchParams.get("placeId");

  // auth check
  if (!token || token !== process.env.ACCESS_TOKEN) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  // invalidate manual cache
  if (placeId) {
    const cachePath = getCachePath(placeId);
    try {
      await fs.unlink(cachePath);
    } catch {
      // file may not exist. ignore
    }
  } else {
    // if no placeId is provided, clear all place caches
    await clearAllPlaceCaches();
  }

  // invalidate Next.js cache for UI
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    placeId: placeId ?? "all",
    now: Date.now(),
  });
}
