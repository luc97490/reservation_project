import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function PUT(request) {
  try {
    const { id, materielId, dateAsign, preparateur } = await request.json();

    const updated = await prisma.attributionPermanente.update({
      where: { id },
      data: {
        materielId,
        dateAsign: new Date(dateAsign),
        preparateur,
      },
    });

    return NextResponse.json({ updated });
  } catch (err) {
    console.error("Error updating :", err);
    return NextResponse.error("Failed to update ");
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
