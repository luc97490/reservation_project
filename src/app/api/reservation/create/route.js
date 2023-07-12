import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { objet, lieu, debut, fin, commentaire, materiels, userId } =
      await request.json();
    if (!objet || !lieu || !debut || !fin || !userId) {
      return NextResponse.error("Invalid request");
    }
    const createdReservation = await prisma.reservationPonctuelle.create({
      data: {
        objet,
        lieu,
        debut: new Date(debut),
        fin: new Date(fin),
        commentaire,
        materiels,
        userId,
      },
    });
    return NextResponse.json({ createdReservation });
  } catch (err) {
    console.error("Error creating specs:", err);
    return NextResponse.error("Failed to create specs");
  }
}
