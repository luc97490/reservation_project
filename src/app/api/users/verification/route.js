import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const { email, code } = await request.json();
    const objetmail = `${code} est le code de vérification`;
    const contentMail = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Réservation MIO</title>
      </head>
    
      <body>
        <div
          style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto"
        >
          <h1 style="text-align: center">Réservation MIO</h1>
          <p style="text-align: center; font-size: 18px">Vérification code</p>
          <p style="text-align: center; font-size: 16px">
            Entrer le code de vérification dans l'application:
          </p>
          <p style="text-align: center; font-size: 32px; font-weight: bold">
           ${code}
          </p>
          <p style="text-align: center; font-size: 14px">
            Pour protéger ton compte ne partage pas de code.
          </p>
        </div>
      </body>
    </html>`;

    if (!email) {
      return NextResponse.error("Invalid request");
    }
    const userfind = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (await userfind) {
      if (userfind.role === "Guest") {
        sendEmail({
          to: email,
          subject: objetmail,
          html: contentMail,
        });
        return NextResponse.json({ status: "send" });
      } else {
        return NextResponse.json({ status: "existe" });
      }
    } else {
      sendEmail({
        to: email,
        subject: objetmail,
        html: contentMail,
      });
      return NextResponse.json({ status: "send" });
    }
  } catch (err) {
    console.error("Error creating specs:", err);
    return NextResponse.error("Failed to create specs");
  }
}
