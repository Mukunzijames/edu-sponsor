"use client";

import React, { useState, useMemo } from 'react';
import { useStudents } from '@/hooks/useStudents';
import Link from 'next/link';

export default function StudentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all students data
  const { data: students = [], isLoading: isLoadingStudents, error: studentsError } = useStudents();

  // Debug logging
  console.log('Debug AllStudentsPage:', {
    studentsCount: students.length,
    isLoading: isLoadingStudents,
    error: studentsError?.message
  });

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    let result = [...students];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(student => 
        student.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.ParentName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [students, searchQuery]);

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'Newest') {
      return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
    } else if (sortBy === 'Oldest') {
      return new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime()
    } else if (sortBy === 'Name') {
      return a.Name.localeCompare(b.Name)
    } else if (sortBy === 'Age') {
      return parseInt(a.Age) - parseInt(b.Age)
    }
    return 0
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = sortedStudents.slice(startIndex, startIndex + itemsPerPage);

  // Loading state
  if (isLoadingStudents) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading students...</span>
      </div>
    );
  }

  // Error state
  if (studentsError) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <h3 className="font-bold">Error loading students</h3>
          <p>Error: {(studentsError as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Students</h1>
          <p className="text-gray-600 mt-1">
            Showing all students who need sponsorship
          </p>
        </div>
        <Link 
          href="/dashboard/newStudent"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Student
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search students by name, email, or parent name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
          <option value="Name">Sort by Name</option>
          <option value="Age">Sort by Age</option>
        </select>
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-gray-600">
          Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Students Grid */}
      {currentStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentStudents.map((student) => (
            <div key={student.Id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {student.Name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{student.Name}</h3>
                    <p className="text-sm text-gray-500">Age: {student.Age}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Gender:</span> {student.Gender}</p>
                  <p><span className="font-medium">Parent:</span> {student.ParentName}</p>
                  <p><span className="font-medium">Address:</span> {student.Address}</p>
                  <p><span className="font-medium">Email:</span> {student.Email}</p>
                  <p><span className="font-medium">Phone:</span> {student.Phone}</p>
                  <p><span className="font-medium">School:</span> {student.SchoolId}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Sponsor This Student
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1.5H15m0 0l3 3m-3-3l3-3" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-500">
            {searchQuery 
              ? "No students match your search criteria" 
              : "No students found"
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
