"use client";
import RowAttribution from "@/components/permanente/RowAttribution";
import { IconSearch } from "@/components/ui/Icons";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Encours() {
  const [attributions, setattributions] = useState([]);
  const [refresh, setRefresh] = useState();

  const [search, setSearch] = useState("");
  const [filteredattributions, setfilteredattributions] =
    useState(attributions);
  useEffect(() => {
    setfilteredattributions(attributions);
  }, [attributions]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    const filtered = attributions.filter(
      (attribution) =>
        attribution.user.email.toLowerCase().includes(searchTerm) ||
        attribution.materiel.nom.toLowerCase().includes(searchTerm)
    );

    setfilteredattributions(filtered);
  };

  useEffect(() => {
    setRefresh(false);
    const fetchReservations = async () => {
      try {
        await axios.get("/api/permanente/getEncours").then(function (response) {
          setattributions(response.data.attribution);
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
          <h1 className=" ml-2 mb-2 text-3xl">Prêt en cours</h1>
          <p className="ml-2">
            Gérer, modifier ou supprimer les prêts en cours...
          </p>
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
                attribution
              </th>
              <th scope="col" className="px-6 py-3">
                preparateur
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
            {filteredattributions.map((attribution) => (
              <RowAttribution
                key={attribution.id}
                attribution={attribution}
                setRefresh={setRefresh}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
