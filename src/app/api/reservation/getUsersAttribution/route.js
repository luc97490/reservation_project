import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET() {
  const { userId } = auth();
  if (userId)
    try {
      const reservations = await prisma.reservationPonctuelle.findMany({
        include: {
          user: true,
          attribution: true,
          attribution: { include: { materiel: true } },
        },

        where: {
          user: { idclerk: userId },
          attribution: {
            some: { rendu: false },
          },
        },
      });
      return NextResponse.json({ reservations });
    } catch (err) {
      console.error("Error fetching reservations:", err);
      return NextResponse.error("Failed to fetch reservations");
    }
  return new NextResponse("Unauthorized", { status: 401 });
}
