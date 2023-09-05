"use client";
import ModalCreateModele from "@/components/materiel/ModalCreateModele";
import ModalDetails from "@/components/materiel/ModalDetails";
import ModalUpdateRow from "@/components/materiel/ModalUpdateRow";

import { IconSearch } from "@/components/ui/Icons";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Materiel() {
  const [refresh, setRefresh] = useState();
  const [specs, setSpecs] = useState([]);
  const [selectedType, setSelectedType] = useState("Tous");
  const [searchModel, setSearchModel] = useState("");
  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchModel(event.target.value);
  };
  const specsFiltres = specs.filter((spec) => {
    const typeMatch = selectedType === "Tous" || spec.type === selectedType;
    const modeleMatch = spec.modele
      .toLowerCase()
      .includes(searchModel.toLowerCase());
    return typeMatch && modeleMatch;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("/api/specs/getAll").then(function (response) {
          setSpecs(response.data.specs);
        });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    fetchData();
    setRefresh(false);
  }, [refresh]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between px-2 py-4 bg-white dark:bg-gray-800">
        <select
          name="type"
          id="type"
          value={selectedType}
          onChange={handleSelectChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="Tous">Tous</option>
          <option value="Ordinateur Portable">Ordinateur Portable</option>
          <option value="Vidéo Projecteur">Vidéo Projecteur</option>
          <option value="Haut-Parleur">Haut-Parleur</option>
          <option value="Casque VR">Casque VR</option>
          <option value="Visioconférence">Visioconférence</option>
          <option value="Appareil Photo">Appareil Photo</option>
          <option value="Casque Audio">Casque Audio</option>
        </select>
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IconSearch />
            </div>
            <input
              type="text"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Recherche le modèle"
              value={searchModel}
              onChange={handleSearchChange}
            />
          </div>
          {/* Modal ADD*/}
          <ModalCreateModele setRefresh={setRefresh} />
        </div>
      </div>

      <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Modèle
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>

            <th />
          </tr>
        </thead>
        <tbody>
          {specsFiltres.map((spec) => (
            <tr
              key={spec.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                {/* <img
                  className="w-10 h-10 rounded-full"
                  src="/docs/images/people/profile-picture-1.jpg"
                  alt="Jese image"
                /> */}
                <div className="pl-3">{spec.modele}</div>
              </td>
              <td className="px-6 py-4">{spec.type}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">{spec._count.materiels}</div>
              </td>
              <td className="px-6 py-4">
                <ModalDetails spec={spec} setRefresh={setRefresh} />
              </td>

              <td className="px-6 py-4">
                <ModalUpdateRow spec={spec} setRefresh={setRefresh} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
