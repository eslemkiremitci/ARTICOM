import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

// Eski tasarım bileşenleri
import Header from '../components/Header';
import Steps from '../components/Steps';
import SliderPage from '../components/Slider';
import Testimonials from '../components/Testimonials';
import Upload from '../components/Upload';

// Loading bileşenini import ediyoruz
import Loading from '../components/Loading';

const Home = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth(); // Clerk auth

  // ------ LOADING STATE ------
  const [isLoading, setIsLoading] = useState(false);

  // ----- Eski handleSubmit kodunu "handleHeaderSubmit" olarak uyarlıyoruz -----
  const handleHeaderSubmit = async (formData) => {
    try {
      // Önce loading'i true yap
      setIsLoading(true);

      // FormData içindeki değerleri okuyalım
      const productDescription = formData.get('productDescription');
      const backgroundDescription = formData.get('backgroundDescription');
      const image = formData.get('image'); // File tipinde

      // Basit Kontrol
      if (!productDescription || productDescription.trim().split(' ').length < 3) {
        toast.error('Lütfen en az 3 kelimelik ürün açıklaması girin.');
        setIsLoading(false);
        return;
      }
      if (!image || image.size === 0) {
        toast.error('Lütfen bir resim yükleyin.');
        setIsLoading(false);
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
        setIsLoading(false);
        return;
      }

      // Başarılıysa veriyi localStorage'a kaydet
      localStorage.setItem('resultData', JSON.stringify(data));

      // isLoading'i kapat, result sayfasına yönlendir
      setIsLoading(false);
      navigate('/result');

    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  // isLoading == true ise <Loading /> gösteriyoruz
  if (isLoading) {
    return <Loading />;
  }

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
