import React from "react";

export default function AttributionPermanente() {
  return (
    <div className="p-6 px-40">
      <h1 className="text-center font-bold mb-6">Réservation Matériel</h1>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@mio.re"
            required
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Prénom *
            </label>
            <input
              type="text"
              id="first_name"
              name="prenom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Joe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom *
            </label>
            <input
              type="text"
              id="last_name"
              name="nom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="objet"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Objet *
            </label>
            <input
              type="text"
              id="objet"
              name="objet"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Atelier"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lieu"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Lieu *
            </label>
            <input
              type="tel"
              id="lieu"
              name="lieu"
              placeholder="Saint Paul"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="debut"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Début *
            </label>
            <input
              type="datetime-local"
              id="debut"
              name="debut"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="fin"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fin *
            </label>
            <input
              type="datetime-local"
              id="fin"
              name="fin"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="commentaire"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Commentaire
          </label>
          <textarea
            type="textarea"
            id="commentaire"
            name="commentaire"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="text-start">
          <p>* Assurez-vous de compléter tous les champs obligatoires</p>
        </div>
        <button
          type="submit"
          className="mt-6 px-10 py-3  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
