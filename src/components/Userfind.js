"use client";
import { GlobalRef } from "@/lib/GlobalRef";
import axios from "axios";

export default function Userfind({ finduser }) {
  if (finduser) {
    const globalEmail = new GlobalRef("email");
    globalEmail.value = finduser.userfind.email;
    async function getUser() {
      const user = await axios.post("/api/users/findEmail", {
        email: finduser.userfind.email,
      });
      localStorage.setItem("role", user.data.userfind.role);
    }
    getUser();
  }
  return null;
}
