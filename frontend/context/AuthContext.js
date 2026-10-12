'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE_URL = 'http://localhost:8080/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('techstore_token');
    const savedUser = localStorage.getItem('techstore_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('techstore_token');
        localStorage.removeItem('techstore_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Giriş yapılamadı.');
      }

      const data = await res.json();
      setToken(data.token);
      const userData = { id: data.id, fullName: data.fullName, email: data.email, role: data.role };
      setUser(userData);
      localStorage.setItem('techstore_token', data.token);
      localStorage.setItem('techstore_user', JSON.stringify(userData));
      setAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Kayıt olunamadı.');
      }

      const data = await res.json();
      setToken(data.token);
      const userData = { id: data.id, fullName: data.fullName, email: data.email, role: data.role };
      setUser(userData);
      localStorage.setItem('techstore_token', data.token);
      localStorage.setItem('techstore_user', JSON.stringify(userData));
      setAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('techstore_token');
    localStorage.removeItem('techstore_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        authModalOpen,
        setAuthModalOpen,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
