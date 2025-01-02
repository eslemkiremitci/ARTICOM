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

  if (!resultData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Sonuçlar Bulunamadı
        </h1>
        <p className="text-lg text-gray-300">Lütfen işlemi tekrar deneyin.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white px-6 py-12 space-y-12">
      {/* Görseller */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {images.map((img, index) => (
          <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg">
            <img
              src={img}
              alt={`Generated ${index}`}
              className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={img}
                download={`generated_${index}.png`}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-lg hover:scale-105 transform transition"
              >
                İndir
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Metinler */}
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-lg p-10 shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
          Çıktılar
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Title */}
          <div className="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-gray-300 mb-2">Başlık</h3>
            <p className="text-gray-100">{title}</p>
            <button
              onClick={() => handleCopy(title)}
              className="mt-3 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Kopyala
            </button>
          </div>

          {/* Description */}
          <div className="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-gray-300 mb-2">Açıklama</h3>
            <p className="text-gray-100">{description}</p>
            <button
              onClick={() => handleCopy(description)}
              className="mt-3 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Kopyala
            </button>
          </div>

          {/* Stable Prompt */}
          <div className="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-gray-300 mb-2">Stable Prompt</h3>
            <p className="text-gray-100">{stablePrompt}</p>
            <button
              onClick={() => handleCopy(stablePrompt)}
              className="mt-3 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Copy
            </button>
          </div>

          {/* Negative Prompt */}
          <div className="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-gray-300 mb-2">Negative Prompt</h3>
            <p className="text-gray-100">{negativePrompt}</p>
            <button
              onClick={() => handleCopy(negativePrompt)}
              className="mt-3 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
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
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-700 shadow-lg"
        >
          Yeni Bir Deneme Yap
        </button>
      </div>
    </div>
  );
};

export default Result;
