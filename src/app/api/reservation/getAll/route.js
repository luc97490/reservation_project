import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const reservations = await prisma.reservationPonctuelle.findMany({
      include: { user: true },
    });
    return NextResponse.json({ reservations });
  } catch (err) {
    console.error("Error fetching reservations:", err);
    return NextResponse.error("Failed to fetch reservations");
  }
}
