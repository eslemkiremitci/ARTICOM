// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen flex flex-col">
      {/* Sabit Navbar */}
      <Navbar />

      {/* Ortada Outlet (sayfa içi) */}
      <main className="flex-1 pt-16"> 
        {/* pt-16 ekledim, çünkü Navbar fixed, 16px/4rem kadar boşluk */}
        <Outlet />
      </main>

      {/* En altta Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
