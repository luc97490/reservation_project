import Link from "next/link";
import Logo from "../ui/Logo";
import {
  IconCalendar,
  IconFacebook,
  IconFolder,
  IconGoupeUser,
  IconHome,
  IconMail,
  IconNew,
  IconSetting,
} from "../ui/Icons";

export default function SidebarUser({ isButtonClicked }) {
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
            <li>
              <Link
                href="https://192.168.0.233/intranet/"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-8 h-8">
                  <IconHome />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Intranet
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://192.168.0.233/agora"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-8 h-8">
                  <IconCalendar />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Agora Agenda
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://mio.re:2096/"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-8 h-8">
                  <IconMail />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Webmail
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://mio.eurecia.com/eurecia"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-8 h-8">
                  <IconGoupeUser />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Eurécia
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://192.168.0.250/glpi/"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-8 h-8">
                  <IconSetting />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Accès à GLPI
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://192.168.0.233/intranet/panneau-daffichage/"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-8 h-8">
                  <IconNew />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Publications MIO
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://192.168.0.233/intranet/publications-facebook-2/"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-8 h-8">
                  <IconFacebook />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  Publications Facebook
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://192.168.0.233/intranet/wikimio/"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <span className=" w-8 h-8">
                  <IconFolder />{" "}
                </span>
                <span
                  className={`flex-1 text-sm whitespace-nowrap ml-3 ${hiddenText}`}
                >
                  WIKIMIO
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
