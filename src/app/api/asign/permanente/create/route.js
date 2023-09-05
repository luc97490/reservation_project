import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
  const { userId } = auth();
  if (userId)
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
  return new NextResponse("Unauthorized", { status: 401 });
}
