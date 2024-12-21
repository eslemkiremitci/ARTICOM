import React, { useState } from 'react';

const Header = ({ onSubmit }) => {
  const [productInfo, setProductInfo] = useState('');
  const [backgroundInfo, setBackgroundInfo] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = () => {
    if (productInfo.trim().split(' ').length < 3 || !selectedImage) {
      alert('Lütfen en az 3 kelimelik ürün bilgisi girin ve bir resim yükleyin.');
      return;
    }

    onSubmit(selectedImage, productInfo);
  };

  return (
    <div className="px-6 mt-16 lg:px-28 sm:mt-28">
      {/* -------- Slogan -------- */}
      <p className="text-blue-500 text-center mb-8 text-lg sm:text-xl">
        E-ticaret içeriklerinizi yapay zeka ile yeniden tasarlayın!
      </p>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-y-16 lg:gap-x-16">
        {/* -------- Sol Taraf -------- */}
        <div className="flex-1">
          <h1 className="text-5xl xl:text-6xl font-bold text-gray-800 leading-snug mb-12">
            Ürünlerinizin hikayesini <br />
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              En iyi şekilde anlatın!
            </span>
          </h1>
          <div className="mt-6">
            {/* Ürün Bilgisi Input */}
            <input
              type="text"
              placeholder="Ürün ile ilgili açıklayıcı minimum üç kelime yazınız..."
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              className="w-full p-5 mb-8 text-lg border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {/* Arka Plan Tasarımı Input */}
            <input
              type="text"
              placeholder="Arka plan tasarımı için birkaç kelime yazabilirsiniz (isteğe Bağlı)"
              value={backgroundInfo}
              onChange={(e) => setBackgroundInfo(e.target.value)}
              className="w-full p-5 mb-8 text-lg border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {/* Butonlar */}
            <div className="flex gap-8 mt-4">
              <div>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  hidden
                />
                <label
                  htmlFor="imageUpload"
                  className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-10 py-4 text-lg rounded-full cursor-pointer hover:scale-105 transition-all"
                >
                  Resim Yükle
                </label>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-10 py-4 text-lg rounded-full hover:scale-105 transition-all"
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>

        {/* -------- Sağ Taraf -------- */}
        <div className="flex-1 flex flex-col items-center gap-y-8 mt-8">
          {/* Gif */}
          <div className="w-3/4 max-w-lg">
            <img
              src="resim.png"
              alt="Gif"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          {/* Tanıtıcı Yazı */}
          <div className="text-gray-700 text-lg leading-relaxed text-center">
            <h2 className="font-bold text-2xl mb-4">
              Ürün görsellerinizi ve açıklamalarınızı kolayca iyileştirin!
            </h2>
            <ul className="list-disc pl-6 text-left">
              <li>Arka plan değiştirme</li>
              <li>Görsel kalitesini artırma</li>
              <li>Açıklama ve ürün başlığı üretimi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
