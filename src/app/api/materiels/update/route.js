import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
export async function PUT(request) {
  const { userId } = auth();
  if (userId)
    try {
      const { id, nom, etat, specsId } = await request.json();
      if (!nom || !specsId) {
        const updatedMateriel = await prisma.materiel.update({
          where: { id },
          data: {
            etat,
          },
        });
        return NextResponse.json({ updatedMateriel });
      } else {
        const updatedMateriel = await prisma.materiel.update({
          where: { id },
          data: {
            nom,
            etat,
            specsId,
          },
        });
        return NextResponse.json({ updatedMateriel });
      }

      return NextResponse.json({ updatedMateriel });
    } catch (err) {
      console.error("Error updating materiel:", err);
      return NextResponse.error("Failed to update materiel", { status: 500 });
    }
  return new NextResponse("Unauthorized", { status: 401 });
}
