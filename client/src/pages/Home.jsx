import React, { useState } from 'react';
import Header from '../components/Header';
import Steps from '../components/Steps';
import Slider from '../components/Slider';
import Testimonials from '../components/Testimonials';
import Upload from '../components/Upload';
import Loading from '../components/Loading';
import ResultPage from '../components/ResultPage';
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const { isSignedIn } = useUser();
    const { getToken } = useAuth();

    const handleApiRequest = async (file, description) => {
        // Üyelik zorunlu, üye değilse işlemi durdur
        if (!isSignedIn) {
            toast.error("Lütfen devam etmek için giriş yapın.");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('description', description);

        console.log("API'ye gönderilen FormData:", formData);

        setIsLoading(true);
        try {
            // Backend'e auth header göndermek istiyorsak token alabiliriz:
            const token = await getToken();

            const response = await fetch('http://127.0.0.1:8000/upload/', {
                method: 'POST',
                headers: {
                    // Eğer backend bu token'ı bekliyorsa uncomment edin:
                    // 'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`API Hatası: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Yanıtı:", data);
            setResult(data);
        } catch (error) {
            console.error('API isteği sırasında hata:', error.message);
            alert("API isteği başarısız oldu, lütfen tekrar deneyin.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (result) {
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
