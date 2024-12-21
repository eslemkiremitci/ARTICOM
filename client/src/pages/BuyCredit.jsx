import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { plans } from '../assets/assets'

const BuyCredit = () => {

  const { backendUrl, loadCreditsData } = useContext(AppContext)
  const navigate = useNavigate()
  const { getToken } = useAuth()

  const paymentTest = async (planId) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/user/pay-test', { planId }, { headers: { token } })

      if (data.success) {
        // Ödeme başarılı ise krediyi güncelle ve anasayfaya dön
        loadCreditsData()
        navigate('/')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Planlarımız</button>
      <h1 className='text-center mb-6 sm:mb-10 text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>
        Size uygun planı seçin
      </h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-500' key={index}>
            <img width={40} src={assets.logo_icon} alt='' />
            <p className='mt-3 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='my-6'>
              <span className='tex3xl font-medium'>₺{item.price} </span>/ {item.credits} kredi
            </p>
            <div className='flex flex-col'>
              {/* Eski Razorpay ve Stripe butonları kaldırıldı. Sadece test ödeme butonu ekledik */}
              <button onClick={() => paymentTest(item.id)} className='w-full flex justify-center gap-2 border border-gray-400 mt-2 text-sm rounded-md py-2.5 min-w-52 hover:bg-blue-50 hover:border-blue-400'>
                Test Ödemesi Yap
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit
