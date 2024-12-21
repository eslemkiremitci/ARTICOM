import React from 'react';
import Navbar from './Navbar'; // Navbar bileşeninin yolu
import Footer from './Footer'; // Footer bileşeninin yolu
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet /> {/* Sayfa içeriği buraya render edilir */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
