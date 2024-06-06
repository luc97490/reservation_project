"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import AlertModel, {
  AlertModelDelete,
  AlertModelUpdate,
} from "../alert/AlertModel";

export default function ModalCreateModele({ setRefresh }) {
  const [noms, setNoms] = useState([]);
  const [etats, setEtats] = useState([]);
  const addInput = () => {
    setNoms([...noms, ""]);
    setEtats([...etats, ""]);
  };
  const removeInput = () => {
    if (noms.length === 0 || etats.length === 0) {
      return; // Éviter de supprimer si les tableaux sont vides
    }

    const nouveauxNoms = noms.slice(0, noms.length - 1);
    const nouveauxEtats = etats.slice(0, etats.length - 1);

    setNoms(nouveauxNoms);
    setEtats(nouveauxEtats);
  };

  const handleNomChange = (index, event) => {
    const newInputs = [...noms];
    newInputs[index] = event.target.value;
    setNoms(newInputs);
  };
  const handleEtatChange = (index, event) => {
    const newInputs = [...etats];
    newInputs[index] = event.target.value;
    setEtats(newInputs);
  };

  function OrderJson(data) {
    window.addmodele.close();
    const jsonObject = noms.reduce((acc, materiel, index) => {
      acc[materiel] = etats[index];
      return acc;
    }, {});
    const pairsArray = Object.entries(jsonObject);
    // Mappage des paires clé-valeur dans le format souhaité
    const transformedArray = pairsArray.map(([key, value], index) => {
      return { nom: key, etat: value === "" ? "Disponible" : value };
    });
    createModele(data, transformedArray);
  }
  function createModele(data, materiels) {
    const type = data.get("type")?.valueOf();
    const modele = data.get("modele")?.valueOf();

    axios
      .post("/api/specs/createWithMateriel", {
        type: type,
        modele: modele,
        materiels: materiels,
      })
      .then(async (response) => {
        setRefresh(true);
        if (response.data.message === "fail") {
          window.modalMessageUpdate.showModal();
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l&apos;envoi de la requête POST :",
          error
        );
      });
  }
  return (
    <>
      <AlertModelDelete />
      <AlertModelUpdate />
      <button
        className="btn bg-primary-dark dark:bg-primary-light dark:text-black"
        onClick={() => window.addmodele.showModal()}
      >
        + Ajouter Modèle
      </button>
      <dialog id="addmodele" className="modal ">
        <form
          action={OrderJson}
          className="modal-box relative max-h-xl h-full  bg-white dark:bg-primary-dark text-black dark:text-white pb-0 px-0"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => window.addmodele.close()}
          >
            ✕
          </button>
          <div className="px-5">
            <h3 className="text-lg font-bold mb-2">
              Ajouter un modèle (et des matériels)
            </h3>
            <div className=" flex justify-between mb-5">
              <div className=" border-l-4 pl-2">
                <label
                  htmlFor="modele"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Modèle
                </label>
                <input
                  type="text"
                  id="modele"
                  name="modele"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Modèle"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </label>
                <select
                  name="type"
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="Ordinateur Portable">
                    Ordinateur Portable
                  </option>
                  <option value="Vidéo Projecteur">Vidéo Projecteur</option>
                  <option value="Haut-Parleur">Haut-Parleur</option>
                  <option value="Casque VR">Casque VR</option>
                  <option value="Visioconférence">Visioconférence</option>
                  <option value="Appareil Photo">Appareil Photo</option>
                  <option value="Casque Audio">Casque Audio</option>
                </select>
              </div>
            </div>
            <div>
              {noms.map((value, index) => (
                <div key={index} className=" flex mt-2 ml-7 justify-between">
                  <div className="border-l-4 pl-2">
                    <label
                      htmlFor={index}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nom
                    </label>
                    <input
                      value={value}
                      onChange={(event) => handleNomChange(index, event)}
                      type="text"
                      id={index}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nom"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="etat"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      État actuel
                    </label>
                    <select
                      id="etat"
                      onChange={(event) => handleEtatChange(index, event)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled defaultValue="Disponible">
                        L&apos;état du matériel?
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
                </div>
              ))}
            </div>
          </div>
          <div className={noms.length <= 5 ? " absolute bottom-0" : "bottom-0"}>
            <div className="text-xs text-center p-1 m-4 border">
              Vous avez la possibilité d&apos;associer directement le modèle à
              un (ou plusieurs) matériels (en appuyant sur &quot;+&quot;)
            </div>
            <div className="flex gap-16">
              <div className="w-1/3">
                <button
                  type="button"
                  className={
                    noms.length < 100
                      ? "w-full rounded-lg  dark:bg-white bg-primary-dark text-xm dark:text-black text-white hover:bg-secondary-dark dark:hover:bg-slate-200"
                      : "w-full rounded-lg   bg-gray-500 btn-disabled text-xm"
                  }
                  onClick={addInput}
                >
                  +
                </button>
                <button
                  type="button"
                  className={
                    noms.length > 0
                      ? "dark:bg-white bg-primary-dark border-t w-full rounded-t-lg text-xm  dark:text-black rounded-l-lg text-white hover:bg-secondary-dark"
                      : "bg-gray-500 btn-disabled w-full text-xm border-t rounded-t-lg text-white"
                  }
                  onClick={removeInput}
                >
                  -
                </button>
              </div>

              <button
                className="w-full  dark:text-black dark:bg-white  bg-primary-dark text-white  rounded-t-lg hover:bg-secondary-dark  dark:hover:bg-slate-200"
                type="submit"
              >
                Créer
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}
