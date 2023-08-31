"use client";
import React, { useEffect, useState } from "react";
import NumberInputWithButtons from "./NumberInputWithButtons";
import {
  IconAp,
  IconCasque,
  IconHp,
  IconPortable,
  IconVisio,
  IconVp,
  IconVr,
} from "@/components/ui/Icons";
import Select from "react-tailwindcss-select";
import axios from "axios";

export default function BoxType({ dataMateriel, setdataMateriel, nbs, type }) {
  const icons = {
    pc: <IconPortable />,
    vp: <IconVp />,
    hp: <IconHp />,
    visio: <IconVisio />,
    vr: <IconVr />,
    casque: <IconCasque />,
    ap: <IconAp />,
  };
  const labels = {
    pc: "Ordinateur Portable",
    vp: "Vidéo projecteur",
    hp: "Haut-Parleur",
    visio: "Visioconférence",
    vr: "Casque VR",
    casque: "Casque Audio",
    ap: "Appareil Photo",
  };

  const [materiel, setmateriel] = useState([]);
  const [nb, setNb] = useState(1);
  const [select, setselect] = useState([]);

  function handleDataChange(champs, value) {
    setdataMateriel((prev) => ({
      ...prev,
      [champs + type]: value,
    }));
  }

  useEffect(() => {
    setNb(nbs);
    function getMateriel() {
      axios
        .post("/api/materiels/getType", {
          type: labels[type],
        })
        .then(async (response) => {
          setmateriel(
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
    function renderSelects() {
      const selects = [];
      for (let i = 0; i < nb; i++) {
        selects.push(
          <Select
            isSearchable={true}
            placeholder={dataMateriel[`materiel${i}${type}`] || ""}
            options={materiel}
            key={i}
            onChange={(e) => {
              handleDataChange(`id${i}`, e.value),
                handleDataChange(`materiel${i}`, e.label);
            }}
            classNames={{
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-gray-500  rounded-lg shadow-sm transition-all dark:text-white text-black duration-300 focus:outline-none ${
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
        );
      }

      setselect(selects);
    }
    renderSelects();
  }, [nb, materiel, dataMateriel]);

  return (
    <div>
      <label
        htmlFor="pc"
        className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="flex flex-col items-center">
          <span className=" w-12 h-12">{icons[type]}</span>
          <div className="w-full font-semibold">{labels[type]}</div>
        </div>
      </label>
      <div className="text-center">
        <NumberInputWithButtons value={nb} onChange={setNb} />
      </div>
      {select}
    </div>
  );
}
