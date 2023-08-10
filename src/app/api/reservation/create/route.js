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
    const emailContent = `
    <div>
    <table>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-2 py-2">
          <div>${formatDateString(debut)}</div>
          <div>${formatDateString(fin)}</div>
        </td>
        <td className="px-2 py-2">
          <div>${objet}</div>
          <div>${lieu}</div>
        </td>
        <td className="px-2 py-2">${commentaire}</td>
        <td className=" grid grid-cols-3 px-2 py-2 gap-y-2 h-auto ">
          ${render(renderItems(materiels))}
        </td>
      </tr>
    </table>
  </div>
`;

    await sendEmail({
      to: email,
      subject: "Welcome to NextAPI",
      html: emailContent,
    });
    return NextResponse.json({ message: "created" });
  } catch (err) {
    console.error("Error creating specs:", err);
    return NextResponse.error("Failed to create specs");
  }
}
