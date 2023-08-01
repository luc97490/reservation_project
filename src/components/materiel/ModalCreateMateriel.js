import React, { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import axios from "axios";
export default function ModalCreateMateriel({ type, setRefresh }) {
  const [modeles, setModeles] = useState([]);

  const [createModele, setCreateModele] = useState([]);

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
  const handleCreateModele = (value) => {
    setCreateModele({ id: value.value, value: value.label });
  };
  function createMateriel(data) {
    const nom = data.get("nom")?.valueOf();
    const etat = data.get("etat")?.valueOf();
    if (
      typeof nom !== "string" ||
      nom.length === 0 ||
      typeof etat !== "string" ||
      etat.length === 0
    ) {
      throw new Error("Invalid type");
    }
    axios
      .post("/api/materiels/create", {
        nom: nom,
        etat: etat,
        specsId: createModele.id,
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
      <button className="btn " onClick={() => window.addmateriel.showModal()}>
        + Ajouter {type}
      </button>

      <dialog id="addmateriel" className="modal">
        <form
          action={createMateriel}
          className="modal-box px-0 pb-0 overflow-hidden"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => window.addmateriel.close()}
          >
            ✕
          </button>

          <div className=" mx-6">
            <h3 className="text-lg font-bold">Matériel</h3>
            <div className="mb-5 border-l-4 pl-2">
              <label
                htmlFor="nom"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nom"
                required
              />
            </div>
            <div className="mb-5 border-l-4 pl-2">
              <label
                htmlFor="etat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Modèle
              </label>
              <Select
                placeholder={createModele.value}
                isSearchable={true}
                options={modeles}
                onChange={handleCreateModele}
                name="modele"
              />
            </div>
            <div className="mb-5 border-l-4 pl-2">
              <label
                htmlFor="etat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Statut
              </label>
              <select
                name="etat"
                id="etat"
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

          <button
            className="w-full h-7 mt-2 bg-gray-900 hover:bg-slate-200"
            type="submit"
            onClick={() => window.addmateriel.close()}
          >
            Créer
          </button>
        </form>
      </dialog>
    </>
  );
}
