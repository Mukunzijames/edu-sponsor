"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="w-full flex flex-col md:flex-row">
        {/* Left side - Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto md:ml-16">
            <div className="mb-8">
              <Image 
                src="/Logo Concept 1.svg" 
                alt="EduSponsor Logo" 
                width={120} 
                height={30} 
                className="mb-6"
              />
              
              <h1 className="text-5xl font-bold leading-tight mb-4">
                Sponsor a Future.
                <br />
                Change a Life.
              </h1>
              
              <p className="text-gray-600 mb-8">
                Connecting students in need with sponsors who care.
              </p>
              
              <Link href="/register">
                <button className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition duration-200">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="w-full md:w-1/2 relative">
          <Image
            src="/Rectangle 68.svg"
            alt="Smiling student"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
