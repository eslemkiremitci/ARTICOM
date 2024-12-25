import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [productInfo, setProductInfo] = useState('');
  const [backgroundInfo, setBackgroundInfo] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
  const { getToken } = useAuth(); // Clerk auth

  // Form Submit 
  const handleSubmit = async () => {
    // 1) Basit kontrol
    if (!productInfo || productInfo.trim().split(' ').length < 3) {
      toast.error('Lütfen en az 3 kelimelik ürün açıklaması girin.');
      return;
    }
    if (!selectedImage) {
      toast.error('Lütfen bir resim yükleyin.');
      return;
    }

    try {
      // 2) Clerk token al
      const token = await getToken();

      // 3) FormData oluştur
      const formData = new FormData();
      formData.append('productDescription', productInfo);
      formData.append('backgroundDescription', backgroundInfo);
      formData.append('image', selectedImage);

      // 4) /api/ai/scenario endpointine POST isteği
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/scenario`, {
        method: 'POST',
        headers: {
          token // => server tarafında "authUser" middlewaresinde parse ediliyor
        },
        body: formData
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message || data.error || 'Bir hata oluştu.');
        return;
      }

      // 5) Gelen veriyi localStorage'a kaydediyoruz 
      localStorage.setItem('resultData', JSON.stringify(data));

      // 6) /result sayfasına yönlendiriyoruz
      navigate('/result');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Ürün Görseli ve Açıklama Oluştur</h1>

      {/* Ürün Bilgisi */}
      <label className="block mb-2 text-gray-700">Ürün Açıklaması (min. 3 kelime)</label>
      <input
        type="text"
        value={productInfo}
        onChange={(e) => setProductInfo(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Örneğin: Paslanmaz çelik termos..."
      />

      {/* Opsiyonel Arka Plan */}
      <label className="block mb-2 text-gray-700">Arka Plan İsteği (opsiyonel)</label>
      <input
        type="text"
        value={backgroundInfo}
        onChange={(e) => setBackgroundInfo(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Örneğin: Piknik ortamı..."
      />

      {/* Resim Yükleme */}
      <label className="block mb-2 text-gray-700">Ürün Resmi</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedImage(e.target.files[0])}
        className="mb-6"
      />

      {/* Buton */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Oluştur
      </button>
    </div>
  );
};

export default Home;
