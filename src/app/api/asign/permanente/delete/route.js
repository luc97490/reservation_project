import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(request) {
  const { userId } = auth();
  if (userId)
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
  return new NextResponse("Unauthorized", { status: 401 });
}
