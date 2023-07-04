import Link from "next/link";
import Logo from "../ui/Logo";
import {
  IconAp,
  IconDemande,
  IconEnCours,
  IconHp,
  IconPortable,
  IconRallonge,
  IconRendu,
  IconVisio,
  IconVp,
  IconVr,
} from "../ui/Icons";

export default function SideBar({ isButtonClicked }) {
  const wSide = isButtonClicked ? "w-24" : "w-72";
  const centerIcon = isButtonClicked ? "justify-center" : "mx-7";
  const hiddenText = isButtonClicked
    ? "hidden whitespace-nowrap w-0"
    : "whitespace-nowrap w-auto";

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed top-0  left-0 z-40 ${wSide} overflow-hidden  h-screen rounded-2xl border bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className={`h-full px-3 pb-4 `}>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/" className="w-full">
                <div className="logo h-20 w-full border-b border-border-light dark:border-border-dark rounded-t-2xl h-19 bg-secondary-light dark:bg-secondary-dark flex gap-5 flex-row flex-wrap items-center justify-center">
                  <Logo />
                  <span className={hiddenText}>MIO - RESERVATION</span>
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
                <IconDemande />
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
                <IconEnCours />
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
                <IconRendu />
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
                href="/permante/encours"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <IconEnCours />
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  En cours
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/permante/rendu"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <IconRendu />
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
                <IconPortable />
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
                <IconVp />
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
                <IconHp />
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
                <IconVr />
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
                <IconVisio />
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
                <IconAp />
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Appareil Photo
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/materiels/rallonge"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <IconRallonge />
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Rallonge
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
