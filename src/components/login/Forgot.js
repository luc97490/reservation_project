"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Forgot() {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setemail] = useState("");
  const handleEmailChange = (e) => {
    setemail(e.target.value);
    setIsButtonDisabled(e.target.value === "");
  };
  const handleSubmit = async (e) => {
    const mail = email + "@mio.re";
    e.preventDefault();
    await axios
      .post("/api/users/forgot", { email: mail })
      .then(function (response) {
        if (response.data.status === "send") {
          router.push("/sign-in");
        } else {
          window.modalMessageErrorMail.showModal();
        }
      });
  };
  return (
    <div className="h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 shadow-md p-8 rounded-lg bg-white"
      >
        <div className="p-4">
          <h3 className="text-center text-2xl font-bold mb-4">
            Mot de passe oublié
          </h3>
          <div className="mt-3">
            <label className="text-gray-700">Adresse Email</label>
            <div className="flex  mt-1">
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                className="block w-full border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span className="inline-flex  items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                @mio.re
              </span>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Envoyer le mot de passe
            </button>
          </div>

          <p className="text-right mt-2">
            <Link href="sign-up" className="text-blue-500">
              <span>S'inscrire</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
