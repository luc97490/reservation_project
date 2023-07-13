"use client";
import {
  IconAp,
  IconCasque,
  IconHp,
  IconMulti,
  IconPortable,
  IconVisio,
  IconVp,
  IconVr,
} from "@/components/ui/Icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
const renderItems = (inputString) => {
  const items = inputString.split(", ");

  return items.map((item, index) => {
    const [quantity, label] = item.split(" ");

    return (
      <div key={index} className="flex gap-1">
        <span>{`${quantity}x`}</span>
        <div className="w-5 h-5">
          {label === "pc" && <IconPortable />}
          {label === "vp" && <IconVp />}
          {label === "hp" && <IconHp />}
          {label === "vr" && <IconVr />}
          {label === "visio" && <IconVisio />}
          {label === "ap" && <IconAp />}
          {label === "casque" && <IconCasque />}
          {label === "multi" && <IconMulti />}
        </div>
      </div>
    );
  });
};
export default function Demande() {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        await axios.get("/api/reservation/getAll").then(function (response) {
          setReservations(response.data.reservations);
        });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchReservations();
  }, []);
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
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <div>Nom</div>
              <div className="font-normal text-gray-500">email</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div>debut</div> <div>fin</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div>objet</div> <div>lieu</div>
            </th>
            <th scope="col" className="px-6 py-3">
              commentaire
            </th>
            <th scope="col" className="px-6 py-3">
              materiels
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr
              key={reservation.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="flex items-center px-2 py-2 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={reservation.user.image}
                  alt={reservation.user.email}
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    <span className=" uppercase">
                      {reservation.user.email.split("@")[0].split(".")[0]}
                    </span>
                    <span className="capitalize">
                      {" "}
                      {reservation.user.email.split("@")[0].split(".")[1]}{" "}
                    </span>
                  </div>
                  <div className="font-normal text-gray-500">
                    {reservation.user.email}
                  </div>
                </div>
              </th>
              <td className="px-2 py-2">
                <div>{formatDateString(reservation.debut)}</div>
                <div>{formatDateString(reservation.fin)}</div>
              </td>

              <td className="px-2 py-2">
                <div>{reservation.objet}</div>
                <div>{reservation.lieu}</div>
              </td>
              <td className="px-2 py-2">{reservation.commentaire}</td>
              <td className=" grid grid-cols-3 px-2 py-2 h-auto ">
                {renderItems(reservation.materiels)}
              </td>
              <td className="px-2 py-2">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit user
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
0;
