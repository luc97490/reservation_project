import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const { userId } = auth();
  if (userId)
    try {
      const specs = await prisma.specification.findMany({
        include: {
          materiels: true,
          _count: {
            select: { materiels: true },
          },
        },
      });
      return NextResponse.json({ specs });
    } catch (err) {
      console.error("Error fetching specs:", err);
      return NextResponse.error("Failed to fetch specs");
    }
  return new NextResponse("Unauthorized", { status: 401 });
}
