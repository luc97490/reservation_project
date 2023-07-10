"use client";
import DropdownFilter from "@/components/ui/DropdownFilter";
import { IconSearch } from "@/components/ui/Icons";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [refresh, setRefresh] = useState();
  const [specs, setSpecs] = useState([]);
  const [noms, setNoms] = useState([]);
  const [etats, setEtats] = useState([]);
  const handleCancelClick = () => {
    setRefresh(true);
  };
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
    setRefresh(false);
  }, [refresh]);
  function updateModele(data) {
    const id = data.get("id")?.valueOf();
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
  function deleteModele(data) {
    const id = data.get("id")?.valueOf();
    console.log(id);
    axios
      .post("/api/specs/delete", { id: id })
      .then(async (response) => {
        setRefresh(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }

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
  const handleModeleChange = (event, specId) => {
    const updatedSpecs = specs.map((spec) =>
      spec.id === specId ? { ...spec, modele: event.target.value } : spec
    );
    setSpecs(updatedSpecs);
  };
  const handleTypeChange = (event, specId) => {
    const updatedSpecs = specs.map((spec) =>
      spec.id === specId ? { ...spec, type: event.target.value } : spec
    );
    setSpecs(updatedSpecs);
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
              <form action={OrderJson}>
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
                        <option value="Retiré du service">
                          Retiré du service
                        </option>
                        <option value="Introuvable">Introuvable</option>
                        <option value="Volé">Volé</option>
                      </select>
                    </div>
                  </div>
                ))}

                <button
                  className="w-full  rounded-lg mt-2 bg-gray-900 hover:bg-slate-200"
                  type="submit"
                >
                  Créer
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
            <tr
              key={spec.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
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
              <td className="px-6 py-4">{spec.type}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">{spec._count.materiels}</div>
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
                    <span className="text-lg font-bold">
                      Les materiels associés au modèle : {spec.modele}
                    </span>
                    <table className="table-normal w-full">
                      <tbody>
                        {spec.materiels.map((materiel) => (
                          <tr key={materiel.id}>
                            <td className="w-1/2">{materiel.nom}</td>

                            <td className="flex items-center w-1/2">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
                              {materiel.etat}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <label className="modal-backdrop" htmlFor={spec.id}>
                    Close
                  </label>
                </div>
              </td>

              <td className="px-6 py-4">
                {/* Modal toggle */}
                <label
                  htmlFor={`update${spec.id}`}
                  className="btn btn-ghost btn-xs "
                >
                  Modifier
                </label>

                {/* Put this part before </body> tag */}
                <input
                  type="checkbox"
                  id={`update${spec.id}`}
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box">
                    <label
                      htmlFor={`update${spec.id}`}
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
                      Modèle
                    </label>
                    <form action={updateModele}>
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
                          onChange={(event) =>
                            handleModeleChange(event, spec.id)
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="HP E15xxx"
                          value={spec.modele}
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
                          value={spec.type}
                          onChange={(event) => handleTypeChange(event, spec.id)}
                          id="website-admin"
                          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="Ordinateur Portable">
                            Ordinateur Portable
                          </option>
                          <option value="Vidéo Projecteur">
                            Vidéo Projecteur
                          </option>
                          <option value="Haut-Parleur">Haut-Parleur</option>
                          <option value="Casque VR">Casque VR</option>
                          <option value="Visioconférence">
                            Visioconférence
                          </option>
                          <option value="Appareil Photo">Appareil Photo</option>
                          <option value="Rallonge">Rallonge</option>
                        </select>
                      </div>
                      <div className="flex justify-between mt-4">
                        <label htmlFor={`delete${spec.id}`} className="btn">
                          Supprimer
                        </label>
                        <button className="btn " type="submit">
                          Modifier
                        </button>
                      </div>
                    </form>
                    <form action={deleteModele}>
                      <input
                        type="hidden"
                        name="id"
                        value={spec.id}
                        className="modal-toggle"
                      />

                      <input
                        type="checkbox"
                        id={`delete${spec.id}`}
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box">
                          <label
                            htmlFor={`delete${spec.id}`}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          >
                            ✕
                          </label>
                          <h3 className="font-bold text-lg">
                            Voulez-vous réellement supprimer ce modèle ?
                          </h3>

                          <div className="flex font-bold justify-around">
                            <span>{spec.modele}</span>
                            <span>{spec.type}</span>
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

                  <label
                    className="modal-backdrop"
                    htmlFor={`update${spec.id}`}
                  >
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
