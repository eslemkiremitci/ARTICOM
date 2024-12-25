import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

// Eski tasarım bileşenleri
import Header from '../components/Header';
import Steps from '../components/Steps';
import SliderPage from '../components/Slider';
import Testimonials from '../components/Testimonials';
import Upload from '../components/Upload';

const Home = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth(); // Clerk auth

  // ----- Eski handleSubmit kodunu "handleHeaderSubmit" olarak uyarlıyoruz -----
  const handleHeaderSubmit = async (formData) => {
    try {
      // FormData içindeki değerleri okuyalım
      const productDescription = formData.get('productDescription');
      const backgroundDescription = formData.get('backgroundDescription');
      const image = formData.get('image'); // File tipinde

      // Basit Kontrol
      if (!productDescription || productDescription.trim().split(' ').length < 3) {
        toast.error('Lütfen en az 3 kelimelik ürün açıklaması girin.');
        return;
      }
      if (!image || image.size === 0) {
        toast.error('Lütfen bir resim yükleyin.');
        return;
      }

      // Clerk token al
      const token = await getToken();

      // /api/ai/scenario endpointine POST
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/scenario`, {
        method: 'POST',
        headers: { token },
        body: formData
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message || data.error || 'Bir hata oluştu.');
        return;
      }

      // Gelen veriyi localStorage'a kaydet
      localStorage.setItem('resultData', JSON.stringify(data));

      // /result sayfasına yönlendir
      navigate('/result');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1) Header (içinde form var) */}
      <Header onSubmit={handleHeaderSubmit} />

      {/* 2) Steps */}
      <Steps />

      {/* 3) Slider */}
      <SliderPage />

      {/* 4) Testimonials */}
      <Testimonials />

      {/* 5) Upload */}
      <Upload />
    </div>
  );
};

export default Home;
