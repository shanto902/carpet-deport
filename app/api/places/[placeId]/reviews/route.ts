// app/api/places/[placeId]/reviews/route.ts
import { NextRequest } from "next/server";
import axios from "axios";
import { readPlaceCache, writePlaceCache } from "@/lib/placeCache";

const API_KEY = process.env.SSR_GOOGLE_MAPS_API_KEY!;
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ placeId: string }> }
) {
  // in your Next version params is a Promise
  const { placeId } = await params;

  // try cache first
  try {
    const { data, timestamp } = await readPlaceCache(placeId);
    if (Date.now() - timestamp < CACHE_DURATION_MS) {
      return new Response(JSON.stringify(data), { status: 200 });
    }
  } catch {
    // no cache or error. fall through to API call
  }

  // fetch from Google Places API
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/place/details/json",
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

  await writePlaceCache(placeId, data);

  return new Response(JSON.stringify(data), { status: 200 });
}
