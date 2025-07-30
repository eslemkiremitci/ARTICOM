import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-y-2 w-full px-4 lg:px-20 py-4 bg-black text-white shadow-lg border-t border-gray-700">
      {/* Logo */}
      <div className="flex items-center">
        <img
          width={120}
          src={assets.logo}
          alt="Logo"
          className="hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Telif Hakkı Metni */}
      <p className="text-xs text-gray-400 text-center lg:text-left">
        © 2024{' '}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
          Articom
        </span>{' '}
        Tüm hakları saklıdır.
      </p>

      {/* İletişim */}
      <div className="text-center">
        <a
          href="mailto:eslemkiremitci2@gmail.com"
          className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-xs"
        >
          eslemkiremitci2@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Footer;
