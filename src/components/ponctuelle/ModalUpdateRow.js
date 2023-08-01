"use client";
import ModalDeleteRow from "./ModalDeleteRow";
import React, { useEffect, useState } from "react";
import {
  IconAp,
  IconCasque,
  IconHp,
  IconMulti,
  IconPortable,
  IconRallonge,
  IconVisio,
  IconVp,
  IconVr,
} from "@/components/ui/Icons";
import axios from "axios";

import Link from "next/link";

export default function ModalUpdateRow({ reservation, setRefresh }) {
  const [materielQuantities, setMaterielQuantities] = useState({});
  const [dataReservation, setdataReservation] = useState({});

  useEffect(() => {
    if (reservation.materiels) {
      const materielList = reservation.materiels.split(", ");
      const initialQuantities = {};

      materielList.forEach((item) => {
        const [quantity, materiel] = item.split(" ");
        initialQuantities[materiel] = quantity;
      });

      setMaterielQuantities(initialQuantities);
    }
  }, [reservation.materiels]);

  useEffect(() => {
    if (reservation) {
      const { id, objet, lieu, debut, fin, commentaire } = reservation;
      const dataReservation = { id, objet, lieu, debut, fin, commentaire };
      setdataReservation(dataReservation);
    }
  }, [reservation.objet, reservation.lieu, reservation.debut, reservation.fin]);
  function handleUpdate() {
    const materiels = generateUpdatedString();
    const { id, objet, lieu, debut, fin, commentaire } = dataReservation;
    axios
      .put("/api/reservation/update", {
        id,
        objet,
        lieu,
        debut,
        fin,
        materiels,
        commentaire,
      })
      .then(async (response) => {
        setRefresh((prevRefresh) => !prevRefresh);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }

  const generateUpdatedString = () => {
    const items = [];
    Object.entries(materielQuantities).forEach(([materiel, quantity]) => {
      if (quantity) {
        items.push(`${quantity} ${materiel}`);
      }
    });
    return items.join(", ");
  };

  const handleQuantityChange = (materiel, quantity) => {
    setMaterielQuantities((prevQuantities) => ({
      ...prevQuantities,
      [materiel]: quantity,
    }));
  };
  function handleDataChange(champs, value) {
    setdataReservation((prev) => ({
      ...prev,
      [champs]: value,
    }));
  }

  return (
    <td className="px-2 py-2">
      <button
        className="btn btn-sm text-xs"
        onClick={() => window[`dialog${reservation.id}`].showModal()}
      >
        Modifier
      </button>
      <dialog id={`dialog${reservation.id}`} className="modal">
        <form
          onSubmit={handleUpdate}
          method="dialog"
          className="modal-box px-0 pb-0 overflow-hidden max-w-3xl"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => window[`dialog${reservation.id}`].close()}
          >
            ✕
          </button>
          <div className="px-6">
            <span className="text-lg font-bold">Modification</span>
            <div>
              <label
                htmlFor="objet"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Objet
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"></span>
                <input
                  type="text"
                  id="objet"
                  name="objet"
                  onChange={(e) => handleDataChange("objet", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={dataReservation["objet"] || ""}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lieu"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lieu
              </label>

              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"></span>
                <input
                  type="text"
                  id="lieu"
                  name="lieu"
                  onChange={(e) => handleDataChange("lieu", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nomade00"
                  value={dataReservation["lieu"] || ""}
                />
              </div>
            </div>

            <label
              htmlFor="debut"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Début
            </label>

            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"></span>
              <input
                type="datetime-local"
                id="debut"
                name="debut"
                onChange={(e) => handleDataChange("debut", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={
                  dataReservation["debut"]
                    ? dataReservation["debut"]
                        .replace("T", " ")
                        .replace("Z", "")
                    : ""
                }
              />
            </div>
            <label
              htmlFor="fin"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fin
            </label>

            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"></span>
              <input
                type="datetime-local"
                id="fin"
                name="fin"
                onChange={(e) => handleDataChange("fin", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={
                  dataReservation["fin"]
                    ? dataReservation["fin"].replace("T", " ").replace("Z", "")
                    : ""
                }
              />
            </div>
            <label
              htmlFor="commentaire"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Commentaire
            </label>

            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"></span>
              <textarea
                type="text"
                id="commentaire"
                name="commentaire"
                onChange={(e) =>
                  handleDataChange("commentaire", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={dataReservation["commentaire"] || ""}
              />
            </div>

            <label
              htmlFor="materiels"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Matériels
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between ">
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <div className="w-5 h-5">
                      <IconPortable />
                    </div>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    value={materielQuantities["pc"] || ""}
                    onChange={(e) => handleQuantityChange("pc", e.target.value)}
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <div className="w-5 h-5">
                      <IconVp />
                    </div>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    value={materielQuantities["vp"] || ""}
                    onChange={(e) => handleQuantityChange("vp", e.target.value)}
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <div className="w-5 h-5">
                      <IconRallonge />
                    </div>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    value={materielQuantities["rallonge"] || ""}
                    onChange={(e) =>
                      handleQuantityChange("rallonge", e.target.value)
                    }
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <div className="w-5 h-5">
                      <IconMulti />
                    </div>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    value={materielQuantities["multi"] || ""}
                    onChange={(e) =>
                      handleQuantityChange("multi", e.target.value)
                    }
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <div className="w-5 h-5">
                      <IconHp />
                    </div>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    value={materielQuantities["hp"] || ""}
                    onChange={(e) => handleQuantityChange("hp", e.target.value)}
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-evenly ">
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <div className="w-5 h-5">
                      <IconVr />
                    </div>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    value={materielQuantities["vr"] || ""}
                    onChange={(e) => handleQuantityChange("vr", e.target.value)}
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <div className="w-5 h-5">
                      <IconVisio />
                    </div>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    value={materielQuantities["visio"] || ""}
                    onChange={(e) =>
                      handleQuantityChange("visio", e.target.value)
                    }
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <div className="w-5 h-5">
                      <IconAp />
                    </div>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    value={materielQuantities["ap"] || ""}
                    onChange={(e) => handleQuantityChange("ap", e.target.value)}
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <div className="w-5 h-5">
                      <IconCasque />
                    </div>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    value={materielQuantities["casque"] || ""}
                    onChange={(e) =>
                      handleQuantityChange("casque", e.target.value)
                    }
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full h-10 mt-10">
            <button
              className="w-full text-center cursor-pointer bg-gray-700"
              onClick={() => window[`delete${reservation.id}`].showModal()}
            >
              Supprimer{" "}
            </button>

            <Link
              href={`/ponctuelle/demande/attribution/${reservation.id}`}
              className="w-full bg-white "
            >
              Attribuer
            </Link>
            <button type="submit" className="w-full  bg-gray-700 ">
              Modifier
            </button>
          </div>
        </form>
        <ModalDeleteRow
          key={reservation.id}
          reservation={reservation}
          setRefresh={setRefresh}
        />
      </dialog>
    </td>
  );
}
