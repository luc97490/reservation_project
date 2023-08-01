"use client";
import CheckBoxType from "@/components/form/ui/CheckBoxType";
import axios from "axios";
import { useEffect, useState } from "react";

export default function page({ params: { idReservation } }) {
  const [filteredMateriels, setfilteredMateriels] = useState([]);

  useEffect(() => {
    const getReservation = async () => {
      try {
        await axios
          .post("/api/reservation/getOne", {
            id: idReservation,
          })
          .then(function (response) {
            const materiel = response.data.reservations.materiels.split(", ");
            setfilteredMateriels(
              materiel.filter(
                (m) =>
                  m.split(" ")[1] !== "rallonge" && m.split(" ")[1] !== "multi"
              )
            );
          });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    getReservation();
  }, []);

  return (
    <>
      <div className="flex gap-3  justify-evenly flex-wrap">
        {filteredMateriels.map((materiel) => (
          <CheckBoxType
            key={filteredMateriels.indexOf(materiel)}
            nbs={materiel.split(" ")[0]}
            type={materiel.split(" ")[1]}
          />
        ))}
      </div>
    </>
  );
}
