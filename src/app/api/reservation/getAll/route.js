import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET() {
  const { userId } = auth();
  if (userId)
    try {
      const reservations = await prisma.reservationPonctuelle.findMany({
        include: { user: true },
        where: {
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
      });
      return NextResponse.json({ reservations });
    } catch (err) {
      console.error("Error fetching reservations:", err);
      return NextResponse.error("Failed to fetch reservations");
    }
}
