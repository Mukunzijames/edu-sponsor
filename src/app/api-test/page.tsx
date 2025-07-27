"use client";

import { useState } from 'react';
import api from '@/services/api';

export default function ApiTestPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testRegisterApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Test data
      const testData = {
        name: "Test User",
        age: "25",
        email: `test${Math.floor(Math.random() * 10000)}@example.com`,
        password: "password123"
      };
      
      // Direct API call to test
      const response = await fetch('https://edu-sponsor-api.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('API Test Error:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const testAxiosRegisterApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Test data
      const testData = {
        name: "Test User",
        age: "25",
        email: `test${Math.floor(Math.random() * 10000)}@example.com`,
        password: "password123"
      };
      
      // Using our axios instance
      const response = await api.post('/api/auth/register', testData);
      setResult(response.data);
    } catch (err: any) {
      console.error('API Test Error:', err);
      setError(err.message || 'An unknown error occurred');
      
      if (err.response) {
        setResult({
          status: err.response.status,
          data: err.response.data
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={testRegisterApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          Test Register API (Fetch)
        </button>
        
        <button 
          onClick={testAxiosRegisterApi}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
        >
          Test Register API (Axios)
        </button>
      </div>
      
      {loading && <p className="text-gray-600">Loading...</p>}
      
      {error && (
        <div className="p-4 bg-red-100 border border-red-300 rounded mb-4">
          <h3 className="font-bold text-red-700">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {result && (
        <div className="p-4 bg-gray-100 border border-gray-300 rounded">
          <h3 className="font-bold">API Response</h3>
          <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 