import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(request) {
  const { userId } = auth();
  if (userId)
    try {
      const { id, type, modele } = await request.json();
      const updatedSpecs = await prisma.specification.update({
        where: { id },
        data: {
          type: type,
          modele: modele,
        },
      });

      return NextResponse.json({ updatedSpecs });
    } catch (err) {
      console.error("Error updating specs:", err);
      return NextResponse.error("Failed to update specs");
    }
  return new NextResponse("Unauthorized", { status: 401 });
}
