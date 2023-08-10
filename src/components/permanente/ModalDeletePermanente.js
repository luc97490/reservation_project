import axios from "axios";
import React from "react";

export default function ModalDeletePermanente({ attribution, setRefresh }) {
  function deleteReservation(data) {
    const id = data.get("id")?.valueOf();
    axios
      .post("/api/permanente/delete", { id: id })
      .then(async (response) => {
        setRefresh((prevRefresh) => !prevRefresh);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }
  return (
    <dialog id={`delete${attribution.id}`} className="modal">
      <form action={deleteReservation} className="modal-box">
        <input type="hidden" name="id" value={attribution.id} />

        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => window[`delete${attribution.id}`].close()}
        >
          ✕
        </button>

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
      </form>
    </dialog>
  );
}
