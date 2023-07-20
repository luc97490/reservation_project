import React from "react";
import axios from "axios";
export default function ModalDeleteRow({ reservation, setRefresh }) {
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
  return (
    <dialog id={`delete${reservation.id}`} className="modal">
      <form action={deleteReservation} method="dialog" className="modal-box">
        <input type="hidden" name="id" value={reservation.id} />

        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => window[`delete${reservation.id}`].close()}
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
