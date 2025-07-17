"use client";

import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield, 
  Globe, 
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Save,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle,
  Camera,
  Edit,
  Key,
  Download,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Profile settings state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate about education and helping students achieve their dreams.',
    location: 'Kigali, Rwanda',
    organization: 'Education Foundation',
    website: 'https://www.example.com'
  });

  // Security settings state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    sessionTimeout: '30',
    loginAlerts: true
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newStudents: true,
    paymentUpdates: true,
    systemUpdates: false,
    newsletter: true,
    frequency: 'daily'
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    dataSharing: false,
    analyticsTracking: true
  });

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  const handleSave = (section) => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    handleSave('profile');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    handleSave('security');
    setSecurityData({
      ...securityData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
        
        {/* Profile Picture */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <button className="absolute -bottom-1 -right-1 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <Camera className="w-3 h-3" />
            </button>
          </div>
          <div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </button>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
              <input
                type="text"
                value={profileData.organization}
                onChange={(e) => setProfileData({...profileData, organization: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              value={profileData.website}
              onChange={(e) => setProfileData({...profileData, website: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://www.example.com"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saveStatus === 'saving'}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saveStatus === 'saving' ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={securityData.currentPassword}
                onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={securityData.newPassword}
              onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={securityData.confirmPassword}
              onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Key className="w-4 h-4 mr-2" />
            Update Password
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Enable 2FA</p>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securityData.twoFactorEnabled}
              onChange={(e) => setSecurityData({...securityData, twoFactorEnabled: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Login Sessions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Sessions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Smartphone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Current Session</p>
                <p className="text-sm text-gray-600">Chrome on Windows • Kigali, Rwanda</p>
                <p className="text-xs text-gray-500">Last active: Now</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Active</span>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Mobile App</p>
                <p className="text-sm text-gray-600">iPhone • Kigali, Rwanda</p>
                <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700 text-sm">Revoke</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
        
        <div className="space-y-6">
          {/* Communication Channels */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">How would you like to be notified?</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Email notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.smsNotifications}
                  onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">SMS notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Push notifications</span>
              </label>
            </div>
          </div>

          {/* Notification Types */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">What would you like to be notified about?</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.newStudents}
                  onChange={(e) => setNotificationSettings({...notificationSettings, newStudents: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">New student registrations</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.paymentUpdates}
                  onChange={(e) => setNotificationSettings({...notificationSettings, paymentUpdates: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Payment updates</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.systemUpdates}
                  onChange={(e) => setNotificationSettings({...notificationSettings, systemUpdates: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">System updates and maintenance</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.newsletter}
                  onChange={(e) => setNotificationSettings({...notificationSettings, newsletter: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Newsletter and updates</span>
              </label>
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notification Frequency</label>
            <select
              value={notificationSettings.frequency}
              onChange={(e) => setNotificationSettings({...notificationSettings, frequency: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="immediately">Immediately</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave('notifications')}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="limited">Limited</option>
            </select>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Contact Information</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={privacySettings.showEmail}
                onChange={(e) => setPrivacySettings({...privacySettings, showEmail: e.target.checked})}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">Show email address publicly</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={privacySettings.showPhone}
                onChange={(e) => setPrivacySettings({...privacySettings, showPhone: e.target.checked})}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">Show phone number publicly</span>
            </label>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Communication</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={privacySettings.allowMessages}
                onChange={(e) => setPrivacySettings({...privacySettings, allowMessages: e.target.checked})}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">Allow direct messages</span>
            </label>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Data & Analytics</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={privacySettings.dataSharing}
                onChange={(e) => setPrivacySettings({...privacySettings, dataSharing: e.target.checked})}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">Allow data sharing with partners</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={privacySettings.analyticsTracking}
                onChange={(e) => setPrivacySettings({...privacySettings, analyticsTracking: e.target.checked})}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">Enable analytics tracking</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave('privacy')}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-6">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Export Data</p>
              <p className="text-sm text-gray-600">Download a copy of all your data</p>
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
            <div>
              <p className="font-medium text-red-900">Delete Account</p>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/25 • Default</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700">
            + Add New Payment Method
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Billing Information</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Billing Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
              <input
                type="text"
                placeholder="Optional"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
            <input
              type="text"
              defaultValue="123 Main Street"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                defaultValue="Kigali"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                type="text"
                defaultValue="Kigali"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
              <input
                type="text"
                defaultValue="00000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Update Billing
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">General Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="en">English</option>
              <option value="rw">Kinyarwanda</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="CAT">Central Africa Time (CAT)</option>
              <option value="EAT">East Africa Time (EAT)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="USD">USD - US Dollar</option>
              <option value="RWF">RWF - Rwandan Franc</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave('preferences')}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Actions</h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Download Account Data
          </button>
          <button className="w-full flex items-center justify-center px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out of All Devices
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            saveStatus === 'saving' ? 'bg-blue-50 text-blue-700' :
            saveStatus === 'saved' ? 'bg-green-50 text-green-700' : ''
          }`}>
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving changes...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Changes saved successfully!
              </>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Settings Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <nav className="space-y-1">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            {activeTab === 'profile' && renderProfileSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'privacy' && renderPrivacySettings()}
            {activeTab === 'payment' && renderPaymentSettings()}
            {activeTab === 'preferences' && renderPreferencesSettings()}
          </div>
        </div>
      </div>
    </div>
  );
}
