import React from "react";

export function AlertModelUpdate() {
  return (
    <dialog id="modalMessageUpdate" className="modal">
      <form
        method="dialog"
        className="modal-box bg-white dark:bg-primary-dark text-black dark:text-white"
      >
        <h3 className="font-bold text-red-700 text-lg">Attention !</h3>
        <p className="my-3">
          L&apos;enregistrement n&apos;a pas pu être effectué !
        </p>
        <div
          className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>Veuillez vérifier les points suivants :</p>
          <ul className="list-disc ml-4">
            <li>Nom de matériel déjà existant</li>
            <li>Problème d&apos;accès à internet</li>
            <li>Problème de navigateur</li>
          </ul>
        </div>
        <p className="my-3">
          Si le problème persiste, veuillez contacter le developpeur Web
        </p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn dark:bg-white bg-primary-dark  dark:text-black text-white">
            D&apos;accord
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop ">
        <button>D&apos;accord</button>
      </form>
    </dialog>
  );
}
export function AlertModelDelete() {
  return (
    <dialog id="modalMessageDelete" className="modal">
      <form
        method="dialog"
        className="modal-box bg-white dark:bg-primary-dark text-black dark:text-white"
      >
        <h3 className="font-bold text-red-700 text-lg">Attention !</h3>
        <p className="my-3">La suppression n&apos;a pas pu être effectué !</p>
        <div
          className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>Veuillez vérifier les points suivants :</p>
          <ul className="list-disc ml-4">
            <li>
              {" "}
              Si un ou plusieurs matériels sont liés à ce modèle, la suppression
              ne sera pas possible.
            </li>
            <li>Problème d&apos;accès à internet</li>
            <li>Problème de navigateur</li>
          </ul>
        </div>
        <p className="my-3">
          Si le problème persiste, veuillez contacter le developpeur Web
        </p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn dark:bg-white bg-primary-dark  dark:text-black text-white">
            D&apos;accord
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop ">
        <button>D&apos;accord</button>
      </form>
    </dialog>
  );
}
