import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { materielReservation } = await request.json();
    console.log(materielReservation);

    const createdAttribution = await prisma.attributionPonctuelle.createMany({
      data: materielReservation,
    });
    return NextResponse.json({ createdAttribution });
  } catch (err) {
    console.error("Error creating materiel:", err);
    return NextResponse.error("Failed to create materiel");
  }
}
