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
    role?: string;
  };
}

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post(`/api/auth/register`, data);
    return response.data;
  },
  
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post(`/api/auth/login`, data);
    
    // Store token and user data in cookies
    if (response.data.token) {
      console.log('Received auth token:', response.data.token);
      console.log('Received user data:', response.data.userdata);
      // Set cookies to expire in 7 days
      Cookies.set('auth_token', response.data.token, { expires: 7, secure: process.env.NODE_ENV === 'production' });
      console.log('Auth token set in cookies:', response.data.token);
      Cookies.set('user_data', JSON.stringify(response.data.userdata), { expires: 7, secure: process.env.NODE_ENV === 'production' });
      console.log('User data set in cookies:', response.data.userdata);
      
    }
    
    return response.data;
  },
  
  logout: (): void => {
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
  },
  
  getCurrentUser: (): any => {
    const userData = Cookies.get('user_data');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
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