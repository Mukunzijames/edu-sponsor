"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, User, ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { authService } from "@/services/authService";

export default function DashboardHeader() {
  const user = authService.getCurrentUser();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleClickOutside = useCallback(() => {
    setShowProfileMenu(false);
  }, []);

  const profileMenuRef = useClickOutside<HTMLDivElement>(handleClickOutside);

  const handleLogout = () => {
    authService.logout();
    router.push("/login"); // Redirect to the login page
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      <div className="relative">
        {/* <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} /> */}
        {/* <input
          type="text"
          placeholder="Search..."
          className="w-64 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        /> */}
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100" title="Notifications">

        </button>
        <div className="relative" ref={profileMenuRef}>
          <button
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
              <User size={16} className="text-blue-600" />
            </div>
            <span className="text-sm font-medium">{user?.Name || 'User'}</span>
            <ChevronDown size={16} className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
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
              <div className="my-1 border-t border-gray-200"></div>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
