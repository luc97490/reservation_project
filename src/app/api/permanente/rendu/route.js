import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function PUT(request) {
  try {
    const { id, observation } = await request.json();

    const updated = await prisma.attributionPermanente.update({
      where: { id },
      data: {
        rendu: true,
        observation,
      },
    });

    return NextResponse.json({ updated });
  } catch (err) {
    console.error("Error updating :", err);
    return NextResponse.error("Failed to update ");
  }
}
