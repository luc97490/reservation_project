"use client";

import { DarkThemeToggle, Flowbite } from "flowbite-react";
import Link from "next/link";
export default function SideBar({ isButtonClicked }) {
  const wSide = isButtonClicked ? "w-24" : "w-72";
  const centerIcon = isButtonClicked ? "justify-center" : "mx-7";
  const hiddenText = isButtonClicked ? "hidden" : "";

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed top-0  left-0 z-40 ${wSide}  h-screen rounded-2xl border bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className={`h-full px-3 pb-4 overflow-y-auto `}>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/" className="w-full">
                <div className="logo h-20 w-full border-b border-border-light dark:border-border-dark rounded-t-2xl h-19 bg-secondary-light dark:bg-secondary-dark flex gap-5 flex-row flex-wrap items-center justify-center">
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                    width="40"
                    height="40"
                  >
                    <g clipPath="url(#a)">
                      <path
                        d="m19 0-.6.2c-.9 0-1.9.4-2.7.9a9.5 9.5 0 0 0-4.8 6c-.2.7-.2.9-.2 2.3 0 1.5 0 1.6.2 2.3.4 1.7 1.2 3.1 2.5 4.3a9.3 9.3 0 0 0 8.9 2.5c3.4-.9 6-3.4 6.8-6.8.2-.7.2-.9.2-2.3a7 7 0 0 0-.2-2.3 9.5 9.5 0 0 0-10-7Zm5.4 6.3.8.8-3.2 3.1-3.2 3.2-1.8-1.8-1.8-1.8.9-.8.8-.8 1 1 .9.9L21 7.8l2.4-2.3.9.8Z"
                        fill="url(#b)"
                      />
                      <path
                        d="M2.3 22.4V33h35.4V11.8h-6.2v.3a11.9 11.9 0 0 1-7.8 8.5 11.8 11.8 0 0 1-15.1-8.4l-.1-.4H2.3v10.6ZM13 24.7v1.2H7v-2.4h6v1.2ZM33 27v3.6H23.5v-7.1H33V27Zm-13 2.4v1.2H7.1v-2.3l6.5-.1H20v1.2Z"
                        fill="url(#c)"
                      />
                      <path
                        d="m26 26-.1 1v1.2H30.6v-2.3H25.9Z"
                        fill="url(#d)"
                      />
                      <path
                        d="M.2 35.4.8 37l1 1.3c.6.6.8.7 1.4 1 1.4.7-.2.7 16.8.7s15.4 0 16.8-.7c.6-.3.8-.4 1.4-1l1-1.3.6-1.6H.2Z"
                        fill="url(#e)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="b"
                        x1="9.3"
                        y1="4.1"
                        x2="36"
                        y2="22.6"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" />
                        <stop offset="1" stopColor="#8B8B8B" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient
                        id="c"
                        x1="-.3"
                        y1="16.5"
                        x2="31.6"
                        y2="53.4"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" />
                        <stop offset="1" stopColor="#8B8B8B" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient
                        id="d"
                        x1="25.5"
                        y1="26.4"
                        x2="28.8"
                        y2="31.1"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" />
                        <stop offset="1" stopColor="#8B8B8B" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient
                        id="e"
                        x1="-2.8"
                        y1="36.3"
                        x2="-.5"
                        y2="50.1"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" />
                        <stop offset="1" stopColor="#8B8B8B" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="a">
                        <path fill="#fff" d="M0 0H40V40H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className={hiddenText}>MIO - RESERVATION</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/demande"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className={`flex-1 whitespace-nowrap ml-3 ${hiddenText}`}>
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className={`flex-1 whitespace-nowrap ml-3 ${hiddenText}`}>
                  Kanban
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                </svg>
                <span className={`flex-1 whitespace-nowrap ml-3 ${hiddenText}`}>
                  Inbox
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className={`flex-1 whitespace-nowrap ml-3 ${hiddenText}`}>
                  Users
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className={`flex-1 whitespace-nowrap ml-3 ${hiddenText}`}>
                  Products
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className={`flex-1 whitespace-nowrap ml-3 ${hiddenText}`}>
                  Sign In
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${centerIcon}`}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className={`flex-1 whitespace-nowrap ml-3 ${hiddenText}`}>
                  Sign Up
                </span>
              </a>
            </li>
            <li>
              <Flowbite>
                <DarkThemeToggle />
              </Flowbite>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
