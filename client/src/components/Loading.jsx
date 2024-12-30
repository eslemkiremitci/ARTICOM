import React, { useState, useEffect } from "react";
import MusicPlayer from "./MusicPlayer"; // Müzik oynatıcı bileşeni içe aktar
import SnakeGame from "./SnakeGame"; // Yeni oyun bileşeni
import { FaBrain } from "react-icons/fa";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  // Progres bar güncelleme
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1.11 : 100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-black text-white relative">
      {/* Müzik Oynatıcı */}
      <div className="absolute top-4 right-4">
        <MusicPlayer />
      </div>

      {/* Açıklama Metni */}
      <div className="text-center mb-8">
        <FaBrain className="text-purple-400 text-5xl mb-4 animate-bounce" />
        <p className="text-lg font-semibold text-gray-300">
          Görselleriniz yüksek kaliteli yapay zeka algoritmalarıyla oluşturuluyor. Lütfen sabırlı olun!
        </p>
      </div>

      {/* Progres Bar */}
      <div className="w-3/4 md:w-2/3 h-4 bg-gray-700 rounded-full overflow-hidden mb-8">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-400 text-sm mb-4">Yükleme durumu: %{Math.round(progress)}</p>

      {/* Yılan Oyunu */}
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-xl font-bold text-gray-200 mb-4">Sıkılmayın! Yılan Oyunu Oynayın 🐍</h2>
        <div className="w-80 h-80 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <SnakeGame />
        </div>
      </div>
    </div>
  );
};

export default Loading;
