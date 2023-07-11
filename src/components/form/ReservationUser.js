"use client";
import React, { useState } from "react";
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
} from "../ui/Icons";
import NumberInputWithButtons from "./ui/NumberInputWithButtons";

export default function ReservationUser() {
  const [nbpc, setnbpc] = useState(0);
  const [nbvp, setnbvp] = useState(0);
  const [nbhp, setnbhp] = useState(0);
  const [nbvr, setnbvr] = useState(0);
  const [nbvisio, setnbvisio] = useState(0);
  const [nbap, setnbap] = useState(0);
  const [nbcasque, setnbcasque] = useState(0);
  const [nbrallonge, setnbrallonge] = useState(0);
  const [nbmulti, setnbmulti] = useState(0);
  function test() {
    console.log(nbrallonge);
    console.log(nbmulti);
  }
  return (
    <div className="p-6 px-40">
      <h1 className="text-center font-bold mb-6">Réservation Matériel</h1>
      <form action={test}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@mio.re"
            required
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Prénom
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Joe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom
            </label>
            <input
              type="text"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="objet"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Objet
            </label>
            <input
              type="text"
              id="objet"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Atelier"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lieu"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Lieu
            </label>
            <input
              type="tel"
              id="lieu"
              placeholder="Saint Paul"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="debut"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Début
            </label>
            <input
              type="datetime-local"
              id="debut"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="fin"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fin
            </label>
            <input
              type="datetime-local"
              id="fin"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="commentaire"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Commentaire (optionnel)
          </label>
          <textarea
            type="textarea"
            id="commentaire"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Choix des matériels :
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-3">
            <li>
              <input
                type="checkbox"
                id="pc"
                defaultValue
                className="hidden peer"
                required
              />
              <label
                htmlFor="pc"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconPortable />
                  </span>
                  <div className="w-full font-semibold">
                    Ordinateur Portable
                  </div>
                </div>
              </label>
              <div className="text-end peer-checked:block hidden">
                <NumberInputWithButtons value={nbpc} onChange={setnbpc} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="vp"
                defaultValue
                className="hidden peer"
                required
              />
              <label
                htmlFor="vp"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconVp />
                  </span>
                  <div className="w-full font-semibold">Vidéo Projecteur</div>
                </div>
              </label>
              <div className="text-end peer-checked:block hidden">
                <NumberInputWithButtons value={nbvp} onChange={setnbvp} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="hp"
                defaultValue
                className="hidden peer"
                required
              />
              <label
                htmlFor="hp"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconHp />
                  </span>
                  <div className="w-full font-semibold">Haut-parleur</div>
                </div>
              </label>
              <div className="text-end peer-checked:block hidden">
                <NumberInputWithButtons value={nbhp} onChange={setnbhp} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="vr"
                defaultValue
                className="hidden peer"
                required
              />
              <label
                htmlFor="vr"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconVr />
                  </span>
                  <div className="w-full font-semibold">Casque VR</div>
                </div>
              </label>
              <div className="text-end peer-checked:block hidden">
                <NumberInputWithButtons value={nbvr} onChange={setnbvr} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="visio"
                defaultValue
                className="hidden peer"
                required
              />
              <label
                htmlFor="visio"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconVisio />
                  </span>
                  <div className="w-full font-semibold">Visioconférence</div>
                </div>
              </label>
              <div className="text-end peer-checked:block hidden">
                <NumberInputWithButtons value={nbvisio} onChange={setnbvisio} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="ap"
                defaultValue
                className="hidden peer"
                required
              />
              <label
                htmlFor="ap"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconAp />
                  </span>
                  <div className="w-full font-semibold">
                    Appareil Photo(Vidéo)
                  </div>
                </div>
              </label>
              <div className="text-end peer-checked:block hidden">
                <NumberInputWithButtons value={nbap} onChange={setnbap} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="casque"
                defaultValue
                className="hidden peer"
                required
              />
              <label
                htmlFor="casque"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconCasque />
                  </span>

                  <div className="w-full font-semibold">Casque Audio</div>
                </div>
              </label>
              <div className="text-end peer-checked:block hidden">
                <NumberInputWithButtons
                  value={nbcasque}
                  onChange={setnbcasque}
                />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="rallonge"
                defaultValue
                className="hidden peer"
                required
              />
              <label
                htmlFor="rallonge"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconRallonge />
                  </span>
                  <div className="w-full font-semibold">Rallonge</div>
                </div>
              </label>
              <div className="text-end peer-checked:block hidden">
                <NumberInputWithButtons
                  value={nbrallonge}
                  onChange={setnbrallonge}
                />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="multi"
                defaultValue
                className="hidden peer"
                required
              />
              <label
                htmlFor="multi"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconMulti />
                  </span>
                  <div className="w-full font-semibold">Multiprise</div>
                </div>
              </label>
              <div className="text-end peer-checked:block hidden">
                <NumberInputWithButtons value={nbmulti} onChange={setnbmulti} />
              </div>
            </li>
          </ul>
        </div>
        <button
          type="button"
          onClick={test}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
