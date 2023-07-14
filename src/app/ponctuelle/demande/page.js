"use client";
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
import React, { useEffect, useState } from "react";

const renderItems = (inputString) => {
  const items = inputString.split(", ");
  return items.map((item, index) => {
    const [quantity, label] = item.split(" ");

    return (
      <div key={index} className="flex gap-1">
        <span>{`${quantity}x`}</span>
        <div className="w-5 h-5">
          {label === "pc" && <IconPortable />}
          {label === "vp" && <IconVp />}
          {label === "hp" && <IconHp />}
          {label === "vr" && <IconVr />}
          {label === "visio" && <IconVisio />}
          {label === "ap" && <IconAp />}
          {label === "casque" && <IconCasque />}
          {label === "multi" && <IconMulti />}
          {label === "rallonge" && <IconRallonge />}
        </div>
      </div>
    );
  });
};

const ReservationRow = ({ reservation, setRefresh }) => {
  const [materielQuantities, setMaterielQuantities] = useState({});
  const [dataReservation, setdataReservation] = useState({});
  function handleUpdate() {
    // const id = data.get("id")?.valueOf();
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

  function deleteReservation(data) {
    const id = data.get("id")?.valueOf();
    axios
      .post("/api/reservation/delete", { id: id })
      .then(async (response) => {
        setRefresh((prevRefresh) => !prevRefresh);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }

  function formatDateString(dateString) {
    const dateObj = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = dateObj.toLocaleDateString("fr-FR", options);
    return formattedDate;
  }

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

  return (
    <tr
      key={reservation.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <th
        scope="row"
        className="flex items-center px-2 py-2 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          className="w-10 h-10 rounded-full"
          src={reservation.user.image}
          alt={reservation.user.email}
        />
        <div className="pl-3">
          <div className="text-base font-semibold">
            <span className=" uppercase">
              {reservation.user.email.split("@")[0].split(".")[0]}
            </span>
            <span className="capitalize">
              {" "}
              {reservation.user.email.split("@")[0].split(".")[1]}{" "}
            </span>
          </div>
          <div className="font-normal text-gray-500">
            {reservation.user.email}
          </div>
        </div>
      </th>
      <td className="px-2 py-2">
        <div>{formatDateString(reservation.debut)}</div>
        <div>{formatDateString(reservation.fin)}</div>
      </td>

      <td className="px-2 py-2">
        <div>{reservation.objet}</div>
        <div>{reservation.lieu}</div>
      </td>
      <td className="px-2 py-2">{reservation.commentaire}</td>
      <td className=" grid grid-cols-3 px-2 py-2 gap-y-2 h-auto ">
        {renderItems(reservation.materiels)}
      </td>
      <td className="px-2 py-2">
        <label htmlFor={`update${reservation.id}`} className="btn btn-xs">
          Modifier
        </label>
        <input
          type="checkbox"
          id={`update${reservation.id}`}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box px-0 pb-0 overflow-hidden max-w-3xl">
            <label
              htmlFor={`update${reservation.id}`}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </label>{" "}
            <form>
              <div className="px-6">
                <input
                  type="hidden"
                  name="id"
                  onChange={(e) => handleDataChange("id", e.target.value)}
                  value={dataReservation["id"]}
                />
                <span className="text-lg font-bold">Modification</span>

                <div>
                  <label
                    htmlFor="objet"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Objet
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
                    <input
                      type="text"
                      id="objet"
                      name="objet"
                      onChange={(e) =>
                        handleDataChange("objet", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nomade00"
                      value={dataReservation["objet"]}
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
                    <input
                      type="text"
                      id="lieu"
                      name="lieu"
                      onChange={(e) => handleDataChange("lieu", e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nomade00"
                      value={dataReservation["lieu"]}
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
                  <input
                    type="datetime-local"
                    id="fin"
                    name="fin"
                    onChange={(e) => handleDataChange("fin", e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={
                      dataReservation["fin"]
                        ? dataReservation["fin"]
                            .replace("T", " ")
                            .replace("Z", "")
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
                  <textarea
                    type="text"
                    id="commentaire"
                    name="commentaire"
                    onChange={(e) =>
                      handleDataChange("commentaire", e.target.value)
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={dataReservation["commentaire"]}
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
                        onChange={(e) =>
                          handleQuantityChange("pc", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleQuantityChange("vp", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleQuantityChange("hp", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleQuantityChange("vr", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleQuantityChange("ap", e.target.value)
                        }
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
                <label
                  htmlFor={`delete${reservation.id}`}
                  className="w-full text-center cursor-pointer bg-gray-700"
                >
                  Supprimer
                </label>
                <button className="w-full bg-white " type="submit">
                  Attribuer
                </button>
                <label
                  htmlFor={`update${reservation.id}`}
                  className="w-full  bg-gray-700 "
                  onClick={handleUpdate}
                >
                  Modifier
                </label>
              </div>
            </form>
            <form action={deleteReservation}>
              <input
                type="hidden"
                name="id"
                value={reservation.id}
                className="modal-toggle"
              />

              <input
                type="checkbox"
                id={`delete${reservation.id}`}
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box">
                  <label
                    htmlFor={`delete${reservation.id}`}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="font-bold text-lg">
                    Voulez-vous réellement supprimer la réservation ?
                  </h3>

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
  );
};

export default function Demande() {
  const [reservations, setReservations] = useState([]);
  const [refresh, setRefresh] = useState();
  useEffect(() => {
    setRefresh(false);
    const fetchReservations = async () => {
      try {
        await axios.get("/api/reservation/getAll").then(function (response) {
          setReservations(response.data.reservations);
        });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchReservations();
  }, [refresh]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <div>Nom</div>
              <div className="font-normal text-gray-500">email</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div>debut</div> <div>fin</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div>objet</div> <div>lieu</div>
            </th>
            <th scope="col" className="px-6 py-3">
              details
            </th>
            <th scope="col" className="px-6 py-3">
              materiels
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <ReservationRow
              key={reservation.id}
              reservation={reservation}
              setRefresh={setRefresh}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
0;
