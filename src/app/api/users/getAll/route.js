import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET() {
  const { userId } = auth();
  if (userId) {
    try {
      const users = await prisma.user.findMany();
      return NextResponse.json({ users });
    } catch (err) {
      console.error("Error fetching specs:", err);
      return NextResponse.error("Failed to fetch specs");
    }
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
