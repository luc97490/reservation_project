import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(request) {
  try {
    const { id, nom, disponibilite, specsId } = await request.json();

    const updatedMateriel = await prisma.materiesl.update({
      where: { id },
      data: {
        nom,
        disponibilite,
        specsId,
      },
    });

    return NextResponse.json({ updatedMateriel });
  } catch (err) {
    console.error("Error updating materiel:", err);
    return NextResponse.error("Failed to update materiel", { status: 500 });
  }
}
