import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalDeleteModele from "./ModalDeleteModele";

export default function ModalUpdateRow({ spec, setRefresh }) {
  const [dataModele, setdataModele] = useState({});
  const [refreshmodal, setRefreshmodal] = useState(false);

  function handleDataChange(champs, value) {
    setdataModele((prev) => ({
      ...prev,
      [champs]: value,
    }));
  }

  useEffect(() => {
    if (spec) {
      const { modele, type } = spec;
      const dataModele = { modele, type };
      setdataModele(dataModele);
      setRefreshmodal(false);
    }
  }, [spec.modele, spec.type, refreshmodal]);

  function updateModele(data) {
    const id = data.get("id")?.valueOf();
    const { modele, type } = dataModele;
    axios
      .put("/api/specs/update", {
        id: id,
        type: type,
        modele: modele,
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
        className="btn btn-ghost btn-xs "
        onClick={() => window[`update${spec.id}`].showModal()}
      >
        Modifier
      </button>

      <dialog id={`update${spec.id}`} className="modal">
        <form action={updateModele} className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => {
              window[`update${spec.id}`].close(), setRefreshmodal(true);
            }}
          >
            ✕
          </button>
          <span className="text-lg font-bold">Modification</span>
          <label
            htmlFor="input-group-1"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Modèle
          </label>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input type="hidden" name="id" value={spec.id} />
            <input
              type="text"
              id="input-group-1"
              name="modele"
              onChange={(e) => handleDataChange("modele", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="HP E15xxx"
              value={dataModele["modele"] || ""}
            />
          </div>
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Type
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
              name="type"
              value={dataModele["type"]}
              onChange={(e) => handleDataChange("type", e.target.value)}
              id="website-admin"
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Ordinateur Portable">Ordinateur Portable</option>
              <option value="Vidéo Projecteur">Vidéo Projecteur</option>
              <option value="Haut-Parleur">Haut-Parleur</option>
              <option value="Casque VR">Casque VR</option>
              <option value="Visioconférence">Visioconférence</option>
              <option value="Appareil Photo">Appareil Photo</option>
              <option value="Rallonge">Rallonge</option>
            </select>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="btn "
              onClick={() => window[`delete${spec.id}`].showModal()}
            >
              Supprimer
            </button>
            <button
              className="btn "
              type="submit"
              onClick={() => window[`update${spec.id}`].close()}
            >
              Modifier
            </button>
          </div>
        </form>
        <ModalDeleteModele spec={spec} setRefresh={setRefresh} />
      </dialog>
    </>
  );
}
