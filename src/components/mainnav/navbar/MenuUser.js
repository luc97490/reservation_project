import Link from "next/link";

export default function MenuUser() {
  return (
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto "
      id="mobile-menu-2"
    >
      <ul className="flex text-black dark:text-white flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-none">
        <li>
          <Link href="/reserver">Reserver</Link>
        </li>
        <li>
          <Link href="/mes-reservations">Mes demandes</Link>
        </li>
        <li>
          <Link href="/mes-reservations-encours">
            Mes réservations attribués
          </Link>
        </li>
        <li>
          <Link href="/mes-reservations-rendues">
            Historique des réservations
          </Link>
        </li>
      </ul>
    </div>
  );
}
