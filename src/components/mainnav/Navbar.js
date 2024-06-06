"use client";
import Link from "next/link";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import MenuAdmin from "@/components/mainnav/navbar/MenuAdmin";
import MenuUser from "./navbar/MenuUser";
import { useEffect, useState } from "react";
export default function Navbar({ isButtonClicked }) {
  const mlNav = isButtonClicked ? "ml-24" : "ml-72";

  const [role, setRole] = useState("");
  const [image, setimage] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setimage(localStorage.getItem("image"));
  }, []);
  function logout() {
    localStorage.clear();
  }

  return (
    <nav
      className={`fixed top-0 left-0 z-40 ${mlNav} w-[fill-available] rounded-t-xl h-20 border bg-secondary-light border-b border-border-light dark:bg-secondary-dark dark:border-border-dark`}
    >
      <div className=" flex items-center justify-between gap-10 mx-auto py-4 px-10">
        {["Admin", "SuperAdmin"].includes(role) ? <MenuAdmin /> : <MenuUser />}

        <div className="flex items-center gap-5">
          <Flowbite>
            <DarkThemeToggle />
          </Flowbite>
          {role ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={image} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                {/* <li>
                  <a className="justify-between">Profil</a>
                </li> */}

                <li>
                  <a href="/" onClick={logout}>
                    Se déconnecter
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="sign-in" className="btn">
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
