import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { type, modele, materiels } = await request.json();
    if (!type || !modele || !materiels) {
      return NextResponse.error("Error json format");
    }
    const createdSpecsWithMateriel = await prisma.specification.create({
      data: {
        type,
        modele,
        materiels: { create: materiels },
      },
    });
    return NextResponse.json({ createdSpecsWithMateriel });
  } catch (err) {
    return NextResponse.json({ message: "fail" });
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
