import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await prisma.attributionPermanente.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Permanente deleted successfully" });
  } catch (err) {
    console.error("Error deleting Attribution:", err);
    return NextResponse.error("Failed to delete Permanente");
  }
}
