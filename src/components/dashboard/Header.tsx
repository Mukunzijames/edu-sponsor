"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Bell, Search, User, ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function DashboardHeader() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const handleClickOutside = useCallback(() => {
    setShowProfileMenu(false);
  }, []);
  
  const profileMenuRef = useClickOutside<HTMLDivElement>(handleClickOutside);
  
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex justify-between items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="relative" ref={profileMenuRef}>
          <button 
            className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-100"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-blue-600" />
            </div>
            <span className="text-sm font-medium">John Doe</span>
            <ChevronDown size={16} className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <Link 
                href="/dashboard/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </Link>
              <Link 
                href="/dashboard/settings" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <div className="border-t border-gray-200 my-1"></div>
              <Link 
                href="/logout" 
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 