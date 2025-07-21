"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      // Show success toast
      toast.success("Login Successful", {
        description: `Welcome back`
      });
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
      // Handle API errors
      if (error.response?.data?.message) {
        setErrors({
          email: '',
          password: error.response.data.message
        });
        
        toast.error("Login Failed", {
          description: error.response.data.message
        });
      } else if (error.message === 'Network Error') {
        toast.error("Network Error", {
          description: "Please check your internet connection."
        });
      } else {
        // Show generic error
        toast.error("Login Failed", {
          description: "Please try again later."
        });
      }
    }
  });

  const validateField = (name: string, value: string) => {
    let errorMessage = '';
    
    switch (name) {
      case 'email':
        errorMessage = value.trim() === '' 
          ? 'Email is required' 
          : !/\S+@\S+\.\S+/.test(value) 
            ? 'Email is invalid' 
            : '';
        break;
      case 'password':
        errorMessage = value.trim() === '' ? 'Password is required' : '';
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    return errorMessage === '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    // Update state based on input id
    if (id === 'email') {
      setEmail(value);
    } else if (id === 'password') {
      setPassword(value);
    }
    
    // Validate on keyup
    validateField(id, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);
    
    // Submit if all validations pass
    if (isEmailValid && isPasswordValid) {
      loginMutation.mutate({
        email,
        password
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="flex w-full h-screen">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-6 ml-24">
              <Image 
                src="/Logo Concept 1.svg" 
                alt="EduSponsor Logo" 
                width={120} 
                height={30} 
                className="mb-4"
              />
              <h1 className="text-2xl font-bold">Welcome back! Log in</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@edustation.com"
                  value={email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                <div className="flex justify-end mt-1">
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loginMutation.isPending}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200 mt-4 disabled:bg-gray-400"
              >
                {loginMutation.isPending ? "Logging In..." : "Log In"}
              </button>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-3 text-sm text-gray-500">or continue with</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button 
                type="button" 
                className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200"
              >
                <FcGoogle className="mr-2 text-xl" />
                Log in with Google
              </button>

              <div className="text-center mt-6">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <Link href="/register" className="text-sm text-blue-600 hover:underline">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/Rectangle 68 (1).svg"
            alt="Student with backpack"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
