// src/components/Navbar.jsx
import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const { openSignIn } = useClerk();
    const { isSignedIn, user } = useUser();
    const { kredi, loadKrediData } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            loadKrediData();
        }
    }, [isSignedIn, loadKrediData]);

    return (
        <div 
            id="navbar-section" 
            className="fixed top-0 w-full bg-gray-900 text-white h-16 px-6 lg:px-28 z-50 flex items-center justify-between shadow-lg border-b border-gray-700"
        >
            {/* Logo */}
            <Link to="/">
                <img
                    className="w-32 sm:w-40 hover:scale-105 transition-transform duration-300"
                    src={assets.logo}
                    alt="Articom Logo"
                />
            </Link>

            {isSignedIn ? (
                <div className="flex items-center gap-4">
                    {/* Kredi Butonu */}
                    <button
                        onClick={() => navigate('/buy')}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
                    >
                        <img className="w-5" src={assets.credit_icon} alt="Credit Icon" />
                        <p className="text-sm sm:text-base font-medium text-white">Kredi: {kredi}</p>
                    </button>

                    {/* Kullanıcı İsmi */}
                    <p className="text-sm sm:text-base text-gray-300 hidden sm:block">
                        Merhaba, {user?.fullName}
                    </p>

                    {/* Kullanıcı Butonu */}
                    <UserButton />
                </div>
            ) : (
                <button
                    onClick={() => openSignIn({})}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 sm:px-7 sm:py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
                >
                    Hadi Başla
                   
                </button>
            )}
        </div>
    );
};

export default Navbar;
