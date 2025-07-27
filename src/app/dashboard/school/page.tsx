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
  
  // Handle donate button click to navigate to students page
  const handleDonateClick = (schoolId: string) => {
    router.push(`/dashboard/student?schoolId=${schoolId}`)
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
        title="Previous Page"
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
          className="px-3 py-2 mx-1 text-gray-600 rounded hover:bg-gray-100"
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
    <div className="p-6 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
        <div className="flex items-center space-x-4">
          <button className="font-medium text-blue-600 hover:text-blue-800">
            View All →
          </button>
        </div>
      </div>

      {/* Sort and Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Name">Name</option>
          </select>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="relative px-4 py-3 mb-6 text-red-700 border border-red-200 rounded bg-red-50" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{(error as Error).message}</span>
        </div>
      )}

      {/* School Cards Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {currentSchools.length > 0 ? (
            currentSchools.map((school) => (
              <div key={school.Id} className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                {/* School Image Placeholder */}
                <div className="relative h-48 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl text-gray-400">🏫</div>
                  </div>
                  {/* Bookmark icon */}
                  <div className="absolute top-3 right-3">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400 cursor-pointer hover:text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                </div>
                
                {/* School Info */}
                <div className="p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">{school.Name}</h3>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">{school.Description || 'No description available'}</p>
                  
                  {/* District if available */}
                  {school.District && (
                    <div className="flex items-center mb-4 text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{school.District}</span>
                    </div>
                  )}
                  
                  {/* Donate Button */}
                  <button 
                    onClick={() => handleDonateClick(school.Id)}
                    className="w-full px-4 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Donate
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 py-10 text-center text-gray-500">
              No schools found
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && filteredSchools.length > 0 && (
        <>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center">
              {renderPaginationButtons()}
            </div>
          </div>

          {/* Results info */}
          <div className="mt-4 text-sm text-center text-gray-500">
            Showing {filteredSchools.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredSchools.length)} of {filteredSchools.length} entries
          </div>
        </>
      )}
    </div>
  )
}

export default SchoolsPage