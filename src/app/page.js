"use client";
import ReservationNoLogin from "@/components/form/ReservationNoLogin";
import ReservationUser from "@/components/form/ReservationUser";
import { useEffect, useState } from "react";

export default function Home() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);
  return (
    <div>{role === "User" ? <ReservationUser /> : <ReservationNoLogin />} </div>
  );
}
