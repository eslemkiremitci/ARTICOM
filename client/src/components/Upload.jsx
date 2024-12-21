import React from 'react';

const Upload = () => {
    const handleClick = () => {
        // Burada isterseniz kullanıcıyı sayfanın başına götürebilir veya header bileşenine yönlendirebilirsiniz.
        // Örneğin sayfa en üste kaydırma:
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="p-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Hadi Dene</h2>
            <button
                onClick={handleClick}
                className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-10 py-4 text-lg rounded-full cursor-pointer hover:scale-105 transition-all"
            >
                Oluşturmaya Başla
            </button>
        </div>
    );
};

export default Upload;
