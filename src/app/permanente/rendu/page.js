"use client";
import RowAttributionRendu from "@/components/permanente/RowAttribution";
import RowRendu from "@/components/permanente/RowRendu";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Encours() {
  const [attributions, setattributions] = useState([]);
  const [refresh, setRefresh] = useState();
  useEffect(() => {
    setRefresh(false);
    const fetchReservations = async () => {
      try {
        await axios.get("/api/permanente/getRendu").then(function (response) {
          setattributions(response.data.attribution);
          console.log(response.data.attribution);
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
              <div className="font-normal text-gray-500">attribution</div>{" "}
              <div>rendu</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div>preparateur</div> <div>observation</div>
            </th>

            <th scope="col" className="px-6 py-3">
              materiels
            </th>
          </tr>
        </thead>
        <tbody>
          {attributions.map((attribution) => (
            <RowRendu
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
