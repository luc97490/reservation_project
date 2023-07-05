"use client";
import DropdownFilter from "@/components/ui/DropdownFilter";
import { IconSearch } from "@/components/ui/Icons";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

export default function page() {
  const [specs, setSpecs] = useState([]);
  const [submit, setSubmit] = useState();
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
  }, [submit]);
  const [materiels, setMateriels] = useState([]);
  const [noms, setNoms] = useState([]);
  const [etats, setEtats] = useState([]);
  const addInput = () => {
    setNoms([...noms, ""]);
    setEtats([...noms, ""]);
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
  function createModele(data) {
    OrderJson();
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
      .then((response) => {
        setSubmit(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }

  function OrderJson() {
    const jsonObject = noms.reduce((acc, materiel, index) => {
      acc[materiel] = etats[index];
      return acc;
    }, {});
    const pairsArray = Object.entries(jsonObject);
    // Mappage des paires clé-valeur dans le format souhaité
    const transformedArray = pairsArray.map(([key, value], index) => {
      return { nom: key, etat: value };
    });
    // Affichage du tableau transformé
    setMateriels(transformedArray);
  }
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
              placeholder="Recherche le modèle"
            />
          </div>
          {/* Modal ADD*/}
          <label htmlFor="addmodele" className="btn">
            + Ajouter Modèle
          </label>
          <input type="checkbox" id="addmodele" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box pb-1">
              <label
                htmlFor="addmodele"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Matériel</h3>
              <form action={createModele}>
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
                      <option value="Rallonge">Rallonge</option>
                    </select>
                  </div>
                </div>
                {noms.map((value, index) => (
                  <div className=" flex mt-2 ml-7 justify-between">
                    <div className="border-l-4 pl-2" key={index}>
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
                        required
                        name="type"
                        id="etat"
                        onChange={(event) => handleEtatChange(index, event)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option disabled selected>
                          L'état du matériel?
                        </option>
                        <option value="Disponible">Disponible</option>
                        <option value="En réparation">En réparation</option>
                        <option value="Dégât modéré">Dégât modéré</option>
                        <option value="Dégât important">Dégât important</option>
                        <option value="Indisponible">Indisponible</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button className="btn" type="submit">
                  Ok
                </button>
              </form>
              <span className="text-xs">
                Vous avez la possibilité d'associer directement le modèle aux
                noms des matériels
              </span>
              <button
                className="w-full rounded-lg  text-xm mt-2 bg-gray-900 hover:bg-slate-200"
                onClick={addInput}
              >
                +
              </button>
            </div>
            <label className="modal-backdrop" htmlFor="addmodele">
              Close
            </label>
          </div>
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
                <label htmlFor={spec.id} className="btn btn-ghost btn-xs ">
                  détails
                </label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id={spec.id} className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box">
                    <h3 className="text-lg font-bold">Hello!</h3>
                    <p className="py-4">{spec.modele}</p>
                  </div>

                  <label className="modal-backdrop" htmlFor={spec.id}>
                    Close
                  </label>
                </div>
              </td>

              <td>
                {" "}
                <button className="btn btn-circle btn-outline border-border-light dark:border-border-dark">
                  <svg width="20px" height="20px" viewBox="0 0 100 100">
                    <g className=" fill-icon-light dark:fill-icon-dark">
                      <circle cx="50" cy="13.7" r="13.7" />
                      <circle cx="50" cy="50" r="13.7" />
                      <circle cx="50" cy="86.3" r="13.7" />
                    </g>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
