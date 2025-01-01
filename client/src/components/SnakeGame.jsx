// src/components/SnakeGame.jsx
import React, { useState } from "react";

const CHOICES = ["Taş", "Kağıt", "Makas"];

const SnakeGame = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const handleUserChoice = (choice) => {
    const compChoice = CHOICES[Math.floor(Math.random() * 3)];
    setUserChoice(choice);
    setComputerChoice(compChoice);

    const outcome = determineWinner(choice, compChoice);
    setResult(outcome);
  };

  // Taş-Kağıt-Makas kuralları
  const determineWinner = (user, computer) => {
    if (user === computer) {
      return "Berabere!";
    }
    if (
      (user === "Taş" && computer === "Makas") ||
      (user === "Kağıt" && computer === "Taş") ||
      (user === "Makas" && computer === "Kağıt")
    ) {
      return "Kazandınız!";
    }
    return "Kaybettiniz!";
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Taş - Kağıt - Makas</h2>

      <div className="flex gap-4 mb-6">
        {CHOICES.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => handleUserChoice(choice)}
            className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors text-lg font-semibold"
          >
            {choice}
          </button>
        ))}
      </div>

      {/* Sonuç Görüntüleme */}
      {userChoice && (
        <div className="mb-4 text-center">
          <p className="text-lg">
            <span className="font-semibold">Sizin Seçiminiz:</span> {userChoice}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Bilgisayarın Seçimi:</span>{" "}
            {computerChoice}
          </p>
          <p className="text-xl font-bold mt-2">
            {result}
          </p>
        </div>
      )}

      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white hover:scale-105 transition-transform"
      >
        Yeniden Başlat
      </button>
    </div>
  );
};

export default SnakeGame;
