// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy-loaded bileşenler
const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./pages/Home'));
const Result = lazy(() => import('./pages/Result'));
const BuyCredit = lazy(() => import('./pages/BuyCredit'));


const LoadingPage = lazy(() => import('./components/Loading'));

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer position="bottom-right" />
      <Suspense fallback={<div className="text-center mt-10 text-gray-700">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="result" element={<Result />} />
            <Route path="buy" element={<BuyCredit />} />
            <Route path="loading" element={<LoadingPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
