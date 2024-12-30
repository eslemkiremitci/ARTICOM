import React from 'react';
import imageWoBg from '../assets/image_wo_bg.png';

const Testimonials = () => {
  const testimonialsData = [
    {
      name: 'Eslem Kiremitci',
      profession: 'Bilgisayar Mühendisi Öğrencisi',
      text: `Lorem Ipsum, basım ve dizgi endüstrisinin sahte metnidir. Lorem Ipsum, bilinmeyen bir matbaacının bir yazı dizisini alıp bir yazı örneği kitabı oluşturmak için karıştırdığı 1500'lerden bu yana endüstri standardı kukla metin olmuştur.`,
      link: 'https://stability.ai/',
    },
    {
      name: 'Muhammed Ali Uyanık',
      profession: 'Bilgisayar Mühendisi Öğrencisi',
      text: `Lorem Ipsum, basım ve dizgi endüstrisinin sahte metnidir. Lorem Ipsum, bilinmeyen bir matbaacının bir yazı dizisini alıp bir yazı örneği kitabı oluşturmak için karıştırdığı 1500'lerden bu yana endüstri standardı kukla metin olmuştur.`,
      link: 'https://stability.ai/',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#111827] to-black">
      <div className="mx-4 lg:mx-28 py-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
          İşinizi Kolaylaştıran Teknolojiler
        </h1>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialsData.map((item, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-row items-center gap-4">
                {/* Image */}
                <img
                  src={imageWoBg}
                  alt="User"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                {/* Content */}
                <div className="flex-1">
                  <p className="text-gray-300 leading-relaxed mb-3">
                    {item.text}{' '}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      stability.ai git
                    </a>
                  </p>
                  <div>
                    <p className="font-semibold text-gray-100">{item.name}</p>
                    <p className="text-gray-400 text-sm">{item.profession}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
