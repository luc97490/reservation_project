import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, email } = await request.json();
  let role = "User";
  if (email === process.env.SUPER_ADMIN) {
    role = "SuperAdmin";
  }
  const result = await prisma.user.create({
    data: {
      id: id,
      email: email,
      role: role,
    },
  });
  return NextResponse.json({ result });
}
