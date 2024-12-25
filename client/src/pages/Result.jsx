// Result.jsx (New Approach)
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

  const { images, title, description, stablePrompt, negativePrompt } = resultData;

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Oluşan Sonuçlar</h2>
        <p><strong>Başlık:</strong> {title}</p>
        <p><strong>Açıklama:</strong> {description}</p>
        <p><strong>Stable Prompt:</strong> {stablePrompt}</p>
        <p><strong>Negative Prompt:</strong> {negativePrompt}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {images && images.map((img, index) => (
            <div key={index} className="relative border rounded-md p-2">
              <img src={img} alt={`Generated ${index}`} className="w-full h-auto" />
              <a
                href={img}
                download={`generated_${index}.png`}
                className="mt-2 inline-block text-blue-600 underline"
              >
                Download
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-end items-center gap-4 mt-6">
          <button
            onClick={() => {
              localStorage.removeItem('resultData');
              navigate('/');
            }}
            className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700"
          >
            Try another
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
