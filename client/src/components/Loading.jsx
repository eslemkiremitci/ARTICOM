import React, { useState, useEffect, useRef } from "react";
import Game from "./Game";

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  // 1) 1 saniyede bir %1 artarak %98'e kadar yükselsin
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 98 ? prev + 1 : 98));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2) %98'e ulaştıktan 2sn sonra %100'e tamamlansın
  useEffect(() => {
    if (progress === 98) {
      const timer = setTimeout(() => setProgress(100), 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Yazı alanının yüksekliğini ölç
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <div className="overflow-y-auto max-h-screen w-full px-4 pt-4 pb-10">
        {/* ----- Üstteki Büyük Kutu ----- */}
        <div
          ref={contentRef}
          className={`
            mx-auto mt-1 w-full max-w-[1300px] 
            bg-gradient-to-br from-[#1f1f1f]/60 via-[#262626]/60 to-[#1f1f1f]/60 
            backdrop-blur-md border border-gray-700/50
            rounded-2xl shadow-2xl 
            px-8 py-10 sm:py-12 text-center
            transition-all duration-500
          `}
          style={{
            minHeight: `${contentHeight}px`, // Yazıya göre genişlesin
          }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 drop-shadow-lg">
            Stable Diffusion &amp; ControlNet İşlem Süreci
          </h1>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-4">
            Gelişmiş yapay zekâ modelleri, her pikseli ince ince işleyerek arka
            plan temizliği ve yaratıcı düzenlemeler yapar. Bu süreç bolca hesaplama
            gerektirdiği için bazen 1-2 dakikaya ulaşabilir.
          </p>
          <p className="text-white/70 text-base sm:text-lg font-medium italic max-w-3xl mx-auto">
            “Sabırlı olun; yapay zekâ tam da şu an, size özel mükemmel görselleri oluşturuyor!”
          </p>
        </div>

        {/* ----- Yüklenme Barı ----- */}
        <div className="mt-4 w-full flex flex-col items-center">
          <div className="w-4/5 sm:w-2/3 md:w-1/2 h-4 bg-gray-700 rounded-full overflow-hidden shadow-lg">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-300 text-sm mt-3 font-medium">
            Yükleniyor: %{Math.round(progress)}
          </p>
        </div>

        {/* ----- Minik Oyun ----- */}
        <div className="mt-16 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Beklerken Minik Bir Oyun Oynamak İster misiniz?
          </h2>

          {/* Oyun Kutusu */}
          <div
            className="
            w-[90%] max-w-[800px] 
            bg-gradient-to-tr from-[#2c2c2c] to-[#3b3b3b] 
            rounded-xl shadow-xl border border-gray-700/50
            flex items-center justify-center
            overflow-hidden
          "
          >
            <div className="w-full h-full p-4 sm:p-6 md:p-8">
              <Game />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
