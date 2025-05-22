/* eslint-disable @typescript-eslint/no-unused-vars */
// /app/api/holidays/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const year = new Date().getFullYear();
  const res = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/US`
  );
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
