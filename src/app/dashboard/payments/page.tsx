"use client";

import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Download,
  Filter,
  Search,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  Target,
  Award
} from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { useSchools } from '@/hooks/useSchools';

export default function PaymentsPage() {
  const [timeRange, setTimeRange] = useState('12M');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: schools, isLoading: schoolsLoading } = useSchools();

  // Calculate payment analytics
  const totalFunding = students?.reduce((sum, student) => sum + (student.SponsorshipAmount || 0), 0) || 0;
  const sponsoredStudents = students?.filter(student => student.SponsorshipAmount > 0) || [];
  const pendingPayments = Math.floor(sponsoredStudents.length * 0.15); // Mock pending payments
  const completedPayments = sponsoredStudents.length - pendingPayments;
  const averagePayment = sponsoredStudents.length > 0 ? totalFunding / sponsoredStudents.length : 0;

  // Mock payment data - in real app, this would come from API
  const paymentTransactions = [
    {
      id: 'PAY-001',
      studentName: 'Maria Uwimana',
      school: 'Green Hills Academy',
      amount: 500,
      status: 'completed',
      date: '2024-07-15',
      method: 'Credit Card',
      transactionId: 'TXN-123456789',
      sponsorName: 'John Smith'
    },
    {
      id: 'PAY-002',
      studentName: 'Jean Baptiste',
      school: 'Kigali Primary School',
      amount: 320,
      status: 'pending',
      date: '2024-07-14',
      method: 'Bank Transfer',
      transactionId: 'TXN-123456790',
      sponsorName: 'Sarah Johnson'
    },
    {
      id: 'PAY-003',
      studentName: 'Grace Mukamana',
      school: 'Sunrise Academy',
      amount: 750,
      status: 'completed',
      date: '2024-07-13',
      method: 'PayPal',
      transactionId: 'TXN-123456791',
      sponsorName: 'Michael Brown'
    },
    {
      id: 'PAY-004',
      studentName: 'David Nkurunziza',
      school: 'Hope Secondary School',
      amount: 425,
      status: 'failed',
      date: '2024-07-12',
      method: 'Credit Card',
      transactionId: 'TXN-123456792',
      sponsorName: 'Emily Davis'
    },
    {
      id: 'PAY-005',
      studentName: 'Alice Uwimana',
      school: 'Valley School',
      amount: 600,
      status: 'completed',
      date: '2024-07-11',
      method: 'Bank Transfer',
      transactionId: 'TXN-123456793',
      sponsorName: 'Robert Wilson'
    }
  ];

  const monthlyPaymentData = [
    { month: 'Jan', amount: 12000, count: 25 },
    { month: 'Feb', amount: 15000, count: 32 },
    { month: 'Mar', amount: 18000, count: 38 },
    { month: 'Apr', amount: 22000, count: 45 },
    { month: 'May', amount: 25000, count: 52 },
    { month: 'Jun', amount: 28000, count: 58 },
    { month: 'Jul', amount: 32000, count: 65 },
    { month: 'Aug', amount: 35000, count: 72 },
    { month: 'Sep', amount: 38000, count: 78 },
    { month: 'Oct', amount: 42000, count: 85 },
    { month: 'Nov', amount: 45000, count: 92 },
    { month: 'Dec', amount: 48000, count: 98 }
  ];

  const paymentMethods = [
    { method: 'Credit Card', count: 45, percentage: 45 },
    { method: 'Bank Transfer', count: 30, percentage: 30 },
    { method: 'PayPal', count: 20, percentage: 20 },
    { method: 'Mobile Money', count: 5, percentage: 5 }
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
                title={`${item.month}: $${item[dataKey]?.toLocaleString()}`}
              />
            </div>
            <span className="text-xs text-gray-600 mt-2">{item.month}</span>
          </div>
        );
      })}
    </div>
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredTransactions = paymentTransactions.filter(transaction => {
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.sponsorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all sponsorship payments and transactions</p>
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
          title="Total Revenue"
          value={`$${totalFunding.toLocaleString()}`}
          change="+18% from last month"
          trend="up"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Completed Payments"
          value={completedPayments.toLocaleString()}
          change="+12% from last month"
          trend="up"
          icon={CheckCircle}
          color="blue"
        />
        <StatCard
          title="Pending Payments"
          value={pendingPayments.toLocaleString()}
          change="-5% from last month"
          trend="down"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Average Payment"
          value={`$${Math.round(averagePayment).toLocaleString()}`}
          change="+8% from last month"
          trend="up"
          icon={Target}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Monthly Payment Volume">
          <SimpleBarChart 
            data={monthlyPaymentData} 
            dataKey="amount"
            color="#10B981"
          />
        </ChartContainer>

        <ChartContainer title="Payment Method Distribution">
          <div className="space-y-4">
            {paymentMethods.map((method, index) => {
              const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-3"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span className="text-sm font-medium text-gray-700">{method.method}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">{method.count} payments</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${method.percentage}%`,
                          backgroundColor: colors[index % colors.length]
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-10">{method.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartContainer>
      </div>

      {/* Payment Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer title="Payment Success Rate">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10B981"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${92 * 2.51} 251`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">92%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Success Rate</p>
            <p className="text-xs text-green-600 mt-1">+3% from last month</p>
          </div>
        </ChartContainer>

        <ChartContainer title="Average Processing Time">
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2.4</div>
            <p className="text-sm text-gray-600">days</p>
            <p className="text-xs text-green-600 mt-1">-0.5 days improvement</p>
          </div>
        </ChartContainer>

        <ChartContainer title="Failed Payment Recovery">
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4">
              <Receipt className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">78%</div>
            <p className="text-sm text-gray-600">Recovery Rate</p>
            <p className="text-xs text-green-600 mt-1">+5% from last month</p>
          </div>
        </ChartContainer>
      </div>

      {/* Transactions Table */}
      <ChartContainer 
        title="Recent Transactions"
        actions={
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Transaction ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Student</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">School</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Sponsor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm text-gray-600">{transaction.transactionId}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{transaction.studentName}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{transaction.school}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{transaction.sponsorName}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">${transaction.amount}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{transaction.method}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {getStatusIcon(transaction.status)}
                      <span className="ml-2">{getStatusBadge(transaction.status)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{transaction.date}</span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No transactions found matching your criteria.
          </div>
        )}
      </ChartContainer>
    </div>
  );
}
