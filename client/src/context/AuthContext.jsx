import React, { createContext, useContext } from 'react';
import { useUser, useAuth } from "@clerk/clerk-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { isSignedIn } = useUser();
    const { getToken } = useAuth();

    return (
        <AuthContext.Provider value={{ isSignedIn, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
