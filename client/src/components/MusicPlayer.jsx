// src/components/MusicPlayer.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaMusic, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import musicFile from "../assets/music/1.mp3";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    // Otomatik oynatmayı dene (tarayıcı kısıtlaması olabilir)
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
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
    // Artık 'fixed' değil, normal bir DIV olarak akışta yer alıyor
    <div
      className="
        relative mx-auto mt-8 w-fit
        flex items-center gap-6
        px-6 py-3
        bg-black/60 rounded-full
        shadow-xl backdrop-blur-md
      "
    >
      {/* Play/Pause Butonu ve Durum Yazısı */}
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlayPause}
          className="
            flex items-center justify-center w-10 h-10
            bg-gradient-to-r from-purple-600 to-pink-500
            rounded-full text-white hover:scale-105 transition-transform
            shadow
          "
          aria-label="Müzik oynat/durdur"
        >
          <FaMusic size={20} />
        </button>
        <span className="text-base text-white font-semibold">
          {isPlaying ? "Durdur" : "Başlat"}
        </span>
      </div>

      {/* Ses Kontrolü */}
      <div className="flex items-center gap-2 text-white">
        <FaVolumeDown size={18} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="
            w-28 h-2
            bg-gray-300 rounded-lg cursor-pointer
            accent-pink-500
          "
        />
        <FaVolumeUp size={18} />
      </div>

      {/* Audio Elemanı (görünmez) */}
      <audio ref={audioRef} src={musicFile} loop />
    </div>
  );
};

export default MusicPlayer;
