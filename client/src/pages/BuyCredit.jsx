import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { plans } from '../assets/assets';

const BuyCredit = () => {
  const { backendUrl, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const paymentTest = async (planId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(backendUrl + '/api/user/pay-test', { planId }, { headers: { token } });

      if (data.success) {
        loadCreditsData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10 bg-gradient-to-b from-gray-900 to-black">
      <div className="text-gray-400 text-lg mb-6 font-semibold">
        Planlarımız
      </div>
      <h1 className="text-center mb-6 sm:mb-10 text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-400">
        Size Uygun Planı Seçin
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 w-[65%] max-w-sm text-white shadow-xl transform hover:scale-105 transition-transform duration-500"
            key={index}
          >
            <img width={60} src={assets.logo_icon} alt="" className="mb-6" />
            <p className="text-xl font-bold mb-2 text-purple-300">{item.id}</p>
            <p className="text-sm text-gray-400 mb-4">{item.desc}</p>
            <p className="text-xl font-bold text-[#d1d5db] mb-6">
              ₺{item.price} <span className="text-lg text-[#d1d5db]">/ {item.credits} kredi</span>
            </p>
            <button
              onClick={() => paymentTest(item.id)}
              className="w-full py-2 text-sm font-semibold rounded-md bg-purple-300 text-gray-900 hover:bg-purple-400 hover:scale-105 transition-all duration-300"
            >
              Satın Al
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
