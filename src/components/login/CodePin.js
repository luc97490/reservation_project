"use client";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useRef, useState } from "react";

export default function CodePin({ display, image, code, email, password }) {
  const [pins, setPins] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const router = useRouter();
  const handlePinChange = (e, index) => {
    const value = e.target.value;
    const newPins = [...pins];
    newPins[index] = value;

    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    setPins(newPins);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && pins[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleConfirm = async () => {
    const enteredPin = pins.join("");
   
    if (enteredPin === code) {
      try {
        await axios
          .post("/api/users/create", { email, image, password })
        router.push('/');
      } catch (error) {
        console.error('Error creating user:', error);
        // Afficher un message d'erreur si nécessaire
      }
    } else {
      window.modalMessageCodePin.showModal();
    }
  };

  const handleRetour = () => {
    window.location.reload();
  };
  return (
    <div className={` ${display} h-full items-center justify-center`}>
      <div className="bg-white p-8 rounded-md shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-4">Code de vérification</h2>
        <span className=" text-sm">
          Vous avez reçu un code de vérification sur votre mail{" "}
          <span className=" font-bold">{email}</span>
        </span>
        <br />
        <span className=" text-sm"> Entrer le code de vérification</span>
        <div className="flex my-6 justify-center">
          {pins.map((pin, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="tel"
              className="w-12 h-12 font-bold text-black text-center mx-2 border rounded-md focus:outline-none focus:border-indigo-500"
              maxLength={1}
              value={pin}
              onChange={(e) => handlePinChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <div className="flex">
          <button
            onClick={handleRetour}
            className="w-full mt-4 bg-slate-500 hover:bg-slate-600 text-white py-2 rounded-md"
          >
            Retour
          </button>
          <button
            onClick={handleConfirm}
            className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
