import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("resultData");
    if (raw) {
      setResultData(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    if (resultData) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [resultData]);

  if (!resultData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white px-4">
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
          Sonuçlar Bulunamadı
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-sm leading-relaxed">
          Görünen o ki, işlem verilerine henüz ulaşamadık. Lütfen işlemi
          yeniden deneyin veya anasayfaya dönerek yeni bir aşamadan geçin.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-8 py-3 rounded-lg shadow-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white
                     hover:scale-105 transform transition-all duration-300"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  const { images, title, description, stablePrompt, negativePrompt } = resultData;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Copied!");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white px-6 py-12 space-y-12">
      {/* Görseller */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-2xl
                       bg-gray-800/40 border border-gray-700/50
                       transition-all duration-300 hover:shadow-pink-500/50"
          >
            <img
              src={img}
              alt={`Generated ${index}`}
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <a
                href={img}
                download={`generated_${index}.png`}
                className="px-6 py-2 rounded-lg font-semibold shadow-md
                           bg-gradient-to-r from-purple-500 to-pink-500 text-white
                           hover:scale-105 transform transition-transform duration-300"
              >
                İndir
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Metinler */}
      <div
        className="max-w-screen-lg mx-auto bg-gray-800/70 backdrop-blur-lg rounded-xl p-8 sm:p-10
                   shadow-xl border border-gray-700/40"
      >
        <h1
          className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500
                     bg-clip-text text-transparent drop-shadow-lg"
        >
          ÇIKTILAR
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Title */}
          <div className="p-6 bg-gray-700/80 rounded-xl shadow-lg hover:shadow-pink-500/40 transition-shadow">
            <h3 className="font-bold text-lg text-gray-300 mb-2">Başlık</h3>
            <p className="text-gray-100 break-words whitespace-pre-wrap">{title}</p>
            <button
              onClick={() => handleCopy(title)}
              className="mt-4 text-sm bg-purple-500 text-white px-4 py-2 rounded
                         hover:from-purple-600 hover:to-pink-600 hover:scale-105
                         transition-all duration-300"
            >
              Kopyala
            </button>
          </div>

          {/* Description */}
          <div className="p-6 bg-gray-700/80 rounded-xl shadow-lg hover:shadow-pink-500/40 transition-shadow">
            <h3 className="font-bold text-lg text-gray-300 mb-2">Açıklama</h3>
            <p className="text-gray-100 break-words whitespace-pre-wrap">{description}</p>
            <button
              onClick={() => handleCopy(description)}
              className="mt-4 text-sm bg-purple-500 text-white px-4 py-2 rounded
                         hover:from-purple-600 hover:to-pink-600 hover:scale-105
                         transition-all duration-300"
            >
              Kopyala
            </button>
          </div>

          {/* Stable Prompt */}
          <div className="p-6 bg-gray-700/80 rounded-xl shadow-lg hover:shadow-pink-500/40 transition-shadow">
            <h3 className="font-bold text-lg text-gray-300 mb-2">Stable Prompt</h3>
            <p className="text-gray-100 break-words whitespace-pre-wrap">{stablePrompt}</p>
            <button
              onClick={() => handleCopy(stablePrompt)}
              className="mt-4 text-sm bg-purple-500 text-white px-4 py-2 rounded
                         hover:from-purple-600 hover:to-pink-600 hover:scale-105
                         transition-all duration-300"
            >
              Copy
            </button>
          </div>

          {/* Negative Prompt */}
          <div className="p-6 bg-gray-700/80 rounded-xl shadow-lg hover:shadow-pink-500/40 transition-shadow">
            <h3 className="font-bold text-lg text-gray-300 mb-2">Negative Prompt</h3>
            <p className="text-gray-100 break-words whitespace-pre-wrap">
              {negativePrompt}
            </p>
            <button
              onClick={() => handleCopy(negativePrompt)}
              className="mt-4 text-sm bg-purple-500 text-white px-4 py-2 rounded
                         hover:from-purple-600 hover:to-pink-600 hover:scale-105
                         transition-all duration-300"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Yeni Deneme Butonu */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            localStorage.removeItem("resultData");
            navigate("/");
          }}
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-black px-10 py-4 rounded-full
                     font-semibold hover:scale-105 transition-transform duration-700 shadow-xl
                     hover:shadow-pink-500/40"
        >
          Yeni Bir Deneme Yap
        </button>
      </div>
    </div>
  );
};

export default Result;
