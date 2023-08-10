import axios from "axios";

export default function ModalRendu({ attribution, setRefresh }) {
  function rendreAttributionPermanente(data) {
    const id = data.get("id")?.valueOf();
    const observation = data.get("observation")?.valueOf();
    axios
      .put("/api/permanente/rendu", { id, observation })
      .then(async (response) => {
        setRefresh((prevRefresh) => !prevRefresh);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }
  return (
    <dialog id={`rendre${attribution.id}`} className="modal">
      <form action={rendreAttributionPermanente} className="modal-box">
        <input type="hidden" name="id" value={attribution.id} />
        <h3 className="font-bold text-lg">Observation</h3>
        <textarea
          name="observation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => window[`rendre${attribution.id}`].close()}
        >
          ✕
        </button>

        <div className="modal-action">
          <button
            type="submit"
            className="w-full font-bold text-lg rounded-lg bg-gray-900 hover:bg-slate-200"
          >
            Rendre
          </button>
        </div>
      </form>
    </dialog>
  );
}
