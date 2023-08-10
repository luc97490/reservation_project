import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { id } = await request.json();

    await prisma.attributionPermanente.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    console.error("Error deleting Reservation:", err);
    return NextResponse.error("Failed to delete Reservation");
  }
}
