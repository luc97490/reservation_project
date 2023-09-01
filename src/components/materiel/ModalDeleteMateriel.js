import axios from "axios";

export default function ModalDeleteMateriel({ materiel, setRefresh }) {
  function deleteMateriel() {
    const id = materiel.id;
    axios
      .post("/api/materiels/delete", { id })
      .then(async (response) => {
        setRefresh(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }
  return (
    <dialog id={`delete${materiel.id}`} className="modal">
      <form
        className="modal-box bg-white dark:bg-primary-dark"
        method="dialog"
        onSubmit={deleteMateriel}
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          type="button"
          onClick={() => window[`delete${materiel.id}`].close()}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg">
          Voulez-vous réellement supprimer ce modèle ?
        </h3>

        <div className="flex font-bold justify-around">
          <span>{materiel.modele}</span>
          <span>{materiel.type}</span>
        </div>

        <div className="modal-action">
          <button
            type="submit"
            className="w-full font-bold text-lg rounded-lg bg-gray-900 hover:bg-slate-200"
            onClick={() => {
              window[`delete${materiel.id}`].close();
            }}
          >
            Supprimer définitivement
          </button>
        </div>
      </form>
    </dialog>
  );
}
