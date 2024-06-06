"use client";
import "./localisation.css";
import * as LR from "@uploadcare/blocks";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import CodePin from "./CodePin";
import { useRouter } from "next/navigation";
import { AlertModelCodePin } from "../alert/AlertModel";

LR.registerBlocks(LR);
const generateRandomFourDigits = () => {
  const randomFourDigits = Math.floor(Math.random() * 10000);
  return randomFourDigits.toString().padStart(4, "0"); // Pour garantir 4 chiffres
};
export default function Registre() {
  const router = useRouter();
  if (localStorage.getItem("id")) {
    router.push("/");
  }
  const [image, setimage] = useState("");
  const [code, setcode] = useState("");
  const [email, setemail] = useState("");
  const [msgExiste, setmsgExiste] = useState("hidden");
  const [erroremail, seterroremail] = useState("hidden");
  const [display, setdisplay] = useState("hidden");
  const [password, setPassword] = useState("");
  const [hidden, sethidden] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsButtonDisabled(e.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsButtonDisabled(e.target.value !== password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterroremail("hidden");
    setmsgExiste("hidden");
    const name = new FormData(e.target).get("email");
    if (name.includes("@")) {
      seterroremail("");
    } else {
      const email = name + "@mio.re";
      setemail(email);
      const password = new FormData(e.target).get("password");
      setPassword(password);
      const code = generateRandomFourDigits();
      setcode(code);
      await axios
        .post("/api/users/verification", { email, code })
        .then(function (response) {
          if (response.data.status) {
            if (response.data.status === "send") {
              sethidden("hidden");
              setdisplay("flex");
            } else if (response.data.status === "existe") {
              setmsgExiste("");
            }
          }
        });
    }
  };
  window.addEventListener("LR_UPLOAD_FINISH", (e) => {
    setimage(e.detail.data[0].cdnUrl);
    console.log("ok");
  });
  window.addEventListener("LR_REMOVE", (e) => {
    setimage("");
    console.log("delete");
  });
  return (
    <>
      <AlertModelCodePin />
      <div className={`h-full ${hidden} flex items-center justify-center`}>
        <form
          onSubmit={handleSubmit}
          className="w-96 shadow-md p-8 rounded-lg bg-white"
        >
          <div className="p-4">
            <h3 className="text-center text-2xl font-bold mb-4">S'inscrire</h3>
            <div className="mt-3">
              <label className="text-gray-700">Adresse Email</label>
              <div className="flex  mt-1">
                <input
                  type="text"
                  name="email"
                  required
                  className="block w-full border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="inline-flex  items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  @mio.re
                </span>
              </div>
              <span
                className={`text-red-500 ${msgExiste} opacity-100 text-sm mt-2`}
              >
                Le compte existe déjà.{" "}
                <Link className=" font-bold" href="/sign-in">
                  Connectez-vous.
                </Link>
              </span>
              <span
                className={`text-red-500 ${erroremail} opacity-100 text-sm mt-2`}
              >
                Enlevez "@mio.re"
              </span>
            </div>
            <div className="mt-1">
              <label className="text-gray-700">Mot de passe</label>
              <input
                type="password"
                name="password"
                required
                className="block w-full mt-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="mt-3">
                <label className="text-gray-700">
                  Confirmer le Mot de passe
                </label>
                <input
                  type="password"
                  required
                  className="block w-full mt-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <div className="mt-3">
                <label className="text-gray-700">Image de profil</label>
                <lr-config
                  ctx-name="my-uploader"
                  pubkey="b395ae2a4371f05c0c99"
                  maxLocalFileSizeBytes={3000000}
                  multiple={false}
                  imgOnly={true}
                  confirmUpload={false}
                  removeCopyright={true}
                  sourceList="local, camera"
                />
                <lr-file-uploader-regular
                  class="l10n-fr-FR"
                  css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.30.5/web/lr-file-uploader-regular.min.css"
                  ctx-name="my-uploader"
                />
              </div>
              {isButtonDisabled && confirmPassword ? (
                <span className={`text-red-500  opacity-100 text-sm mt-2`}>
                  Les mots de passe ne correspondent pas.
                </span>
              ) : (
                <span className={`text-red-500  opacity-0 text-sm mt-2`}>
                  Les mots de passe ne correspondent pas.
                </span>
              )}
              <div className="mt-4">
                <button
                  type="submit"
                  className={`w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                    isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isButtonDisabled}
                >
                  S'inscrire
                </button>
              </div>
              <p className="text-right mt-2">
                <Link href="sign-in" className="text-blue-500">
                  <span>Se connecter</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <CodePin
        display={display}
        code={code}
        image={image}
        email={email}
        password={password}
      />
    </>
  );
}
