"use client";

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  School,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  LineChart,
  Target,
  Award,
  Clock,
  MapPin
} from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { useSchools } from '@/hooks/useSchools';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('12M');
  const [selectedMetric, setSelectedMetric] = useState('students');
  
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: schools, isLoading: schoolsLoading } = useSchools();

  // Calculate analytics data
  const totalStudents = students?.length || 0;
  const totalSchools = schools?.length || 0;
  const sponsoredStudents = students?.filter(student => student.SponsorshipAmount > 0)?.length || 0;
  const totalFunding = students?.reduce((sum, student) => sum + (student.SponsorshipAmount || 0), 0) || 0;
  const averageSponsorshipAmount = sponsoredStudents > 0 ? totalFunding / sponsoredStudents : 0;

  // Mock data for charts - in real app, this would come from API
  const monthlyData = [
    { month: 'Jan', students: 65, funding: 12000, schools: 8 },
    { month: 'Feb', students: 78, funding: 15000, schools: 9 },
    { month: 'Mar', students: 92, funding: 18000, schools: 11 },
    { month: 'Apr', students: 110, funding: 22000, schools: 12 },
    { month: 'May', students: 125, funding: 25000, schools: 14 },
    { month: 'Jun', students: 140, funding: 28000, schools: 15 },
    { month: 'Jul', students: 158, funding: 32000, schools: 16 },
    { month: 'Aug', students: 175, funding: 35000, schools: 18 },
    { month: 'Sep', students: 190, funding: 38000, schools: 19 },
    { month: 'Oct', students: 205, funding: 42000, schools: 20 },
    { month: 'Nov', students: 220, funding: 45000, schools: 21 },
    { month: 'Dec', students: 235, funding: 48000, schools: 22 }
  ];

  const regionData = [
    { region: 'Kigali', students: 85, percentage: 36 },
    { region: 'Eastern', students: 58, percentage: 25 },
    { region: 'Southern', students: 42, percentage: 18 },
    { region: 'Western', students: 35, percentage: 15 },
    { region: 'Northern', students: 15, percentage: 6 }
  ];

  const gradeDistribution = [
    { grade: 'Primary 1-3', count: 45, percentage: 19 },
    { grade: 'Primary 4-6', count: 68, percentage: 29 },
    { grade: 'Secondary 1-3', count: 78, percentage: 33 },
    { grade: 'Secondary 4-6', count: 44, percentage: 19 }
  ];

  const StatCard = ({ title, value, change, icon: Icon, trend, color = "blue" }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : trend === 'down' ? (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              ) : null}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ChartContainer = ({ title, children, actions }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );

  const SimpleBarChart = ({ data, dataKey, color = "#3B82F6" }) => (
    <div className="h-64 flex items-end justify-between gap-2">
      {data.map((item, index) => {
        const maxValue = Math.max(...data.map(d => d[dataKey]));
        const height = (item[dataKey] / maxValue) * 100;
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full flex items-end justify-center h-48">
              <div 
                className="w-8 rounded-t-sm transition-all hover:opacity-80"
                style={{ 
                  height: `${height}%`, 
                  backgroundColor: color,
                  minHeight: '4px'
                }}
                title={`${item.month}: ${item[dataKey]}`}
              />
            </div>
            <span className="text-xs text-gray-600 mt-2">{item.month}</span>
          </div>
        );
      })}
    </div>
  );

  const DonutChart = ({ data, title }) => (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#E5E7EB"
              strokeWidth="10"
              fill="none"
            />
            {data.map((item, index) => {
              const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
              const strokeDasharray = `${(item.percentage / 100) * 251.2} 251.2`;
              const strokeDashoffset = -data.slice(0, index).reduce((sum, d) => sum + (d.percentage / 100) * 251.2, 0);
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={colors[index % colors.length]}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item, index) => {
          const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-sm text-gray-600">{item.region || item.grade}</span>
              </div>
              <span className="text-sm font-medium">{item.students || item.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track performance and insights across your educational platform</p>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1M">Last Month</option>
            <option value="3M">Last 3 Months</option>
            <option value="6M">Last 6 Months</option>
            <option value="12M">Last 12 Months</option>
          </select>
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={totalStudents.toLocaleString()}
          change="+12% from last month"
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Schools"
          value={totalSchools.toLocaleString()}
          change="+8% from last month"
          trend="up"
          icon={School}
          color="green"
        />
        <StatCard
          title="Total Funding"
          value={`$${totalFunding.toLocaleString()}`}
          change="+24% from last month"
          trend="up"
          icon={DollarSign}
          color="yellow"
        />
        <StatCard
          title="Avg. Sponsorship"
          value={`$${Math.round(averageSponsorshipAmount).toLocaleString()}`}
          change="+5% from last month"
          trend="up"
          icon={Target}
          color="purple"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Growth Trends"
          actions={
            <select 
              value={selectedMetric} 
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="students">Students</option>
              <option value="funding">Funding</option>
              <option value="schools">Schools</option>
            </select>
          }
        >
          <SimpleBarChart 
            data={monthlyData} 
            dataKey={selectedMetric}
            color={selectedMetric === 'students' ? '#3B82F6' : selectedMetric === 'funding' ? '#10B981' : '#F59E0B'}
          />
        </ChartContainer>

        <ChartContainer title="Regional Distribution">
          <DonutChart data={regionData} title="Students by Region" />
        </ChartContainer>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Grade Level Distribution">
          <DonutChart data={gradeDistribution} title="Students by Grade" />
        </ChartContainer>

        <ChartContainer title="Key Performance Indicators">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">89%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">2.5</div>
              <div className="text-sm text-gray-600">Avg. Response (days)</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-yellow-600">156%</div>
              <div className="text-sm text-gray-600">ROI</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">67%</div>
              <div className="text-sm text-gray-600">Engagement Rate</div>
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Recent Activity & Top Schools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Recent Activity">
          <div className="space-y-3">
            {[
              { action: "New student registered", school: "Green Hills Academy", time: "2 hours ago", type: "success" },
              { action: "Sponsorship completed", school: "Kigali Primary School", time: "4 hours ago", type: "success" },
              { action: "Payment pending", school: "Sunrise Academy", time: "6 hours ago", type: "warning" },
              { action: "New school registered", school: "Hope Secondary School", time: "1 day ago", type: "info" },
              { action: "Student profile updated", school: "Valley School", time: "2 days ago", type: "info" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'success' ? 'bg-green-500' : 
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                  <div className="text-xs text-gray-500">{activity.school}</div>
                </div>
                <div className="text-xs text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Top Performing Schools">
          <div className="space-y-4">
            {schools?.slice(0, 5).map((school, index) => (
              <div key={school.SchoolID || `school-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <School className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{school.SchoolName}</div>
                    <div className="text-sm text-gray-500">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {school.SchoolLocation}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{Math.floor(Math.random() * 50) + 20} students</div>
                  <div className="text-sm text-green-600">+{Math.floor(Math.random() * 15) + 5}% growth</div>
                </div>
              </div>
            )) || (
              <div className="text-center text-gray-500 py-8">
                Loading school data...
              </div>
            )}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}
