import React from 'react';

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-40">
      {/* Başlık */}
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10 bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Articom Nasıl Kullanılır?
      </h1>

      {/* Video */}
      <div className="flex justify-center items-center">
        <iframe
          className="w-full max-w-4xl h-72 md:h-96 lg:h-[500px] rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/XC3ahd6Di3M?rel=0&autoplay=1"
          title="Articom Tanıtım Videosu"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Steps;
