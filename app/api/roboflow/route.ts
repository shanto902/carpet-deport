import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { base64 } = await req.json();

    const response = await fetch(
      `https://detect.roboflow.com/${process.env.ROBOFLOW_PROJECT}/${process.env.ROBOFLOW_VERSION}?api_key=${process.env.ROBOFLOW_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: base64,
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Roboflow API error:", error);
    return new NextResponse("Failed to process image", { status: 500 });
  }
}
