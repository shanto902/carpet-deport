// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { clearAllPlaceCaches } from "@/lib/placeCache";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  // auth check
  if (!token || token !== process.env.ACCESS_TOKEN) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  // clear all manual place caches
  await clearAllPlaceCaches();

  // revalidate any paths that depend on this data
  revalidatePath("/", "layout");
  // you can add more if needed
  // revalidatePath("/hotels");
  // revalidatePath("/map");

  return NextResponse.json({
    revalidated: true,
    scope: "all-places",
    now: Date.now(),
  });
}
