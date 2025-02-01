'use client';

import { createContext, useContext, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';

interface ContextProps {
  children: React.ReactNode;
}

type AuthContextType = {
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  const logout = useCallback(() => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('username', { path: '/' });
  }, []);

  const value = useMemo(
    () => ({
      logout,
      isAuthenticated: !!Cookies.get('token'),
    }),
    [logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
