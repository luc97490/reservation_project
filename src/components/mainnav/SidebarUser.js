"use client";
import Link from "next/link";
import Logo from "../ui/Logo";

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
          </ul>
        </div>
      </aside>
    </>
  );
}
