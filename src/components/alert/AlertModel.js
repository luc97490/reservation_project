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
export function AlertModelConnect() {
  return (
    <dialog id="modalMessageConnect" className="modal">
      <form
        method="dialog"
        className="modal-box bg-white dark:bg-primary-dark text-black dark:text-white"
      >
        <h3 className="font-bold text-red-700 text-lg">Attention !</h3>
        <p className="my-3">La connexion n&apos;a pas pu être effectué !</p>
        <div
          className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>Veuillez vérifier les points suivants :</p>
          <ul className="list-disc ml-4">
            <li>
              {" "}
              Les informations d&apos;identification fournies ne sont pas valides.
              (Vérifier l&apos;adresse mail ou le mot de passe)
            </li>
            <li>Problème d&apos;accès à internet.</li>
            <li>Problème de navigateur.</li>
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
export function AlertModelCodePin() {
  return (
    <dialog id="modalMessageCodePin" className="modal">
      <form
        method="dialog"
        className="modal-box bg-white dark:bg-primary-dark text-black dark:text-white"
      >
        <h3 className="font-bold text-red-700 text-lg">Attention !</h3>
        <p className="my-3">Erreur du code de vérification !</p>
        <div
          className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>Veuillez vérifier les points suivants :</p>
          <ul className="list-disc ml-4">
            <li> Vérifier votre adresse mail</li>
            <li>Problème d&apos;accès à internet.</li>
            <li>Problème de navigateur.</li>
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
export function AlertModelErrorMail() {
  return (
    <dialog id="modalMessageErrorMail" className="modal">
      <form
        method="dialog"
        className="modal-box bg-white dark:bg-primary-dark text-black dark:text-white"
      >
        <h3 className="font-bold text-red-700 text-lg">Attention !</h3>
        <p className="my-3">Compte n&apos;existe pas !</p>
        <div
          className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>Veuillez vérifier les points suivants :</p>
          <ul className="list-disc ml-4">
            <li>
              Vérifier votre adresse mail (sans{" "}
              <span className="font-bold">&apos;@mio.re&apos;</span>)
            </li>
            <li>Que vous êtes bien inscrit sur l&apos;application</li>
            <li>Problème d&apos;internet.</li>
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
