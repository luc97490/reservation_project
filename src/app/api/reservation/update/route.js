import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(request) {
  try {
    const { id, objet, lieu, debut, fin, materiels, commentaire } =
      await request.json();

    const updatedReservation = await prisma.reservationPonctuelle.update({
      where: { id },
      data: {
        objet,
        lieu,
        debut: new Date(debut),
        fin: new Date(fin),
        materiels,
        commentaire,
      },
    });

    return NextResponse.json({ updatedReservation });
  } catch (err) {
    console.error("Error updating reservation:", err);
    return NextResponse.error("Failed to update reservation");
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
