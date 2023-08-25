"use client";

export default function Userfind({ finduser }) {
  if (finduser) {
    if (typeof window !== "undefined" && finduser)
      localStorage.setItem("role", finduser.userfind.role);
  }

  return null;
}
