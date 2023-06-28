import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
export default function Navbar({ isButtonClicked }) {
  const mlNav = isButtonClicked ? "ml-24" : "ml-72";
  const IsLoggedIn = () => {
    return (
      <>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn">Sign in</button>
          </SignInButton>
        </SignedOut>
      </>
    );
  };
  return (
    <nav
      className={`fixed top-0 left-0 z-40  ${mlNav} w-[fill-available] rounded-t-xl h-20 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className=" flex items-center justify-end gap-10 mx-auto p-4">
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto "
          id="mobile-menu-2"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Accueil
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Matériels
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="form-control w-80">
          <input
            type="text"
            placeholder="Recherche"
            className="input bg-primary-light dark:bg-primary-dark input-bordered "
          />
        </div>
        <div className="flex items-center">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn mx-12 rounded-full drop-shadow-2xl border-none bg-primary-light dark:bg-primary-dark btn-circle w-14 h-14 "
            >
              RP
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 border border-border-light dark:border-border-dark shadow shadow-black menu menu-compact dropdown-content rounded-box w-52 bg-secondary-light dark:bg-secondary-dark"
            >
              <li>
                <a>
                  <img src="/asset/icons/key.svg" />
                  Changer de code
                </a>
              </li>
              <li>
                <a>
                  <img src="/asset/icons/out.svg" />
                  Se déconnecter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <IsLoggedIn />
      </div>
    </nav>
  );
}
