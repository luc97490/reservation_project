"use client";
import RowReservation from "@/components/ponctuelle/RowReservation";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Demande() {
  const [reservations, setReservations] = useState([]);
  const [refresh, setRefresh] = useState();
  useEffect(() => {
    setRefresh(false);
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
  }, [refresh]);

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
              details
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
            <RowReservation
              key={reservation.id}
              reservation={reservation}
              setRefresh={setRefresh}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
