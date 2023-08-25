"use client";
import DropdownFilter from "@/components/ui/DropdownFilter";
import { IconSearch } from "@/components/ui/Icons";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function page() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState();

  useEffect(() => {
    setRefresh(false);

    const fetchData = async () => {
      try {
        await axios.get("/api/users/getAll").then(function (response) {
          setUsers(response.data.users);
        });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    fetchData();
  }, [refresh]);
  async function updateRole(data) {
    window.my_modal_1.showModal();
    const id = data.get("id")?.valueOf();
    let role = "";

    if (data.get("role")?.valueOf() === "User") {
      role = "Admin";
    } else {
      role = "User";
    }

    await axios
      .put("/api/users/updateRole", {
        // idSuperAdmin: idSuperAdmin,
        id: id,
        role: role,
      })
      .then(async () => {
        setRefresh(true);
        window.my_modal_1.close();
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }

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
              Nom <div className="font-normal text-gray-500">Email</div>
            </th>
            <th scope="col" className="px-6 py-3">
              Rôle
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={user.image || "/user_no_image.png"}
                  alt="Jese image"
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {" "}
                    <span className=" uppercase">
                      {user.email.split("@")[0].split(".")[0]}
                    </span>
                    <span className="capitalize">
                      {" "}
                      {user.email.split("@")[0].split(".")[1]}{" "}
                    </span>
                  </div>
                  <div className="font-normal text-gray-500">{user.email}</div>
                </div>
              </th>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <form action={updateRole}>
                  <input type="hidden" name="id" value={user.id} />
                  <input type="hidden" name="role" value={user.role} />
                  {user.role === "User" ? (
                    <button
                      type="submit"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Passer Administrateur
                    </button>
                  ) : user.role === "Admin" ? (
                    <button
                      type="submit"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Passer Utilisateur Standard
                    </button>
                  ) : null}
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dialog id="my_modal_1" className="modal text-center">
        <form
          method="dialog"
          className="modal-box bg-transparent shadow-none  "
        >
          <h3 className="font-bold text-black dark:text-white text-3xl">
            En cours
          </h3>
          <p className="py-4">
            <span className="loading text-black dark:text-white loading-dots loading-lg"></span>
          </p>
        </form>
      </dialog>
    </div>
  );
}
