"use client";
import RowMateriel from "@/components/materiel/RowMateriel";
import Table from "@/components/materiel/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Vr() {
  const type = "Casque VR";
  const [refresh, setRefresh] = useState();
  const [materiels, setMateriels] = useState([]);

  const [modeles, setModeles] = useState([]);

  useEffect(() => {
    const fetchModeles = async () => {
      try {
        await axios
          .post("/api/specs/getType", { type })
          .then(function (response) {
            setModeles(
              response.data.specs.map((item) => ({
                value: item.id,
                label: item.modele,
              }))
            );
          });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    fetchModeles();
  }, []);

  useEffect(() => {
    setRefresh(false);
    const fetchData = async () => {
      try {
        await axios
          .post("/api/materiels/getType", { type })
          .then(function (response) {
            setMateriels(response.data.materiels);
          });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Table type={type} setRefresh={setRefresh}>
        {materiels.map((materiel) => (
          <RowMateriel
            key={materiel.id}
            materiel={materiel}
            setRefresh={setRefresh}
            modeles={modeles}
          />
        ))}
      </Table>
    </div>
  );
}
