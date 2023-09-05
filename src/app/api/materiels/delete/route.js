import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
export async function POST(request) {
  const { userId } = auth();
  if (userId)
    try {
      const { id } = await request.json();

      await prisma.materiel.delete({
        where: { id },
      });

      return NextResponse.json({ message: "Materiel deleted successfully" });
    } catch (err) {
      console.error("Error deleting materiel:", err);
      return NextResponse.error("Failed to delete materiel");
    }
  return new NextResponse("Unauthorized", { status: 401 });
}
