import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Steps from '../components/Steps';
import Slider from '../components/Slider';
import Testimonials from '../components/Testimonials';
import Upload from '../components/Upload';
import Loading from '../components/Loading';
import ResultPage from '../components/ResultPage';
import { toast } from "react-toastify";
import { useAuthContext } from '../context/AuthContext';
import { apiRequest } from '../utils/api';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { isSignedIn, getToken } = useAuthContext();

  useEffect(() => {
    if (!isSignedIn) {
      toast.info("Giriş yapmadığınız için bazı özellikler kullanılamayabilir.");
    }
  }, [isSignedIn]);

  // FormData, Header.jsx'ten geliyor
  const handleApiRequest = async (formData) => {
    if (!isSignedIn) {
      toast.error("Lütfen devam etmek için giriş yapın.");
      return;
    }

    setIsLoading(true);

    try {
      const token = await getToken();
      // Örneğin: /api/ai/scenario
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/ai/scenario`;

      const response = await apiRequest(url, {
        method: 'POST',
        headers: token ? { 'token': token } : {},
        body: formData
      });

      if (!response.success) {
        toast.error(response.message || "Beklenmeyen bir hata oluştu.");
        return;
      }

      // Başarılı durumda: ileride ChatGPT veya stableDiff logic'i ekleneceğinde
      // response içinden verileri alıp "result" olarak state'e koyabiliriz.
      // Şimdilik basit bir örnek:
      toast.success("İşlem başarıyla tamamlandı!");
      setResult(response);

    } catch (error) {
      console.error(error);
      toast.error("API isteği başarısız oldu, lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (result) {
    // Burada result içeriğine göre ResultPage'e yönlendirebilirsiniz.
    // Şimdilik basit örnek. result'ta stableDiff vs. yoksa
    // sahte bir sayfa gösteriyoruz.
    return <ResultPage result={result} />;
  }

  return (
    <>
      <Header onSubmit={handleApiRequest} />
      <Steps />
      <Slider />
      <Testimonials />
      <Upload onSubmit={handleApiRequest} />
    </>
  );
};

export default Home;
