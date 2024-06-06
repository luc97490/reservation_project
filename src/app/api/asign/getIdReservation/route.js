import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  const { id } = await request.json();

  try {
    const reservations = await prisma.attributionPonctuelle.findMany({
      include: { materiel: true },
      where: {
        id,
      },
    });
    return NextResponse.json({ reservations });
  } catch (err) {
    console.error("Error fetching reservations:", err);
    return NextResponse.error("Failed to fetch reservations");
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
