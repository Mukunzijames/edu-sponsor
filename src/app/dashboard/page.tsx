"use client";

import React from 'react';
import { 
  Users, 
  School, 
  DollarSign, 
  TrendingUp, 
  BookOpen,
  AlertCircle,
  Plus,
  ArrowUpRight,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { useSchools } from '@/hooks/useSchools';
import StudentCard from '@/components/dashboard/StudentCard';

export default function DashboardPage() {
  const { data: schools, isLoading: schoolsLoading, error: schoolsError } = useSchools();
  
  // Mock data for demonstration - replace with real API calls
  const dashboardStats = {
    totalStudents: 1248,
    activeSchools: schools?.filter(school => school.Status)?.length || 0,
    totalSchools: schools?.length || 0,
    totalFunding: 124850,
    urgentCases: 47,
    monthlyGrowth: {
      students: 12,
      funding: 24,
      schools: 8
    }
  };

  const recentStudents = [
    {
      id: 1,
      name: "Maria Uwimana",
      school: "Green Hills Academy",
      grade: "Grade 8",
      description: "Passionate about becoming an engineer. Raised by a single mother.",
      amount: 500,
      sponsorAmount: 320,
      tags: ["Tuition", "Books"],
      isUrgent: true
    },
    {
      id: 2,
      name: "Jean Baptiste",
      school: "Kigali International School",
      grade: "Grade 7",
      description: "Excellent student in mathematics and science.",
      amount: 750,
      sponsorAmount: 450,
      tags: ["Tuition", "Uniform"],
      isUrgent: false
    },
    {
      id: 3,
      name: "Grace Mukamana",
      school: "St. Mary's Secondary",
      grade: "Grade 9",
      description: "Top student in her class. Wants to study computer science.",
      amount: 600,
      sponsorAmount: 180,
      tags: ["Tuition", "Books"],
      isUrgent: true
    },
    {
      id: 4,
      name: "Samuel Niyonzima",
      school: "Riviera High School",
      grade: "Grade 10",
      description: "Aspiring doctor with excellent grades. Lost father and needs support for medical school prep.",
      amount: 850,
      sponsorAmount: 520,
      tags: ["Tuition", "Books", "Lab Fees"],
      isUrgent: false
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "sponsorship",
      message: "New sponsorship for Maria Uwimana - $100 donated",
      time: "2 hours ago",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "school",
      message: "Green Hills Academy partnership approved",
      time: "4 hours ago",
      icon: School,
      color: "text-blue-500"
    },
    {
      id: 3,
      type: "student",
      message: "Jean Baptiste profile updated",
      time: "6 hours ago",
      icon: Users,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Education Dashboard</h1>
            <p className="text-blue-100 text-lg">
              Manage {dashboardStats.totalStudents} students across {dashboardStats.totalSchools} schools
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/dashboard/newStudent"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add Student
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardStats.totalStudents.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-green-600">+{dashboardStats.monthlyGrowth.students}%</span>
                <span className="text-gray-500 text-sm ml-1">this month</span>
              </div>
            </div>
            <div className="bg-blue-500 p-3 rounded-xl">
              <Users className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Schools</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardStats.activeSchools}/{dashboardStats.totalSchools}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-green-600">+{dashboardStats.monthlyGrowth.schools}%</span>
                <span className="text-gray-500 text-sm ml-1">this month</span>
              </div>
            </div>
            <div className="bg-green-500 p-3 rounded-xl">
              <School className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Funding</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${dashboardStats.totalFunding.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-green-600">+{dashboardStats.monthlyGrowth.funding}%</span>
                <span className="text-gray-500 text-sm ml-1">this month</span>
              </div>
            </div>
            <div className="bg-purple-500 p-3 rounded-xl">
              <DollarSign className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Urgent Cases</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardStats.urgentCases}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-red-600">Needs attention</span>
              </div>
            </div>
            <div className="bg-red-500 p-3 rounded-xl">
              <AlertCircle className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Schools & Students */}
        <div className="xl:col-span-2 space-y-6">
          {/* Schools Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Schools Overview</h2>
                <Link 
                  href="/dashboard/school"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            <div className="p-6">
              {schoolsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading schools...</span>
                </div>
              ) : schoolsError ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-yellow-100 p-3 rounded-full mb-3">
                    <AlertCircle className="text-yellow-600" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Unable to load schools</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We're having trouble connecting to our servers. Using demo data instead.
                  </p>
                  <p className="text-xs text-gray-500">
                    Schools data will be available when connection is restored.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schools?.slice(0, 6).map((school) => (
                    <div key={school.Id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{school.Name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{school.Description || "No description available"}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <MapPin size={12} />
                            <span>{school.District || "District not specified"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {school.Status ? (
                            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                              <CheckCircle size={12} />
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                              <XCircle size={12} />
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Students */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recent Students</h2>
                <Link 
                  href="/dashboard/student"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recentStudents.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link href="/dashboard/newStudent" className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="bg-blue-100 p-4 rounded-full mb-3">
                  <Plus className="text-blue-600" size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Student</span>
              </Link>
              
              <Link href="/dashboard/school" className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                <div className="bg-green-100 p-4 rounded-full mb-3">
                  <School className="text-green-600" size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Manage Schools</span>
              </Link>
              
              <button className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="bg-purple-100 p-4 rounded-full mb-3">
                  <BarChart3 className="text-purple-600" size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Reports</span>
              </button>
              
              <button className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                <div className="bg-orange-100 p-4 rounded-full mb-3">
                  <BookOpen className="text-orange-600" size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Documents</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* School Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">School Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Schools</span>
                <span className="font-semibold text-green-600">{dashboardStats.activeSchools}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(dashboardStats.activeSchools / dashboardStats.totalSchools) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-gray-600">Student Capacity</span>
                <span className="font-semibold text-blue-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                      <activity.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock size={10} />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="text-blue-600" size={16} />
                <div>
                  <p className="text-sm font-medium text-gray-900">School Visit - Green Hills</p>
                  <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="text-orange-600" size={16} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Review Urgent Cases</p>
                  <p className="text-xs text-gray-500">47 cases pending</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <BookOpen className="text-green-600" size={16} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Monthly Reports</p>
                  <p className="text-xs text-gray-500">Due in 3 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Goals</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Students Enrolled</span>
                  <span>85/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Funding Target</span>
                  <span>$124k/$150k</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}