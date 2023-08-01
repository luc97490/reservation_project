import React from "react";
import axios from "axios";
export default function ModalDeleteModele({ spec, setRefresh }) {
  function deleteModele() {
    const id = spec.id;
    axios
      .post("/api/specs/delete", { id: id })
      .then(async (response) => {
        setRefresh(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }
  return (
    <dialog id={`delete${spec.id}`} className="modal">
      <form action={deleteModele} className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          type="button"
          onClick={() => window[`delete${spec.id}`].close()}
        >
          ✕
        </button>
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
      </form>
    </dialog>
  );
}
