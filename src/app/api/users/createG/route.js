import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validation des données d'entrée
    if (!email) {
      return NextResponse.error("Invalid request");
    }
    const userExists = await prisma.user.findFirst({
      where: { email },
      take: 1,
    });
    if (!userExists) {
      const user = await prisma.user.create({
        data: {
          email: email,
        },
      });

      return NextResponse.json({ user });
    }

    return NextResponse.error("User already exists");
  } catch (err) {
    console.error(err);
    return NextResponse.error("Internal server error");
  }
}
