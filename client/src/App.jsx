import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Sayfaları lazy olarak yüklüyoruz
const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./pages/Home'));
const Result = lazy(() => import('./pages/Result'));
const BuyCredit = lazy(() => import('./pages/BuyCredit'));

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer position="bottom-right" />

      {/* Lazy-loaded bileşenler için Suspense kullanıyoruz */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="result" element={<Result />} />
            <Route path="buy" element={<BuyCredit />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
