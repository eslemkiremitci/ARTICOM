import React, { useState } from 'react';
import imageWBg from '../assets/image_w_bg.png';
import imageWoBg from '../assets/image_wo_bg.png';

// Slider Component
const Slider = ({ title, description, reverse }) => {
    const [sliderPosition, setSliderPosition] = useState(50); // Slider konumu

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    };

    return (
        <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} items-center py-10 lg:py-20`}>
            {/* Text Section */}
            <div className="w-full lg:w-1/2 px-4 lg:px-10 mb-6 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                <p className="text-gray-600 text-lg">{description}</p>
            </div>

            {/* Slider Section */}
            <div className="w-full lg:w-1/2 relative overflow-hidden rounded-lg shadow-lg">
                <img
                    src={imageWBg}
                    alt="Before"
                    className="w-full h-full object-cover"
                    style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
                />
                <img
                    src={imageWoBg}
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
                        background: 'transparent',
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
            title: 'Örnek 1: Ürün Görsellerinizi Yeniden Tasarlayın',
            description: 'Bu görselde arka plan kaldırılarak net bir ürün sunumu sağlanmıştır.',
        },
        {
            title: 'Örnek 2: Ürün Arka Planını Optimize Edin',
            description: 'Arka plan değişikliği ile görsel daha etkileyici hale getirilmiştir.',
            reverse: true,
        },
        {
            title: 'Örnek 3: Net ve Temiz Görseller',
            description: 'Ürün görselleri için gereksiz arka planlar kaldırıldı.',
        },
        {
            title: 'Örnek 4: E-ticaret Görsellerinizi Geliştirin',
            description: 'Profesyonel görsellerle e-ticaret ürünleriniz öne çıkar.',
            reverse: true,
        },
    ];

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center py-12">Ürün Görsellerinizi Nasıl Dönüştürdüğümüzü Görün</h1>
            {sliderData.map((item, index) => (
                <Slider
                    key={index}
                    title={item.title}
                    description={item.description}
                    reverse={item.reverse}
                />
            ))}
        </div>
    );
};

export default SliderPage;
