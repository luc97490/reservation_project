"use client";
import BoxType from "@/components/form/ui/BoxType";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page({ params: { idReservation } }) {
  const [filteredMateriels, setfilteredMateriels] = useState([]);
  const [dataMateriel, setdataMateriel] = useState({});
  const router = useRouter();
  const onSubmit = (event) => {
    event.preventDefault();
    const idKeys = Object.keys(dataMateriel).filter((key) =>
      key.startsWith("id")
    );
    const materielReservation = idKeys.map((key) => ({
      reservationId: [idReservation][0],
      materielId: dataMateriel[key],
    }));

    axios
      .post("/api/asign/ponctuelle/create", { materielReservation })
      .then(async (response) => {
        router.push("/ponctuelle/demande");
      });
  };

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
      <form onSubmit={onSubmit}>
        <div className="flex gap-3  justify-evenly flex-wrap">
          {filteredMateriels.map((materiel) => (
            <BoxType
              dataMateriel={dataMateriel}
              setdataMateriel={setdataMateriel}
              key={filteredMateriels.indexOf(materiel)}
              nbs={materiel.split(" ")[0]}
              type={materiel.split(" ")[1]}
            />
          ))}
        </div>{" "}
        <button className="btn" type="submit">
          Attribuer
        </button>
      </form>
    </>
  );
}
