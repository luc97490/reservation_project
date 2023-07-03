import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(request) {
  try {
    const { id, materielId, rendu } = await request.json();
    if (!id || !materielId) return NextResponse.error("Invalid request");
    const updatedAttribution = await prisma.attributionPonctuelle.update({
      where: { id },
      data: {
        materielId,
        rendu,
      },
    });

    return NextResponse.json({ updatedAttribution });
  } catch (err) {
    console.error("Error updating Ponctuelle:", err);
    return NextResponse.error("Failed to update Ponctuelle");
  }
}
