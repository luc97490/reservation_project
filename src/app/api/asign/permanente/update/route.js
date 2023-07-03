import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(request) {
  try {
    const { id, materielId, rendu, preparateur } = await request.json();
    if (!id || !materielId || !preparateur)
      return NextResponse.error("Invalid request");
    const updatedAttribution = await prisma.attributionPermanente.update({
      where: { id },
      data: {
        materielId,
        rendu,
        preparateur,
      },
    });

    return NextResponse.json({ updatedAttribution });
  } catch (err) {
    console.error("Error updating Permanente:", err);
    return NextResponse.error("Failed to update Permanente");
  }
}
