"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
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
  Download,
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
} from "lucide-react"
import { useSearchParams } from 'next/navigation'
import { useStudentsBySchool } from '@/hooks/useStudents'
import { useSchool } from '@/hooks/useSchools'
import { Student } from '@/services/studentService'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return {
    date: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  }
}

const ITEMS_PER_PAGE = 5

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
  
  const { data: students, isLoading: studentsLoading } = useStudentsBySchool(schoolId)
  const { data: school } = useSchool(schoolId || "")

  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredAndSortedStudents = useMemo(() => {
    if (!students) return []
    
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.ParentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.Address && student.Address.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = filterStatus === "all" || (student.Status  && student.Status.toLowerCase() === filterStatus)
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
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "inactive":
        return "bg-red-100 text-red-700 border-red-200"
      case "graduated":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-indigo-600">Students at {school?.Name || 'Loading...'}</h1>
              <p className="text-gray-600 mt-1">{school?.District || 'Loading...'}</p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-xl font-bold text-indigo-600">{students?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-xl font-bold text-green-600">
                    {students?.filter((s) => s.Status === "Active").length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Graduated</p>
                  <p className="text-xl font-bold text-blue-600">
                    {students?.filter((s) => s.Status === "Graduated").length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Districts</p>
                  <p className="text-xl font-bold text-purple-600">{school?.District ? 1 : 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          <div className="flex flex-1 gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32 border-gray-200">
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
              <SelectTrigger className="w-32 border-gray-200">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gender</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="age">Age</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="border-gray-200 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-gray-100">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="text-indigo-600 font-semibold">Student</TableHead>
                    <TableHead className="text-indigo-600 font-semibold">Age</TableHead>
                    <TableHead className="text-indigo-600 font-semibold">Gender</TableHead>
                    <TableHead className="text-indigo-600 font-semibold">Contact</TableHead>
                    <TableHead className="text-indigo-600 font-semibold">Address</TableHead>
                    <TableHead className="text-indigo-600 font-semibold">Parent</TableHead>
                    <TableHead className="text-indigo-600 font-semibold">Created</TableHead>
                    <TableHead className="text-indigo-600 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin mr-2" />
                          <span className="text-indigo-600">Loading students data...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : currentStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">No students found</TableCell>
                    </TableRow>
                  ) : (
                    <AnimatePresence mode="wait">
                      {currentStudents.map((student, index) => {
                        const createdDate = formatDateTime(student.CreatedAt || "")

                        return (
                          <motion.tr
                            key={student.Id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={student.Avatar || "/placeholder.svg"} alt={student.Name || ""} />
                                  <AvatarFallback className="bg-indigo-100 text-indigo-600">
                                    {student.Name?.split(" ")
                                      .map((n) => n?.[0])
                                      .join("") || ""}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-indigo-600">{student.Name || "Unknown"}</p>
                                  <p className="text-xs text-gray-500">{student.Email || "No email"}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-700">{student.Age || "N/A"}</TableCell>
                            <TableCell className="text-gray-700">{student.Gender || "N/A"}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-700">{student.Phone || "N/A"}</p>
                                <p className="text-xs text-gray-500">{student.Email || "N/A"}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm text-gray-700 max-w-32 truncate" title={student.Address}>
                                {student.Address || "N/A"}
                              </p>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm text-gray-700">{student.ParentName || "N/A"}</p>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="text-xs text-gray-700">{createdDate.date}</p>
                                <p className="text-xs text-gray-500">{createdDate.time}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => {
                                    if (student && student.Id) {
                                      router.push(`/dashboard/student/${student.Id}`);
                                    } else {
                                      toast.error("Cannot view student details", {
                                        description: "Student ID is missing"
                                      });
                                    }
                                  }}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Student
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </motion.tr>
                        )
                      })}
                    </AnimatePresence>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-between"
        >
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedStudents.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredAndSortedStudents.length)} of{" "}
            {filteredAndSortedStudents.length} entries
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-gray-200"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-indigo-600 hover:bg-indigo-700" : "border-gray-200"}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="border-gray-200"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>

        {/* Student Detail Modal */}
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-indigo-600">Student Details</DialogTitle>
              <DialogDescription>Complete information about the selected student</DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedStudent.Avatar || "/placeholder.svg"} alt={selectedStudent.Name || ""} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 text-lg">
                      {selectedStudent.Name?.split(" ")
                        .map((n) => n?.[0])
                        .join("") || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600">{selectedStudent.Name || "Unknown"}</h3>
                    <p className="text-gray-600">{school?.Name || selectedStudent.SchoolId || "Unknown School"}</p>
                    <Badge className={getStatusColor(selectedStudent.Status)}>{selectedStudent.Status || "Unknown"}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-indigo-600">Personal Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Gender:</span>
                        <span className="text-sm font-medium">{selectedStudent.Gender || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Age:</span>
                        <span className="text-sm font-medium">{selectedStudent.Age || "N/A"} years</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Email:</span>
                        <span className="text-sm font-medium">{selectedStudent.Email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Phone:</span>
                        <span className="text-sm font-medium">{selectedStudent.Phone || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Address:</span>
                        <span className="text-sm font-medium">{selectedStudent.Address || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-indigo-600">Additional Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Parent:</span>
                        <span className="text-sm font-medium">{selectedStudent.ParentName || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">School:</span>
                        <span className="text-sm font-medium">{school?.Name || selectedStudent.SchoolId || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Created:</span>
                        <span className="text-sm font-medium">
                          {formatDateTime(selectedStudent.CreatedAt || "").date} at{" "}
                          {formatDateTime(selectedStudent.UpdatedAt || "").time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Updated:</span>
                        <span className="text-sm font-medium">
                          {formatDateTime(selectedStudent.UpdatedAt || "").date} at{" "}
                          {formatDateTime(selectedStudent.UpdatedAt || "").time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
