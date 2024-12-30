import React, { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer'; // Müzik oynatıcı bileşeni içe aktar
import { FaBrain, FaMagic } from 'react-icons/fa'; // Eğlenceli bilgi ve animasyon ikonları

const Loading = ({ progressData, funFactsApi }) => {
  // Eğlenceli bilgiler
  const [funFact, setFunFact] = useState('Yapay zeka şu an büyüsünü gerçekleştiriyor!');
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('İlk aşama başlıyor...');

  useEffect(() => {
    // Eğlenceli bilgileri düzenli olarak güncelle
    const factInterval = setInterval(() => {
      if (funFactsApi && funFactsApi.length > 0) {
        setFunFact(
          funFactsApi[Math.floor(Math.random() * funFactsApi.length)]
        );
      }
    }, 5000); // Her 5 saniyede bir bilgi değişir

    // Progress bar ve aşama bilgisini API verisine göre güncelle
    const progressInterval = setInterval(() => {
      if (progressData) {
        setProgress(progressData.percentage);
        setCurrentStage(progressData.stage);
      }
    }, 1000); // Her saniye güncellenir

    return () => {
      clearInterval(factInterval);
      clearInterval(progressInterval);
    };
  }, [funFactsApi, progressData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative">
      {/* Müzik Oynatıcı */}
      <div className="absolute top-4 right-4">
        <MusicPlayer />
      </div>

      {/* Eğlenceli Bilgiler */}
      <div className="flex flex-col items-center justify-center mt-16 px-4 text-center">
        <FaBrain className="text-purple-500 text-5xl mb-4 animate-spin-slow" />
        <h2 className="text-lg md:text-xl font-bold text-gray-100">{funFact}</h2>
      </div>

      {/* Yükleme İlerleme Çubuğu */}
      <div className="w-3/4 md:w-2/3 h-4 bg-gray-700 rounded-full overflow-hidden mt-8">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Aşama Bilgisi */}
      <p className="mt-4 text-gray-300 text-sm">
        Şu anki aşama: {progress < 100 ? currentStage : 'Tamamlandı!'}
      </p>

      {/* Animasyonlar */}
      <div className="mt-12 flex items-center justify-center gap-4">
        <FaMagic className="text-purple-400 text-4xl animate-pulse" />
        <p className="text-gray-400 text-sm italic">Yapay zeka harikalar yaratıyor...</p>
        <FaMagic className="text-pink-400 text-4xl animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
