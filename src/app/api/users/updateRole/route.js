import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const { id, role } = await request.json();
    // Valider les données de la requête
    if (!id || !role) {
      return NextResponse.error("Need user id and role ");
    }

    const user = await prisma.user.findFirst({ where: { id }, take: 1 });

    if (!user) {
      return NextResponse.error("User not find.");
    }

    // Mettre à jour le rôle de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.error("Error Update :", error);
    return NextResponse.error("Error Update.");
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
