"use client";
import RowAttribution from "@/components/permanente/RowAttribution";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Encours() {
  const [attributions, setattributions] = useState([]);
  const [refresh, setRefresh] = useState();
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
          {attributions.map((attribution) => (
            <RowAttribution
              key={attribution.id}
              attribution={attribution}
              setRefresh={setRefresh}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
0;
