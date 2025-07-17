"use client";

import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Search,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Video,
  Users,
  Lightbulb,
  Send,
  Star,
  ThumbsUp,
  Download
} from 'lucide-react';

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    description: ''
  });

  const supportCategories = [
    { id: 'all', name: 'All Categories', icon: HelpCircle },
    { id: 'account', name: 'Account & Profile', icon: Users },
    { id: 'payments', name: 'Payments & Billing', icon: FileText },
    { id: 'students', name: 'Student Management', icon: BookOpen },
    { id: 'technical', name: 'Technical Issues', icon: AlertCircle },
    { id: 'general', name: 'General Questions', icon: Lightbulb }
  ];

  const faqData = [
    {
      id: 1,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'You can update your profile information by navigating to Settings > Profile. Click on any field to edit your information, then save your changes.',
      helpful: 24,
      views: 156
    },
    {
      id: 2,
      category: 'payments',
      question: 'What payment methods are accepted?',
      answer: 'We accept Credit Cards (Visa, MasterCard, American Express), Bank Transfers, PayPal, and Mobile Money payments. All transactions are secure and encrypted.',
      helpful: 18,
      views: 203
    },
    {
      id: 3,
      category: 'students',
      question: 'How do I sponsor a student?',
      answer: 'To sponsor a student, browse the student profiles, select a student you\'d like to support, choose your sponsorship amount, and complete the payment process. You\'ll receive updates on the student\'s progress.',
      helpful: 32,
      views: 287
    },
    {
      id: 4,
      category: 'technical',
      question: 'Why am I having trouble logging in?',
      answer: 'If you\'re having login issues, first check your email and password. Try resetting your password if needed. Clear your browser cache or try a different browser. Contact support if issues persist.',
      helpful: 15,
      views: 142
    },
    {
      id: 5,
      category: 'general',
      question: 'How does the sponsorship program work?',
      answer: 'Our sponsorship program connects generous donors with students in need. You can choose to sponsor tuition, books, meals, or provide general support. You\'ll receive regular updates on your sponsored student\'s progress.',
      helpful: 41,
      views: 398
    },
    {
      id: 6,
      category: 'payments',
      question: 'How can I view my payment history?',
      answer: 'Go to Dashboard > Payments to view all your transactions. You can filter by date, amount, or status. You can also download payment receipts from this section.',
      helpful: 22,
      views: 189
    }
  ];

  const supportTickets = [
    {
      id: 'SUP-001',
      subject: 'Payment not processing',
      status: 'open',
      priority: 'high',
      created: '2024-07-15',
      lastUpdate: '2024-07-16',
      agent: 'Sarah Johnson'
    },
    {
      id: 'SUP-002',
      subject: 'Student profile update request',
      status: 'in-progress',
      priority: 'medium',
      created: '2024-07-14',
      lastUpdate: '2024-07-16',
      agent: 'Mike Chen'
    },
    {
      id: 'SUP-003',
      subject: 'Account verification issue',
      status: 'resolved',
      priority: 'low',
      created: '2024-07-12',
      lastUpdate: '2024-07-15',
      agent: 'Emily Davis'
    }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: MessageCircle,
      color: 'blue',
      action: 'contact'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: Video,
      color: 'green',
      action: 'tutorials'
    },
    {
      title: 'User Guide',
      description: 'Download comprehensive guide',
      icon: Download,
      color: 'purple',
      action: 'download'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: Users,
      color: 'yellow',
      action: 'forum'
    }
  ];

  const filteredFaq = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      open: 'bg-red-100 text-red-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityStyles[priority] || 'bg-gray-100 text-gray-800'}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // Handle ticket submission logic here
    console.log('Ticket submitted:', ticketForm);
    alert('Support ticket submitted successfully!');
    setTicketForm({ subject: '', category: 'general', priority: 'medium', description: '' });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-2">Find answers to your questions or get in touch with our support team</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`p-3 rounded-full bg-${action.color}-50 w-fit mb-4`}>
              <action.icon className={`w-6 h-6 text-${action.color}-600`} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Email Support</div>
              <div className="text-sm text-gray-600">support@edu-sponsor.com</div>
              <div className="text-xs text-gray-500">Response within 24 hours</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Phone Support</div>
              <div className="text-sm text-gray-600">+1 (555) 123-4567</div>
              <div className="text-xs text-gray-500">Mon-Fri, 9AM-6PM EST</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Live Chat</div>
              <div className="text-sm text-gray-600">Available now</div>
              <div className="text-xs text-gray-500">Average response: 2 minutes</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
              <div className="flex gap-3 mt-4 sm:mt-0">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaq.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-700 mb-4">{faq.answer}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-500">{faq.views} views</span>
                          <button className="flex items-center text-green-600 hover:text-green-700">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {faq.helpful} helpful
                          </button>
                        </div>
                        <span className="text-gray-500">Was this helpful?</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaq.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No FAQs found matching your search criteria.
              </div>
            )}
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit a Ticket</h3>
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General Question</option>
                  <option value="account">Account Issue</option>
                  <option value="payments">Payment Problem</option>
                  <option value="technical">Technical Issue</option>
                  <option value="students">Student Management</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={ticketForm.priority}
                  onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide detailed information about your issue"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Ticket
              </button>
            </form>
          </div>

          {/* My Tickets */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Support Tickets</h3>
            <div className="space-y-3">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-gray-900">{ticket.subject}</span>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>#{ticket.id}</span>
                    {getPriorityBadge(ticket.priority)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Updated: {ticket.lastUpdate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
