import React, { useState, useEffect } from "react";
import MusicPlayer from "./MusicPlayer"; // Müzik oynatıcı
import SnakeGame from "./SnakeGame"; // Yılan Oyunu
import { FaBrain } from "react-icons/fa";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  // -- 1) Progress bar: 1sn'de 1 puan artarak 98'e ulaşacak (98sn).
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 98 ? prev + 1 : 98));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // -- 2) %98'e gelince 2s bekle, sonra 100'e tamamla.
  useEffect(() => {
    if (progress === 98) {
      const timer = setTimeout(() => setProgress(100), 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      {/* 1. Müzik Çalar */}
      <MusicPlayer />

      {/* 2. İçerik Alanı */}
      <div className="overflow-y-auto max-h-screen w-full px-4">
        {/* Blur Arka Planlı Kutu */}
        <div className="mt-8 bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg max-w-xl mx-auto text-center">
          <FaBrain className="text-purple-400 text-5xl mb-4 animate-bounce mx-auto" />
          <h3 className="text-xl font-bold text-gray-200 mb-4">
            Stable Diffusion & ControlNet İşlem Süreci
          </h3>
          <p className="text-gray-300 text-base mb-2 leading-relaxed">
            Gelişmiş yapay zekâ modelleri, her pikseli ince ince işleyerek
            arka plan temizliği ve yaratıcı düzenlemeler yapar. Bu süreç
            bolca hesaplama gerektirdiği için bazen 1-2 dakikaya ulaşabilir.
          </p>
          <p className="text-gray-300 text-base font-semibold italic">
            “Sabırlı olun; yapay zekâ tam da şu an, size özel mükemmel
            görselleri oluşturuyor!”
          </p>
        </div>

        {/* 3. Progress Bar */}
        <div className="w-3/4 md:w-2/3 h-4 bg-gray-700 rounded-full overflow-hidden my-8 mx-auto">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-400 text-sm mb-4 text-center">
          Yükleniyor: %{Math.round(progress)}
        </p>

        {/* 4. Yılan Oyunu */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-200 mb-4 text-center">
            Beklerken Yılan Oyunu Oynamak İster misiniz? 🐍
          </h2>
          <div className="w-[480px] h-[480px] bg-gray-900 rounded-lg shadow-lg mx-auto overflow-hidden">
            <SnakeGame />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
