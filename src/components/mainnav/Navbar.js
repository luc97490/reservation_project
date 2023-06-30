import IsLoginIn from "@/components/mainnav/navbar/IsLoginInButton";
import Menu from "@/components/mainnav/navbar/Menu";
export default function Navbar({ isButtonClicked }) {
  const mlNav = isButtonClicked ? "ml-24" : "ml-72";
  return (
    <nav
      className={`fixed top-0 left-0 z-40 ${mlNav} w-[fill-available] rounded-t-xl h-20 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className=" flex items-center justify-end gap-10 mx-auto p-4">
        <Menu />
        <div className="form-control w-80">
          <input
            type="text"
            placeholder="Recherche"
            className="input bg-primary-light dark:bg-primary-dark input-bordered "
          />
        </div>
        <IsLoginIn />
      </div>
    </nav>
  );
}
