import Link from "next/link";
import React from "react";

export default function MenuAdmin() {
  return (
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto "
      id="mobile-menu-2"
    >
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700">
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/materiels">Matériels</Link>
        </li>
        <li>
          <Link href="/permanente/attribution">Attribution permanente</Link>
        </li>
        <li>
          <Link href="/users">Gestion Utilisateur</Link>
        </li>
      </ul>
    </div>
  );
}
