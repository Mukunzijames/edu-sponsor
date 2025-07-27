"use client";

import api from './api';
import Cookies from 'js-cookie';

// Get the API URL from environment variables or use a default
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://edu-sponsor-api.onrender.com';

// Get token from cookies
const getToken = () => Cookies.get('auth_token');

// Create payment intent
export const createPaymentIntent = async (studentId: string, amount: number) => {
  try {
    const response = await fetch(`${API_URL}/api/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ studentId, amount })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Create checkout session
export const createCheckoutSession = async (studentId: string, amount: number) => {
  try {
    const response = await fetch(`${API_URL}/api/payments/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ studentId, amount })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Get donation history
// export const getDonations = async () => {
//   try {
//     const response = await fetch(`${API_URL}/donations/sponsor`, {
//       headers: {
//         'Authorization': `Bearer ${getToken()}`
//       }
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching donations:', error);
//     throw error;
//   }
// }; 
export const getSPonsorship = async () => {
  try {
    const response = await fetch(`${API_URL}/api/sponsorships/sponsor`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
}; 

export const getDonations = async () => {
  try {
    const response = await fetch(`${API_URL}/api/payments/donations/all`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
}; 