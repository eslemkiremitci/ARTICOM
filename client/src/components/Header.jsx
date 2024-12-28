import React, { useState } from 'react';

const Header = ({ onSubmit }) => {
  const [productInfo, setProductInfo] = useState('');
  const [backgroundInfo, setBackgroundInfo] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (productInfo.trim().split(' ').length < 3) {
      newErrors.productInfo = 'Ürün bilgisi alanı minimum 3 kelime olmalıdır.';
    }
    if (!selectedImage) {
      newErrors.image = 'Bir resim yüklemelisiniz.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('productDescription', productInfo);
    formData.append('backgroundDescription', backgroundInfo);
    formData.append('image', selectedImage);

    onSubmit(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrors((prev) => ({ ...prev, image: 'Yalnızca PNG veya JPG formatında resim yükleyin.' }));
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-800 px-6 py-16 lg:px-28">
      {/* Blur Effektini Uygulayan Arka Plan */}
      {focusedField && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10"></div>
      )}

      {/* İçerik */}
      <div className={`relative z-20 ${focusedField ? 'pointer-events-none' : ''}`}>
        {/* -------- Slogan -------- */}
        <p className="text-center text-lg sm:text-xl text-gray-600 mb-8 tracking-wide">
          Zarif ve sade tasarım ile ürünlerinizi öne çıkarın.
        </p>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-y-16 lg:gap-x-16">
          {/* -------- Sol Taraf -------- */}
          <div className="flex-1">
            <h1 className="text-4xl xl:text-6xl font-semibold leading-tight mb-12 text-center lg:text-left">
              Ürünlerinizi <br />
              <span className="text-gray-800">Özenle Sunun</span>
            </h1>

            <div className="mt-6 space-y-6">
              {/* Ürün Bilgisi Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün ile ilgili açıklayıcı minimum üç kelime yazınız..."
                  value={productInfo}
                  onChange={(e) => setProductInfo(e.target.value)}
                  onFocus={() => setFocusedField('productInfo')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-5 text-lg bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:shadow-lg transition-all"
                />
                {errors.productInfo && (
                  <p className="text-red-500 text-sm mt-2">{errors.productInfo}</p>
                )}
              </div>

              {/* Arka Plan Bilgisi Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Arka plan tasarımı için birkaç kelime yazabilirsiniz (isteğe bağlı)"
                  value={backgroundInfo}
                  onChange={(e) => setBackgroundInfo(e.target.value)}
                  onFocus={() => setFocusedField('backgroundInfo')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-5 text-lg bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:shadow-lg transition-all"
                />
              </div>

              <div className="flex gap-8 mt-4 justify-center lg:justify-start">
                <div>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                  <label
                    htmlFor="imageUpload"
                    className="inline-block bg-gray-800 text-white px-10 py-4 text-lg rounded-lg cursor-pointer transition-transform hover:scale-105"
                  >
                    Resim Yükle
                  </label>
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-2">{errors.image}</p>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-gray-800 text-white px-10 py-4 text-lg rounded-lg transition-transform hover:scale-105"
                >
                  Oluştur
                </button>
              </div>
            </div>
          </div>

          {/* -------- Sağ Taraf -------- */}
          <div className="flex-1 flex flex-col items-center gap-y-8">
            <div className="w-3/4 max-w-md bg-gray-100 rounded-xl p-6 shadow-md border-2 border-gray-300">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Seçilen Görsel"
                  className="w-full rounded-xl shadow-sm"
                />
              ) : (
                <p className="text-gray-600 text-center">Seçtiğiniz görsel burada görünecek.</p>
              )}
            </div>
            <div className="text-lg leading-relaxed text-center text-gray-600">
              <h2 className="font-semibold text-2xl mb-6 text-gray-700">
                Basit ve Kullanışlı
              </h2>
              <ul className="list-none space-y-4">
                <li className="flex items-center gap-3">
                  <span className="bg-gray-800 w-4 h-4 rounded-full"></span>
                  Arka plan değiştirme
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-gray-800 w-4 h-4 rounded-full"></span>
                  Görsel kalitesini artırma
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-gray-800 w-4 h-4 rounded-full"></span>
                  Ürün başlığı ve açıklama oluşturma
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
