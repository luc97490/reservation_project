import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, image, password } = await request.json();

    // Validation des données d'entrée

    const emailExists = await prisma.user.findUnique({
      where: { email },
    });
    let userfind;

    let role = "User";

    // Vérification d'un utilisateur super administrateur
    if (email === process.env.SUPER_ADMIN) {
      role = "SuperAdmin";
    }
    if (emailExists) {
      userfind = await prisma.user.update({
        where: { email },
        data: {
          image,
          email: email,
          code: password,
          role: role,
        },
      });
    } else {
      userfind = await prisma.user.create({
        data: {
          image,
          email: email,
          code: password,
          role: role,
        },
      });
    }
    // Création sécurisée de l'utilisateur

    return NextResponse.json({ userfind });
  } catch (err) {
    console.error(err);
    return NextResponse.error("Internal server error");
  }
}
