import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { id, image, email } = await request.json();

    // Validation des données d'entrée
    if (!id || !email) {
      return NextResponse.error("Invalid request");
    }

    const userExists = await prisma.user.findUnique({
      where: { idclerk: id },
    });
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      let role = "User";

      // Vérification d'un utilisateur super administrateur
      if (email === process.env.SUPER_ADMIN) {
        role = "SuperAdmin";
      }
      if (emailExists) {
        await prisma.user.update({
          where: { email },
          data: {
            idclerk: id,
            image: image,
            email: email,
            role: role,
          },
        });
      } else {
        await prisma.user.create({
          data: {
            idclerk: id,
            image: image,
            email: email,
            role: role,
          },
        });
      }
      // Création sécurisée de l'utilisateur

      return NextResponse.json({});
    }

    return NextResponse.error("User already exists");
  } catch (err) {
    console.error(err);
    return NextResponse.error("Internal server error");
  }
}
