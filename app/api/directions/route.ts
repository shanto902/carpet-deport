import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { origin, destination } = await req.json();

    const params = new URLSearchParams({
      origin: `${origin.lat},${origin.lng}`,
      destination: `${destination.lat},${destination.lng}`,
      mode: "driving",
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?${params}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: data.error_message || data.status },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Directions API error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
