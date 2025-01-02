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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {images.slice(0, 2).map((imageUrl, index) => (
                    <div key={index} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={imageUrl}
                            alt={`Sonuç Görseli ${index + 1}`}
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-4 left-4 flex items-center gap-4">
                            <button
                                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full text-sm shadow-md hover:scale-105 transition-transform"
                                onClick={() => navigator.clipboard.writeText(imageUrl)}
                            >
                                Kopyala
                            </button>
                            <a
                                href={imageUrl}
                                download={`result_${index}.png`}
                                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full text-sm shadow-md hover:scale-105 transition-transform"
                            >
                                İndir
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Çıktılar */}
            <div className="flex flex-col items-center text-center bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-lg p-8 shadow-lg">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
                    Çıktılar
                </h1>
                <div className="w-full max-w-4xl grid grid-cols-1 gap-6">
                    <div className="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-lg">
                        <h3 className="font-bold mb-2 text-gray-200">Başlık</h3>
                        <p className="text-gray-300">{title}</p>
                    </div>
                    <div className="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-lg">
                        <h3 className="font-bold mb-2 text-gray-200">Açıklama</h3>
                        <p className="text-gray-300">{description}</p>
                    </div>
                    {texts.map((text, index) => (
                        <div key={index} className="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-lg">
                            <h3 className="font-bold mb-2 text-gray-200">Metin Çıktısı {index + 1}</h3>
                            <p className="text-gray-300">{text}</p>
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
