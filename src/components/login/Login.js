"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [id, setid] = useState("");
  useEffect(() => {
    setid(localStorage.getItem("id"));
  }, []);
  if (id) {
    router.push("/");
  }

  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsButtonDisabled(e.target.value === "" || email === "");
  };

  const handleEmailChange = (e) => {
    setemail(e.target.value);
    setIsButtonDisabled(e.target.value === "" || password === "");
  };
  const handleSubmit = async (e) => {
    const mail = email + "@mio.re";
    e.preventDefault();
    await axios
      .post("/api/users/connexion", { email: mail, password })
      .then(function (response) {
        if (response.data.status === "ok") {
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("image", response.data.image);
          window.location.reload();
        } else {
          window.modalMessageConnect.showModal();
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
            Connectez-vous
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
          <div className="mt-3">
            <label className="text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="block w-full mt-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Connexion
            </button>
          </div>
          <p className="text-right mt-2">
            <Link href="forgot" className="text-blue-500">
              Mot de passe oublié?
            </Link>
          </p>
          <p className="text-right mt-2">
            <Link href="sign-up" className="text-blue-500">
              <span>S&apos;inscrire</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
