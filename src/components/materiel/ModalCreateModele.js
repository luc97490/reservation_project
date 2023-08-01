import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ModalCreateModele({ setRefresh }) {
  const [noms, setNoms] = useState([]);
  const [etats, setEtats] = useState([]);
  const addInput = () => {
    setNoms([...noms, ""]);
    setEtats([...etats, ""]);
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
    const jsonObject = noms.reduce((acc, materiel, index) => {
      acc[materiel] = etats[index];
      return acc;
    }, {});
    const pairsArray = Object.entries(jsonObject);
    // Mappage des paires clé-valeur dans le format souhaité
    const transformedArray = pairsArray.map(([key, value], index) => {
      return { nom: key, etat: value };
    });
    createModele(data, transformedArray);
  }
  function createModele(data, materiels) {
    const type = data.get("type")?.valueOf();
    const modele = data.get("modele")?.valueOf();
    if (
      typeof type !== "string" ||
      type.length === 0 ||
      typeof modele !== "string" ||
      modele.length === 0
    ) {
      throw new Error("Invalid type");
    }
    axios
      .post("/api/specs/createWithMateriel", {
        type: type,
        modele: modele,
        materiels: materiels,
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
      <button className="btn " onClick={() => window.addmodele.showModal()}>
        + Ajouter Modèle
      </button>

      <dialog id="addmodele" className="modal">
        <form action={OrderJson} method="dialog" className="modal-box pb-1">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => window.addmodele.close()}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Matériel</h3>
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
                <option value="Ordinateur Portable">Ordinateur Portable</option>
                <option value="Vidéo Projecteur">Vidéo Projecteur</option>
                <option value="Haut-Parleur">Haut-Parleur</option>
                <option value="Casque VR">Casque VR</option>
                <option value="Visioconférence">Visioconférence</option>
                <option value="Appareil Photo">Appareil Photo</option>
                <option value="Casque Audio">Casque Audio</option>
              </select>
            </div>
          </div>
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
                  defaultValue="Disponible"
                  id="etat"
                  onChange={(event) => handleEtatChange(index, event)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            </div>
          ))}
          <button
            className="w-full  rounded-lg mt-2 bg-gray-900 hover:bg-slate-200"
            type="submit"
            onClick={() => window.addmodele.close()}
          >
            Créer
          </button>
          <span className="text-xs">
            Vous avez la possibilité d'associer directement le modèle aux noms
            des matériels
          </span>
          <button
            type="button"
            className="w-full rounded-lg  text-xm mt-2 bg-gray-900 hover:bg-slate-200"
            onClick={addInput}
          >
            +
          </button>
        </form>
      </dialog>
    </>
  );
}
