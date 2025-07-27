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

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  // React Query mutation for registration
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      toast.success("Registration Successful", {
        description: "Your account has been created successfully. Please log in."
      });
      router.push('/login');
    },
    onError: (error: any) => {
      console.error('Registration failed:', error);
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        setErrors(prev => ({
          ...prev,
          ...apiErrors
        }));
        
        toast.error("Registration Failed", {
          description: "Please check the form for errors."
        });
      } else if (error.response?.data?.message) {
        toast.error("Registration Failed", {
          description: error.response.data.message
        });
      } else {
        toast.error("Registration Failed", {
          description: "Please try again later."
        });
      }
    }
  });

  const validateField = (name: string, value: string) => {
    let errorMessage = '';
    
    switch (name) {
      case 'fullName':
        errorMessage = value.trim() === '' ? 'Name is required' : '';
        break;
      case 'age':
        errorMessage = value.trim() === '' ? 'Age is required' : '';
        break;
      case 'email':
        errorMessage = value.trim() === '' 
          ? 'Email is required' 
          : !/\S+@\S+\.\S+/.test(value) 
            ? 'Email is invalid' 
            : '';
        break;
      case 'password':
        errorMessage = value.trim() === '' 
          ? 'Password is required' 
          : value.length < 8 
            ? 'Password must be at least 8 characters' 
            : '';
        break;
      case 'confirmPassword':
        errorMessage = value !== password ? 'Passwords do not match' : '';
        break;
      case 'role':
        errorMessage = value.trim() === '' ? 'Please select a role' : '';
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    return errorMessage === '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    switch (id) {
      case 'fullName':
        setFullName(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'role':
        setRole(value);
        break;
    }
    
    validateField(id, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNameValid = validateField('fullName', fullName);
    const isAgeValid = validateField('age', age);
    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);
    const isConfirmPasswordValid = validateField('confirmPassword', confirmPassword);
    const isRoleValid = validateField('role', role);
    
    if (isNameValid && isAgeValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isRoleValid) {
      registerMutation.mutate({
        name: fullName,
        age,
        email,
        password,
        role
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="flex w-full">
        {/* Left side - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/Rectangle 68 (2).svg"
            alt="Smiling child"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Registration form */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center overflow-y-auto max-h-screen">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-4 flex flex-col items-center">
              <Image 
                src="/Logo Concept 1.svg" 
                alt="EduSponsor Logo" 
                width={100} 
                height={25} 
                className="mb-2"
              />
              <h1 className="text-xl font-bold">Create Account</h1>
              <p className="text-xs text-gray-600 mt-1">Sign up to join the mission of empowering students' futures</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-1.5 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="text"
                  id="age"
                  placeholder="Enter your age"
                  value={age}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-1.5 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Register as</label>
                <select
                  id="role"
                  value={role}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-1.5 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="School">School</option>
                  <option value="Sponsor">Sponsor</option>
                </select>
                {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="username@edustation.com"
                  value={email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-1.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-1.5 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-1.5 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>

              <button 
                type="submit" 
                disabled={registerMutation.isPending}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200 mt-3 disabled:bg-gray-400"
              >
                {registerMutation.isPending ? "Signing Up..." : "Sign Up"}
              </button>

              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-3 text-xs text-gray-500">or continue with</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button 
                type="button" 
                className="w-full flex items-center justify-center border border-gray-300 py-1.5 px-4 rounded-md hover:bg-gray-50 transition duration-200"
              >
                <FcGoogle className="mr-2 text-lg" />
                <span className="text-sm">Sign up with Google</span>
              </button>

              <div className="text-center mt-4">
                <span className="text-xs text-gray-600">Already have an account? </span>
                <Link href="/login" className="text-xs text-blue-600 hover:underline">Log in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
