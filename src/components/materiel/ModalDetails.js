import React from "react";

export default function ModalDetails({ spec }) {
  function determineColorClass(etat) {
    switch (etat) {
      case "Disponible":
        return "bg-green-500"; // Vert pour Disponible
      case "En réservation":
        return "bg-blue-500"; // Bleu pour En réservation
      case "En prêt":
        return "bg-yellow-200"; // Jaune pour En prêt
      case "En réparation":
        return "bg-red-500"; // Rouge pour En réparation
      case "Dégât modéré":
        return "bg-orange-400"; // Orange pour Dégât modéré
      case "Dégât important":
        return "bg-purple-500"; // Violet pour Dégât important
      case "Indisponible":
        return "bg-black"; // Noir pour Indisponible
      case "Hors service":
        return "bg-pink-500"; // Rose pour Hors service
      case "Retiré du service":
        return "bg-gray-300"; // Gris clair pour Retiré du service
      case "Introuvable":
        return "bg-gray-400"; // Gris moyen pour Introuvable
      case "Volé":
        return "bg-red-700"; // Rouge foncé pour Volé
      default:
        return "bg-gray-500"; // Couleur par défaut pour les autres états
    }
  }

  return (
    <>
      <button
        className="btn btn-ghost btn-xs "
        onClick={() => window[`details${spec.id}`].showModal()}
      >
        détails
      </button>

      <dialog id={`details${spec.id}`} className="modal">
        <div className="modal-box bg-white dark:bg-primary-dark  text-black dark:text-white">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => window[`details${spec.id}`].close()}
          >
            ✕
          </button>
          <span className="text-lg font-bold">
            Les materiels associés au modèle : {spec.modele}
          </span>
          <table className="table-normal text-center  mt-4 w-full">
            <tbody>
              {spec.materiels.map((materiel) => (
                <tr className="h-8" key={materiel.id}>
                  <td className="w-1/2 ">{materiel.nom}</td>

                  <td className=" p-2 flex items-center gap-3 ">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${determineColorClass(
                        materiel.etat
                      )}`}
                    />
                    <span>{materiel.etat}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </dialog>
    </>
  );
}
