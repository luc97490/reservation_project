import React from "react";

export default function ModalDetails({ spec }) {
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
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
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
