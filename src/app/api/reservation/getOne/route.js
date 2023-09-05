import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
  const { id } = await request.json();
  const { userId } = auth();
  if (userId)
    try {
      const reservations = await prisma.reservationPonctuelle.findUnique({
        where: {
          id,
        },
        include: { user: true },
      });
      return NextResponse.json({ reservations });
    } catch (err) {
      // console.error("Error fetching reservations:", err);
      return NextResponse.error("Failed to fetch reservations");
    }
  return new NextResponse("Unauthorized", { status: 401 });
}
