import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  console.log(request);
  try {
    const { id } = await request.json();

    await prisma.specification.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "specification deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: "fail" });
  }
}
