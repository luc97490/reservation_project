import React from "react";
import ModalUpdateMateriel from "./ModalUpdateMateriel";

export default function RowMateriel({ materiel, setRefresh, modeles }) {
  return (
    <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="py-3 px-3">{materiel.nom}</td>
      <td className="py-3 px-3">{materiel.specs.modele}</td>
      <td className="flex py-3 items-center">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
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
