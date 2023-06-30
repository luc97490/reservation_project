import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { id, email } = await request.json();

    // Validation des données d'entrée
    if (!id || !email) {
      return NextResponse.error("Invalid request");
    }

    const userExists = await prisma.user.findFirst({
      where: { id: id },
      take: 1,
    });

    if (!userExists) {
      let role = "User";

      // Vérification d'un utilisateur super administrateur
      if (email === process.env.SUPER_ADMIN) {
        role = "SuperAdmin";
      }

      // Création sécurisée de l'utilisateur
      const result = await prisma.user.create({
        data: {
          id: id,
          email: email,
          role: role,
        },
      });

      return NextResponse.json({ result });
    }

    return NextResponse.error("User already exists");
  } catch (err) {
    console.error(err);
    return NextResponse.error("Internal server error");
  }
}
