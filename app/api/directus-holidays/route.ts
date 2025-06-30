/* eslint-disable @typescript-eslint/no-unused-vars */
// /app/api/directus-holidays/route.ts
import { NextRequest } from "next/server";
import { readItems } from "@directus/sdk";
import directus from "@/lib/directus";

export async function GET(req: NextRequest) {
  try {
    const data = await directus.request(
      readItems("holidays", {
        fields: ["name", "date", "status"],
        sort: ["date"],
      })
    );

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch holidays from Directus:", error);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
