import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(request) {
  try {
    const { id, nom, etat, specsId } = await request.json();

    const updatedMateriel = await prisma.materiel.update({
      where: { id },
      data: {
        nom,
        etat,
        specsId,
      },
    });

    return NextResponse.json({ updatedMateriel });
  } catch (err) {
    console.error("Error updating materiel:", err);
    return NextResponse.error("Failed to update materiel", { status: 500 });
  }
}
