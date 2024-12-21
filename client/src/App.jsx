import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BuyCredit from './pages/BuyCredit';
import Layout from './components/Layout'; // Yeni Layout bileşenini ekledik

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <ToastContainer position='bottom-right' />
      <Routes>
        {/* Layout altında render edilecek rotalar */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='result' element={<Result />} />
          <Route path='buy' element={<BuyCredit />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
