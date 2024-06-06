import axios from "axios";

export default function ModalRendu({ attribution, setRefresh }) {
  function updatedAttribution(data) {
    const remarque = data.get("commentaire")?.valueOf();
    const etat = data.get("etat")?.valueOf();

    axios
      .put("/api/asign/ponctuelle/update", {
        id: attribution.id,
        remarque,
        rendu: true,
      })
      .then(async (response) => {
        await axios
          .put("/api/materiels/update", {
            id: attribution.materiel.id,
            etat,
          })
          .then(async (response) => {
            setRefresh(true);
          });
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }
  return (
    <>
      <button
        className="btn btn-ghost btn-xs "
        onClick={() => window[`rendu${attribution.id}`].showModal()}
      >
        rendre
      </button>

      <dialog id={`rendu${attribution.id}`} className="modal">
        <form
          action={updatedAttribution}
          className="modal-box bg-white dark:bg-primary-dark "
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => window[`rendu${attribution.id}`].close()}
          >
            ✕
          </button>
          <label
            htmlFor="commentaire"
            className="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
          >
            Observations
            <input
              type="text"
              id="commentaire"
              name="commentaire"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Observations..."
            />{" "}
          </label>
          <label
            htmlFor="etat"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Etat
            <select
              id="etat"
              name="etat"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled defaultValue="Disponible">
                L&apos;état du matériel?
              </option>
              <option value="Disponible">Disponible</option>
              <option value="En réservation">En réservation</option>
              <option value="En prêt">En prêt</option>
              <option value="En réparation">En réparation</option>
              <option value="Dégât modéré">Dégât modéré</option>
              <option value="Dégât important">Dégât important</option>
              <option value="Indisponible">Indisponible</option>
              <option value="Hors service">Hors service</option>
              <option value="Retiré du service">Retiré du service</option>
              <option value="Introuvable">Introuvable</option>
              <option value="Volé">Volé</option>
            </select>{" "}
          </label>
          <div className="modal-action">
            <button className="btn bg-secondary-dark dark:bg-secondary-light dark:text-black text-white">
              Rendre
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
