"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";

export default function AttributionPermanente() {
  const [materiel, setmateriel] = useState([]);
  const [dataMateriel, setdataMateriel] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = new FormData(event.target).get("email");
    const preparateur = new FormData(event.target).get("preparateur");
    const idMaterielSelect = dataMateriel["id"];
    const userFind = await axios.post("/api/users/find", { email });

    if (userFind.data.userfind) {
      axios
        .post("/api/permanente/create", {
          userId: userFind.data.userfind.id,
          preparateur,
          materielId: idMaterielSelect,
        })
        .then(async (response) => {});
    } else {
      const newUser = await axios.post("/api/users/createG", {
        email,
      });
      axios
        .post("/api/permanente/create", {
          userId: newUser.data.user.id,
          preparateur,
          materielId: idMaterielSelect,
        })
        .then(async (response) => {});
    }
  };

  function handleDataChange(champs, value) {
    setdataMateriel((prev) => ({
      ...prev,
      [champs]: value,
    }));
  }

  useEffect(() => {
    async function getMateriel() {
      await axios.get("/api/materiels/getAll").then(async (response) => {
        setmateriel(
          response.data.materiels.map(({ id, nom }) => ({
            value: id,
            label: nom,
          }))
        );
      });
    }
    getMateriel();
  }, []);
  return (
    <div className="p-6 px-40">
      <h1 className="text-center font-bold mb-6">
        Attribution Matériel Permanente
      </h1>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@mio.re"
            required
          />
        </div>
        <div className="mb-6 ">
          <div>
            <label
              htmlFor="preparateur"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Preparateur *
            </label>
            <input
              type="text"
              id="preparateur"
              name="preparateur"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Preparateur"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="materiel"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Matériel
          </label>
          <Select
            id="materiel"
            isSearchable={true}
            placeholder={dataMateriel[`materiel`] || ""}
            options={materiel}
            onChange={(e) => {
              handleDataChange(`id`, e.value),
                handleDataChange(`materiel`, e.label);
            }}
          />
        </div>

        <div className="text-start">
          <p>* Assurez-vous de compléter tous les champs obligatoires</p>
        </div>
        <button
          type="submit"
          className="mt-6 px-10 py-3  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
