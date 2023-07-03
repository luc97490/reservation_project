import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { reservationId, materielId } = await request.json();
    if (!reservationId || !materielId)
      return NextResponse.error("Invalid request");

    const createdAttribution = await prisma.attributionPonctuelle.create({
      data: {
        reservationId,
        materielId,
      },
    });
    return NextResponse.json({ createdAttribution });
  } catch (err) {
    console.error("Error creating materiel:", err);
    return NextResponse.error("Failed to create materiel");
  }
}
