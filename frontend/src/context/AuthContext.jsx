import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as authApi from '../services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(authApi.getStoredToken());
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      authApi.setStoredToken(token);
      setUser({ token });
    } else {
      authApi.setStoredToken(null);
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    const jwt = data.token ?? data.accessToken ?? data.jwt;
    if (jwt) {
      setToken(jwt);
      return { success: true };
    }
    throw new Error('No token in response');
  }, []);

  const signup = useCallback(async (name, email, password) => {
    await authApi.signup(name, email, password);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
