// ./app/api/clear/route.ts
import { clearTable } from "@/lib/queries";
import { NextResponse } from "next/server";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const resp = await clearTable();

  return NextResponse.json({ success: true }, { status: 200 });
}
