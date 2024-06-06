import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { id } = await request.json();

    await prisma.materiel.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Materiel deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: "error" });
  }
}
