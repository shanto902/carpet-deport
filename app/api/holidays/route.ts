import { NextRequest } from "next/server";
import { syncHolidays } from "@/lib/syncHolidays";

export async function GET(req: NextRequest) {
  try {
    const success = await syncHolidays();

    if (success) {
      return new Response(JSON.stringify({ message: "Holidays synced" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "Failed to fetch holidays" }), {
        status: 500,
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
