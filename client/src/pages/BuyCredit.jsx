import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { plans } from "../assets/assets";

const BuyCredit = () => {
  const { backendUrl, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const paymentTest = async (planId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/pay-test",
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-gray-900 to-black text-white py-14">
      {/* Üst Kısım */}
      <div className="text-center mb-20">
        <div className="text-gray-400 font-semibold text-lg mb-2 animate-pulse">
          Planlarımız
        </div>
        <h1
          className="text-3xl sm:text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
          style={{ lineHeight: "1.3" }} 
        >
          Size Uygun Planı Seçin
        </h1>
      </div>

      {/* Plan Kartları */}
      <div className="flex flex-wrap justify-center gap-7 px-4">
        {plans.map((item, index) => (
          <div
            key={index}
            className="relative group flex flex-col justify-between
              w-full max-w-sm bg-gradient-to-br from-gray-800 to-gray-900
              border border-gray-700 rounded-3xl p-8 text-white shadow-2xl
              transition-transform duration-500 hover:scale-105
              hover:shadow-purple-600/40"
          >
            {/* Logo */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-purple-300 p-3 rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
                <img src={assets.logo_icon} alt="Logo" width={40} />
              </div>
            </div>
            {/* İçerik */}
            <div className="mt-8 pt-6 text-center">
              <p className="text-xl font-bold mb-1 bg-gradient-to-r from-fuchsia-400 to-pink-600 bg-clip-text text-transparent">
                {item.id}
              </p>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {item.desc}
              </p>
              <p className="text-2xl font-bold text-gray-200 mb-6">
                ₺{item.price}{" "}
                <span className="text-lg text-gray-400">
                  / {item.credits} kredi
                </span>
              </p>
            </div>
            {/* Satın Al Butonu */}
            <button
              onClick={() => paymentTest(item.id)}
              className="mt-2 w-full py-3 rounded-md bg-gradient-to-r from-purple-400 to-pink-500 text-black font-semibold
                         hover:from-purple-500 hover:to-pink-600 hover:scale-105
                         transition-all duration-300"
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
