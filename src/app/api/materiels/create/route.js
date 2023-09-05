import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
export async function POST(request) {
  const { userId } = auth();
  if (userId)
    try {
      const { nom, etat, specsId } = await request.json();
      if (!nom || !specsId) {
        return NextResponse.error("Invalid request");
      }
      const createdMateriel = await prisma.materiel.create({
        data: {
          nom,
          etat,
          specs: { connect: { id: specsId } },
        },
      });
      return NextResponse.json({ createdMateriel });
    } catch (err) {
      console.error("Error creating materiel:", err);
      return NextResponse.error("Failed to create materiel");
    }
  return new NextResponse("Unauthorized", { status: 401 });
}
