import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import {
  IconAp,
  IconCasque,
  IconHp,
  IconMulti,
  IconPortable,
  IconRallonge,
  IconVisio,
  IconVp,
  IconVr,
} from "@/components/ui/Icons";
import prisma from "@/lib/db";
import { sendEmail } from "@/lib/email";
const renderItems = (inputString) => {
  const items = inputString.split(", ");
  return items.map((item, index) => {
    const [quantity, label] = item.split(" ");

    return (
      <div key={index} className="flex gap-1">
        <span>{`${quantity}x`}</span>
        <div className="w-5 h-5">
          {label === "pc" && <IconPortable width="30" height="30" />}
          {label === "vp" && <IconVp width="30" height="30" />}
          {label === "hp" && <IconHp width="30" height="30" />}
          {label === "vr" && <IconVr width="30" height="30" />}
          {label === "visio" && <IconVisio width="30" height="30" />}
          {label === "ap" && <IconAp width="30" height="30" />}
          {label === "casque" && <IconCasque width="30" height="30" />}
          {label === "multi" && <IconMulti width="30" height="30" />}
          {label === "rallonge" && <IconRallonge width="30" height="30" />}
        </div>
      </div>
    );
  });
};
function formatDateString(dateString) {
  const dateObj = new Date(dateString);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = dateObj.toLocaleDateString("fr-FR", options);
  return formattedDate;
}

export async function POST(request) {
  try {
    const { email, objet, lieu, debut, fin, commentaire, materiels, userId } =
      await request.json();
    if (!objet || !lieu || !debut || !fin || !userId) {
      return NextResponse.error("Invalid request");
    }
    await prisma.reservationPonctuelle.create({
      data: {
        objet,
        lieu,
        debut: new Date(debut),
        fin: new Date(fin),
        commentaire,
        materiels,
        userId,
      },
    });
    const emailUserContent = `
    <p style="color: #333;text-transform: capitalize;">Bonjour, 
    ${email.split("@")[0].split(".")[1]}
    </p>

<table style="border-collapse: collapse; width: 100%">
  <tr style="background-color: #f2f2f2">
    <td style="padding: 8px; border: 1px solid #ddd">
      <strong>Détails de la réservation :</strong>
    </td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd">
      <strong>Matériels : </strong>
    </td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd; display: flex; gap : 16px;  text-align: center"> ${render(
      renderItems(materiels)
    )}</td>
  </tr>

  <tr>
    <td style="padding: 8px; border: 1px solid #ddd">
      <strong>Objet :</strong> ${objet}
    </td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd">
      <strong>Lieu :</strong> ${lieu}
    </td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd">
      <strong>Début :</strong> ${formatDateString(debut)}
    </td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd">
      <strong>Fin :</strong> ${formatDateString(fin)}
    </td>
  </tr>
</table>
<p style="color: #333">Cordialement.</p>
`;

    const emailAdminContent = `
<p style="color: #333;text-transform: capitalize;">Bonjour,</p>

<table style="border-collapse: collapse; width: 100%">
<tr style="background-color: #f2f2f2">
<td style="padding: 8px; border: 1px solid #ddd">
  <strong>Détails de la réservation :</strong>
</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd ;text-transform: capitalize;">
  <strong>Nom Prénom : </strong>${email.split("@")[0].split(".")[0]} ${
      email.split("@")[0].split(".")[1]
    }
</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd">
  <strong>Email : </strong> ${email}
</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd">
  <strong>Matériels : </strong>
</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd; display: flex; gap : 16px;  text-align: center"> ${render(
      renderItems(materiels)
    )}</td>
</tr>

<tr>
<td style="padding: 8px; border: 1px solid #ddd">
  <strong>Objet :</strong> ${objet}
</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd">
  <strong>Lieu :</strong> ${lieu}
</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd">
  <strong>Début :</strong> ${formatDateString(debut)}
</td>
</tr>
<tr>
<td style="padding: 8px; border: 1px solid #ddd">
  <strong>Fin :</strong> ${formatDateString(fin)}
</td>
</tr>
</table>
<p style="color: #333">Cordialement.</p>
`;

    await sendEmail({
      to: email,
      subject: "Réservation matériel",
      html: emailUserContent,
    });
    await sendEmail({
      to: "randriamahefa.pascal@mio.re",
      subject: `Réservation : ${objet} - ${lieu} - ${
        email.split("@")[0].split(".")[0]
      } ${email.split("@")[0].split(".")[1]}`,
      html: emailAdminContent,
    });
    return NextResponse.json({ message: "created" });
  } catch (err) {
    console.error("Error creating specs:", err);
    return NextResponse.error("Failed to create specs");
  }
}
