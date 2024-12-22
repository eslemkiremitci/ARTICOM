import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import AppContextProvider from './context/AppContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const Providers = ({ children }) => {
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <AuthProvider>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </AuthProvider>
      </ClerkProvider>
    </BrowserRouter>
  );
};

export default Providers;
