import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const permanente = await prisma.attributionPermanente.findMany();
    return NextResponse.json({ permanente });
  } catch (err) {
    console.error("Error fetching permanente:", err);
    return NextResponse.error("Failed to fetch permanente");
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
