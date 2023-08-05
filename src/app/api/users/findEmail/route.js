import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.error("Invalid request");
    }
    const userfind = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return NextResponse.json({ userfind });
  } catch (err) {
    console.error("Error creating specs:", err);
    return NextResponse.error("Failed to create specs");
  }
}
