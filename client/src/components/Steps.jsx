import React from 'react';

const Steps = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Articom Nasıl Kullanılır?
      </h1>

      <div className="flex justify-center items-center">
        <iframe
          className="w-full max-w-4xl h-72 md:h-96 lg:h-[500px] rounded-lg shadow-lg border border-gray-700"
          src="https://www.youtube.com/embed/G4Qqa7LvD_0"
          title="Articom Tanıtım Videosu"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Steps;
