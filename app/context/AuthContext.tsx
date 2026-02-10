// context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { AuthManager, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = () => {
      const currentUser = AuthManager.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Refresh user data from token
  const refreshUser = useCallback(() => {
    const currentUser = AuthManager.getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);
      
      if (response.error || !response.data) {
        return { success: false, error: response.error || 'Login failed' };
      }

      // Save tokens and user data
      AuthManager.saveToken(response.data.data.accessToken);
      AuthManager.saveRefreshToken(response.data.data.refreshToken);
      AuthManager.saveUser({
        id: response.data.data.user.id,
        email: response.data.data.user.email,
        name: response.data.data.user.username
      });
      
      // Update user state
      const user = AuthManager.getCurrentUser();
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await apiClient.register(name, email, password);
      
      if (response.error || !response.data) {
        return { success: false, error: response.error || 'Registration failed' };
      }

      // Registration successful - don't auto-login, redirect to signin
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      // Call backend logout (if endpoint exists)
      await apiClient.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local state regardless of API call result
      AuthManager.removeToken();
      setUser(null);
      router.push('/signin');
      router.refresh();
    }
  };

  const value = {
    user,
    isAuthenticated: !!user && AuthManager.isAuthenticated(),
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}