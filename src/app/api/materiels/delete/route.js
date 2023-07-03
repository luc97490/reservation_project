import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await prisma.materiels.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Materiel deleted successfully" });
  } catch (err) {
    console.error("Error deleting materiel:", err);
    return NextResponse.error("Failed to delete materiel");
  }
}
