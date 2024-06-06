import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.error("Invalid request");
    }
    const userfind = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (await userfind) {
      if (userfind.code === password) {
        return NextResponse.json({
          status: "ok",
          id: userfind.id,
          email: userfind.email,
          role: userfind.role,
          image: userfind.image,
        });
      } else {
        return NextResponse.json({ status: "error" });
      }
    } else {
      return NextResponse.json({ status: "error" });
    }
  } catch (err) {
    console.error("Error creating specs:", err);
    return NextResponse.error("Failed to create specs");
  }
}
