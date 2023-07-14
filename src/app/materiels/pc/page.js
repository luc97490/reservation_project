"use client";
import Table from "@/components/materiel/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";

export default function Pc() {
  const type = "Ordinateur Portable";
  const [refresh, setRefresh] = useState();
  const [allPc, setPc] = useState([]);
  const [modeles, setModeles] = useState([]);
  const [stockModele, setStockModele] = useState();

  const handleCancelClick = () => {
    setRefresh(true);
  };
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
            setPc(response.data.materiels);
          });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    fetchData();
  }, [refresh]);
  const handleNomChange = (event, pcId) => {
    const updatedPc = allPc.map((pc) =>
      pc.id === pcId ? { ...pc, nom: event.target.value } : pc
    );
    setPc(updatedPc);
  };
  function handleModeleChange(value, id) {
    setStockModele(value.value);
    const updatedSpecs = allPc.map((pc) =>
      pc.id === id
        ? { ...pc, specs: { id: value.value, modele: value.label } }
        : pc
    );
    setPc(updatedSpecs);
  }
  function handleEtatChange(event, id) {
    console.log(event);
    const updatedSpecs = allPc.map((pc) =>
      pc.id === id ? { ...pc, etat: event.target.value } : pc
    );
    setPc(updatedSpecs);
  }
  function updateMateriel(data) {
    const id = data.get("id")?.valueOf();
    const nom = data.get("nom")?.valueOf();
    const etat = data.get("etat")?.valueOf();
    const specsId = stockModele;
    axios
      .put("/api/materiels/update", {
        id,
        nom,
        etat,
        specsId,
      })
      .then(async (response) => {
        setRefresh(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }
  function deleteMateriel(data) {
    const id = data.get("id")?.valueOf();
    axios
      .post("/api/materiels/delete", { id: id })
      .then(async (response) => {
        setRefresh(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Table>
        {allPc.map((pc) => (
          <tr
            key={pc.id}
            className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td className="py-3 px-3">{pc.nom}</td>
            <td className="py-3 px-3">{pc.specs.modele}</td>
            <td className="flex py-3 items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
              {pc.etat}
            </td>
            <td>
              <label htmlFor={`update${pc.id}`} className="btn btn-xs">
                Modifier
              </label>
              <input
                type="checkbox"
                id={`update${pc.id}`}
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box">
                  <label
                    htmlFor={`update${pc.id}`}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={handleCancelClick}
                  >
                    ✕
                  </label>
                  <span className="text-lg font-bold">Modification</span>
                  <label
                    htmlFor="input-group-1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nom
                  </label>
                  <form action={updateMateriel}>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                      <input type="hidden" name="id" value={pc.id} />
                      <input
                        type="text"
                        id="input-group-1"
                        name="nom"
                        onChange={(event) => handleNomChange(event, pc.id)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nomade00"
                        value={pc.nom}
                      />
                    </div>

                    <label
                      htmlFor="website-admin"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Modèle
                    </label>
                    <div className="flex mb-6">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                      </span>
                      <Select
                        placeholder={pc.specs.modele}
                        isSearchable={true}
                        options={modeles}
                        name="modele"
                        onChange={(value) => handleModeleChange(value, pc.id)}
                      />
                    </div>

                    <label
                      htmlFor="website-admin"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Statut
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                      </span>
                      <select
                        value={pc.etat}
                        id="etat"
                        name="etat"
                        onChange={(event) => handleEtatChange(event, pc.id)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option disabled defaultValue="Disponible">
                          L'état du matériel?
                        </option>
                        <option value="Disponible">Disponible</option>
                        <option value="En réservation">En réservation</option>
                        <option value="En prêt">En prêt</option>
                        <option value="En réparation">En réparation</option>
                        <option value="Dégât modéré">Dégât modéré</option>
                        <option value="Dégât important">Dégât important</option>
                        <option value="Indisponible">Indisponible</option>
                        <option value="Hors service">Hors service</option>
                        <option value="Retiré du service">
                          Retiré du service
                        </option>
                        <option value="Introuvable">Introuvable</option>
                        <option value="Volé">Volé</option>
                      </select>
                    </div>
                    <div className="flex justify-between mt-4">
                      <label htmlFor={`delete${pc.id}`} className="btn">
                        Supprimer
                      </label>
                      <button className="btn " type="submit">
                        Modifier
                      </button>
                    </div>
                  </form>
                  <form action={deleteMateriel}>
                    <input
                      type="hidden"
                      name="id"
                      value={pc.id}
                      className="modal-toggle"
                    />

                    <input
                      type="checkbox"
                      id={`delete${pc.id}`}
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box">
                        <label
                          htmlFor={`delete${pc.id}`}
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                          ✕
                        </label>
                        <h3 className="font-bold text-lg">
                          Voulez-vous réellement supprimer ce modèle ?
                        </h3>

                        <div className="flex font-bold justify-around">
                          <span>{pc.modele}</span>
                          <span>{pc.type}</span>
                        </div>

                        <div className="modal-action">
                          <button
                            type="submit"
                            className="w-full font-bold text-lg rounded-lg bg-gray-900 hover:bg-slate-200"
                          >
                            Supprimer définitivement
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
