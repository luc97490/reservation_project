import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const { email } = await request.json();

    const objetmail = `Reservation MIO - Votre mot de passe`;

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
        return NextResponse.json({ status: "guest" });
      } else {
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
          <p style="text-align: center; font-size: 18px">Votre mot de passe</p>
          <p style="text-align: center; font-size: 32px; font-weight: bold">
           ${userfind.code}
          </p>
          <p style="text-align: center; font-size: 14px">
            Pour protéger ton compte ne partage pas de code.
          </p>
        </div>
      </body>
    </html>`;
        sendEmail({
          to: email,
          subject: objetmail,
          html: contentMail,
        });
        return NextResponse.json({ status: "send" });
      }
    } else {
      return NextResponse.json({ status: "empty" });
    }
  } catch (err) {
    console.error("Error creating specs:", err);
    return NextResponse.error("Failed to create specs");
  }
}
