"use client";

import React, { useState, useMemo } from 'react';
import { useStudentsBySchool } from '@/hooks/useStudents';
import { useSchool } from '@/hooks/useSchools';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SchoolStudentsPage() {
  const params = useParams();
  const router = useRouter();
  const schoolId = params.schoolId as string;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch school and students data
  const { data: school, isLoading: isLoadingSchool } = useSchool(schoolId);
  const { data: students = [], isLoading: isLoadingStudents, error: studentsError } = useStudentsBySchool(schoolId);

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
  if (isLoadingStudents || isLoadingSchool) {
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
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              ← Back
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {school?.Name || 'School'} - Students
          </h1>
          <p className="text-gray-600 mt-1">
            Students seeking sponsorship opportunities
          </p>
        </div>
        
        <Link 
          href="/dashboard/newStudent" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add New Student
        </Link>
      </div>

      {/* School Information Card */}
      {school && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{school.Name}</h2>
              {school.Description && (
                <p className="text-gray-700 mb-4 max-w-2xl">{school.Description}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm">
                {school.District && (
                  <span className="bg-white px-3 py-1 rounded-full text-gray-600 border">
                    📍 {school.District}
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full border ${
                  school.Status 
                    ? 'bg-green-100 text-green-700 border-green-200' 
                    : 'bg-red-100 text-red-700 border-red-200'
                }`}>
                  {school.Status ? '✅ Active' : '❌ Inactive'}
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-gray-600 border">
                  👥 {students.length} Students
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search students by name, email, or parent name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[150px]"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="Name">Sort by Name</option>
            <option value="Age">Sort by Age</option>
          </select>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-gray-600">
            Showing {currentStudents.length} of {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Students Grid */}
      {currentStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentStudents.map((student) => (
            <div key={student.Id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-200 overflow-hidden">
              {/* Student Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {student.Name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">{student.Name}</h3>
                    <p className="text-blue-100">Age: {student.Age} years old</p>
                  </div>
                </div>
              </div>

              {/* Student Details */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Gender</p>
                      <p className="text-sm font-medium text-gray-900">{student.Gender}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Age</p>
                      <p className="text-sm font-medium text-gray-900">{student.Age} years</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Contact</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 mr-2">📧</span>
                        <span className="truncate">{student.Email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 mr-2">📞</span>
                        <span>{student.Phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Family Information */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Family</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 mr-2">👨‍👩‍👧‍👦</span>
                        <span className="font-medium">{student.ParentName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Address</p>
                    <div className="flex items-start text-sm text-gray-600">
                      <span className="w-4 h-4 mr-2 mt-0.5">📍</span>
                      <span className="line-clamp-2">{student.Address}</span>
                    </div>
                  </div>

                  {/* Registration Date */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Registered</p>
                    <p className="text-sm text-gray-600">
                      {new Date(student.CreatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="mt-6 pt-4 border-t">
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium">
                    💝 Sponsor This Student
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1.5H15m0 0l3 3m-3-3l3-3" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchQuery 
              ? "No students match your search criteria. Try adjusting your search terms." 
              : `No students are currently registered for ${school?.Name || 'this school'}. Consider adding new students.`
            }
          </p>
          <Link 
            href="/dashboard/newStudent" 
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add First Student
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 bg-white rounded-lg p-4 shadow-sm border">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
          >
            ← Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
