import React, { useState } from 'react';
import imageWBg from '../assets/image_w_bg.png';
import imageWoBg from '../assets/image_wo_bg.png';
import newImageJpeg from '../assets/example3_2.jpg';
import newImagePng from '../assets/example3_2.png';
import secondExampleImageBefore from '../assets/9.jpg';
import secondExampleImageAfter from '../assets/10.jpg';
import fourthExampleImageBefore from '../assets/11.jpg';
import fourthExampleImageAfter from '../assets/12.png'; 

// Slider Component
const Slider = ({ title, description, reverse, images, initialPosition = 50 }) => {
    const [sliderPosition, setSliderPosition] = useState(initialPosition); 

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    };

    return (
        <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} items-center py-10 lg:py-20`}>
            <div className="w-full lg:w-1/2 px-4 lg:px-10 mb-6 lg:mb-0">
                <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
                    {title}
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="w-full lg:w-1/2 relative overflow-hidden rounded-lg shadow-lg">
                <img
                    src={images.before}
                    alt="Before"
                    className="w-full h-full object-cover"
                    style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
                />
                <img
                    src={images.after}
                    alt="After"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={handleSliderChange}
                    className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 z-10 appearance-none bg-transparent"
                    style={{
                        height: '0.5rem',
                        outline: 'none',
                        cursor: 'pointer',
                        WebkitAppearance: 'none',
                    }}
                />
            </div>
        </div>
    );
};

// Slider Page
const SliderPage = () => {
    const sliderData = [
        {
            title: 'Arka Planı Düşünmeyin, Bize Bırakın',
            description: 'Sadece ürün resminizi yükleyin, gerisini bize bırakın! Arka plan tasarımıyla uğraşmanıza gerek yok. ARTICOM\'un yapay zeka gücü, ürününüz için en uygun arka planı hayal eder ve kusursuz bir şekilde tasarlar. Bu, görsellerinizi profesyonel bir seviyeye taşırken size zaman kazandırır.',
            images: { before: imageWBg, after: imageWoBg },
        },
        {
            title: 'Arka Planınızı Kendi Zevkinize Göre Belirleyin',
            description: 'Ürününüzün hikayesini kendi dokunuşunuzla tamamlayın. ARTICOM’un yapay zeka gücü sayesinde, istediğiniz arka planı kolayca belirleyin. Örneğin, ‘doğal bir orman manzarası’ veya ‘’ gibi yönlendirmelerle ürününüzün ruhunu yansıtan benzersiz görseller oluşturun.',
            reverse: true,
            images: { before: secondExampleImageBefore, after: secondExampleImageAfter },
        },
        {
            title: 'Net ve Temiz Ürün Görselleri',
            description: 'ARTICOM’un akıllı algoritmaları, ürünlerinizin gereksiz detaylarını temizleyerek sade ve net bir görünüm sağlar. E-ticaret platformlarınızda profesyonel bir sunum için idealdir.',
            images: { before: newImageJpeg, after: newImagePng },
            initialPosition: 60,
        },
        {
            title: 'E-Ticaret İçin Profesyonel Görseller',
            description: 'ARTICOM, ürünlerinizin görsel sunumunu profesyonel seviyeye taşıyarak, müşterilerinizde güven oluşturur. Satışta başarı, dikkat çeken görsellerle başlar. Ürünlerinizi öne çıkaran, hikayenizi anlatan ve ilk izlenimi güçlendiren görseller oluşturun.',
            reverse: true,
            images: { before: fourthExampleImageBefore, after: fourthExampleImageAfter },
            initialPosition: 55, // Slider başlangıç konumu %70
        },
    ];

    return (
        <div className="min-h-screen bg-[#111827] text-white">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-bold text-center py-12">
                    Ürün Görsellerinizi Nasıl Dönüştürdüğümüzü Görün
                </h1>
                {sliderData.map((item, index) => (
                    <Slider
                        key={index}
                        title={item.title}
                        description={item.description}
                        reverse={item.reverse}
                        images={item.images}
                        initialPosition={item.initialPosition} // Slider başlangıç konumu
                    />
                ))}
            </div>
        </div>
    );
};

export default SliderPage;
