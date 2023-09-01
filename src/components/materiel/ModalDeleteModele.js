import React from "react";
import axios from "axios";

export default function ModalDeleteModele({ spec, setRefresh }) {
  function deleteModele() {
    const id = spec.id;
    axios
      .post("/api/specs/delete", { id: id })
      .then(async (response) => {
        if (response.data.message === "fail") {
          window.modalMessageDelete.showModal();
        }
        setRefresh(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }
  return (
    <>
      <dialog id={`delete${spec.id}`} className="modal">
        <form
          action={deleteModele}
          className="modal-box px-0 pb-0 bg-white dark:bg-primary-dark  text-black dark:text-white"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => window[`delete${spec.id}`].close()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg text-black dark:text-white text-center">
            Voulez-vous réellement supprimer ce modèle ?
          </h3>

          <div className="flex mt-4 font-bold justify-around">
            <span className="dark:bg-primary-dark bg-primary-light border  text-black dark:text-white -lg p-2">
              {spec.modele}
            </span>
            <span className="dark:bg-primary-dark bg-primary-light border  text-black dark:text-white -lg p-2">
              {spec.type}
            </span>
          </div>

          <div className="modal-action">
            <button
              type="submit"
              className="w-full font-bold text-lg rounded-lg  dark:bg-white bg-primary-dark  dark:text-black text-white"
            >
              Supprimer définitivement
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
