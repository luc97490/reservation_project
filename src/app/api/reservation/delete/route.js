import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await prisma.reservationPonctuelle.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    console.error("Error deleting Reservation:", err);
    return NextResponse.error("Failed to delete Reservation");
  }
}
