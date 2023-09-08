import React from "react";
import ModalUpdateMateriel from "./ModalUpdateMateriel";

export default function RowMateriel({ materiel, setRefresh, modeles }) {
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
    <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="py-3 px-3">{materiel.nom}</td>
      <td className="py-3 px-3">{materiel.specs.modele}</td>
      <td className="flex py-3 items-center">
        <div
          className={`h-2.5 w-2.5 mr-2 rounded-full ${determineColorClass(
            materiel.etat
          )}`}
        />
        {materiel.etat}
      </td>
      <td>
        <ModalUpdateMateriel
          materiel={materiel}
          setRefresh={setRefresh}
          modeles={modeles}
        />
      </td>
    </tr>
  );
}
