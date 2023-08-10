"use client";

import { GlobalRef } from "@/lib/GlobalRef";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Userfind({ finduser }) {
  const router = useRouter();
  if (finduser) {
    const globalEmail = new GlobalRef("email");
    globalEmail.value = finduser.userfind.email;
    async function getUser() {
      const user = await axios.post("/api/users/findEmail", {
        email: finduser.userfind.email,
      });
      localStorage.setItem("role", user.data.userfind.role);

      // const globalRole = new GlobalRef("role");
      // globalRole.value = user.data.userfind.role;
    }

    getUser();
  }

  return null;
}
