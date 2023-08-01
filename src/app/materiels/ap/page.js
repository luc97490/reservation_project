"use client";
import ModalCreateMateriel from "@/components/materiel/ModalCreateMateriel";
import RowMateriel from "@/components/materiel/RowMateriel";
import { IconSearch } from "@/components/ui/Icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function page() {
  const type = "Appareil Photo";
  const [refresh, setRefresh] = useState();
  const [materiels, setMateriels] = useState([]);

  const [modeles, setModeles] = useState([]);

  useEffect(() => {
    const fetchModeles = async () => {
      try {
        await axios
          .post("/api/specs/getType", { type })
          .then(function (response) {
            setModeles(
              response.data.specs.map((item) => ({
                value: item.id,
                label: item.modele,
              }))
            );
          });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    fetchModeles();
  }, []);

  useEffect(() => {
    setRefresh(false);
    const fetchData = async () => {
      try {
        await axios
          .post("/api/materiels/getType", { type })
          .then(function (response) {
            setMateriels(response.data.materiels);
          });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className=" overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between px-2 py-4 bg-white dark:bg-gray-800">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IconSearch />
            </div>
            <input
              type="text"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
          <ModalCreateMateriel type={type} setRefresh={setRefresh} />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nom
              </th>
              <th scope="col" className="px-6 py-3">
                Modèle
              </th>
              <th scope="col" className="px-6 py-3">
                Statut
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {materiels.map((materiel) => (
              <RowMateriel
                key={materiel.id}
                materiel={materiel}
                setRefresh={setRefresh}
                modeles={modeles}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
