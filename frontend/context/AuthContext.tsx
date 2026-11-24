'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@/types';
import { api } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cloudorder_token');
      localStorage.removeItem('cloudorder_user');
    }
    router.push('/login');
  }, [router]);

  // Hydrate user from localStorage on initial render
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedToken = localStorage.getItem('cloudorder_token');
        const savedUser = localStorage.getItem('cloudorder_user');

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));

          // Verify token freshness with backend
          try {
            const res = await api.getMe();
            if (res.data) {
              setUser(res.data);
              localStorage.setItem('cloudorder_user', JSON.stringify(res.data));
            }
          } catch {
            // Token expired or invalid
            logout();
          }
        }
      } catch (e) {
        console.error('Failed to restore auth session:', e);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [logout]);

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    if (res.data) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('cloudorder_token', res.data.token);
      localStorage.setItem('cloudorder_user', JSON.stringify(res.data.user));
      router.push('/dashboard');
    }
  };

  const register = async (name: string, email: string, password: string, role?: UserRole) => {
    const res = await api.register({ name, email, password, role });
    if (res.data) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('cloudorder_token', res.data.token);
      localStorage.setItem('cloudorder_user', JSON.stringify(res.data.user));
      router.push('/dashboard');
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

