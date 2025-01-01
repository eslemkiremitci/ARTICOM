// src/components/MusicPlayer.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaMusic, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import musicFile from "../assets/music/1.mp3";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Sayfa açıldığında otomatik oynatmaya çalış (tarayıcı kısıtlaması olabilir)
  useEffect(() => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Otomatik oynatmaya izin verilmezse kullanıcı butona basana kadar bekleyecek
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="absolute top-4 left-0 w-full z-50 flex items-center justify-center bg-transparent">
      {/* Ortada Play/Pause Butonu */}
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlayPause}
          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-md text-white hover:scale-110 transition-transform"
          aria-label="Müzik oynat/durdur"
        >
          <FaMusic size={20} />
        </button>
        <span className="text-sm text-white">
          {isPlaying ? "Durdur" : "Başlat"}
        </span>
      </div>

      {/* Ses Kontrolü - En Sağda */}
      <div className="absolute right-4 flex items-center gap-2">
        <FaVolumeDown size={16} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-2 bg-gray-600 rounded-lg cursor-pointer"
        />
        <FaVolumeUp size={16} />
      </div>

      {/* Audio Elemanı */}
      <audio ref={audioRef} src={musicFile} loop />
    </div>
  );
};

export default MusicPlayer;
