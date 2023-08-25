import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validation des données d'entrée
    if (!email) {
      return NextResponse.error("Invalid request");
    }
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (!userExists) {
      await prisma.user.create({
        data: {
          email: email,
        },
      });

      return NextResponse.json({ message: "User created" });
    }
    return NextResponse.json({ message: "User exist" });
  } catch (err) {
    console.error(err);
    return NextResponse.error("Internal server error");
  }
}
