import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  const { userId } = auth();
  if (userId)
    try {
      const { userId, preparateur, materielId } = await request.json();
      if (!preparateur || !materielId || !userId) {
        return NextResponse.error("Invalid request");
      }
      const createdReservation = await prisma.attributionPermanente.create({
        data: {
          preparateur,
          materielId,
          userId,
        },
      });
      return NextResponse.json({ createdReservation });
    } catch (err) {
      console.error("Error creating specs:", err);
      return NextResponse.error("Failed to create specs");
    }
  return new NextResponse("Unauthorized", { status: 401 });
}
