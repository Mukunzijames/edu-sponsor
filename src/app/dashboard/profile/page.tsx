"use client"
import React, { useState } from 'react';
import Image from 'next/image';

// Define types
interface Student {
  name: string;
  gender: string;
  age: string;
  location: string;
  grade: string;
  school: string;
  description: string;
  image: string;
}

interface Sponsor {
  name: string;
  location: string;
  amount: number;
}

const StudentSponsorshipPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [message, setMessage] = useState<string>('');

  // Sample data - replace with your actual data
  const student: Student = {
    name: "Maria Niyonsaba",
    gender: "Female",
    age: "12 Years Old",
    location: "Muhanga District, RW",
    grade: "Grade 6",
    school: "Utunyoni Highschool",
    description: "Passionate about becoming an engineer. Raised by a single mother and currently at risk of dropping out due to school fees.",
    image: "https://images.pexels.com/photos/33001402/pexels-photo-33001402.jpeg"
  };

  const sponsors: Sponsor[] = [
    { name: "Ronald Richards", location: "Kigali, Rwanda", amount: 60 },
    { name: "Kathryn Murphy", location: "Texas, US", amount: 60 },
    { name: "Ronald Richards", location: "Monaco, France", amount: 60 },
    { name: "Kathryn Murphy", location: "Berlin, Germany", amount: 60 },
  ];

  const totalPages = 5; // Replace with actual total pages
  const showingEntries = "1 to 4 of 4 entries";

  const handleDonate = () => {
    // Handle donation logic
    console.log('Donation initiated');
  };

  const handleDownload = () => {
    // Handle progress report download
    console.log('Downloading progress report');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

   return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen text-base lg:text-lg">
      {/* Header */}
      <div className="flex items-center mb-6 text-lg font-semibold">
        <span className="text-gray-500">Student</span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900 font-medium">Marie Chantal</span>
      </div>

      {/* Top Section: Student Card & Donate */}
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col lg:flex-row gap-8 mb-8">
        {/* Student Card */}
        <div className="flex-1 flex flex-col items-center lg:items-start">
          {/* Urgent Badge */}
          <span className="inline-block bg-purple-500 text-white px-3 py-1 rounded-full text-base font-medium mb-4">
            Urgent
          </span>
          {/* Student Photo */}
          <img
            src={student.image}
            alt={student.name}
            className="w-56 h-48 bg-gray-200 rounded-lg object-cover mb-4"
          />
          {/* Student Info */}
          <h2 className="text-2xl font-bold text-blue-600 mb-2">{student.name}</h2>
          <div className="space-y-1 text-gray-600 mb-4 text-lg">
            <p>{student.gender}</p>
            <p>{student.age}</p>
            <p>{student.location}</p>
            <p>{student.grade}</p>
          </div>
          {/* Description */}
          <p className="text-gray-700 text-base leading-relaxed mb-4 text-center lg:text-left">
            {student.description}
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-base">Tuition</span>
            <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-base">Uniform</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-base">Books</span>
            <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-base">Exam Fees</span>
          </div>
          {/* School Info */}
          <div className="flex items-center text-gray-700 font-medium text-xl">
            <span className="mr-2 text-2xl">🏫</span>
            <span>{student.school}</span>
          </div>
        </div>

        {/* Donate Section */}
        <div className="flex-1 flex flex-col justify-center">
          <button
            onClick={handleDonate}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg mb-4 transition-colors text-lg"
          >
            Donate
          </button>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message (optional)"
            className="w-full border border-gray-300 rounded-lg p-3 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 text-base"
          />
          {/* Progress Report */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleDownload}
              className="flex items-center bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition-colors text-base"
            >
              <span className="mr-2">⬇️</span>
              Student Progress Report
            </button>
          </div>
        </div>
      </div>

      {/* Sponsors List */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h3 className="text-xl font-semibold mb-4">List of Previous Sponsor</h3>
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-base font-medium text-gray-600 border-b pb-2">
          <div>Names</div>
          <div>Location</div>
          <div>Donated</div>
        </div>
        {/* Sponsor Rows */}
        <div className="space-y-3">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 py-2 text-base">
              <div className="font-medium text-gray-900">{sponsor.name}</div>
              <div className="text-gray-600">{sponsor.location}</div>
              <div>
                <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-base font-medium">
                  + {sponsor.amount}$
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination & Showing Data */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-4 border-t gap-2 text-base">
          <div className="text-gray-600">
            Showing data {showingEntries}
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );}


export default StudentSponsorshipPage;