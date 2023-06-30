import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const materiels = await prisma.materiel.findMany();
    return NextResponse.json({ materiels });
  } catch (err) {
    console.error("Error fetching materiels:", err);
    return NextResponse.error("Failed to fetch materiels");
  }
}

export async function POST(request) {
  try {
    const { nom, specsId } = await request.json();
    if (!nom || !specsId) {
      console.log(nom + specsId);
      const createdMateriel = await prisma.materiel.create({
        data: {
          nom: nom,
          specs: { connect: { id: specsId } },
        },
      });
      return NextResponse.json({ createdMateriel });
    }
    return NextResponse.error("Error json format");
  } catch (err) {
    console.error("Error creating materiel:", err);
    return NextResponse.error("Failed to create materiel");
  }
}

export async function PUT(request) {
  try {
    const { id, nom, disponibilite, specsId } = await request.json();

    const updatedMateriel = await prisma.materiel.update({
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

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await prisma.materiel.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Materiel deleted successfully" });
  } catch (err) {
    console.error("Error deleting materiel:", err);
    return NextResponse.error("Failed to delete materiel", { status: 500 });
  }
}
