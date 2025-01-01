import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

// Mevcut bileşen importları
import Header from '../components/Header';
import Steps from '../components/Steps';
import SliderPage from '../components/Slider';
import Testimonials from '../components/Testimonials';
import Upload from '../components/Upload';
import Loading from '../components/Loading';

const Home = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth(); // Clerk auth

  // Loading ekranını kontrol eden state
  const [isLoading, setIsLoading] = useState(false);

  // Header bileşenindeki form submit fonksiyonu
  const handleHeaderSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // FormData içinden değerleri al
      const productDescription = formData.get('productDescription');
      const backgroundDescription = formData.get('backgroundDescription');
      const image = formData.get('image'); // File tipinde (görsel)

      // Basit Kontroller
      if (!productDescription || productDescription.trim().split(' ').length < 3) {
        toast.error('Lütfen en az 3 kelimelik ürün açıklaması girin.');
        return;
      }
      if (!image || image.size === 0) {
        toast.error('Lütfen bir resim yükleyin.');
        return;
      }

      // Token al (Clerk)
      const token = await getToken();

      // Backend'e istek
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/scenario`, {
        method: 'POST',
        headers: { token },
        body: formData,
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message || data.error || 'Bir hata oluştu.');
        return;
      }

      // Başarılıysa sonucun tamamını localStorage'a kaydet
      localStorage.setItem('resultData', JSON.stringify(data));

      // Sonuç sayfasına yönlendir
      navigate('/result');

    } catch (error) {
      console.error(error);
      toast.error(error.message);

    } finally {
      // İster başarılı ister hatalı sonuçlansın, en sonda yüklenmeyi kapat
      setIsLoading(false);
    }
  };

  // Ekranda "isLoading" true ise Loading bileşeni göster
  if (isLoading) {
    return <Loading />;
  }

  // Normalde Home sayfası
  return (
    <div className="w-full flex flex-col">
      {/* Ürün görsel & açıklama formu */}
      <Header onSubmit={handleHeaderSubmit} />

      {/* Kullanıcıya ek kılavuzlar / demo bileşenleri */}
      <Steps />
      <SliderPage />
      <Testimonials />
      <Upload />
    </div>
  );
};

export default Home;
