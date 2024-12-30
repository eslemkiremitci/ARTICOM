import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
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
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Sonuçlar Bulunamadı
                </h1>
                <p className="text-lg text-gray-300">Lütfen işlemi tekrar deneyin.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
                >
                    Ana Sayfaya Dön
                </button>
            </div>
        );
    }

    const { images, title, description, texts } = resultData;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white px-6 py-12">
            {/* Resim Galerisi */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
                {images.map((imageUrl, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 relative bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={imageUrl}
                            alt={`Sonuç Görseli ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <a
                            href={imageUrl}
                            download={`result_${index}.png`}
                            className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-80 text-sm text-white px-3 py-1 rounded hover:bg-opacity-100 transition"
                        >
                            İndir
                        </a>
                    </div>
                ))}
            </div>

            {/* Çıktılar */}
            <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Çıktılar
                </h1>
                <div className="w-full max-w-4xl text-lg text-gray-300 space-y-4">
                    <div className="p-4 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg">
                        <h3 className="font-bold mb-2 text-gray-200">Başlık</h3>
                        <p>{title}</p>
                    </div>
                    <div className="p-4 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg">
                        <h3 className="font-bold mb-2 text-gray-200">Açıklama</h3>
                        <p>{description}</p>
                    </div>
                    {texts.map((text, index) => (
                        <div key={index} className="p-4 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg">
                            <h3 className="font-bold mb-2 text-gray-200">Metin Çıktısı {index + 1}</h3>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buton */}
            <div className="flex justify-end mt-12">
                <button
                    onClick={() => {
                        localStorage.removeItem('resultData');
                        navigate('/');
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
                >
                    Yeni Bir Deneme Yap
                </button>
            </div>
        </div>
    );
};

export default ResultPage;
