import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { materielId, preparateur, userId } = await request.json();
    if (!materielId || !materielId || !userId)
      return NextResponse.error("Invalid request");

    const createdPermanente = await prisma.attributionPermanente.create({
      data: {
        materielId,
        preparateur,
        userId,
      },
    });
    return NextResponse.json({ createdPermanente });
  } catch (err) {
    console.error("Error creating Permanente:", err);
    return NextResponse.error("Failed to create Permanente");
  }
}
