"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CalendarDays,
  Users,
  GraduationCap,
  TrendingUp,
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Heart,
  School,
  HandCoins,
  UserCheck,
  Building
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useRole } from "@/hooks/useRole"
import { triggerAuthRefresh } from "@/lib/auth-utils"

// Mock data for sponsor analytics
const sponsorData = [
  { name: 'Jan', sponsorships: 18, investment: 9200 },
  { name: 'Feb', sponsorships: 22, investment: 11000 },
  { name: 'Mar', sponsorships: 19, investment: 9800 },
  { name: 'Apr', sponsorships: 25, investment: 12500 },
  { name: 'May', sponsorships: 28, investment: 14200 },
  { name: 'Jun', sponsorships: 24, investment: 12000 }
]

const schoolsData = [
  { name: "Kigali Primary School", location: "Kigali, Rwanda", students: 45, donations: "$8,200" },
  { name: "Hope Secondary School", location: "Butare, Rwanda", students: 32, donations: "$6,400" },
  { name: "Future Leaders Academy", location: "Musanze, Rwanda", students: 28, donations: "$5,600" },
  { name: "Unity High School", location: "Huye, Rwanda", students: 38, donations: "$7,200" }
]

// Mock data for school analytics
const schoolData = [
  { name: 'Jan', donations: 5200, students: 45 },
  { name: 'Feb', donations: 6100, students: 48 },
  { name: 'Mar', donations: 5800, students: 47 },
  { name: 'Apr', donations: 7200, students: 52 },
  { name: 'May', donations: 8100, students: 55 },
  { name: 'Jun', donations: 7600, students: 54 }
]

const donorData = [
  { name: "James Sponsor", amount: 2500, students: 5, lastDonation: "2 days ago" },
  { name: "Sarah Foundation", amount: 3200, students: 8, lastDonation: "1 week ago" },
  { name: "Global Education Fund", amount: 1800, students: 3, lastDonation: "3 days ago" },
  { name: "Hope Charity", amount: 2100, students: 4, lastDonation: "5 days ago" }
]

// Sponsor Dashboard Component
const SponsorDashboard = () => (
  <div className="min-h-screen bg-white p-6">
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-indigo-600">Sponsor Analytics</h1>
          <p className="text-gray-600 mt-1">Track your impact and sponsorship performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Last 6 Months
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Report
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Sponsored</CardTitle>
              <Users className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">247</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12%
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Schools</CardTitle>
              <School className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +3
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">$124,500</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8.2%
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.1%
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-indigo-600 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Sponsorships
            </CardTitle>
            <CardDescription>Number of students sponsored each month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sponsorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sponsorships" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-indigo-600 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Investment Trends
            </CardTitle>
            <CardDescription>Monthly investment amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sponsorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="investment" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

// School Dashboard Component
const SchoolDashboard = () => (
  <div className="min-h-screen bg-white p-6">
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-green-600">School Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor donations and student progress</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Last 6 Months
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Report
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">324</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +15 this month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Sponsors</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">45</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8 new
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Donations</CardTitle>
              <HandCoins className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">$48,200</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12%
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Graduation Rate</CardTitle>
              <Award className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">87%</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +5%
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 flex items-center gap-2">
              <HandCoins className="w-5 h-5" />
              Monthly Donations
            </CardTitle>
            <CardDescription>Donation amounts received each month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={schoolData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="donations" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Student Growth
            </CardTitle>
            <CardDescription>Number of students over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={schoolData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Donors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Recent Donors
          </CardTitle>
          <CardDescription>Latest sponsors and their contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donorData.map((donor, index) => (
              <motion.div
                key={donor.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-600">{donor.name}</h3>
                    <p className="text-sm text-gray-600">{donor.students} students sponsored</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${donor.amount}</p>
                  <p className="text-sm text-gray-500">{donor.lastDonation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)

// Main Dashboard Component
export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const { isSponsor, isSchool, userRole } = useRole()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Add debugging and force re-render on role change
  useEffect(() => {
    console.log('📊 Dashboard - Role changed:', { isSponsor, isSchool, userRole });
  }, [isSponsor, isSchool, userRole]);

  if (!mounted) return null

  console.log('📊 Dashboard Render - isSponsor:', isSponsor, 'isSchool:', isSchool, 'userRole:', userRole);

  // Render different dashboards based on user role
  if (isSponsor) {
    return <SponsorDashboard />
  }

  if (isSchool) {
    return <SchoolDashboard />
  }

  // Fallback for unknown roles - show debugging info
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-600">Welcome to Dashboard</h1>
          <p className="text-gray-500 mt-2">Please contact support for role assignment</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <p>User Role: <strong>{userRole || 'No role detected'}</strong></p>
            <p>Is Sponsor: <strong>{isSponsor ? 'Yes' : 'No'}</strong></p>
            <p>Is School: <strong>{isSchool ? 'Yes' : 'No'}</strong></p>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => triggerAuthRefresh()} 
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Refresh Role
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
