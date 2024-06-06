import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { id } = await request.json();
    const reservations = await prisma.reservationPonctuelle.findMany({
      include: {
        user: true,
        attribution: true,
        attribution: { include: { materiel: true } },
      },

      where: {
        user: { id },
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
