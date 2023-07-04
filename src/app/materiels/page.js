"use client";
import DropdownFilter from "@/components/ui/DropdownFilter";
import { IconSearch } from "@/components/ui/Icons";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

export default function page() {
  const [specs, setSpecs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("/api/specs/getAll")
          .then(function (response) {
            setSpecs(response.data.specs);
          });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between px-2 py-4 bg-white dark:bg-gray-800">
        <DropdownFilter />
        <div className="flex items-center gap-5">
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
          <button className="btn">+ Ajouter un modèle</button>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
          </tr>
        </thead>
        <tbody>
          {" "}
          {specs.map((spec) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="/docs/images/people/profile-picture-1.jpg"
                  alt="Jese image"
                />
                <div className="pl-3">{spec.modele}</div>
              </td>
              <td className="px-6 py-4">
                {spec.materiels.map((materiel) => (
                  <span>{materiel.nom}</span>
                ))}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                  Online
                </div>
              </td>
              <td className="px-6 py-4">
                {/* Modal toggle */}
                <label htmlFor="my_modal_7" className="btn">
                  open modal
                </label>

                {/* Put this part before </body> tag */}
                <input
                  type="checkbox"
                  id="my_modal_7"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box">
                    <h3 className="text-lg font-bold">Hello!</h3>
                    <p className="py-4">
                      This modal works with a hidden checkbox!
                    </p>
                  </div>
                  <label className="modal-backdrop" htmlFor="my_modal_7">
                    Close
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
