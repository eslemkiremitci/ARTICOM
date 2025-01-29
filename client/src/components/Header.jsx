import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/thumbs';
import { Autoplay, Thumbs } from 'swiper/modules';


const Header = ({ onSubmit }) => {
  const [productInfo, setProductInfo] = useState('');
  const [backgroundInfo, setBackgroundInfo] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    const wordCount = productInfo.trim().split(' ').filter(Boolean).length;

    if (wordCount < 3) {
      setErrorMessage(`Eksik bilgi: ${3 - wordCount} kelime daha gerekli.`);
      return;
    }

    if (!selectedImage) {
      setErrorMessage('Lütfen bir resim yükleyin.');
      return;
    }

    setErrorMessage('');

    const formData = new FormData();
    formData.append('productDescription', productInfo);
    formData.append('backgroundDescription', backgroundInfo);
    formData.append('image', selectedImage);

    onSubmit(formData);
  };

  const images = Array.from({ length: 40 }, (_, index) => `/src/assets/slides/${index + 1}.jpg`);

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white px-6 py-16 lg:px-28 animate-gradient">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-y-16 lg:gap-x-16">
        {/* Sol Taraf */}
        <div className="flex-1">
  <h1 className="text-4xl md:text-6xl font-extrabold leading-[2] mb-6 text-center lg:text-left">
    Yapay Zekâ ile
    <br />
    <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
      Ürününüzün Arka Planını Değiştirin!
    </span>
  </h1>



          <div className="mt-6 space-y-6">
            <input
              type="text"
              placeholder="Ürün ile ilgili açıklayıcı minimum üç kelime yazınız..."
              value={productInfo}
              onChange={(e) => {
                setProductInfo(e.target.value);
                setErrorMessage('');
              }}
              className="w-full p-5 text-lg bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
            />
            {productInfo.trim().split(' ').filter(Boolean).length < 3 && (
              <p className="text-gray-400 text-sm mt-1">
                {3 - productInfo.trim().split(' ').filter(Boolean).length} kelime daha gerekli.
              </p>
            )}

            <input
              type="text"
              placeholder="Arka plan tasarımı için birkaç kelime yazabilirsiniz (isteğe bağlı)"
              value={backgroundInfo}
              onChange={(e) => setBackgroundInfo(e.target.value)}
              className="w-full p-5 text-lg bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
            />

            <div className="flex gap-8 justify-center lg:justify-start">
              <div>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => {
                    setSelectedImage(e.target.files[0]);
                    setErrorMessage('');
                  }}
                  hidden
                />
                <label
                  htmlFor="imageUpload"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-4 text-lg rounded-lg cursor-pointer transition-transform hover:scale-110 hover:translate-y-1 shadow-lg shadow-md"
                >
                  Resim Yükle
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-4 text-lg rounded-lg transition-transform hover:scale-110 hover:translate-y-1 shadow-lg shadow-md"
              >
                Oluştur
              </button>
            </div>

            {errorMessage && (
              <p className="text-gray-400 text-center mt-4">{errorMessage}</p>
            )}
          </div>
        </div>

        {/* Sağ Taraf */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center gap-y-8 w-full h-full justify-center">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              loop={true}
              modules={[Autoplay, Thumbs]}
              className="w-full lg:w-3/4 max-w-lg rounded-xl shadow-2xl border border-gray-700"
              thumbs={{ swiper: thumbsSwiper }}
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={`Slide ${idx + 1}`} className="w-full rounded-xl" />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={5}
              watchSlidesProgress
              modules={[Thumbs]}
              className="w-full max-w-lg"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full rounded-lg border border-gray-500" />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Yüklenen Görselin Önizlemesi */}
            {selectedImage && (
              <div className="flex flex-col items-center mt-8 bg-white/10 backdrop-blur-md rounded-lg p-4 w-full max-w-md mx-auto">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Yüklenen Görsel"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-500"
                />
                <p className="text-lg text-gray-200 font-semibold mt-4">Yüklediğiniz Görsel</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
