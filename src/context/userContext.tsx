'use client';

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get('token')
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!Cookies.get('token'));
    };

    // Vérifier l'auth toutes les secondes
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('username', { path: '/' });
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      logout,
      isAuthenticated,
    }),
    [logout, isAuthenticated]
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
