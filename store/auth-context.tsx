import { createContext, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContext {
    token?: string | null,
    isAuthenticated: boolean,
    authenticate: (token: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContext>({
    token: '',
    isAuthenticated: false,
    authenticate: () => {
    },
    logout: () => {
    }
});

interface AuthContextProvider {
    children?: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProvider) => {
    const [authToken, setAuthToken] = useState<string | null>();


    const authenticate = async (token: string) => {
        setAuthToken(token);
        await AsyncStorage.setItem('token', token);
    };

    const logout = async () => {
        setAuthToken(null);
        await AsyncStorage.removeItem('token');
    };

    const value: AuthContext = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
