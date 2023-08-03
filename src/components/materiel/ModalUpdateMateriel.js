import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import ModalDeleteMateriel from "./ModalDeleteMateriel";

export default function ModalUpdateMateriel({ materiel, setRefresh, modeles }) {
  const [dataMateriel, setdataMateriel] = useState({});
  const [refreshmodal, setRefreshmodal] = useState(false);
  function handleDataChange(champs, value) {
    setdataMateriel((prev) => ({
      ...prev,
      [champs]: value,
    }));
  }
  useEffect(() => {
    if (materiel) {
      const { nom, etat, specsId } = materiel;
      const { modele } = materiel.specs;
      const dataMateriel = { nom, etat, specsId, modele };
      setdataMateriel(dataMateriel);
      setRefreshmodal(false);
    }
  }, [materiel.nom, materiel.etat, materiel.specsId, refreshmodal]);
  function updateMateriel() {
    const { nom, etat, specsId } = dataMateriel;
    const id = materiel.id;

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
  return (
    <>
      <button
        className="btn  btn-xs "
        onClick={() => window[`update${materiel.id}`].showModal()}
      >
        Modifier
      </button>

      <dialog id={`update${materiel.id}`} className="modal">
        <form method="dialog" className="modal-box" onSubmit={updateMateriel}>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => {
              window[`update${materiel.id}`].close(), setRefreshmodal(true);
            }}
          >
            ✕
          </button>
          <span className="text-lg font-bold">Modification</span>
          <label
            htmlFor="input-group-1"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nom
          </label>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
            <input type="hidden" name="id" value={materiel.id} />
            <input
              type="text"
              id="input-group-1"
              name="nom"
              onChange={(e) => handleDataChange("nom", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={dataMateriel["nom"] || ""}
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
              placeholder={dataMateriel["modele"] || ""}
              isSearchable={true}
              options={modeles}
              name="specsId"
              onChange={(e) => {
                handleDataChange("specsId", e.value),
                  handleDataChange("modele", e.label);
              }}
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
              value={dataMateriel["etat"] || ""}
              id="etat"
              name="etat"
              onChange={(e) => handleDataChange("etat", e.target.value)}
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
              <option value="Retiré du service">Retiré du service</option>
              <option value="Introuvable">Introuvable</option>
              <option value="Volé">Volé</option>
            </select>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="btn "
              onClick={() => window[`delete${materiel.id}`].showModal()}
            >
              Supprimer
            </button>
            <button
              className="btn "
              type="submit"
              onClick={() => window[`update${materiel.id}`].close()}
            >
              Modifier
            </button>
          </div>
        </form>
        <ModalDeleteMateriel materiel={materiel} setRefresh={setRefresh} />
      </dialog>
    </>
  );
}