import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const reservations = await prisma.reservationPonctuelle.findMany({
      include: { user: true },
      where: {
        NOT: {
          attribution: { some: {
            // Vous pouvez utiliser des filtres ici pour les attributions si nécessaire
            // Par exemple, pour filtrer les réservations attribuées à un certain matériel
            // materielId: "ID_DU_MATERIEL",
          },},
        },
      },
    });
    return NextResponse.json({ reservations });
  } catch (err) {
    console.error("Error fetching reservations:", err);
    return NextResponse.error(new Error("Failed to fetch reservations"));
  }
}
