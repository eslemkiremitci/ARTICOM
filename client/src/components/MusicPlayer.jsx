import React, { useState, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'; // FontAwesome ikonları
import musicFile from '../assets/music/1.mp3'; // Müzik dosyasını içe aktar

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-4">
      <audio ref={audioRef} src={musicFile} loop />
      <button
        onClick={togglePlayPause}
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-md text-white hover:scale-110 transition-transform"
        aria-label="Müzik oynat/durdur"
      >
        {isPlaying ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
      </button>
    </div>
  );
};

export default MusicPlayer;
