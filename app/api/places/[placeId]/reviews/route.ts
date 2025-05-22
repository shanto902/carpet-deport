// /app/api/places/[placeId]/reviews/route.ts
import { NextRequest } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
interface ApiProps {
  params: Promise<{
    placeId: string;
  }>;
}

export async function GET(req: NextRequest, { params }: ApiProps) {
  const { placeId } = await params;

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

  const data = response.data.result;

  return new Response(
    JSON.stringify({
      name: data.name,
      rating: data.rating,
      reviews: data.reviews || [],
      opening_hours: data.opening_hours || null,
    }),
    { status: 200 }
  );
}
