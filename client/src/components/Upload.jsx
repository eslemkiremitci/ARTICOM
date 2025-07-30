import React from 'react';

const Upload = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-8 text-center bg-black w-full">
      <h2 className="text-3xl font-bold mb-8 text-white">Hadi Dene</h2>
      <button
        onClick={handleClick}
        className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-12 py-5 text-lg rounded-lg transition-transform hover:scale-110 hover:translate-y-1 shadow-lg shadow-pink-500/50"
      >
        Oluşturmaya Başla
      </button>
    </div>
  );
};

export default Upload;
