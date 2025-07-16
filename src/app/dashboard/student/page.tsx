'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search } from "lucide-react"
import { useSearchParams } from 'next/navigation'
import { useStudentsBySchool } from '@/hooks/useStudents'
import { useSchool } from '@/hooks/useSchools'

export default function StudentsPage() {
  const searchParams = useSearchParams()
  const schoolId = searchParams.get('schoolId')
  
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('Newest')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Fetch students data using React Query
  const { 
    data: students = [], 
    isLoading: isLoadingStudents, 
    error: studentsError 
  } = useStudentsBySchool(schoolId)
  
  // Fetch school data to display school name
  const { 
    data: school, 
    isLoading: isLoadingSchool 
  } = useSchool(schoolId || '')
  
  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.ParentName.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Sort students based on selected option
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
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentStudents = sortedStudents.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoadingStudents || isLoadingSchool) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (studentsError) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{(studentsError as Error).message}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {school ? `Students at ${school.Name}` : 'All Students'}
          </h1>
          <p className="text-sm text-gray-500">
            {school?.District && `${school.District} district`}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Newest">Newest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
                <SelectItem value="Name">Name</SelectItem>
                <SelectItem value="Age">Age</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {currentStudents.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No students found
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Parent Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStudents.map((student) => (
                    <TableRow key={student.Id}>
                      <TableCell className="font-medium">{student.Name}</TableCell>
                      <TableCell>{student.Gender}</TableCell>
                      <TableCell>{student.Age}</TableCell>
                      <TableCell>{student.Email}</TableCell>
                      <TableCell>{student.ParentName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedStudents.length)} of {sortedStudents.length} entries
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum)}
                          isActive={currentPage === pageNum}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {totalPages > 3 && <PaginationEllipsis />}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  )
}   

