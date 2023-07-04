import React from "react";

export default function Table() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between px-2 py-4 bg-white dark:bg-gray-800">
        <DropdownFilter />

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IconSearch />
          </div>
          <input
            type="text"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="/docs/images/people/profile-picture-1.jpg"
                alt="Jese image"
              />
              <div className="pl-3">
                <div className="text-base font-semibold">Neil Sims</div>
                <div className="font-normal text-gray-500">
                  neil.sims@flowbite.com
                </div>
              </div>
            </th>
            <td className="px-6 py-4">React Developer</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                Online
              </div>
            </td>
            <td className="px-6 py-4">
              {/* Modal toggle */}
              <a
                href="#"
                type="button"
                data-modal-target="editUserModal"
                data-modal-show="editUserModal"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit user
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="Jese image"
              />
              <div className="pl-3">
                <div className="text-base font-semibold">Bonnie Green</div>
                <div className="font-normal text-gray-500">
                  bonnie@flowbite.com
                </div>
              </div>
            </th>
            <td className="px-6 py-4">Designer</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                Online
              </div>
            </td>
            <td className="px-6 py-4">
              {/* Modal toggle */}
              <a
                href="#"
                type="button"
                data-modal-show="editUserModal"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit user
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="/docs/images/people/profile-picture-2.jpg"
                alt="Jese image"
              />
              <div className="pl-3">
                <div className="text-base font-semibold">Jese Leos</div>
                <div className="font-normal text-gray-500">
                  jese@flowbite.com
                </div>
              </div>
            </th>
            <td className="px-6 py-4">Vue JS Developer</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                Online
              </div>
            </td>
            <td className="px-6 py-4">
              {/* Modal toggle */}
              <a
                href="#"
                type="button"
                data-modal-show="editUserModal"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit user
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="/docs/images/people/profile-picture-5.jpg"
                alt="Jese image"
              />
              <div className="pl-3">
                <div className="text-base font-semibold">Thomas Lean</div>
                <div className="font-normal text-gray-500">
                  thomes@flowbite.com
                </div>
              </div>
            </th>
            <td className="px-6 py-4">UI/UX Engineer</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                Online
              </div>
            </td>
            <td className="px-6 py-4">
              {/* Modal toggle */}
              <a
                href="#"
                type="button"
                data-modal-show="editUserModal"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit user
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="/docs/images/people/profile-picture-4.jpg"
                alt="Jese image"
              />
              <div className="pl-3">
                <div className="text-base font-semibold">Leslie Livingston</div>
                <div className="font-normal text-gray-500">
                  leslie@flowbite.com
                </div>
              </div>
            </th>
            <td className="px-6 py-4">SEO Specialist</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />{" "}
                Offline
              </div>
            </td>
            <td className="px-6 py-4">
              {/* Modal toggle */}
              <a
                href="#"
                type="button"
                data-modal-show="editUserModal"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit user
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
