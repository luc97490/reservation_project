import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { type } = await request.json();

    const materiels = await prisma.materiel.findMany({
      where: { specs: { type } },
      include: { specs: true },
    });
    return NextResponse.json({ materiels });
  } catch (err) {
    console.error("Error fetching materiels:", err);
    return NextResponse.error("Failed to fetch materiels");
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
