import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import ModalDeletePermanente from "./ModalDeletePermanente";
import ModalRendu from "./ModalRendu";

export default function ModalUpdatePermanente({ attribution, setRefresh }) {
  const [materiels, setmateriels] = useState([]);
  const [dataAttribution, setdataAttribution] = useState({});

  useEffect(() => {
    function getMateriel() {
      axios.get("/api/materiels/getAll").then(async (response) => {
        setmateriels(
          response.data.materiels.map(({ id, nom }) => ({
            value: id,
            label: nom,
          }))
        );
      });
    }
    getMateriel();
  }, []);

  useEffect(() => {
    if (attribution) {
      const { id, dateAsign, preparateur } = attribution;
      const dataAttribution = {
        id,
        dateAsign,
        preparateur,
      };
      setdataAttribution(dataAttribution);
    }
  }, []);

  function handleUpdate() {
    axios
      .put("/api/permanente/update", {
        id: dataAttribution.id,
        materielId: dataAttribution["idmateriel"],
        dateAsign: dataAttribution.dateAsign,
        preparateur: dataAttribution.preparateur,
      })
      .then(async (response) => {
        setRefresh((prevRefresh) => !prevRefresh);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }

  function handleDataChange(champs, value) {
    setdataAttribution((prev) => ({
      ...prev,
      [champs]: value,
    }));
  }

  return (
    <>
      <div className="p-0 text-end">
        <button
          className="m-0 mr-px w-6/12 btn  rounded-none rounded-e-lg"
          onClick={() => window[`dialog${attribution.id}`].showModal()}
        >
          &gt;
        </button>
      </div>

      <dialog id={`dialog${attribution.id}`} className="modal">
        <form
          onSubmit={handleUpdate}
          method="dialog"
          className="modal-box bg-white dark:bg-primary-dark px-0 pb-0 overflow-hidden max-w-3xl"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => window[`dialog${attribution.id}`].close()}
          >
            ✕
          </button>
          <div className="px-6">
            <span className="text-lg font-bold">Modification</span>
            <div>
              <label
                htmlFor="materiel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Matériel
              </label>

              <Select
                id="materiel"
                isSearchable={true}
                placeholder={dataAttribution[`materiels`] || ""}
                options={materiels}
                onChange={(e) => {
                  handleDataChange(`idmateriel`, e.value),
                    handleDataChange(`materiels`, e.label);
                }}
                classNames={{
                  menuButton: ({ isDisabled }) =>
                    `flex text-sm border text-gray-500  rounded-lg shadow-sm transition-all dark:text-white text-black duration-300 focus:outline-none ${
                      isDisabled
                        ? "bg-gray-200"
                        : "dark:bg-gray-700  bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                    }`,

                  menu: "absolute z-10 w-full dark:bg-gray-700 bg-white shadow-lg   rounded-lg  py-1 mt-1.5 text-sm text-gray-700",
                  list: " dark:text-white",
                  listItem: ({ isSelected }) =>
                    `block transition duration-200 px-2 py-2 dark:text-white cursor-pointer select-none truncate rounded ${
                      isSelected
                        ? `text-white bg-blue-500`
                        : `text-gray-500 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-secondary-dark hover:text-blue-500`
                    }`,
                  searchBox:
                    "w-full text-center dark:text-white dark:bg-primary-dark",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="objet"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date d'attribution
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"></span>
                <input
                  type="datetime-local"
                  id="dateAsign"
                  name="dateAsign"
                  onChange={(e) =>
                    handleDataChange("dateAsign", e.target.value)
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={
                    dataAttribution["dateAsign"]
                      ? dataAttribution["dateAsign"]
                          .replace("T", " ")
                          .replace("Z", "")
                      : ""
                  }
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="preparateur"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Préparateur
              </label>

              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"></span>
                <input
                  type="text"
                  id="preparateur"
                  name="preparateur"
                  onChange={(e) =>
                    handleDataChange("preparateur", e.target.value)
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={dataAttribution["preparateur"] || ""}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full h-10 mt-10">
            <button
              className="w-full rounded-tr-lg text-center cursor-pointer bg-secondary-dark dark:bg-secondary-light dark:text-black text-white"
              onClick={() => window[`delete${attribution.id}`].showModal()}
            >
              Supprimer{" "}
            </button>

            <button
              onClick={() => window[`rendre${attribution.id}`].showModal()}
              className="w-full rounded-t-lg bg-primary-light border-y border-t border-b-0 dark:bg-black dark:hover:bg-gray- hover:text-white  dark:border-primary-light hover:bg-blue-600 dark:text-white  "
            >
              Rendre
            </button>
            <button
              type="submit"
              className="w-full rounded-tl-lg bg-secondary-dark dark:bg-secondary-light dark:text-black text-white"
            >
              Modifier
            </button>
          </div>
        </form>
        <ModalDeletePermanente
          key={attribution.id}
          attribution={attribution}
          setRefresh={setRefresh}
        />
        <ModalRendu
          key={`rendu${attribution.id}`}
          attribution={attribution}
          setRefresh={setRefresh}
        />
      </dialog>
    </>
  );
}
