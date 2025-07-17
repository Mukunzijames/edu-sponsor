'use client'

import React, { useState, useMemo } from 'react'
import { useSchools } from '@/hooks/useSchools'
import { School } from '@/services/schoolService'
import { useRouter } from 'next/navigation'

function SchoolsPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('Newest')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Fetch schools using React Query
  const { data: schools = [], isLoading, error } = useSchools()
  
  // Handle view students button click to navigate to school students page
  const handleViewStudents = (schoolId: string) => {
    router.push(`/dashboard/school/${schoolId}`)
  }
  
  // Apply filtering and sorting
  const filteredSchools = useMemo(() => {
    let result = [...schools]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(school => 
        school.Name.toLowerCase().includes(query) || 
        (school.Description && school.Description.toLowerCase().includes(query)) ||
        (school.District && school.District.toLowerCase().includes(query))
      )
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'Newest') {
        return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
      } else if (sortBy === 'Oldest') {
        return new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime()
      } else if (sortBy === 'Name') {
        return a.Name.localeCompare(b.Name)
      }
      return 0
    })
    
    return result
  }, [schools, searchQuery, sortBy])

  // Pagination
  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentSchools = filteredSchools.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 mx-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    )

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 rounded ${
            i === currentPage
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      )
    }

    // Show ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis" className="px-3 py-2 mx-1 text-gray-500">
            ...
          </span>
        )
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 mx-1 text-gray-600 hover:bg-gray-100 rounded"
        >
          {totalPages}
        </button>
      )
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 mx-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )

    return buttons
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
        <div className="flex items-center space-x-4">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View All →
          </button>
        </div>
      </div>

      {/* Sort and Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Name">Name</option>
          </select>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{(error as Error).message}</span>
        </div>
      )}

      {/* School Cards Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentSchools.length > 0 ? (
            currentSchools.map((school) => (
              <div key={school.Id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* School Image Placeholder */}
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 text-4xl">🏫</div>
                  </div>
                  {/* Bookmark icon */}
                  <div className="absolute top-3 right-3">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400 hover:text-blue-500 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                </div>
                
                {/* School Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{school.Name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{school.Description || 'No description available'}</p>
                  
                  {/* District if available */}
                  {school.District && (
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{school.District}</span>
                    </div>
                  )}
                  
                  {/* View Students Button */}
                  <button 
                    onClick={() => handleViewStudents(school.Id)}
                    className="w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sponser Students
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-10 text-gray-500">
              No schools found
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && filteredSchools.length > 0 && (
        <>
          <div className="flex justify-center items-center space-x-2">
            <div className="flex items-center">
              {renderPaginationButtons()}
            </div>
          </div>

          {/* Results info */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Showing {filteredSchools.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredSchools.length)} of {filteredSchools.length} entries
          </div>
        </>
      )}
    </div>
  )
}

export default SchoolsPage