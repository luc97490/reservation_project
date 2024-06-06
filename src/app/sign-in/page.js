import { AlertModelConnect } from "@/components/alert/AlertModel";
import Login from "@/components/login/Login";
import React from "react";

export default function page() {
  return (
    <>
      <AlertModelConnect />
      <Login />
    </>
  );
}
