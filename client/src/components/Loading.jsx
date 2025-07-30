import React, { useState, useEffect } from "react";
import Game from "./Game";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  // %1 artarak %98'e kadar yüksel
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 98 ? prev + 1 : 98));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // %98'e ulaştıktan sonra %100'e tamamla
  useEffect(() => {
    if (progress === 98) {
      const timer = setTimeout(() => setProgress(100), 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <div className="overflow-y-auto max-h-screen w-full px-4 pt-8 pb-10">
        {/* Üst Kutu */}
        <div
          className="relative mx-auto mt-6 w-full max-w-[900px]
          bg-gradient-to-br from-[#1f1f1f]/70 via-[#262626]/60 to-[#1f1f1f]/70 
          backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl
          px-8 py-8 text-center transition-all duration-500
          hover:shadow-pink-500/50"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-md transition-transform duration-300 hover:scale-105">
            Yapay Zekâ İşlem Süreci
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-[750px] mx-auto">
            Hayal gücünüzü gerçeğe dönüştürmek üzereyiz! Yapay zekâ, sizin için
            her ayrıntıyı işliyor. Lütfen sabırlı olun; sonuçlar yakında hazır
            olacak.
          </p>
        </div>

        {/* Yüklenme Barı */}
        <div className="mt-12 w-full flex flex-col items-center">
          <div
            className="w-4/5 sm:w-2/3 md:w-1/2 h-5 bg-gray-700/60
            rounded-full overflow-hidden shadow-lg border border-gray-600/30
            transition-all duration-300"
          >
            <div
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-400
              h-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-300 text-sm mt-4 font-semibold animate-pulse">
            Yükleniyor: %{Math.round(progress)}
          </p>
        </div>

        {/* Minik Oyun */}
        <div className="mt-16 flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 transition-transform duration-300 hover:scale-105">
            Beklerken Oyun Oynamak İster misiniz?
          </h2>

          <div
            className="w-[90%] max-w-[800px]
            bg-gradient-to-tr from-[#2c2c2c] to-[#3b3b3b]
            rounded-xl shadow-2xl border border-gray-700/50
            flex items-center justify-center overflow-hidden
            hover:shadow-pink-500/50 transition-shadow duration-300"
          >
            <div className="w-full h-full p-6 sm:p-8 md:p-10">
              <Game />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
