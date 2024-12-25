// Result.jsx (New, Enhanced Design)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('resultData');
    if (raw) {
      setResultData(JSON.parse(raw));
    }
  }, []);

  if (!resultData) {
    return (
      <div className="p-6">
        <p>Henüz bir sonuç yok. Lütfen önce işlem yapın.</p>
      </div>
    );
  }

  // Aldığımız verileri parçalayalım
  const { images, title, description, stablePrompt, negativePrompt } = resultData;

  // Kopyalama fonksiyonu
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Örneğin react-toastify kullanmak istersen:
        // toast.success("Copied!");
        console.log("Copied!");
      })
      .catch(err => console.error("Clipboard copy failed", err));
  };

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        
        {/* Başlık */}
        <h2 className="text-3xl font-bold mb-8">
          Sonuçlar
        </h2>

        {/* ------- Metin Blokları ------- */}
        <div className="flex flex-col gap-6">

          {/* Title */}
          <div className="p-4 border rounded-lg bg-gray-50 relative">
            <h3 className="font-semibold text-gray-700 mb-2">Başlık (title)</h3>
            <p className="text-gray-800">
              {title}
            </p>
            <button
              onClick={() => handleCopy(title)}
              className="absolute top-2 right-2 text-sm text-blue-500 underline hover:text-blue-700"
            >
              Kopyala
            </button>
          </div>

          {/* Description */}
          <div className="p-4 border rounded-lg bg-gray-50 relative">
            <h3 className="font-semibold text-gray-700 mb-2">Açıklama (description)</h3>
            <p className="text-gray-800 leading-relaxed">
              {description}
            </p>
            <button
              onClick={() => handleCopy(description)}
              className="absolute top-2 right-2 text-sm text-blue-500 underline hover:text-blue-700"
            >
              Kopyala
            </button>
          </div>

          {/* Stable Prompt */}
          <div className="p-4 border rounded-lg bg-gray-50 relative">
            <h3 className="font-semibold text-gray-700 mb-2">Stable Prompt (English)</h3>
            <p className="text-gray-800">
              {stablePrompt}
            </p>
            <button
              onClick={() => handleCopy(stablePrompt)}
              className="absolute top-2 right-2 text-sm text-blue-500 underline hover:text-blue-700"
            >
              Copy Prompt
            </button>
          </div>

          {/* Negative Prompt */}
          <div className="p-4 border rounded-lg bg-gray-50 relative">
            <h3 className="font-semibold text-gray-700 mb-2">Negative Prompt (English)</h3>
            <p className="text-gray-800">
              {negativePrompt}
            </p>
            <button
              onClick={() => handleCopy(negativePrompt)}
              className="absolute top-2 right-2 text-sm text-blue-500 underline hover:text-blue-700"
            >
              Copy Prompt
            </button>
          </div>
        </div>

        {/* ------- Görseller ------- */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Üretilen Görseller</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images && images.map((img, index) => (
              <div key={index} className="border rounded-lg p-2 overflow-hidden bg-gray-50">
                <img
                  src={img}
                  alt={`Generated ${index}`}
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <a
                  href={img}
                  download={`generated_${index}.png`}
                  className="mt-2 inline-block text-blue-600 underline text-sm"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ------- Butonlar (Try Another) ------- */}
        <div className="flex justify-end mt-8">
          <button
            onClick={() => {
              localStorage.removeItem('resultData');
              navigate('/');
            }}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-700"
          >
            Yeni Bir Deneme
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
