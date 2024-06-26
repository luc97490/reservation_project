import Link from "next/link";
import Logo from "../ui/Logo";
import {
  IconAp,
  IconCasque,
  IconDemande,
  IconEnCours,
  IconHp,
  IconPortable,
  IconRendu,
  IconVisio,
  IconVp,
  IconVr,
} from "../ui/Icons";

export default function SidebarAdmin({ isButtonClicked }) {
  const wSide = isButtonClicked ? "w-24" : "w-72";
  const centerIcon = isButtonClicked ? "justify-center" : "mx-7";
  const hiddenText = isButtonClicked
    ? "hidden whitespace-nowrap w-0"
    : "whitespace-nowrap w-auto";

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed top-0  left-0 z-40 ${wSide} overflow-hidden  h-screen rounded-2xl border bg-primary-light  border-border-light sm:translate-x-0 dark:bg-primary-dark dark:border-border-dark`}
        aria-label="Sidebar"
      >
        <div className={`h-full pb-4 `}>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/" className="w-full">
                <div className="logo h-20 w-full border-b border-border-light dark:border-border-dark rounded-t-2xl h-19 bg-secondary-light dark:bg-secondary-dark flex gap-5 flex-row flex-wrap items-center justify-center">
                  <Logo />
                  <span className={`text-black dark:text-white ${hiddenText}`}>MIO - RESERVATION</span>
                </div>
              </Link>
            </li>

            {/* RESERVATION */}
            <div className=" text-center">
              <span className="text-xs pt-2 mx-auto text-text-light dark:text-text-dark">
                RESERVATION
              </span>
            </div>
            <li>
              <Link
                href="/ponctuelle/demande"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconDemande />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Demande
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/ponctuelle/encours"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconEnCours />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  En cours
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/ponctuelle/rendu"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconRendu />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Rendu
                </span>
              </Link>
            </li>

            <div className="text-xs text-center mx-auto text-text-light dark:text-text-dark">
              <span>PRÊT </span>
              <span className={hiddenText}>À LONGUE DURÉE</span>
            </div>
            {/* PRET */}
            <li>
              <Link
                href="/permanente/encours"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconEnCours />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  En cours
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/permanente/rendu"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconRendu />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Rendu
                </span>
              </Link>
            </li>

            <div className=" text-center">
              <span className="text-xs mx-auto text-text-light dark:text-text-dark">
                MATERIELS
              </span>
            </div>
            {/* MATERIELS */}
            <li>
              <Link
                href="/materiels/pc"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconPortable />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Portable
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/materiels/vp"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconVp />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Vidéo Projecteur
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/materiels/hp"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconHp />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Haut-parleur
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/materiels/vr"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconVr />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Casque VR
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/materiels/visio"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconVisio />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Visioconférences
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/materiels/ap"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconAp />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Appareil Photo
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/materiels/casque"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-5 h-5">
                  <IconCasque />
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Casque Audio
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
