"use client";

import ReservationNoLogin from "@/components/form/ReservationNoLogin";
import ReservationUser from "@/components/form/ReservationUser";
import { useEffect, useState } from "react";

export default function PageReservation() {
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedEmail = localStorage.getItem("email");
    setId(storedId);
    setEmail(storedEmail);
  }, []);
  return (
    <div>{id ? <ReservationUser email={email} /> : <ReservationNoLogin />}</div>
  );
}
