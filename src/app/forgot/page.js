import { AlertModelErrorMail } from "@/components/alert/AlertModel";
import Forgot from "@/components/login/Forgot";
import React from "react";

export default function page() {
  return (
    <>
      <AlertModelErrorMail />
      <Forgot />
    </>
  );
}
