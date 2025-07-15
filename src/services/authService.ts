"use client";

import Cookies from 'js-cookie';
import api from './api';

interface RegisterData {
  name: string;
  age: string;
  email: string;
  password: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post(`/api/auth/register`, data);
    return response.data;
  },
  
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post(`/api/auth/login`, data);
    
    // Store token in cookie
    if (response.data.token) {
      // Set cookie to expire in 7 days
      Cookies.set('auth_token', response.data.token, { expires: 7, secure: process.env.NODE_ENV === 'production' });
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    
    return response.data;
  },
  
  logout: (): void => {
    Cookies.remove('auth_token');
    localStorage.removeItem("user");
  },
  
  getCurrentUser: (): any => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  
  getToken: (): string | undefined => {
    return Cookies.get('auth_token');
  },
  
  isAuthenticated: (): boolean => {
    return !!Cookies.get('auth_token');
  }
}; 