import React, { useState, useRef } from "react";
import { FaMusic, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import musicFile from "../assets/music/1.mp3";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Müzik oynatma/durdurma
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Ses seviyesi ayarı
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="w-full relative bg-gray-800 text-white p-4 flex justify-center items-center shadow-md">
      {/* Ortadaki buton ve metin */}
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlayPause}
          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-md text-white hover:scale-110 transition-transform"
          aria-label="Müzik oynat/durdur"
        >
          <FaMusic size={20} />
        </button>
        <span className="text-sm">
          {isPlaying ? "Durdur" : "Başlat"}
        </span>
      </div>

      {/* Sağdaki ses kontrolü */}
      <div className="absolute right-4 flex items-center gap-2">
        <FaVolumeDown size={16} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-32 h-2 bg-gray-600 rounded-lg cursor-pointer"
        />
        <FaVolumeUp size={16} />
      </div>

      {/* Audio Elemanı */}
      <audio ref={audioRef} src={musicFile} loop />
    </div>
  );
};

export default MusicPlayer;
