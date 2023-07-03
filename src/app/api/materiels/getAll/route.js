import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const materiels = await prisma.materiel.findMany();
    return NextResponse.json({ materiels });
  } catch (err) {
    console.error("Error fetching materiels:", err);
    return NextResponse.error("Failed to fetch materiels");
  }
}
