import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const specs = await prisma.specification.findMany();
    return NextResponse.json({ specs });
  } catch (err) {
    console.error("Error fetching specs:", err);
    return NextResponse.error("Failed to fetch specs");
  }
}