'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSchools } from '@/hooks/useSchools'
import { School } from '@/services/schoolService'
import { useRouter } from 'next/navigation'
import { AddSchoolForm } from '@/components/forms/AddSchoolForm'
import { useRole } from '@/hooks/useRole'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Users,
  BookOpen,
  Star,
  Heart,
  TrendingUp,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  GraduationCap,
  Building,
  Award,
  AlertTriangle
} from 'lucide-react'

function SchoolsPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('Newest')
  const [searchQuery, setSearchQuery] = useState('')
  const { isSponsor, isSchool } = useRole()
  
  // Fetch schools using React Query
  const { data: schools = [], isLoading, error, refetch } = useSchools()
  
  // Handle donate/view button click
  const handleSchoolClick = (schoolId: string) => {
    router.push(`/dashboard/student?schoolId=${schoolId}`)
  }

  // Handle school added callback
  const handleSchoolAdded = () => {
    refetch(); // Refresh the schools list
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

  // Generate school avatar initials
  const getSchoolInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Generate consistent color for school avatar
  const getSchoolColor = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-purple-400 to-purple-600',
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-indigo-400 to-indigo-600',
      'bg-gradient-to-br from-red-400 to-red-600',
      'bg-gradient-to-br from-yellow-400 to-yellow-600',
      'bg-gradient-to-br from-teal-400 to-teal-600',
    ]
    const index = name.length % colors.length
    return colors[index]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-5"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-100 rounded-2xl">
                    <Building className="w-10 h-10 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Schools Directory
                    </h1>
                    <p className="text-gray-600 text-lg mt-2">
                      Discover amazing educational institutions making a difference
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <AddSchoolForm onSchoolAdded={handleSchoolAdded} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Building className="w-8 h-8 mr-2" />
                    <span className="text-3xl font-bold">{schools.length}</span>
                  </div>
                  <p className="text-blue-100">Total Schools</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <GraduationCap className="w-8 h-8 mr-2" />
                    <span className="text-3xl font-bold">{filteredSchools.length}</span>
                  </div>
                  <p className="text-blue-100">Available Schools</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="w-8 h-8 mr-2" />
                    <span className="text-3xl font-bold">
                      {schools.filter(s => s.Status).length}
                    </span>
                  </div>
                  <p className="text-blue-100">Active Programs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <Filter className="w-5 h-5" />
                  Search & Filter
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search schools, districts, or programs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-100 h-12"
                    />
                  </div>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px] border-blue-200 h-12">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Newest">Newest First</SelectItem>
                      <SelectItem value="Oldest">Oldest First</SelectItem>
                      <SelectItem value="Name">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
              <p className="text-gray-600 text-lg">Loading amazing schools...</p>
            </div>
          </motion.div>
        )}
        
        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-red-700">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Error Loading Schools</h3>
                    <p className="text-sm">{(error as Error).message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Enhanced School Cards Grid */}
        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {currentSchools.length > 0 ? (
                  currentSchools.map((school, index) => (
                    <motion.div
                      key={school.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    >
                      <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden group">
                        {/* School Avatar Header */}
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                              <AvatarImage 
                                src={`/school-avatar-${school.Id}.jpg`} 
                                alt={school.Name}
                              />
                              <AvatarFallback 
                                className={`text-white font-bold text-lg ${getSchoolColor(school.Name)}`}
                              >
                                {getSchoolInitials(school.Name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                                {school.Name}
                              </h3>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-3 h-3" />
                                <span className="line-clamp-1">{school.District || 'Location not specified'}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0 pb-6 space-y-4">
                          {/* School Description */}
                          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {school.Description || 'A quality educational institution committed to excellence in learning and student development.'}
                          </p>
                          
                          {/* School Stats */}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              <span>Programs Available</span>
                            </div>
                            <Badge 
                              variant={school.Status ? "default" : "secondary"}
                              className={school.Status ? "bg-green-100 text-green-700" : ""}
                            >
                              {school.Status ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          
                          {/* Action Button */}
                          <Button 
                            onClick={() => handleSchoolClick(school.Id)}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg group-hover:shadow-xl transition-all duration-300"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            {isSponsor ? 'View Students' : 'Manage School'}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-full"
                  >
                    <Card className="border-0 shadow-lg bg-white/80">
                      <CardContent className="p-12 text-center">
                        <div className="space-y-4">
                          <div className="p-6 bg-blue-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                            <Building className="w-12 h-12 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900">No Schools Found</h3>
                          <p className="text-gray-600 max-w-md mx-auto">
                            {searchQuery 
                              ? "Try adjusting your search criteria to find more schools."
                              : "No schools are currently available. Check back soon for updates."}
                          </p>
                          {isSchool && !searchQuery && (
                            <div className="pt-4">
                              <AddSchoolForm onSchoolAdded={handleSchoolAdded} />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Enhanced Pagination */}
        {!isLoading && !error && filteredSchools.length > 0 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-blue-600">{startIndex + 1}</span> to{" "}
                    <span className="font-semibold text-blue-600">{Math.min(startIndex + itemsPerPage, filteredSchools.length)}</span> of{" "}
                    <span className="font-semibold text-blue-600">{filteredSchools.length}</span> schools
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="border-blue-200 hover:bg-blue-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                        if (page > totalPages) return null;
                        
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={
                              currentPage === page
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "border-blue-200 hover:bg-blue-50"
                            }
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="border-blue-200 hover:bg-blue-50"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SchoolsPage