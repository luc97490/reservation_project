import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(request) {
  try {
    const { id, rendu, remarque } = await request.json();

    const updatedAttribution = await prisma.attributionPonctuelle.update({
      where: { id },
      data: {
        rendu,
        remarque,
      },
    });

    return NextResponse.json({ updatedAttribution });
  } catch (err) {
    console.error("Error updating Ponctuelle:", err);
    return NextResponse.error("Failed to update Ponctuelle");
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
