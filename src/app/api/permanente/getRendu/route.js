import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const attribution = await prisma.attributionPermanente.findMany({
      include: { user: true, materiel: true },
      where: {
        rendu: true,
      },
    });
    return NextResponse.json({ attribution });
  } catch (err) {
    console.error("Error fetching attribution:", err);
    return NextResponse.error("Failed to fetch attribution");
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
