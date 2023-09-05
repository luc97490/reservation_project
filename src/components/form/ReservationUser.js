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
import axios from "axios";

export default function ReservationUser({ email }) {
  const [checkboxValues, setCheckboxValues] = useState({
    pc: false,
    vp: false,
    hp: false,
    vr: false,
    visio: false,
    ap: false,
    casque: false,
    rallonge: false,
    multi: false,
  });
  const [videMateriels, setvideMateriels] = useState(false);

  const [nbpc, setnbpc] = useState(1);
  const [nbvp, setnbvp] = useState(1);
  const [nbhp, setnbhp] = useState(1);
  const [nbvr, setnbvr] = useState(1);
  const [nbvisio, setnbvisio] = useState(1);
  const [nbap, setnbap] = useState(1);
  const [nbcasque, setnbcasque] = useState(1);
  const [nbrallonge, setnbrallonge] = useState(1);
  const [nbmulti, setnbmulti] = useState(1);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedMaterials = Object.entries(checkboxValues)
      .filter(([_, checked]) => checked)
      .map(([material]) => material);
    if (selectedMaterials.length > 0) {
      window.my_modal_1.showModal();
      const objet = new FormData(event.target).get("objet");
      const lieu = new FormData(event.target).get("lieu");
      const debut = new FormData(event.target).get("debut");
      const fin = new FormData(event.target).get("fin");
      const commentaire = new FormData(event.target).get("commentaire");
      let userId;
      try {
        await axios
          .post("/api/users/findEmail", { email })
          .then(function (response) {
            userId = response.data.userfind.id;
          });
      } catch (e) {
        await axios
          .post("/api/users/createG", { email })
          .then(function (response) {
            userId = response.data.user.id;
          });
      }

      setvideMateriels(false);
      let materiels = [];
      if (selectedMaterials.includes("pc")) {
        materiels = [...materiels, `${nbpc} pc`];
      }
      if (selectedMaterials.includes("vp")) {
        materiels = [...materiels, `${nbvp} vp`];
      }
      if (selectedMaterials.includes("hp")) {
        materiels = [...materiels, `${nbhp} hp`];
      }
      if (selectedMaterials.includes("vr")) {
        materiels = [...materiels, `${nbvr} vr`];
      }
      if (selectedMaterials.includes("visio")) {
        materiels = [...materiels, `${nbvisio} visio`];
      }
      if (selectedMaterials.includes("ap")) {
        materiels = [...materiels, `${nbap} ap`];
      }
      if (selectedMaterials.includes("casque")) {
        materiels = [...materiels, `${nbcasque} casque`];
      }
      if (selectedMaterials.includes("rallonge")) {
        materiels = [...materiels, `${nbrallonge} rallonge`];
      }
      if (selectedMaterials.includes("multi")) {
        materiels = [...materiels, `${nbmulti} multi`];
      }
      try {
        await axios
          .post("/api/reservation/create", {
            email,
            objet,
            lieu,
            debut,
            fin,
            commentaire,
            materiels: materiels.join(", "),
            userId,
          })
          .then(function (response) {
            window.my_modal_1.close();
            window.my_modal.showModal();
          });
      } catch (e) {
        console.error(e);
      }
    } else setvideMateriels(true);
  };

  return (
    <div className="p-6 px-40">
      <h1 className="text-center text-xl text-gray-900 dark:text-white font-bold mb-6">
        Réservation Matériel
      </h1>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="objet"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Objet *
            </label>
            <input
              type="text"
              id="objet"
              name="objet"
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
              Lieu *
            </label>
            <input
              type="tel"
              id="lieu"
              name="lieu"
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
              Début *
            </label>
            <input
              type="datetime-local"
              id="debut"
              name="debut"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="fin"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fin *
            </label>
            <input
              type="datetime-local"
              id="fin"
              name="fin"
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
            Commentaire
          </label>
          <textarea
            type="textarea"
            id="commentaire"
            name="commentaire"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <h3 className=" text-lg font-medium text-gray-900 dark:text-white">
            Choix des matériels * :
          </h3>
          {videMateriels ? (
            <p className="text-red-500">
              Veuillez choisir au moins un matériel !
            </p>
          ) : (
            <p className="text-red-500  opacity-0">
              Veuillez choisir au moins un matériel !
            </p>
          )}
          <ul className="grid w-full mt-2 gap-x-6 gap-y-1 md:grid-cols-3">
            <li>
              <input
                type="checkbox"
                id="pc"
                name="pc"
                className="hidden peer"
                checked={checkboxValues.pc}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="pc"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-800 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 "
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
              <div className="text-center peer-checked:opacity-100 opacity-0">
                <NumberInputWithButtons value={nbpc} onChange={setnbpc} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="vp"
                name="vp"
                checked={checkboxValues.vp}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <label
                htmlFor="vp"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconVp />
                  </span>
                  <div className="w-full font-semibold">Vidéo Projecteur</div>
                </div>
              </label>
              <div className="text-center peer-checked:opacity-100 opacity-0">
                <NumberInputWithButtons value={nbvp} onChange={setnbvp} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="hp"
                name="hp"
                checked={checkboxValues.hp}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <label
                htmlFor="hp"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconHp />
                  </span>
                  <div className="w-full font-semibold">Haut-parleur</div>
                </div>
              </label>
              <div className="text-center peer-checked:opacity-100 opacity-0">
                <NumberInputWithButtons value={nbhp} onChange={setnbhp} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="vr"
                name="vr"
                checked={checkboxValues.vr}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <label
                htmlFor="vr"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconVr />
                  </span>
                  <div className="w-full font-semibold">Casque VR</div>
                </div>
              </label>
              <div className="text-center peer-checked:opacity-100 opacity-0">
                <NumberInputWithButtons value={nbvr} onChange={setnbvr} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="visio"
                name="visio"
                checked={checkboxValues.visio}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <label
                htmlFor="visio"
                className="  inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconVisio />
                  </span>
                  <div className="w-full font-semibold">Visioconférence</div>
                </div>
              </label>
              <div className="text-center peer-checked:opacity-100 opacity-0">
                <NumberInputWithButtons value={nbvisio} onChange={setnbvisio} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="ap"
                name="ap"
                checked={checkboxValues.ap}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <label
                htmlFor="ap"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 "
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
              <div className="text-center peer-checked:opacity-100 opacity-0">
                <NumberInputWithButtons value={nbap} onChange={setnbap} />
              </div>
            </li>
            <li>
              <input
                type="checkbox"
                id="casque"
                name="casque"
                checked={checkboxValues.casque}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <label
                htmlFor="casque"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconCasque />
                  </span>

                  <div className="w-full font-semibold">Casque Audio</div>
                </div>
              </label>
              <div className="text-center peer-checked:opacity-100 opacity-0">
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
                name="rallonge"
                checked={checkboxValues.rallonge}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <label
                htmlFor="rallonge"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconRallonge />
                  </span>
                  <div className="w-full font-semibold">Rallonge</div>
                </div>
              </label>
              <div className="text-center peer-checked:opacity-100 opacity-0">
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
                name="multi"
                checked={checkboxValues.multi}
                onChange={handleCheckboxChange}
                className="hidden peer"
              />
              <label
                htmlFor="multi"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="flex flex-col items-center">
                  <span className=" w-12 h-12">
                    <IconMulti />
                  </span>
                  <div className="w-full font-semibold">Multiprise</div>
                </div>
              </label>
              <div className="text-center peer-checked:opacity-100 opacity-0">
                <NumberInputWithButtons value={nbmulti} onChange={setnbmulti} />
              </div>
            </li>
          </ul>
        </div>
        <div className="text-start">
          <p className="text-gray-900 dark:text-white">
            * Assurez-vous de compléter tous les champs obligatoires
          </p>
        </div>
        <button
          type="submit"
          className="mt-6 px-10 py-3  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Envoyer
        </button>
      </form>
      <dialog id="my_modal_1" className="modal text-center">
        <form
          method="dialog"
          className="modal-box bg-transparent shadow-none  "
        >
          <h3 className="font-bold text-black dark:text-white text-3xl">
            En cours d&apos;envoi
          </h3>
          <p className="py-4">
            <span className="loading text-black dark:text-white loading-dots loading-lg"></span>
          </p>
        </form>
      </dialog>

      <dialog id="my_modal" className="modal text-center">
        <form
          method="dialog"
          className="modal-box bg-transparent shadow-none  "
        >
          <h3 className="font-bold text-black dark:text-white text-3xl">
            Demande bien reçu !{" "}
          </h3>

          <div className="modal-action justify-center">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn dark:bg-white dark:text-black">
              D&apos;accord
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
