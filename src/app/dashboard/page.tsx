"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Calendar,
  MapPin,
  Award,
  Heart,
  BookOpen,
  Target,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data
const overviewStats = [
  { title: "Total Sponsored", value: "247", change: "+12%", icon: Users, color: "bg-blue-50" },
  { title: "Active Schools", value: "18", change: "+3", icon: GraduationCap, color: "bg-green-50" },
  { title: "Total Investment", value: "$124,500", change: "+8.2%", icon: DollarSign, color: "bg-purple-50" },
  { title: "Success Rate", value: "94%", change: "+2.1%", icon: TrendingUp, color: "bg-orange-50" },
]

const monthlyData = [
  { month: "Jan", sponsored: 18, investment: 9500 },
  { month: "Feb", sponsored: 22, investment: 11200 },
  { month: "Mar", sponsored: 19, investment: 9800 },
  { month: "Apr", sponsored: 25, investment: 12800 },
  { month: "May", sponsored: 28, investment: 14200 },
  { month: "Jun", sponsored: 24, investment: 12100 },
]

const schoolsData = [
  { name: "Lincoln Elementary", students: 45, completion: 92, location: "Downtown" },
  { name: "Roosevelt High", students: 38, completion: 88, location: "Westside" },
  { name: "Washington Middle", students: 32, completion: 95, location: "Eastside" },
  { name: "Jefferson Academy", students: 28, completion: 90, location: "Northside" },
  { name: "Madison Charter", students: 24, completion: 87, location: "Southside" },
]

const recentSponsored = [
  {
    name: "Sarah Johnson",
    school: "Lincoln Elementary",
    grade: "5th",
    duration: "2 years",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Chen",
    school: "Roosevelt High",
    grade: "11th",
    duration: "1 year",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emily Rodriguez",
    school: "Washington Middle",
    grade: "7th",
    duration: "3 years",
    status: "Graduated",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "David Thompson",
    school: "Jefferson Academy",
    grade: "9th",
    duration: "1.5 years",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Lisa Wang",
    school: "Madison Charter",
    grade: "6th",
    duration: "2.5 years",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const categoryData = [
  { name: "Elementary", value: 35, color: "#3B82F6" },
  { name: "Middle School", value: 28, color: "#8B5CF6" },
  { name: "High School", value: 37, color: "#10B981" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function SponsorAnalytics() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">Sponsor Analytics</h1>
            <p className="text-gray-600 mt-2">Track your impact and sponsorship performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Last 6 Months
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Award className="w-4 h-4 mr-2" />
              View Report
            </Button>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {overviewStats.map((stat, index) => (
            <motion.div key={stat.title} variants={item}>
              <Card className="border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-indigo-600 mt-2">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <stat.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="trends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-50">
              <TabsTrigger value="trends" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600">
                Trends
              </TabsTrigger>
              <TabsTrigger value="schools" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600">
                Schools
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-600"
              >
                Categories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-indigo-600">Monthly Sponsorships</CardTitle>
                    <CardDescription>Number of students sponsored each month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        sponsored: {
                          label: "Students Sponsored",
                          color: "#3B82F6",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="sponsored"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8, fill: "#1D4ED8" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-indigo-600">Investment Trends</CardTitle>
                    <CardDescription>Monthly investment amounts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        investment: {
                          label: "Investment ($)",
                          color: "#8B5CF6",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="investment" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schools" className="space-y-6">
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-indigo-600 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    School Performance
                  </CardTitle>
                  <CardDescription>Overview of sponsored students by school</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {schoolsData.map((school, index) => (
                      <motion.div
                        key={school.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-indigo-100 rounded-full">
                            <BookOpen className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-indigo-600">{school.name}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {school.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-indigo-600">{school.students} students</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={school.completion} className="w-20 h-2" />
                            <span className="text-sm text-gray-600">{school.completion}%</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-indigo-600">Students by Grade Level</CardTitle>
                    <CardDescription>Distribution of sponsored students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        elementary: { label: "Elementary", color: "#3B82F6" },
                        middle: { label: "Middle School", color: "#8B5CF6" },
                        high: { label: "High School", color: "#10B981" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-indigo-600 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Impact Metrics
                    </CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Graduation Rate</span>
                        <span className="text-sm font-bold text-indigo-600">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Academic Improvement</span>
                        <span className="text-sm font-bold text-indigo-600">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Attendance Rate</span>
                        <span className="text-sm font-bold text-indigo-600">91%</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Program Satisfaction</span>
                        <span className="text-sm font-bold text-indigo-600">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Recent Sponsored Students */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-indigo-600 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Recently Sponsored Students
              </CardTitle>
              <CardDescription>Latest additions to your sponsorship program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSponsored.map((student, index) => (
                  <motion.div
                    key={student.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-600">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-indigo-600">{student.name}</h3>
                        <p className="text-sm text-gray-600">
                          {student.school} • {student.grade} Grade
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={student.status === "Active" ? "default" : "secondary"}
                        className={
                          student.status === "Active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }
                      >
                        {student.status}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{student.duration}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
