"use client";
import IsLoginIn from "@/components/mainnav/navbar/IsLoginInButton";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import MenuAdmin from "@/components/mainnav/navbar/MenuAdmin";
import MenuUser from "./navbar/MenuUser";
import { useEffect, useState } from "react";
export default function Navbar({ isButtonClicked }) {
  const mlNav = isButtonClicked ? "ml-24" : "ml-72";

  const [role, setRole] = useState();
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-40 ${mlNav} w-[fill-available] rounded-t-xl h-20 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className=" flex items-center justify-between gap-10 mx-auto py-4 px-10">
        {["Admin", "SuperAdmin"].includes(role) ? <MenuAdmin /> : <MenuUser />}

        <div className="flex items-center gap-5">
          <Flowbite>
            <DarkThemeToggle className=" border-2 border-base-200" />
          </Flowbite>
          <IsLoginIn />
        </div>
      </div>
    </nav>
  );
}
