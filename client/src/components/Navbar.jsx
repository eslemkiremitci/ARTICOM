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
            className="fixed top-0 w-full bg-[#2c2c2c] text-white py-5 px-24 lg:px-40 z-50 flex items-center justify-between"
        >
            <Link to={'/'}>
                <img className="w-36 sm:w-48" src={assets.logo} alt="Articom Logo" />
            </Link>
            {isSignedIn ? (
                <div className="flex items-center gap-3 sm:gap-4">
                    <button 
                        onClick={() => navigate('/buy')} 
                        className="flex items-center gap-2 bg-[#bdbdbd] px-5 sm:px-8 py-2 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
                    >
                        <img className="w-5" src={assets.credit_icon} alt="Credit Icon" />
                        <p className="text-sm sm:text-base font-medium text-black">Kredi : {kredi}</p>
                    </button>
                    <p className="text-gray-300 max-sm:hidden">Merhaba, {user.fullName}</p>
                    <UserButton />
                </div>
            ) : (
                <button 
                    onClick={() => openSignIn({})} 
                    className="bg-white text-black flex items-center gap-4 px-5 py-2 sm:px-9 sm:py-4 text-sm rounded-full hover:scale-105 transition-all"
                >
                   Hadi Başla <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="Arrow Icon" />
                </button>
            )}
        </div>
    );
};

export default Navbar;
