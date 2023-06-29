import prisma from "../../../lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request) {
  const { id, email } = await request.json();
  const role = "User";
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
