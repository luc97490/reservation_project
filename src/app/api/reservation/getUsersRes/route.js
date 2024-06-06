import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { id } = await request.json();
    const reservations = await prisma.reservationPonctuelle.findMany({
      where: {
        user: { id },
        NOT: {
          attribution: {
            some: {
              // Vous pouvez utiliser des filtres ici pour les attributions si nécessaire
              // Par exemple, pour filtrer les réservations attribuées à un certain matériel
              // materielId: "ID_DU_MATERIEL",
            },
          },
        },
      },
      include: { user: true },
    });
    return NextResponse.json({ reservations });
  } catch (err) {
    // console.error("Error fetching reservations:", err);
    return NextResponse.error("Failed to fetch reservations");
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
