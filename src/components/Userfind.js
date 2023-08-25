"use client";

export default function Userfind({ finduser }) {
  if (finduser) {
    if (localStorage) localStorage.setItem("role", finduser.userfind.role);
  }

  return null;
}
