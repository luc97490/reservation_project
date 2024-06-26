import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { idclerk } = await request.json();
    if (!idclerk) {
      return NextResponse.error("Invalid request");
    }
    const userfind = await prisma.user.findUnique({
      where: {
        idclerk,
      },
    });
    return NextResponse.json({ userfind });
  } catch (err) {
    console.error("Error creating specs:", err);
    return NextResponse.error("Failed to create specs");
  }
}
