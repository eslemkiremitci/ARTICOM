import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full px-24 lg:px-40 py-6 bg-[#2c2c2c] text-white">
      {/* Logo */}
      <div className="flex items-center">
        <img width={150} src={assets.logo} alt="Logo" />
      </div>

      {/* Telif Hakkı Metni */}
      <p className="text-sm text-gray-400 text-center md:text-left">
        © 2024 Articom Tüm hakları saklıdır.
      </p>

      {/* İletişim */}
      <div className="text-center">
        <a
          href="mailto:eslemkiremitci2@gmail.com"
          className="text-gray-300 hover:text-gray-500 text-sm"
        >
          eslemkiremitci2@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Footer;
