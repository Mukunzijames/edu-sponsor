"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Users,
  GraduationCap,
  MapPin,
  Calendar,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  Loader2,
  UserCheck,
  BookOpen,
  TrendingUp,
  Filter
} from "lucide-react"
import { useSearchParams } from 'next/navigation'
import { useStudentsBySchool } from '@/hooks/useStudents'
import { useSchool } from '@/hooks/useSchools'
import { Student } from '@/services/studentService'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AddStudentForm } from '@/components/forms/AddStudentForm'
import { useRole } from '@/hooks/useRole'

// Define a combined type for both API and local data formats
type StudentData = Student | {
  id: number;
  Name: string;
  Age: string;
  Gender: string;
  Address: string;
  Phone: string;
  Email: string;
  ParentName: string;
  SchoolId: string;
  CreatedAt: string;
  UpdatedAt: string;
  Status: string;
  Avatar: string;
}

const formatDateTime = (dateStr: string) => {
  if (!dateStr) return "Unknown"
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return "Invalid Date"
  }
}

const ITEMS_PER_PAGE = 8

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterGender, setFilterGender] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null)
  const [mounted, setMounted] = useState(false)
  
  const searchParams = useSearchParams()
  const schoolId = searchParams.get('schoolId')
  
  const { data: students, isLoading: studentsLoading, refetch: refetchStudents } = useStudentsBySchool(schoolId)
  const { data: school } = useSchool(schoolId || "")
  const { isSponsor, isSchool } = useRole()

  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle student added callback
  const handleStudentAdded = () => {
    refetchStudents(); // Refresh the students list
  }

  const filteredAndSortedStudents = useMemo(() => {
    if (!students) return []
    
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.ParentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.Address && student.Address.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = filterStatus === "all" || 
        (filterStatus === "active" && (student.Status === "Active" || !student.Status || student.Status === "")) ||
        (student.Status && student.Status.toLowerCase() === filterStatus)
      const matchesGender = filterGender === "all" || (student.Gender && student.Gender.toLowerCase() === filterGender)

      return matchesSearch && matchesStatus && matchesGender
    })
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.CreatedAt || "").getTime() - new Date(a.CreatedAt || "").getTime()
        case "oldest":
          return new Date(a.CreatedAt || "").getTime() - new Date(b.CreatedAt || "").getTime()
        case "name":
          return (a.Name || "").localeCompare(b.Name || "")
        case "age":
          return (parseInt(a.Age || "0") || 0) - (parseInt(b.Age || "0") || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [students, searchTerm, sortBy, filterStatus, filterGender])

  const totalPages = Math.ceil((filteredAndSortedStudents?.length || 0) / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentStudents = filteredAndSortedStudents?.slice(startIndex, endIndex) || []

  const getStatusColor = (status: string) => {
    const normalizedStatus = (status || "active").toLowerCase();
    switch (normalizedStatus) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "inactive":
        return "bg-red-100 text-red-700 border-red-200"
      case "graduated":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-green-100 text-green-700 border-green-200"
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-5"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-100 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <GraduationCap className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Students at {school?.Name || 'Loading...'}
                    </h1>
                    <div className="space-y-1 mt-2">
                      <p className="text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {school?.District || 'Loading...'}
                      </p>
                      {school?.Description && (
                        <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
                          {school.Description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <AddStudentForm 
                  schoolId={schoolId || ''} 
                  onStudentAdded={handleStudentAdded} 
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Cards - Only 3 cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-blue-900">{students?.length || 0}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3" />
                    All enrolled students
                  </p>
                </div>
                <div className="p-4 bg-blue-200 rounded-2xl">
                  <Users className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">Active Students</p>
                  <p className="text-3xl font-bold text-green-900">
                    {students?.filter((s) => s.Status === "Active" || !s.Status || s.Status === "").length || 0}
                  </p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                    <UserCheck className="w-3 h-3" />
                    Currently enrolled
                  </p>
                </div>
                <div className="p-4 bg-green-200 rounded-2xl">
                  <UserCheck className="w-6 h-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 mb-1">Districts</p>
                  <p className="text-3xl font-bold text-purple-900">{school?.District ? 1 : 0}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1 mt-2">
                    <MapPin className="w-3 h-3" />
                    School location
                  </p>
                </div>
                <div className="p-4 bg-purple-200 rounded-2xl">
                  <MapPin className="w-6 h-6 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex items-center gap-2 text-indigo-600 font-medium">
                  <Filter className="w-5 h-5" />
                  Filters & Search
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search students, parents, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-100"
                    />
                  </div>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[150px] border-indigo-200">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterGender} onValueChange={setFilterGender}>
                    <SelectTrigger className="w-full sm:w-[150px] border-indigo-200">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Gender</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[150px] border-indigo-200">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="age">Age</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-0 shadow-xl bg-white">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-indigo-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Student Directory ({filteredAndSortedStudents.length})
                </CardTitle>
                <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                  Page {currentPage} of {totalPages}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {studentsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
                    <p className="text-gray-600">Loading students...</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="font-semibold text-gray-700">Student</TableHead>
                        <TableHead className="font-semibold text-gray-700">Age</TableHead>
                        <TableHead className="font-semibold text-gray-700">Gender</TableHead>
                        <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                        <TableHead className="font-semibold text-gray-700">Parent/Guardian</TableHead>
                        <TableHead className="font-semibold text-gray-700">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700">Enrolled</TableHead>
                        <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {currentStudents.map((student, index) => {
                          const createdDate = formatDateTime(student.CreatedAt || "")

                          return (
                            <motion.tr
                              key={student.Id || index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-gray-100 hover:bg-indigo-50/30 transition-colors"
                            >
                              <TableCell className="py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-12 h-12 border-2 border-indigo-100">
                                    <AvatarImage src={student.Avatar || "/placeholder.svg"} alt={student.Name || ""} />
                                    <AvatarFallback className="bg-indigo-100 text-indigo-600 font-semibold">
                                      {student.Name?.split(" ")
                                        .map((n) => n?.[0])
                                        .join("") || ""}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-semibold text-indigo-900">{student.Name || "Unknown"}</p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                      <Mail className="w-3 h-3" />
                                      {student.Email || "No email"}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <span className="font-medium text-gray-700">{student.Age || "N/A"}</span>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge variant="secondary" className="font-medium">
                                  {student.Gender || "N/A"}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {student.Phone || "No phone"}
                                  </p>
                                  <p className="text-sm text-gray-500">{student.Address || "No address"}</p>
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <span className="font-medium text-gray-700">{student.ParentName || "N/A"}</span>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge className={getStatusColor(student.Status || "active")}>
                                  {student.Status || "Active"}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4">
                                <span className="text-sm text-gray-600">{createdDate}</span>
                              </TableCell>
                              <TableCell className="py-4 text-center">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-indigo-100">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuLabel className="text-indigo-600">Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    
                                    {/* View Details - Only visible to Sponsors */}
                                    {isSponsor && (
                                      <DropdownMenuItem 
                                        onClick={() => {
                                          if (student && student.Id) {
                                            router.push(`/dashboard/student/${student.Id}`);
                                          } else {
                                            toast.error("Cannot view student details", {
                                              description: "Student ID is missing"
                                            });
                                          }
                                        }}
                                        className="hover:bg-indigo-50"
                                      >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                    )}
                                    
                                    {/* Edit - Only visible to Schools */}
                                    {isSchool && (
                                      <DropdownMenuItem className="hover:bg-blue-50">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Student
                                      </DropdownMenuItem>
                                    )}
                                    
                                    {/* Delete - Only visible to Schools */}
                                    {isSchool && (
                                      <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </motion.tr>
                          )
                        })}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Pagination */}
        {!studentsLoading && filteredAndSortedStudents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-indigo-600">{startIndex + 1}</span> to{" "}
                    <span className="font-semibold text-indigo-600">{Math.min(endIndex, filteredAndSortedStudents.length)}</span> of{" "}
                    <span className="font-semibold text-indigo-600">{filteredAndSortedStudents.length}</span> students
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="border-indigo-200 hover:bg-indigo-50"
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
                            onClick={() => setCurrentPage(page)}
                            className={
                              currentPage === page
                                ? "bg-indigo-600 hover:bg-indigo-700"
                                : "border-indigo-200 hover:bg-indigo-50"
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
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="border-indigo-200 hover:bg-indigo-50"
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

        {/* Empty State */}
        {!studentsLoading && filteredAndSortedStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="p-6 bg-indigo-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                    <Users className="w-12 h-12 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">No students found</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {searchTerm || filterStatus !== "all" || filterGender !== "all"
                      ? "Try adjusting your search criteria or filters."
                      : "This school doesn't have any students yet. Add the first student to get started."}
                  </p>
                  {isSchool && !searchTerm && filterStatus === "all" && filterGender === "all" && (
                    <div className="pt-4">
                      <AddStudentForm 
                        schoolId={schoolId || ''} 
                        onStudentAdded={handleStudentAdded} 
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
