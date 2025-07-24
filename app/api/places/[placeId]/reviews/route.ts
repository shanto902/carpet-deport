// /app/api/places/[placeId]/reviews/route.ts
import { NextRequest } from "next/server";
import axios from "axios";
import fs from "fs/promises";
import path from "path";

const API_KEY = process.env.SSR_GOOGLE_MAPS_API_KEY!;
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day

interface ApiProps {
  params: Promise<{
    placeId: string;
  }>;
}

const getCachePath = (placeId: string) =>
  path.resolve(`./.cache/place-${placeId}.json`);

export async function GET(req: NextRequest, { params }: ApiProps) {
  const { placeId } = await params;
  const cachePath = getCachePath(placeId);

  try {
    const cached = await fs.readFile(cachePath, "utf-8");
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp < CACHE_DURATION_MS) {
      return new Response(JSON.stringify(data), { status: 200 });
    }
  } catch {
    // no cache or read error, fallback to API call
  }

  // fetch from Google API
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json`,
    {
      params: {
        place_id: placeId,
        fields:
          "name,rating,reviews,opening_hours/weekday_text,opening_hours/periods",
        key: API_KEY,
      },
    }
  );

  const data = {
    name: response.data.result.name,
    rating: response.data.result.rating,
    reviews: response.data.result.reviews || [],
    opening_hours: response.data.result.opening_hours || null,
  };

  // save to cache
  await fs.mkdir(path.dirname(cachePath), { recursive: true });
  await fs.writeFile(
    cachePath,
    JSON.stringify({ data, timestamp: Date.now() }),
    "utf-8"
  );

  return new Response(JSON.stringify(data), { status: 200 });
}
