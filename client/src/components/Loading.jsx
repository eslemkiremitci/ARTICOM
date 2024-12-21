import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500"></div>
      <p className="ml-4 text-lg font-semibold">Lütfen bekleyin...</p>
    </div>
  );
};

export default Loading;
