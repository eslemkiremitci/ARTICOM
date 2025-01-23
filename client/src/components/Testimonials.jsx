import React from 'react';
import imageWoBg from '../assets/1.png';
import logoIcon from '../assets/logo_icon.svg';

const Testimonials = () => {
  const testimonialsData = [
    {
      text: `Stable Diffusion, Stability AI tarafından geliştirilen bir açık kaynaklı görüntü oluşturma modelidir. Bu model, derin öğrenme teknikleri ve sinir ağları kullanarak metin açıklamalarından yüksek kaliteli görüntüler oluşturabilir. Daha fazla bilgi için resmi web sitesi: `,
      link: 'https://stability.ai/',
    },
    {
      text: `Stable Diffusion’un yapay zeka gücünü ARTICOM’a entegre ederek, kullanıcılarımızın en iyi görsel sonuçları elde etmesini sağlıyoruz. Arka plan tasarımlarından detaylı görsellere kadar her şey bu teknolojiyle mümkün!`,
      name: 'ARTICOM Ekibi',
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
                  src={index === 1 ? logoIcon : imageWoBg}
                  alt="User"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                {/* Content */}
                <div className="flex-1">
                  <p className="text-gray-300 leading-relaxed mb-3">
                    {item.text}{' '}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        stability.ai git
                      </a>
                    )}
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
