"use client";
import RowAttribution from "@/components/ponctuelle/RowAttributionRendu";
import { IconSearch } from "@/components/ui/Icons";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Demande() {
  const [reservations, setReservations] = useState([]);
  const [refresh, setRefresh] = useState();

  const [search, setSearch] = useState("");
  const [filteredreservations, setfilteredreservationss] =
    useState(reservations);
  useEffect(() => {
    setfilteredreservationss(reservations);
  }, [reservations]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    const filtered = reservations.filter(
      (reservation) =>
        reservation.user.email.toLowerCase().includes(searchTerm) ||
        reservation.objet.toLowerCase().includes(searchTerm) ||
        reservation.lieu.toLowerCase().includes(searchTerm) ||
        (reservation.attribution &&
          reservation.attribution.some((attribution) =>
            attribution.materiel.nom.toLowerCase().includes(searchTerm)
          ))
    );

    setfilteredreservationss(filtered);
  };

  useEffect(() => {
    setRefresh(false);
    const fetchReservations = async () => {
      try {
        await axios
          .get("/api/asign/ponctuelle/getRendu")
          .then(function (response) {
            setReservations(response.data.reservations);
          });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchReservations();
  }, [refresh]);

  return (
    <>
      <div className="my-2 flex items-center justify-between bg-secondary-light dark:bg-secondary-dark rounded-lg text-black dark:text-white">
        <div>
          <h1 className=" ml-2 mb-2 text-3xl">Réservation rendue</h1>
          <p className="ml-2">Visualiser les rendus de matériel...</p>
        </div>
        <div className="relative mr-2">
          <div className="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IconSearch />
          </div>
          <input
            type="text"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Recherche..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div>Nom</div>
                <div className="font-normal text-gray-500">email</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div>attribution</div> <div>rendu</div>
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
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredreservations.map((reservation) => (
              <RowAttribution
                key={reservation.id}
                reservation={reservation}
                setRefresh={setRefresh}
                rendu={true}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
