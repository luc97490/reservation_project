import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { type } = await request.json();

    const specs = await prisma.specification.findMany({
      where: { type },
    });
    return NextResponse.json({ specs });
  } catch (err) {
    console.error("Error fetching specs:", err);
    return NextResponse.error("Failed to fetch specs");
  }
}
