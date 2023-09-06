"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalDeleteModele from "./ModalDeleteModele";
import { IconModel } from "../ui/Icons";

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
  }, [spec.modele, spec.type, refreshmodal, spec]);

  function updateModele(data) {
    const id = data.get("id")?.valueOf();
    window[`update${id}`].close();
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
        className="btn btn-ghost btn-xs bg-primary-dark dark:bg-primary-light dark:text-black "
        onClick={() => window[`update${spec.id}`].showModal()}
      >
        Modifier
      </button>

      <dialog id={`update${spec.id}`} className="modal">
        <form
          action={updateModele}
          className="modal-box bg-white dark:bg-primary-dark text-xm text-black dark:text-white"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => {
              window[`update${spec.id}`].close(), setRefreshmodal(true);
            }}
          >
            ✕
          </button>
          <span className="text-lg font-bold">Modification du modèle</span>
          <label
            htmlFor="input-group-1"
            className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Modèle
          </label>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
            <input type="hidden" name="id" value={spec.id} />
            <input
              type="text"
              id="input-group-1"
              name="modele"
              required
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
              <IconModel />
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
              className="btn dark:bg-white bg-primary-dark dark:text-black text-white "
              onClick={() => {
                window[`delete${spec.id}`].showModal(),
                  window[`update${spec.id}`].close();
              }}
            >
              Supprimer
            </button>
            <button
              className="btn dark:bg-white bg-primary-dark  dark:text-black text-white"
              type="submit"
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
