"use client";

import { GlobalRef } from "@/lib/GlobalRef";
import axios from "axios";
import { useEffect } from "react";

export default function Userfind({ finduser }) {
  if (finduser) {
    const globalEmail = new GlobalRef("email");
    globalEmail.value = finduser.userfind.email;
    async function getUser() {
      const user = await axios.post("/api/users/findEmail", {
        email: globalEmail.value,
      });
      const globalRole = new GlobalRef("role");
      globalRole.value = user.data.userfind.role;
    }
    useEffect(() => {
      getUser();
    }, [finduser.userfind.email]);
  }

  return null;
}
